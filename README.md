# Notes from the studio

一个使用 [Hugo](https://gohugo.io/) 构建的轻量静态博客。页面采用独立的编辑式视觉设计，内容用 Markdown 管理，不依赖运行时服务。

页面使用暖白、陶土色和衬线标题，包含最新文章精选、分类入口和响应式文章网格。首页自动将最新文章作为精选展示。文章可在 front matter 添加 `cover: "/images/example.jpg"`（图片放在 `static/images/`）；未设置封面时使用内置的轻量 SVG 线条插画。分类、标签与 RSS 都由 Hugo 静态生成，无需客户端 JavaScript。

## 本地预览

需要 Hugo Extended（当前项目使用 Hugo 0.145+）。

```powershell
hugo server -D
```

浏览器打开命令输出的本地地址；修改内容或样式后页面会自动刷新。

## 构建与检查

```powershell
hugo --minify
powershell -ExecutionPolicy Bypass -File tests/site-smoke.ps1
powershell -ExecutionPolicy Bypass -File tests/cover-smoke.ps1
```

生产构建会生成到 `public/`。GitHub Pages 发布时，将工作流的发布目录指向该目录，并将 `hugo.toml` 的 `baseURL` 保持为站点的正式地址。

## 写文章

在项目根目录执行（将名字替换成你的文章英文短名）：

```powershell
hugo new content posts/my-new-post.md
hugo server -D
```

第一条命令会使用 `archetypes/posts.md` 生成 `content/posts/my-new-post.md`，自动填写日期、slug，并提供分段和代码块骨架。打开生成的文件，修改标题、摘要、分类和正文即可。文章默认 `draft: true`，所以预览草稿时需要 `-D`。

准备发布时，将 `draft` 改成 `false`，确认日期不在未来，然后运行 `hugo --minify` 检查生产构建。生产构建默认不包含草稿；本地修改和 Git 提交本身不会自动把网站发布到线上，仍需执行你的部署流程。

完整示例见 `content/posts/javascript-group-by.md`，包含段落、二级标题、表格、引用和多语言代码块。代码块开头标记 `javascript`、`powershell` 或 `text`，Hugo 会按对应语言处理显示。

也可以直接将 Markdown 文件放进 `content/posts/`。最小的 front matter 如下：

```yaml
---
title: "文章标题"
date: 2026-09-20T09:00:00+08:00
summary: "文章摘要。"
categories: ["分类"]
tags: ["标签"]
---
```

## 自动封面

没有设置 `cover` 时，第一项分类决定背景色和图案系列：

| 分类 | 背景色 | 图案 |
| --- | --- | --- |
| 技术、编程 | 灰蓝 | 路径、节点 |
| 设计、产品 | 淡陶土 | 圆弧、色块 |
| 思考、随笔 | 米杏 | 波纹、曲线 |
| 阅读、笔记 | 鼠尾草绿 | 叠页、细线 |
| 生活、旅行 | 浅沙黄 | 地平线、山形 |

无分类或未知分类默认使用米杏色。分类别名、底色、线条色和强调色统一在 `data/cover_styles.yaml` 调整。

图案使用文章 `slug`（未设置时使用内容文件路径）和可选的 `cover_seed` 计算固定种子，控制构图、位置、大小和线条数量。刷新、重新构建以及首页/归档复用不会改变图案；标题、日期和域名也不参与计算。移动文章文件时，若需要保留封面，请提前设置固定的 slug。

```yaml
categories: ["技术"]
slug: "my-first-project"
cover_seed: "v2"
```

`cover_seed` 是可选的版本字符串，修改它可以换一张同色系封面。设置 `cover: "/images/custom.webp"` 后，自定义图片优先于自动封面。所有 SVG 在 Hugo 构建时生成，不加载客户端随机化脚本。
