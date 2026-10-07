---
title: "std::shared_ptr 引用计数实验"
date: 2026-01-05T12:00:00+08:00
draft: false
summary: "用一段实验代码数清楚 shared_ptr 的引用计数：拷贝、reset、weak_ptr 分别让 use_count 怎么变。"
categories: ["技术"]
tags: ['C++', '智能指针', 'shared_ptr']
slug: "cpp-shared-ptr"
---

```c++
int main(int argc, char **argv) {
    // 1. 创建资源，此时计数 = 1 (shared)
    auto shared = std::make_shared<int>(10);
    // 2. 数组里存了 3 个拷贝，总计数 = 1 (shared) + 3 (ptrs) = 4
    std::shared_ptr<int> ptrs[]{shared, shared, shared};

    std::weak_ptr<int> observer = shared;
    // weak_ptr 不增加计数，所以还是 4
    ASSERT(observer.use_count() == 4, "");

    // 3. ptrs[0] 重置，计数减 1
    ptrs[0].reset();
    ASSERT(observer.use_count() == 3, "");

    // 4. ptrs[1] 设为 nullptr，等同于重置，计数减 1
    ptrs[1] = nullptr;
    ASSERT(observer.use_count() == 2, "");

    // 5. ptrs[2] 指向了一个【新】的 shared_ptr (通过解引用拷贝了值)
    // 注意：std::make_shared<int>(*shared) 创建了一个全新的资源
    // 旧资源的计数减 1 (ptrs[2] 不再指向它)
    ptrs[2] = std::make_shared<int>(*shared);
    ASSERT(observer.use_count() == 1, ""); // 只剩最初的 shared 变量指向它

    // 6. 重新建立联系
    ptrs[0] = shared;           // 计数 = 2
    ptrs[1] = shared;           // 计数 = 3
    ptrs[2] = std::move(shared); // shared 的所有权转给 ptrs[2]，shared 变空，总数还是 3
    ASSERT(observer.use_count() == 3, "");
    
    /*
    现在持有count的是
    ptrs[0],ptrs[1],ptrs[2],shared(已经被转移)
    */

    // 7. 复杂的移动操作
    std::ignore = std::move(ptrs[0]); // ptrs[0] 移动到 ignore 后立即销毁，计数减 1 (剩 2)
    ptrs[1] = std::move(ptrs[1]);      // 自移动，在标准库中通常无操作，计数不变 (剩 2)
    ptrs[1] = std::move(ptrs[2]);      // ptrs[2] 持有 shared 移给 ptrs[1]，ptrs[2] 变空，原有 ptrs[1] 覆盖，计数减 1 加 1
    ASSERT(observer.use_count() == 2, "");

    // 8. lock() 操作
    // observer.lock() 返回一个强引用 shared_ptr，指向原资源，计数加 1
    shared = observer.lock();
    ASSERT(observer.use_count() == 3, "");

    // 9. 全部清空
    shared = nullptr;
    for (auto &ptr : ptrs) ptr = nullptr;
    // 所有强引用都消失了，计数 = 0
    ASSERT(observer.use_count() == 0, "");

    // 10. 资源已销毁，lock() 返回空的 shared_ptr
    shared = observer.lock();
    ASSERT(observer.use_count() == 0, "");

    return 0;
}
```

### 一、 核心架构：双指针结构

当你声明一个 `std::shared_ptr<T>` 时，它在内存中其实占用了**两个指针**的大小：

1. **数据指针**：直接指向堆上的对象 `T`。

1. **控制块指针**：指向一个动态分配的控制块（Control Block）。

> 控制块包含：

---

### 二、 引用计数的变化规则

这是你练习中最高频的考点：

| **操作** | **强引用计数变化** | **备注** |

|---|---|---|

| **拷贝构造/赋值** | `+1` | `ptr2 = ptr1;` 两个指针共同所有。 |

| **移动构造/赋值** | **不变** | `ptr2 = std::move(ptr1);` 只是所有权“接力”，`ptr1` 置空。 |

| **`reset()`**** / 销毁** | `-1` | 显式释放或超出作用域。 |

| **`weak_ptr.lock()`** | `+1` | **成功**提升时计数增加，失败返回 `nullptr`。 |

| **`make_shared`** | 初始为 `1` | 推荐方式，内存分配更高效（对象与控制块在同一块内存）。 |

---

### 三、 移动语义与 `std::move` 的真相

你在练习中困惑的 `std::move` 并不减少计数，它的逻辑如下：

- **转移而非销毁**：`std::move` 将对象从一个容器“平移”到另一个容器。

- **自赋值保护**：`ptr1 = std::move(ptr1)` 在标准库中是安全的，计数不会改变。

- **覆盖逻辑**：`ptr1 = std::move(ptr2)` 时，`ptr1` 会先释放原有的资源（计数-1），然后再接管 `ptr2` 的资源。如果两者指向同一个资源，一减一加，总数不变。

---

### 四、 `std::weak_ptr` 的救赎

`weak_ptr` 是 `shared_ptr` 的观察者，它不控制生命周期。

1. 打破循环引用：

  如果两个对象互相持有对方的 shared_ptr，它们的计数永远不会归零，导致内存泄漏。将其中一方改为 weak_ptr 即可解决。

1. 安全性检查：

  由于它不增加计数，对象可能随时被销毁。使用前必须调用 .lock() 检查对象是否依然存活。

---

### 五、 十大易错点（避坑指南）

1. sizeof(shared_ptr) 是固定的：

  在 64 位系统上通常是 16 字节（两个指针），与它指向的对象大小、数量无关。

1. **不要用同一个原生指针初始化多个 ****`shared_ptr`**：

  ```c++
  int* raw = new int(10);
  std::shared_ptr<int> p1(raw);
  std::shared_ptr<int> p2(raw); // 灾难！p1 和 p2 会分别创建两个控制块，导致两次 delete。
  ```

1. std::ignore = std::move(ptr)：

  这会导致 ptr 失去所有权并立即触发计数减 1，是主动释放资源的一种“黑话”。

1. unique_ptr 不能拷贝，只能移动：

  它是独占所有权，如果你尝试 ptr2 = ptr1 会导致编译失败。

1. make_shared 的局限：

  虽然高效，但如果 weak_ptr 一直存在，即使强引用归零，整块内存（包括对象占用的部分）也不会释放，直到弱引用也归零。

1. 多线程安全：

  引用计数的操作是原子的（线程安全），但修改指针指向或访问对象内容本身并不是线程安全的，需要额外加锁。

1. 不要在函数参数中创建 shared_ptr：

  在 C++17 之前，f(std::shared_ptr<int>(new int(10)), g()) 如果 g() 抛出异常，可能导致内存泄漏。请永远使用 std::make_shared。

1. this 指针的坑：

  如果想在类成员函数中返回 shared_ptr<this>，请继承 std::enable_shared_from_this<T> 并使用 shared_from_this()，否则会创建重复的控制块。

1. 下标运算符 []：

  C++17 之后 shared_ptr 才支持 shared_ptr<int[]>，早期版本需要自定义删除器。

1. 解引用与拷贝：

  ptr2 = std::make_shared<int>(*ptr1) 是值拷贝，创建了新资源；ptr2 = ptr1 是指针拷贝，共享资源。

---

---

*本文由 Notion 笔记整理发布。*
