---
title: "MIT 6.824（六）：CRAQ"
date: 2026-01-19T12:00:00+08:00
draft: false
summary: "一种理念：mini-transaction"
categories: ["技术"]
tags: ['MIT 6.824', '分布式系统', 'CRAQ']
slug: "mit-6824-craq"
---

## Zookeeper API
一种理念：mini-transaction
zookeeper可以实现的工作：
- Test-and-set
- config info
- master select
Zookeeper被设计成要被许多可能完全不相关的服务共享使用，所以我们需要一个命名系统来区分不同服务的信息，这样这些信息才不会弄混
### 三种znode
Zookeeper中包含了3种类型的znode，了解他们对于解决问题会有帮助。
1. 第一种Regular znodes。这种znode一旦创建，就永久存在，除非你删除了它。
2. 第二种是Ephemeral znodes。如果Zookeeper认为创建它的客户端挂了，它会删除这种类型的znodes。这种类型的znodes与客户端会话绑定在一起，所以客户端需要时不时的发送心跳给Zookeeper，告诉Zookeeper自己还活着，这样Zookeeper才不会删除客户端对应的ephemeral znodes。
3. 最后一种类型是Sequential znodes。它的意思是，当你想要以特定的名字创建一个文件，Zookeeper实际上创建的文件名是你指定的文件名再加上一个数字。当有多个客户端同时创建Sequential文件时，Zookeeper会确保这里的数字不重合，同时也会确保这里的数字总是递增的。
### zookeeper的API
- `CREATE(PATH，DATA，FLAG)`。入参分别是文件的全路径名PATH，数据DATA，和表明znode类型的FLAG。这里有意思的是，CREATE的语义是排他的。也就是说，如果我向Zookeeper请求创建一个文件，如果我得到了yes的返回，那么说明这个文件之前不存在，我是第一个创建这个文件的客户端；如果我得到了no或者一个错误的返回，那么说明这个文件之前已经存在了。所以，客户端知道文件的创建是排他的。在后面有关锁的例子中，我们会看到，如果有多个客户端同时创建同一个文件，实际成功创建文件（获得了锁）的那个客户端是可以通过CREATE的返回知道的。
- `DELETE(PATH，VERSION)`。入参分别是文件的全路径名PATH，和版本号VERSION。有一件事情我之前没有提到，每一个znode都有一个表示当前版本号的version，当znode有更新时，version也会随之增加。对于delete和一些其他的update操作，你可以增加一个version参数，表明当且仅当znode的当前版本号与传入的version相同，才执行操作。当存在多个客户端同时要做相同的操作时，这里的参数version会非常有帮助（并发操作不会被覆盖）。所以，对于delete，你可以传入一个version表明，只有当znode版本匹配时才删除。
- `EXIST(PATH，WATCH)`。入参分别是文件的全路径名PATH，和一个有趣的额外参数WATCH。通过指定watch，你可以监听对应文件的变化。不论文件是否存在，你都可以设置watch为true，这样Zookeeper可以确保如果文件有任何变更，例如创建，删除，修改，都会通知到客户端。此外，判断文件是否存在和watch文件的变化，在Zookeeper内是原子操作。所以，**当调用exist并传入watch为true时，不可能在**<span color="blue_bg">**Zookeeper实际判断文件是否存在**</span>**和**<span color="blue_bg">**建立watch通道**</span>**之间，插入任何的创建文件的操作，这对于正确性来说非常重要。**
- `GETDATA(PATH，WATCH)`。入参分别是文件的全路径名PATH，和WATCH标志位。这里的watch监听的是文件的内容的变化。
- `SETDATA(PATH，DATA，VERSION)`。入参分别是文件的全路径名PATH，数据DATA，和版本号VERSION。如果你传入了version，那么Zookeeper当且仅当文件的版本号与传入的version一致时，才会更新文件。
- `LIST(PATH)`入参是目录的路径名，返回的是路径下的所有文件。
<empty-block/>
## 计数器（test-and-set)
```json
WHILE TRUE:
    X, V = GETDATA("F")
    IF SETDATA("f", X + 1, V):
        BREAK
```
可以看出这种做法只适合低负载
> Zookeeper对于100MB的数据很友好，但是对于100GB的数据或许就很糟糕了。这就是为什么人们用Zookeeper来存储配置，而不是大型网站的真实数据
<empty-block/>
> Q能否使用watch解决  
!watch耗时较长，可能在的到watch的反馈时就已经被修改，从而无法保证时序
<empty-block/>
## 非拓展锁
```json
WHILE TRUE:
    IF CREATE("f", data, ephemeral=TRUE): RETURN
    IF EXIST("f", watch=TRUE):
        WAIT
```
总的来说，先是通过CREATE创建锁文件，或许可以直接成功。如果失败了，我们需要等待持有锁的客户端释放锁。通过Zookeeper的watch机制，我们会在锁文件删除的时候得到一个watch通知。收到通知之后，我们回到最开始，尝试重新创建锁文件，如果运气足够好，那么这次是能创建成功的
<empty-block/>
**羊群效应（Herd Effect）:**
当有1000个客户端同时需要增加计数器时，我们的复杂度是 $`O(n^2)`$
<empty-block/>
这两个例子都受此影响
