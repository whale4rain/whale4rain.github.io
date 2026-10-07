---
title: "GORM 深度解析"
date: 2025-12-10T12:00:00+08:00
draft: false
summary: "从源码层面拆解 GORM 的链式调用、实例克隆与 Statement 机制，讲清那些不执行数据库操作的方法到底在干什么。"
categories: ["技术"]
tags: ["Go", "GORM", "源码分析"]
slug: "gorm-deep-dive"
---

## 不执行数据库操作的方法

### Model

先看链式调用最基础的Model，会把数据库实例复制一个，产生新的实例，这是为了不可变性，防止污染，或者新建实例。

```go
func (db *DB) Model(value interface{}) (tx *DB) {
	tx = db.getInstance()
	tx.Statement.Model = value
	return
}

```

### getInstance

其中是用于创建数据库实例的副本

```go
  func (db *DB) getInstance() *DB {

```

功能说明：
这是 GORM的实例克隆方法，用于创建当前数据库实例的副本，支持浅拷贝和深拷贝两种模式。

代码逻辑：

1. 检查是否需要克隆：
if db.clone > 0 {

- 如果 clone 字段大于0，表示需要创建新实例

- clone 是 DB 结构体的字段，用于区分不同的克隆模式

1. 创建新的 DB 实例：
tx := &DB{Config: db.Config, Error: db.Error}

- 创建一个新的 DB 指针

- 复制 Config（配置）和 Error（错误）

- *注意：**这里 Config 是浅拷贝，共享同一个配置对象

1. 处理克隆模式1（新建Statement）：

```go
if db.clone == 1 {
  // clone with new statement
  tx.Statement = &Statement{
	  DB:        tx,              // 指向新的 DB 实例
	  ConnPool:  db.Statement.ConnPool,
	  Context:   db.Statement.Context,
	  Clauses:   map[string]clause.Clause{},  // 空的 Clausemap
	  Vars:      make([]interface{}, 0, 8),
	  SkipHooks: db.Statement.SkipHooks,
  }
  if db.Config.PropagateUnscoped {
	  tx.Statement.Unscoped = db.Statement.Unscoped
  }
}

```

- *用途：**用于创建完全独立的查询实例

- *特点：**创建全新的 Statement 对象，初始化空的 Clauses 和 Vars

- *场景：**当需要开始一个全新的查询时使用

1. 处理克隆模式2（克隆Statement）：

```go
  else {
      // with clone statement
      tx.Statement = db.Statement.clone()
      tx.Statement.DB = tx
  }

```

- *用途：**基于现有 Statement 创建副本

- *特点：**复制 Statement 的所有内容，但更新 DB 引用

- *场景：**当需要保留之前查询的状态（如 WHERE 条件、参数等）时使用

1. 返回或原样返回：

```go
  return tx
  }

  return db

```

- 如果需要克隆，返回新的 DB 实例

- 如果 clone == 0，直接返回原实例（无克隆）

clone 字段的含义：

- clone == 0：不克隆，返回原实例

- clone == 1：创建新实例，新 Statement（干净的工作区）

- clone >= 2：复制现有 Statement（保留之前状态）

设计目的：

1. *避免数据竞争：**GORM 的查询操作是不可变的，每次操作都创建新实例

1. *支持链式操作：**如 db.Where().Find()，每个方法调用都会创建新实例

1. *保持状态隔离：**不同的查询不会相互影响

1. *内存效率：**通过共享 Config 和浅拷贝减少内存使用

使用场景：

- db.clone = 1：当你需要开始一个全新的查询时

- db.clone = 2：当你需要继承当前查询状态并继续添加条件时

### Where

```go
func (db *DB) Where(query interface{}, args ...interface{}) (tx *DB) {
	tx = db.getInstance()
	if conds := tx.Statement.BuildCondition(query, args...); len(conds) > 0 {
		tx.Statement.AddClause(clause.Where{Exprs: conds})
	}
	return
}

```

BuildCondition明显是处理参数得到conditions，我们关注AddClause

### AddClause

```go
func (stmt *Statement) AddClause(v clause.Interface) {
	if optimizer, ok := v.(StatementModifier); ok {
		optimizer.ModifyStatement(stmt)
	} else {
		name := v.Name()
		c := stmt.Clauses[name]
		c.Name = name
		v.MergeClause(&c)
		stmt.Clauses[name] = c
	}
}

```

用于向 `Statement` 添加 SQL 子句，支持两种不同的合并策略
如果实现了`StatementModifier`，直接调用其 `ModifyStatement(stmt)` 方法

- *作用：**允许 clause 直接修改 Statement 的状态（如
Statement.Vars、Statement.Select 等）

- 示例：JOIN 子句可能需要直接修改 Statement 的 JOIN 条件
如果没有实现，走默认流程

- 设置子句`c`

- 调`MergeClause`修改Clause
eg.

```go
// MergeClause merge from clause
func (from From) MergeClause(clause *Clause) {
  clause.Expression = from
}

```

and

```go
func (limit Limit) MergeClause(clause *Clause) {
clause.Name = ""

if v, ok := clause.Expression.(Limit); ok {
	if (limit.Limit == nil || *limit.Limit == 0) && v.Limit != nil {
		limit.Limit = v.Limit
	}

	if limit.Offset == 0 && v.Offset > 0 {
		limit.Offset = v.Offset
	} else if limit.Offset < 0 {
		limit.Offset = 0
	}
}

clause.Expression = limit
}

```

在这里就可以看到Offset和limit两个函数会在这里同时修改，说明offset应该在limit前面就要设置好

### Order

类型switch处理不同参数：

```go
func (db *DB) Order(value interface{}) (tx *DB) {
	tx = db.getInstance()

	switch v := value.(type) {
	case clause.OrderBy:
		tx.Statement.AddClause(v)
	case clause.OrderByColumn:
		tx.Statement.AddClause(clause.OrderBy{
			Columns: []clause.OrderByColumn{v},
		})
	case string:
		if v != "" {
			tx.Statement.AddClause(clause.OrderBy{
				Columns: []clause.OrderByColumn{{
					Column: clause.Column{Name: v, Raw: true},
				}},
			})
		}
	}
	return
}

```

类型1：clause.OrderBy（完整排序对象）

```go
  case clause.OrderBy:
      tx.Statement.AddClause(v)

```

- 直接添加完整的 OrderBy clause

- *使用场景：**当你已经构建好完整的排序对象时

- 示例：`db.Order(clause.OrderBy{Columns: []clause.OrderByColumn{{Column: clause.Column{Name: "name"}}}})`

类型2：clause.OrderByColumn（单个排序列）

```go
 case clause.OrderByColumn:
     tx.Statement.AddClause(clause.OrderBy{
         Columns: []clause.OrderByColumn{v},
     })

```

- 将单个排序列包装成 OrderBy clause

- *使用场景：**当你有预构建的排序列对象时

- 示例：`db.Order(clause.OrderByColumn{Column: clause.Column{Name: "name"}})`

类型3：string（字符串形式的排序）

```go
  case string:
      if v != "" {
          tx.Statement.AddClause(clause.OrderBy{
              Columns: []clause.OrderByColumn{{
                  Column: clause.Column{Name: v, Raw: true},
              }},
          })
      }

```

- 处理常见的字符串排序参数

- *使用场景：**最常用的方式，如 db.Order("name DESC")

- 注意：Raw: true 表示列名是原始 SQL，不需要转义

## 操作数据库的方法

调用`Find()`、`Create()`、`Update()`、`Delete()`等终端方法时，生成sql操作
eg Find()

### Find()

```go
func (db *DB) Find(dest interface{}, conds ...interface{}) (tx *DB) {
	tx = db.getInstance()
	if len(conds) > 0 {
		if exprs := tx.Statement.BuildCondition(conds[0], conds[1:]...); len(exprs) > 0 {
			tx.Statement.AddClause(clause.Where{Exprs: exprs})
		}
	}
	tx.Statement.Dest = dest
	return tx.callbacks.Query().Execute(tx)
}

```

最后执行Query(), Execute()

```go
func (cs *callbacks) Query() *processor {
	return cs.processors["query"]
}

```

```go
func (p *processor) Execute(db *DB) *DB {
	...
	// parse model values
	if stmt.Model != nil {
		if err := stmt.Parse(stmt.Model); err != nil && (!errors.Is(err, schema.ErrUnsupportedDataType) || (stmt.Table == "" && stmt.TableExpr == nil && stmt.SQL.Len() == 0)) {
			if errors.Is(err, schema.ErrUnsupportedDataType) && stmt.Table == "" && stmt.TableExpr == nil {
				db.AddError(fmt.Errorf("%w: Table not set, please set it like: db.Model(&user) or db.Table(\\"users\\")", err))
			} else {
				db.AddError(err)
			}
		}
	}
	...
	for _, f := range p.fns {
		f(db)
	}
	...
}

```

### 核心：sql语句解析

这是 **GORM Schema 解析函数**,负责将 Go 结构体解析成 GORM 可以操作的数据库模型元数据。这是 ORM 映射的核心,将一个 Go 结构体解析成包含以下信息的 Schema 对象:

- 表名

- 字段映射(Go字段 ↔ 数据库列)

- 主键信息

- 关联关系

- 回调钩子

- 默认值处理

### 处理流程

### 1. 类型检查与提取 (行 2-26)

```go
// 支持多种输入形式:
// - &User{}
// - []*User{}
// - []User
// - User{}

```

递归剥离指针、切片、数组,最终获取结构体类型。

### 2. 缓存机制 (行 28-41)

```go
schemaCacheKey := modelType  // 普通缓存键
// 或
schemaCacheKey = fmt.Sprintf("%p-%s", modelType, specialTableName)  // 自定义表名

```

使用 `sync.Map` 缓存已解析的 Schema,避免重复解析。`initialized` channel 确保并发安全。

### 3. 表名解析 (行 43-53)

优先级顺序:

```go
1. specialTableName (参数传入)
2. embeddedNamer (嵌套命名器)
3. Tabler 接口 (自定义 TableName() 方法)
4. TablerWithNamer 接口
5. namer.TableName() (默认命名规则,如驼峰转蛇形)

```

### 4. 字段解析 (行 68-78)

```go
for i := 0; i < modelType.NumField(); i++ {
    // 只处理导出字段 (首字母大写)
    if ast.IsExported(fieldStruct.Name) {
        field := schema.ParseField(fieldStruct)
        // 处理嵌入结构体
        if field.EmbeddedSchema != nil {
            schema.Fields = append(schema.Fields, field.EmbeddedSchema.Fields...)
        }
    }
}

```

### 5. 字段映射建立 (行 80-117)

建立三种映射关系:

- **FieldsByDBName**: `user_name` → Field

- **FieldsByName**: `UserName` → Field

- **FieldsByBindName**: 完整路径 `Profile.UserName` → Field

优先级规则:

```go
// 优先选择路径最短且有权限的字段
if len(field.BindNames) < len(existingField.BindNames) {
    schema.FieldsByDBName[field.DBName] = field
}

```

### 6. 主键识别 (行 119-145)

优先级:

1. 显式标记 `PrimaryKey` 的字段

1. 名为 `id` 或 `ID` 的字段自动成为主键

1. 多主键时,优先选择 `AUTOINCREMENT` 字段

### 7. 默认值与子句处理 (行 150-173)

检测字段是否实现特殊接口,自动注入 SQL 子句:

```go
// 示例: soft_delete.DeletedAt 实现 DeleteClausesInterface
// 自动添加 WHERE deleted_at IS NULL
if fc, ok := fieldValue.(DeleteClausesInterface); ok {
    field.Schema.DeleteClauses = append(...)
}

```

### 8. 回调钩子检测 (行 192-208)

检查模型是否实现钩子方法:

```go
// BeforeCreate(*gorm.DB) error
// AfterCreate(*gorm.DB) error
// BeforeUpdate(*gorm.DB) error
// ...

```

### 9. 关联关系解析 (行 210-214)

处理 `HasOne`, `HasMany`, `BelongsTo`, `ManyToMany` 等关联。

```go
type User struct {
    ID        uint      `gorm:"primaryKey"`
    Name      string    `gorm:"column:user_name"`
    Email     string    `gorm:"uniqueIndex"`
    Profile   Profile   `gorm:"embedded;embeddedPrefix:profile_"`
    CreatedAt time.Time
    DeletedAt gorm.DeletedAt `gorm:"index"`
}

// 解析后得到:
// - Table: "users"
// - PrimaryKey: ID
// - DBNames: ["id", "user_name", "email", "profile_xxx", "created_at", "deleted_at"]
// - DeleteClauses: 自动添加软删除过滤

```

### 为什么需要这个函数?

ORM 的本质是**对象-关系映射**,这个函数完成了:

- 反射解析结构体

- 命名转换 (驼峰 → 蛇形)

- 标签解析 (`gorm:"xxx"`)

- 关联关系推断

- 特性注入 (软删除、钩子等)

这样开发者只需定义结构体,GORM 就能自动生成正确的 SQL 语句。

### 回调

其中fns来自

```go
func (p *processor) compile() (err error) {
	var callbacks []*callback
	removedMap := map[string]bool{}
	for _, callback := range p.callbacks {
		if callback.match == nil || callback.match(p.db) {
			callbacks = append(callbacks, callback)
		}
		if callback.remove {
			removedMap[callback.name] = true
		}
	}

	if len(removedMap) > 0 {
		callbacks = removeCallbacks(callbacks, removedMap)
	}
	p.callbacks = callbacks

	if p.fns, err = sortCallbacks(p.callbacks); err != nil {
		p.db.Logger.Error(context.Background(), "Got error when compile callbacks, got %v", err)
	}
	return
}

```

removeMap记录过滤的回调函数

- 匹配检查：如果回调没有匹配条件 (callback.match == nil) 或匹配条件返回
true，则保留该回调

- 删除标记：如果回调被标记为删除 (callback.remove == true)，则在
removedMap 中记录其名称
过滤后的回调函数要sort

```go
func sortCallbacks(cs []*callback) (fns []func(*DB), err error) {

```

```go
sorted = append(sorted[:sortedIdx], append([]string{c.name}, sorted[sortedIdx:]...)...)

```

### 回调函数sliceStable流程：

这个函数的作用是**对回调函数进行拓扑排序**,根据回调之间的依赖关系(before/after约束)确定执行顺序。这是 GORM 框架中用于管理数据库操作钩子的核心逻辑。

### 1. 预排序阶段

```go
sort.SliceStable(cs, func(i, j int) bool {
    if cs[j].before == "*" && cs[i].before != "*" {
        return true
    }
    if cs[j].after == "*" && cs[i].after != "*" {
        return true
    }
    return false
})

```

将带有通配符(`*`)约束的回调优先处理:

- `before = "*"` 的回调应该在最前面

- `after = "*"` 的回调应该在最后面

### 2. 重复检查

遍历所有回调,如果发现同名回调且未标记为替换或删除,则记录警告。

### 3. 拓扑排序逻辑(递归函数 `sortCallback`)

对每个回调处理其 `before` 和 `after` 约束:

**处理 before 约束:**

- `before = "*"`: 插入到 sorted 数组最前面

- `before` 已排序: 将当前回调插入到 before 回调之前

- `before` 未排序但存在: 设置 before 回调的 `after` 为当前回调名

**处理 after 约束:**

- `after = "*"`: 追加到 sorted 数组最后

- `after` 已排序: 将当前回调追加到数组末尾

- `after` 未排序但存在: 设置 after 回调的 `before` 为当前回调,递归排序 after 和当前回调

**冲突检测:** 如果回调的相对位置与约束冲突(例如 A before B 但 A 在 B 后面),返回错误。

### 4. 构建最终函数列表

按排序后的名称顺序,提取未标记删除的回调函数。

### 示例场景

假设有三个回调:

- A: `after = "B"`

- B: 无约束

- C: `before = "B"`

排序结果: `C → B → A`

这个函数确保了数据库操作的钩子能够按照开发者定义的依赖关系正确执行,是一个典型的**依赖解析问题**的实现。

---

*本文由 Notion 笔记整理发布。*
