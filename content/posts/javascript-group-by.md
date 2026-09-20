---
title: "用 JavaScript 写一个小而可靠的分组函数"
date: 2026-09-21T00:00:00+08:00
draft: false
summary: "从一组文章数据出发，用 Map 实现分组，再用几个断言检查容易忽略的边界情况。"
categories: ["技术"]
tags: ["JavaScript", "数据处理", "测试"]
slug: "javascript-group-by"
---

做博客分类页时，经常需要把一组文章按类型整理。数据最初是一个数组，页面需要的却是“技术文章有哪些，随笔又有哪些”。

这篇文章用一个小函数完成转换，同时演示如何把输入、实现和验证结果放在一起，方便日后回看。

## 一、先明确输入和输出

假设我们有三篇文章，每篇包含标题和分类：

```javascript
const posts = [
  { title: "理解闭包", category: "技术" },
  { title: "周末读书", category: "随笔" },
  { title: "整理开发环境", category: "技术" },
];
```

我们希望同类文章放进同一个数组，并保持它们在原始数据中的顺序。

| 输入情况 | 预期行为 |
| --- | --- |
| 分类相同 | 放入同一个分组 |
| 分类不同 | 建立独立分组 |
| 输入为空数组 | 返回空 Map |
| 分类字段缺失 | 由调用者指定默认分类 |

这里选择 `Map` 保存结果：它能直接使用字符串作为键，也不会把 `__proto__` 这样的名称当作对象原型属性处理。

## 二、实现一个通用的分组函数

让调用者提供一个 `getKey` 函数，决定用什么字段分组。这样分组逻辑就不必知道“文章”具体长什么样。

```javascript
function groupBy(items, getKey) {
  const groups = new Map();

  for (const item of items) {
    const key = getKey(item);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key).push(item);
  }

  return groups;
}
```

这段代码只遍历一次输入。每遇到一项，先计算分组键，再把它放入相应的数组。

函数不会修改输入数组或文章对象，但结果中保存的仍是**原对象的引用**。如果后续修改某篇文章的标题，通过分组结果也能看到这项变化。

> 分组不等于复制。需要隔离对象修改时，应明确决定在哪一步复制数据，而不是把深拷贝悄悄塞进分组函数。

## 三、调用并查看结果

把前面的数据和函数放在同一个文件里，再加上下面这段调用代码：

```javascript
const grouped = groupBy(posts, (post) => post.category ?? "未分类");

for (const [category, articles] of grouped) {
  console.log(category, articles.map((article) => article.title));
}
```

终端会输出：

```text
技术 [ '理解闭包', '整理开发环境' ]
随笔 [ '周末读书' ]
```

这里的 `??` 只会在分类为 `null` 或 `undefined` 时使用“未分类”。空字符串仍然是一个有效键。如果业务中空字符串也代表缺失，需要在 `getKey` 中另行处理。

## 四、用断言检查边界情况

将以下代码接在同一个文件末尾，保存为 `group-by.mjs`。它使用 Node.js 内置的断言模块，无需安装额外依赖。

```javascript
import assert from "node:assert/strict";

assert.deepEqual(
  grouped.get("技术").map((post) => post.title),
  ["理解闭包", "整理开发环境"],
);
assert.equal(groupBy([], (item) => item).size, 0);

const uncategorized = groupBy([{ title: "草稿" }],
  (post) => post.category ?? "未分类");
assert.equal(uncategorized.get("未分类").length, 1);

const specialKey = groupBy(["__proto__"], (item) => item);
assert.deepEqual(specialKey.get("__proto__"), ["__proto__"]);

// 分组后仍然引用原对象。
assert.equal(grouped.get("技术")[0], posts[0]);
console.log("所有断言通过");
```

在文件所在目录运行：

```powershell
node group-by.mjs
```

如果断言通过，最后一行会显示 `所有断言通过`；如果结果不符合预期，Node.js 会抛出错误并指出失败位置。

## 五、这个实现的适用范围

它适合一次处理已经加载到内存里的数据，例如文章列表或少量表格记录。结果需要额外保存每个元素的引用，因此数据越多，额外内存占用也会增加。

当输入来自分页接口时，还需要考虑跨页合并；当分类键是对象时，也要注意 `Map` 根据对象引用区分键，而不是比较对象内容。

一个小函数的价值不只在于代码短。输入规则清楚，结果容易验证，边界行为有说明，才更容易被下一次使用它的人理解。
