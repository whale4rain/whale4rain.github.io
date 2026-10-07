---
title: "MIT 6.824（二）：Raft[1]"
date: 2025-12-10T12:00:00+08:00
draft: false
summary: "当把test-and-set从单点变成多个服务，如果S1, S2出现网络问题，这时候原本“锁”的作用就失效了，这就会出现多个master，这就是脑裂"
categories: ["技术"]
tags: ['MIT 6.824', '分布式系统', 'Raft[1]']
slug: "mit-6824-raft-1"
---

## 脑裂
当把test-and-set从单点变成多个服务，如果S1, S2出现网络问题，这时候原本“锁”的作用就失效了，这就会出现多个master，这就是脑裂
## 过半票决（Majority Vote）
服务器的数量要是奇数，而不是偶数
过半指的是所有服务器过半而不是开机的一半
过半的特性：任意两组过半服务器，至少有一个服务器是重叠的
Raft会以库（Library）的形式存在于服务中。如果你有一个基于Raft的多副本服务，那么每个服务的副本将会由两部分组成：应用程序代码和Raft库。应用程序代码接收RPC或者其他客户端请求；不同节点的Raft库之间相互合作，来维护多副本之间的操作同步。
客户端发送请求给Key-Value数据库，这个请求不会立即被执行，因为这个请求还没有被拷贝。当且仅当这个请求存在于过半的副本节点中时，Raft才会通知Leader节点，只有在这个时候，Leader才会实际的执行这个请求
## Log同步时序
当Leader收到了过半服务器的正确响应，Leader会执行（来自客户端的）请求，得到结果，并将结果返回给客户端。
Leader知道过半服务器已经添加了Log，可以执行客户端请求，并返回给客户端，但是2不知道，所以需要一旦Leader发现请求被commit之后，它要将这个消息通知给其他的副本
![](https://mit-public-courses-cn-translatio.gitbook.io/mit6-824/~gitbook/image?url=https%3A%2F%2F2933519158-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-MAkokVMtbC7djI1pgSw%252F-MBGHvLZY-xqxN_-Tncs%252F-MBGP19fGXsHJhjKtqmX%252Fimage.png%3Falt%3Dmedia%26token%3Db6c71286-2f6b-429d-adca-7197950a643e&width=768&dpr=4&quality=100&sign=75130b71&sv=2)
这条消息的具体内容依赖于整个系统的状态。至少在Raft中，没有明确的committed消息。相应的，committed消息被夹带在下一个AppendEntries消息中，由Leader下一次的AppendEntries对应的RPC发出
下一次Leader需要发送心跳，或者是收到了一个新的客户端请求时Leader发出更大的commit号
## 日志（Raft Log）
1. Log是Leader用来对操作排序的一种手段
2. Log是用来存放临时操作的地方（非Leader等待commit号）
3. Leader需要能够向Follower重传丢失的Log消息（重试Follower）
4. 所有节点都需要保存Log，帮助重启的服务器恢复状态。
> ? Leader 1000/s, Follower 100/s  
Follower堆积log，耗尽内存（Raft没有流控机制）
## 应用层接口
![](https://mit-public-courses-cn-translatio.gitbook.io/mit6-824/~gitbook/image?url=https%3A%2F%2F2933519158-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-MAkokVMtbC7djI1pgSw%252F-MBGnNzriBVvlQ9BiPWz%252F-MBMNVDATVlo2e0EeTDf%252Fimage.png%3Falt%3Dmedia%26token%3D65bc08d3-11a8-4a58-b14c-a16e740e6a17&width=768&dpr=4&quality=100&sign=79f72177&sv=2)
应用层 Raft层通过applyCh的channel发送ApplyMsg消息，这个ApplyMsg包含：请求（command）和对应的Log位置（index）。
所有的副本都会收到这个ApplyMsg消息，它们都知道自己应该执行这个请求，但是index只在Leader有用，
> ？为什么不在Start函数返回的时候就响应客户端请求  
：key-value层收到RPC之后，会调用Start函数，Start函数会立即返回，但是这时，key-value层不会返回消息给客户端，因为它还没有执行客户端请求，它也不知道这个请求是否会被（Raft）commit
## Leader 选举（Leader Election）
Raft生命周期中可能会有不同的Leader，它使用任期号（term number）来区分不同的Leader。Followers（非Leader副本节点）不需要知道Leader的ID，它们只需要知道当前的任期号
当前服务器会发出请求投票（RequestVote）RPC，这个消息会发给所有的Raft节点。其实只需要发送到N-1个节点，因为Raft规定了，Leader的候选人总是会在选举时投票给自己
> ? 单边故障影响  
：Raft可以发送心跳抑制Followers选举新Leader，但是无法接受客户端（Raft未考虑）  
：可通过双向心跳，由follower发送心跳，当leader未听到自己心跳响应时卸任
每个Raft节点，只会在一个任期内投出一个认可选票。这意味着，在任意一个任期内，每一个节点只会对一个候选人投一次票。这样，就不可能有两个候选人同时获得过半的选票
如果赢得了选举，你需要立刻发送一条AppendEntries消息给其他所有的服务器
## 选举定时器（Election Timer）
分割选票（Split Vote）：
多副本系统在某种情况下无法选举出leader，如同时达到定时器超时
Raft不能完全避免分割选票（Split Vote），但是可以使得这个场景出现的概率大大降低。Raft通过为选举定时器随机的选择超时时间来达到这一点。
要求： 选举定时器的超时时间需要至少大于Leader的心跳间隔（否则节点会在收到正常的心跳之前触发选举）
1. 下限：超时时间下限是一个心跳的间隔。实际上由于网络可能丢包，这里你或许希望将下限设置为多个心跳间隔
2. 上限：上限越大，系统的恢复时间也就越长，取决于需要多高的性能和故障的频率
3. 不同节点的选举定时器的超时时间差（S2和S3之间）必须要足够长，至少需要大于发送一条RPC所需要的往返（Round-Trip）时间
4. 每一次一个节点重置自己的选举定时器时，都需要重新选择一个随机的超时时间
## 可能的异常情况
如果Leader正常运行，Raft不太会出现问题。如果Leader正在运行，并且在其运行时，系统中有过半服务器。Leader只需要告诉Followers，Log该是什么样子。Raft要求Followers必须同意并接收Leader的Log
![](https://mit-public-courses-cn-translatio.gitbook.io/mit6-824/~gitbook/image?url=https%3A%2F%2F2933519158-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-MAkokVMtbC7djI1pgSw%252F-MBP2JO7CY5oyh7Mgxqq%252F-MBR-3wdLZal8v1Qwl5G%252Fimage.png%3Falt%3Dmedia%26token%3D1f723560-91a1-4ae7-943b-c670b971d6c5&width=768&dpr=4&quality=100&sign=1429c028&sv=2)
