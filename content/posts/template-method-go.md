---
title: "Go 中的“模板方法”：用高阶函数分离变与不变"
date: 2025-12-24T12:00:00+08:00
draft: false
summary: "Go 里没有继承，怎么写模板方法？用高阶函数把“并发调度”这类不变的控制逻辑，和多变的业务逻辑解耦。"
categories: ["技术"]
tags: ['Go', '高阶函数', '并发', '设计模式']
slug: "template-method-go"
---

这种写法在 Go 语言中非常常见，属于**高阶函数（Higher-Order Functions）的应用，本质上是将“控制逻辑”与“业务逻辑”解耦**。

## 1. 核心原因：分离变与不变 (Separation of Concerns)

这段代码的核心思想是：**“并发调度”是通用的，“具体的检索动作”是多变的。**

- **不变的部分（****`concurrentRetrieve`****）：** 如何启动 Goroutine、如何使用 `WaitGroup` 等待结束、如何收集错误、如何保证线程安全。这些逻辑极其容易写错（例如忘记 `wg.Done()` 或发生 Data Race）。

- **变的部分（匿名函数 ****`fn`****）：** 到底是从数据库查，还是从 Elasticsearch 查？如果是这种类型走 A 引擎，那种类型走 B 引擎？这些是具体的业务规则。

### 这样做的好处：

1. **DRY (Don't Repeat Yourself)：** 如果你还有其他的并发任务（比如 `concurrentUpload` 或 `concurrentProcess`），你可以直接复用 `concurrentRetrieve` 的逻辑，而不需要每次都手写一遍 `WaitGroup` 和 `errCh`。

1. **降低心智负担：** 开发者在编写具体的 `Retrieve` 业务逻辑时，不需要关心并发细节。他只需要关心：“给定一个参数，我该怎么拿到结果并存进去”。

1. **易于测试：** 你可以轻松地为 `concurrentRetrieve` 编写单元测试，模拟各种并发失败的场景，而不需要依赖真实的检索引擎。

---

## 2. 为什么不直接写在 `Retrieve` 方法里？（对比方案 A：代码平铺）

如果直接写在 `Retrieve` 里，代码会变成这样：

Go

# 

`func (c *CompositeRetrieveEngine) Retrieve(...) {
    // 每次都要写这 20 行重复的并发控制代码
    var wg sync.WaitGroup
    for _, p := range params {
        wg.Add(1)
        go func(p types.RetrieveParams) {
            defer wg.Done()
            // 业务逻辑混在这里...
        }(p)
    }
    wg.Wait()
}`

**缺点：** 业务代码会被淹没在冗长的并发控制逻辑中。如果逻辑变复杂（比如要加**并发限流**、**超时控制**、**重试机制**），每个地方都要改一遍，极难维护。

---

## 3. 为什么不用接口（Interface）？（对比方案 B：面向对象）

另一种方案是定义一个 `Task` 接口，让各种引擎去实现。

Go

`type Task interface {
    Run(ctx context.Context) (*types.RetrieveResult, error)
}`

**对比：**

- **接口方案：** 更适合结构化的、长期的对象逻辑。

- **函数参数方案（当前写法）：** 更加轻量、灵活。它允许你在调用时临时组合逻辑（闭包），甚至可以访问调用方的局部变量。在 Go 这种偏向组合的语言中，**函数是一等公民**，这种“插件式”的写法比定义一堆细碎的接口更符合惯用法（Idiomatic Go）。

---

## 4. 这种写法的一个潜在改进点

你提供的代码中，`fn` 内部需要手动调用 `mu.Lock()`，这实际上让业务逻辑感知到了并发细节：

Go

`// 当前写法：业务代码还要负责加锁
fn(ctx, p, &results, &mu)`

更高级的抽象方案（类似于 Go 官方扩展包 golang.org/x/sync/errgroup）：

让 fn 只返回结果，由 concurrentRetrieve 负责收集。这样业务逻辑就变成了“纯函数”，完全不需要知道 Mutex 的存在。

---

## 总结

**为什么要这样写？**

- **模板模式：** `concurrentRetrieve` 是一个并发模板。

- **安全性：** 统一处理 `WaitGroup` 和 `Error Channel`，减少内存泄漏或死锁风险。

- **简洁性：** 保持了 `Retrieve` 函数的整洁，使其专注于“路由逻辑”。

### 延伸建议

如果你的项目中这种并发模式非常多，建议关注一下 **`errgroup`** 这个包。它几乎就是你这段代码的官方标准实现版本，能更优雅地处理上下文取消（Context Cancel）和错误捕获。

**你想看看如果用 ****`errgroup`**** 改写这段代码会是什么样子吗？它可以进一步简化你的错误处理逻辑。**

### 相关代码：

```java
func (c *CompositeRetrieveEngine) Retrieve(ctx context.Context,
	retrieveParams []types.RetrieveParams,
) ([]*types.RetrieveResult, error) {
	return concurrentRetrieve(ctx, retrieveParams,
		func(ctx context.Context, param types.RetrieveParams, results *[]*types.RetrieveResult, mu *sync.Mutex) error {
			found := false
			for _, engineInfo := range c.engineInfos {
				if engineInfo == nil {
					continue
				}
				if slices.Contains(engineInfo.retrieverType, param.RetrieverType) {
					result, err := engineInfo.retrieveEngine.Retrieve(ctx, param)
					if err != nil {
						return err
					}
					mu.Lock()
					*results = append(*results, result...)
					mu.Unlock()
					found = true
					break
				}
			}
			if !found {
				return fmt.Errorf("retriever type %s not found", param.RetrieverType)
			}
			return nil
		},
	)
}
```

```java
func concurrentRetrieve(
	ctx context.Context,
	retrieveParams []types.RetrieveParams,
	fn func(ctx context.Context, param types.RetrieveParams, results *[]*types.RetrieveResult, mu *sync.Mutex) error,
) ([]*types.RetrieveResult, error) {
	var results []*types.RetrieveResult
	var mu sync.Mutex
	var wg sync.WaitGroup
	errCh := make(chan error, len(retrieveParams))

	for _, param := range retrieveParams {
		wg.Add(1)
		p := param // Create local copy for safe use in closure
		go func() {
			defer wg.Done()
			if err := fn(ctx, p, &results, &mu); err != nil {
				errCh <- err
			}
		}()
	}

	wg.Wait()
	close(errCh)

	// Check for errors
	for err := range errCh {
		if err != nil {
			return nil, err
		}
	}

	return results, nil
}
```

---

*本文由 Notion 笔记整理发布。*
