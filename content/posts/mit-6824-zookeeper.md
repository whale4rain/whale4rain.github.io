---
title: "MIT 6.824（五）：zookeeper"
date: 2026-01-19T12:00:00+08:00
draft: false
summary: "要么我们能构建一个序列，同时满足"
categories: ["技术"]
tags: ['MIT 6.824', '分布式系统', 'zookeeper']
slug: "mit-6824-zookeeper"
---

## 线形一致（**Linearizability）**
要么我们能构建一个序列，同时满足
1. 序列中的请求的顺序与实际时间匹配（后发请求如在前请求完成后，必在后）
2. 每个读请求看到的都是序列中前一个写请求写入的值
生成了一个带环的图，那么证明请求历史记录不是线性一致的
线形一致=强一致
![](notion-file-block://2d33e60a-a7ab-8024-b052-dd2d742f55a2/3a36885b-096e-4c88-8216-e677b7b8cc48?space_id=f1c3e60a-a7ab-81f9-9cdd-0003f6dde03d&name=image.png)
这里箭头表示 x→y: x在y之前
形成了环所以不是线形一致的
> 线形一致不是用来描述系统是用来描述历史记录的
对于读请求，线性一致系统只能返回最近一次完成的写请求写入的值。
![](notion-file-block://2d33e60a-a7ab-806e-af55-f2619ec63c68/5184c9dd-410d-410e-9f8c-fc4f9e17c7de?space_id=f1c3e60a-a7ab-81f9-9cdd-0003f6dde03d&name=image.png)
对于客户端来说，如果发生读请求重传（是一个底层的行为）读到3/4都是合法的（取决于程序本身）
## Zookeeper
并不能通过添加服务器来达到提升性能,由于每个操作都经过Leader，随着服务器数量的增加，性能反而会降低
<empty-block/>
线形一致的系统，无法保证任何一个副本是最新的（可能不在过半服务器中，甚至和leader不在同一个网络分区）这导致将读请求交给副本是不可靠的
<empty-block/>
Zookeeper的方式是，放弃线性一致性。它对于这里问题的解决方法是，不提供线性一致的读
<empty-block/>
Zookeeper的确允许客户端将读请求发送给任意副本，并由副本根据自己的状态来响应读请求
<empty-block/>
## **一致保证（Consistency Guarantees）**
两个主要的保证:
- 写请求是线性一致的
- 任何一个客户端的请求，都会按照客户端指定的顺序来执行，称之为FIFO（First In First Out）客户端序列 
  - 这意味着如果出现客户端的两个请求，第一个请求读到Log的一个位置，第二个请求至少在Log的位置（即使切换副本也有效）
<empty-block/>
每个Log条目都会被Leader打上zxid的标签，这些标签就是Log对应的条目号
<empty-block/>
响应会带上zxid，客户端会记住最高的zxid，当客户端再发出一个请求时也会带上最高的zxid
<empty-block/>
如果副本没有zxid的log就不能响应，读请求就要暂缓（比如客户端 写后立即读，如果响应不同说明写未执行）
<empty-block/>
Q：所以：Zookeeper读到的数据不能保证是最新的
> A：如果我发送了一个写请求，之后我读取相同的数据，Zookeeper系统可以保证读请求可以读到**我之前写入的数据**。但是，如果你发送了一个写请求，之后我读取相同的数据，并没有保证说我可以看到**你写入的数据**
*单个客户端的请求是线性一致的*
Q：Log中的zxid怎么反应到key-value数据库的状态呢
> 第一个是，每个服务器可以跟踪修改**每一行Table数值的写请求对应的zxid**（这样可以读哪一行就返回相应的zxid）；另一个是，服务器可以为所有的读请求返回Log中**最近一次commit的zxid**，不论最近一次请求是不是更新了当前读取的Table中的行
## 同步操作（sync）
但是Zookeeper提供了一个 sync 操作，一个相当于写请求的读请求：sync，这样既符合 FIFO客户端请求序列
所以要读最新的数据，先sync再发送读请求
## **就绪文件（Ready file/znode）**
 zookeeper维护一个配置（znode），为了保证所有节点读到配置相同
根据，ready file 存在就读取，如果ready file不存在就说明在更新中，所以
master要更新ready file就要先 删除 ready file，然后更新各个保存了配置的Zookeeper file（也就是znode），全都更新后，再生成ready file
之后副本按照和master一样的更新操作，先删除自己的ready file再同样新建
<empty-block/>
case 1.
```json
delete(ready file)
write f1
write f2
create(ready file)         读
                        exits(ready file)
                        read f1
                        read f2
```
尽管Zookeeper不是完全的线性一致，但是由于写请求是线性一致的，并且读请求是随着时间在Log中单调向前的，我们还是可以得到合理的结果。
case 2.
```json
                      exits(ready file)
                        read f1
delete(ready file)
write f1
write f2
create(ready file)      
                        read f2
```
出现问题
需要良好的api设计避免问题
zookeeper的read不仅有exits还会建立一个watch
zookeeper保证在其在触发watch的请求时，先返回可能触发watch的请求，这就是删除Ready file会产生一个通知，而这个通知可以确保在读f2的请求响应之前发送给客户端
<embed src="https://mit-public-courses-cn-translatio.gitbook.io/mit6-824/~gitbook/image?url=https%3A%2F%2F2933519158-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-MAkokVMtbC7djI1pgSw%252F-MD4W2akBJ4UeYmSJJBt%252F-MD4kccYu9ubDOcG15Ac%252Fimage.png%3Falt%3Dmedia%26token%3Db48421c0-578d-48da-b558-f02bf1242a42&width=768&dpr=4&quality=100&sign=58f6b1e&sv=2"></embed>
Zookeeper可以保证客户端在收到删除Ready file的通知之前，看到的都是配置更新前的数据（也就是，客户端读取配置读了一半，如果收到了Ready file删除的通知，就可以放弃这次读，再重试读了）
<empty-block/>
> Q:watch在哪
> ！watch是基于一个特定的zxid建立的，如果客户端在一个副本log的某个位置执行了读请求，并且返回了相对于这个位置的状态，那么watch也是相对于这个位置来进行。如果收到了一个删除Ready file的请求，副本会查看watch表单，并且发现针对这个Ready file有一个watch。watch表单或许是以file名的hash作为key，这样方便查找。
<empty-block/>
