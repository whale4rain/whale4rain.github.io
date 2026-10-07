---
title: "Composition Root（组合根）"
date: 2025-12-22T12:00:00+08:00
draft: false
summary: "业务代码只关心接口，程序却必须在某个地方把实现接上。这个唯一允许接线的地方，就是组合根。"
categories: ["技术"]
tags: ["架构设计", "依赖注入", "设计模式"]
slug: "composition-root"
---

# 一、什么是 Composition Root（组合根）

### 一句话定义

> Composition Root 是程序中“唯一负责把所有对象组装起来”的地方

也可以说：

> 它是整个程序中，唯一允许 new / Provide / wire 的地方

---

## 为什么需要它？

因为现实世界的软件里存在一个根本矛盾：

- **业务代码希望“只关心接口”**

- **程序必须在某个地方“把具体实现接上”**

这个“接线”的地方，就是 **Composition Root**。

---

## 一个极端但准确的类比

### ❌ 没有组合根的世界

```
handler -> new Service
service -> new Repo
repo -> new DB

```

这是**藤蔓式依赖**，特点：

- new 散落各处

- 测试无法替换

- 改实现 = 全局重构

---

### ✅ 有组合根的世界

```
main / bootstrap
 ├── DB
 ├── Repo(DB)
 ├── Service(Repo)
 ├── Handler(Service)

```

**依赖只往里走，不往外走**

---

# 二、Composition Root 的三条铁律

这是**不可破的**。

---

## 1️⃣ `new` 只能出现在组合根

### ❌ 错误示例

```go
func NewUserService() *UserService {
    db := sql.Open(...)
    return &UserService{db: db}
}

```

这段代码：

- 把 infra 绑死在 domain

- 无法测试

- 无法替换

---

### ✅ 正确

```go
func NewUserService(repo UserRepo) *UserService {
    return &UserService{repo: repo}
}

```

**db 在组合根里 new**

---

## 2️⃣ 依赖只“向内”，不“向外”

```
main
 ↓
infra
 ↓
service
 ↓
domain

```

- domain **不认识** infra

- service **不认识** gin / sql / redis

- main 认识一切

---

## 3️⃣ 组合根只做“装配”，不做业务

```go
// ❌ 错
if cfg.Env == "prod" {
    service.EnableAudit()
}

```

业务判断不该出现在组合根。

---

# 三、Composition Root 在 Go 里的三种主流实现

---

## 方案一：手写（小项目）

```go
func main() {
    cfg := LoadConfig()
    db := NewDB(cfg)
    repo := NewUserRepo(db)
    svc := NewUserService(repo)
    handler := NewHandler(svc)
    RunServer(handler)
}

```

### 👍 优点

- 清晰

- 无魔法

### 👎 缺点

- main 爆炸

- 不可扩展

---

## 方案二：wire（编译期）

```go
func InitializeApp() (*App, error) {
    wire.Build(
        NewConfig,
        NewDB,
        NewRepo,
        NewService,
        NewHandler,
    )
    return nil, nil
}

```

### 👍 优点

- 零运行时成本

- 静态安全

### 👎 缺点

- 不灵活

- 启动逻辑复杂时很难处理

---

## 方案三：dig / fx（运行时）

👉 **你现在用的就是这个**

```go
c.Invoke(func(
    cfg *Config,
    router *gin.Engine,
    tracer *Tracer,
) error {
    RunServer(router)
    return nil
})

```

### 👍 优点

- 生命周期管理

- 非常适合 server

- 启动逻辑清晰

### 👎 缺点

- 运行时注入

- 需要 discipline

---

# 四、Go 中“最佳实践”的真正含义

Go 没有官方 DI 框架，是**刻意设计的**。

> Go 的最佳实践不是“不用 DI”
> 而是 “限制 DI 的作用域”

### Go 社区的共识是：

> DI 只允许存在于 Composition Root

---

## Go 风格的组合根长什么样？

```go
/cmd/myapp/main.go      ← 组合根
/internal/container    ← 提供构造函数
/internal/service
/internal/domain
/internal/infra

```

### 特点

- `main.go` 很薄

- container 只返回函数

- service / domain 完全无感知

---

# 五、你现在这段代码 = 教科书级 Composition Root

我们直接对照你代码：

---

## 1️⃣ 容器构建

```go
c := container.BuildContainer(...)

```

👉 **组合根开始**

---

## 2️⃣ Invoke = 最终装配点

```go
c.Invoke(func(
    cfg *config.Config,
    router *gin.Engine,
    tracer *tracing.Tracer,
    resourceCleaner interfaces.ResourceCleaner,
) error {

```

👉 **所有依赖在这里汇合**

---

## 3️⃣ 生命周期绑定

```go
resourceCleaner.RegisterWithName("Tracer", ...)

```

👉 **资源生命周期交由组合根管理**

---

## 4️⃣ 业务代码零 DI 痕迹

handler / service：

```go
func (s *UserService) Do() {}

```

👉 **完全干净**

---

# 六、最容易犯的 5 个错误（非常重要）

---

## ❌ 1. 在 service 里 new infra

```go
db := sql.Open()

```

🚫 直接破坏组合根

---

## ❌ 2. 把 container 传进业务

```go
func NewService(c *dig.Container)

```

🚫 DI 泄漏

---

## ❌ 3. 在 handler 里 Resolve

```go
c.Invoke(...)

```

🚫 组合根只能有一个

---

## ❌ 4. 在组合根写业务 if / for

```go
if user.IsAdmin { ... }

```

🚫 启动代码不是业务代码

---

## ❌ 5. 全局变量代替 DI

```go
var DB *sql.DB

```

🚫 隐式依赖

---

# 七、一个“判断标准”（你以后可以自己用）

问自己一句话：

> “如果我想把 MySQL 换成 Postgres，我要改几行？”

- 改 1 行 provider → 👍 架构正确

- 改 20 个 service → ❌ 架构有问题

---

# 八、终极总结（送你一句话）

> Composition Root = 程序的接线板
> 业务代码 = 插头
> 插上就跑，拔掉不疼

你现在这套写法，已经是：

- 中大型 Go 服务

- 长期维护

- 多人协作

**非常成熟的一档架构**

---

如果你愿意，下一步我可以：

- 🧱 帮你画一个 **你当前项目的依赖图**

- 🔥 对比 **Fx vs Dig vs Wire 的取舍**

- 🧠 帮你制定一套 **“项目 DI 规范 checklist”**

你想继续哪一个？

---

*本文由 Notion 笔记整理发布。*
