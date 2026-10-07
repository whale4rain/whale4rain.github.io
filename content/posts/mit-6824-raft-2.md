---
title: "MIT 6.824（三）：Raft[2]"
date: 2025-12-10T12:00:00+08:00
draft: false
summary: "**leader** 发送的AppendEntries RPC还包含了prevLogIndex字段和prevLogTerm字段，会附带前一个槽位的信息  "
categories: ["技术"]
tags: ['MIT 6.824', '分布式系统', 'Raft[2]']
slug: "mit-6824-raft-2"
---

## 日志恢复（log backup）
### 过程
**leader** 发送的AppendEntries RPC还包含了prevLogIndex字段和prevLogTerm字段，会附带前一个槽位的信息  
\|  
V  
**Followers**收到AppendEntries消息时收到了一个带有若干Log条目的消息，Followers在写入Log之前，会检查本地的前一个Log条目，是否与Leader发来的有关前一条Log的信息匹配
- 不匹配： 返回False
\|  
V
**Leader**
为每个Follower维护了nextIndex，nextIndex的初始值是从新任Leader的最后一条日志开始  
\|  
V
**Leader**
为了响应Followers返回的拒绝，Leader会减小对应的nextIndex。所以它现在减小了两个Followers的nextIndex  
\|  
V
**Followers**
接受一个AppendEntries消息，那么需要首先删除本地相应的Log（如果有的话），再用AppendEntries中的内容替代本地Log
![](https://mit-public-courses-cn-translatio.gitbook.io/mit6-824/~gitbook/image?url=https%3A%2F%2F2933519158-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-MAkokVMtbC7djI1pgSw%252F-MBRljzYEgVezZRH2cVm%252F-MBSliQIKThBT1WjnQr9%252Fimage.png%3Falt%3Dmedia%26token%3D0d4be89d-c556-45f7-a3f6-e0f9ec6050f9&width=768&dpr=4&quality=100&sign=72993885&sv=2)
![](https://mit-public-courses-cn-translatio.gitbook.io/mit6-824/~gitbook/image?url=https%3A%2F%2F2933519158-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fassets%252F-MAkokVMtbC7djI1pgSw%252F-MBRljzYEgVezZRH2cVm%252F-MBSmmPN7PxlIL_Ym48l%252Fimage.png%3Falt%3Dmedia%26token%3D89f6616c-dd28-4710-a77f-aae63d5b27aa&width=768&dpr=4&quality=100&sign=32504fdf&sv=2)
### 总结
Leader使用了一种备份机制来探测Followers的Log中，第一个与Leader的Log相同的位置。在获得位置之后，Leader会给Follower发送从这个位置开始的，剩余的全部Log。经过这个过程，所有节点的Log都可以和Leader保持一致。
## 选举约束（Election Restriction）
Raft对于谁可以成为Leader，谁不能成为Leader是有一些限制的
> Q：为什么不选择拥有最长Log记录的节点作为Leader？
当某个节点为候选人投票时，任期号会通过RequestVote RPC更新给其他节点，并持久化存储中 && 不同任期的过半服务器之间必然有重合这个特点（Follower知道当前任期号即使prevleader已经挂掉）
节点只能向满足下面条件之一的候选人投出赞成票：
1. 候选人最后一条Log条目的任期号**大于**本地最后一条Log条目的任期号；
2. 或者，候选人最后一条Log条目的任期号**等于**本地最后一条Log条目的任期号，且候选人的Log记录长度**大于等于**本地Log记录的长度
## 快速恢复（Fast Backup）
如果一个Leader重启了，每次只回退一条Log条目非常耗时，它会将所有Follower的nextIndex设置为Leader本地Log记录的下一个槽位
**思想**: 让Follower返回足够的信息给Leader，这样Leader可以以任期（Term）为单位来回退，而不用每次只回退一条Log条目
三种场景
- S1没有任期6的任何Log，因此我们需要回退一整个任期的Log。
- 场景2：S1收到了任期4的旧Leader的多条Log，但是作为新Leader，S2只收到了一条任期4的Log。所以这里，我们需要覆盖S1中有关旧Leader的一些Log。
- S1与S2的Log不冲突，但是S1缺失了部分S2中的Log。
让Follower在回复Leader的AppendEntries消息中，携带3个额外的信息，来加速日志的恢复（当Followers与leader的log信息不匹配时）
- XTerm：这个是Follower中与Leader冲突的Log对应的任期号。在之前（7.1）有介绍Leader会在prevLogTerm中带上本地Log记录中，前一条Log的任期号。如果Follower在对应位置的任期号不匹配，它会拒绝Leader的AppendEntries消息，并将自己的任期号放在XTerm中。如果Follower在对应位置没有Log，那么这里会返回 -1。
- XIndex：这个是Follower中，对应任期号为XTerm的第一条Log条目的槽位号。
- XLen：如果Follower在对应位置没有Log，那么XTerm会返回-1，XLen表示空白的Log槽位数。
Leader发现冲突的方法在于，Follower会返回它从冲突条目中看到的任期号（XTerm）。在场景1中，Follower会设置XTerm=5，因为这是有冲突的Log条目对应的任期号。Leader会发现，哦，我的Log中没有任期5的条目。因此，在场景1中，Leader会一次性回退到Follower在任期5的起始位置。因为Leader并没有任何任期5的Log，所以它要删掉Follower中所有任期5的Log，这通过回退到Follower在任期5的第一条Log条目的位置，也就是XIndex达到的。
!!查找速度
## 持久化（Persistence）
持久化的（Persistent） vs 非持久化的（Volatile）
有且仅有三个数据是需要持久化存储的。它们分别是Log、currentTerm、votedFor
- log 唯一能用来重建应用程序状态的信息就是存储在Log中的一系列操作
- currentTerm和votedFor都是用来确保每个任期只有最多一个Leader(votedFor确保不会在一个选举期内投出两张票)
优化：只在服务器回复一个RPC或者发送一个RPC时，服务器才进行持久化存储，这样可以节省一些持久化存储的操作
> Q如何确保写入磁盘  
：unix系统上，write后无法确认，但是write后fsync确保写入介质中
为什么有些是非持久化的：可以通过log在系统中理解重启前哪些commit了
## 日志快照（Log Snapshot）
思想：要求应用程序将其状态的拷贝作为一种特殊的Log条目存储下来
当Raft认为它的Log将会过于庞大，例如大于1MB，10MB或者任意的限制，Raft会要求应用程序在Log的特定位置，对其状态做一个快照。如果我们有一个点的快照，那么我们可以安全的将那个点之前的Log丢弃，还需要为快照标注Log的槽位号
> Q 丢弃log后如何同步Follower  
：发现与Folowers不同步就不丢弃log，可以不丢弃所有follower中最短log之后的本地log  
Q&gt; 如果Follower停机会导致无法压缩  
:  &gt; raft解决方案：可以丢弃Follower的log但是使用InstallSnapshot RPC来处理
  当Follower刚刚恢复，如果它的Log短于Leader通过 AppendEntries RPC发给它的内容，那么它首先会强制Leader回退自己的Log。在某个点，Leader将不能再回退，因为它已经到了自己Log的起点。这时，Leader会将自己的快照发给Follower，之后立即通过AppendEntries将后面的Log发给Follower。
## 线性一致（Linearizability）
区别 对/错：线性一致（Linearizability）或者说强一致（Strong consistency）
如果执行历史整体可以按照一个顺序排列，且排列顺序与客户端请求的实际时间相符合，那么它是线性一致的
