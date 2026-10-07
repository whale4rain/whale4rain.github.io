---
title: "Go 内存模型：为什么不同 Goroutine 之间没有顺序一致性"
date: 2025-12-30T12:00:00+08:00
draft: false
summary: "main 函数里为什么打印不出 hello, world？因为不同 Goroutine 之间不满足顺序一致性内存模型。"
categories: ["技术"]
tags: ['Go', '内存模型', '并发']
slug: "go-memory-model"
---

## 不同Goroutine之间不满足顺序一致性内存模型

因为在不同的Goroutine，main函数中无法保证能打印出`hello, world`:

```go

var msg string
var done bool

func setup() {
    msg = "hello, world"
    done = true
}

func main() {
    go setup()
    for !done {
    }
    println(msg)
}

```

解决的办法是用显式同步：

```go

var msg string
var done = make(chan bool)

func setup() {
    msg = "hello, world"
    done <- true
}

func main() {
    go setup()
    <-done
    println(msg)
}

```

msg的写入是在channel发送之前，所以能保证打印`hello, world`

### 1. 为什么第一段代码不行？

在多核 CPU 和现代编译器环境下，会发生以下两种情况：

- **指令重排（Reordering）：** 编译器或 CPU 为了优化性能，可能会先执行 `done = true`，再执行 `msg = "hello, world"`。此时 `main` 协程发现 `done` 为 true，打印 `msg`，但 `msg` 还是空字符串。

- **可见性问题（Visibility）：** `setup` 协程修改了 `done`，但这个修改可能只保存在该核心的 L1/L2 缓存中，没有及时刷回主内存。`main` 协程在另一个核心上运行，它看到的 `done` 可能永远是 `false`，导致死循环。

---

### 2. 为什么 Channel 同步可以解决？

Go 内存模型对 Channel 有明确的 **Happens-Before** 保证：

> “A send on a channel happens before the corresponding receive from that channel completes.”
> (在通道上的发送操作，一定先行发生于对应的接收操作完成之前。)

我们可以通过以下逻辑链条来推导安全性：

1. **代码顺序限制：** 在 `setup` 协程内，由于单协程内的顺序一致性，`msg = "hello, world"` 先于 `done <- true` 执行。

1. **同步点限制：** 根据上述原则，`done <- true`（发送）先行发生于 `<-done`（接收完成）。

1. **传递性：** * `msg 写入` → `发送 done`

  - `发送 done` → `接收 done 完成`

  - `接收 done 完成` → `println(msg)`

  - **结论：** `msg 写入` **Happens-Before** `println(msg)`。

---

### 3. 补充：更底层的视角

除了 Channel，Go 还提供了其他的同步原语来确保这种“顺序性”：

- **`sync.Mutex`**** / ****`sync.RWMutex`****：** 解锁操作先行发生于下次加锁操作。

- **`sync/atomic`****：** 原子操作也能提供一定的可见性保证（尽管它不直接建立 Happens-Before 关系，但在底层会触发内存屏障）。

- **`sync.WaitGroup`****：** `Done()` 调用先行发生于 `Wait()` 返回。

## **在循环内部执行defer语句**

### 1. 为什么第一段代码存在风险？

在第一段代码中，`defer f.Close()` 只有在 `main` 函数返回时才会执行。

Go

`for i := 0; i < 5; i++ {
    f, _ := os.Open("file")
    defer f.Close() // 这里的 Close 会被压入栈，但不会立即执行
}
// 循环结束后，main 还没结束，文件句柄依然被占用`

**后果：**

- **文件句柄泄露**：如果循环次数非常多（比如几千次），程序会迅速耗尽操作系统的文件描述符限制（File Descriptor Limit），导致后续 `os.Open` 报错 `too many open files`。

- **内存压力**：每一个 `defer` 都会占用一定的栈内存空间，大量堆积会造成不必要的开销。

---

### 2. 为什么匿名函数（闭包）能解决问题？

在第二段代码中，你引入了一个 **立即执行函数表达式 (IIFE)**：

Go

`for i := 0; i < 5; i++ {
    func() { // 开启一个新的函数作用域
        f, _ := os.Open("file")
        defer f.Close() 
    }() // 函数执行结束，defer 立即触发
}`

**原理：**`defer` 注册在匿名函数的作用域内。每当循环执行一次，匿名函数就会被调用并返回。一旦匿名函数返回，该次循环申请的资源（`f.Close()`）就会被立即释放，从而保证在任何时刻，程序只占用当前循环所需的资源。

---

*本文由 Notion 笔记整理发布。*
