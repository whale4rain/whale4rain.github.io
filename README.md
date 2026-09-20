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
```

生产构建会生成到 `public/`。GitHub Pages 发布时，将工作流的发布目录指向该目录，并将 `hugo.toml` 的 `baseURL` 保持为站点的正式地址。

## 写文章

将 Markdown 文件放进 `content/posts/`。最小的 front matter 如下：

```yaml
---
title: "文章标题"
date: 2026-09-20T09:00:00+08:00
summary: "文章摘要。"
categories: ["分类"]
tags: ["标签"]
---
```
