# whale4rain

一个使用 [Hugo](https://gohugo.io/) 构建的技术博客，内容用 Markdown 管理。

主题是自己写的极简风格，专为技术文章设计：

- 冷色调（石板灰 + 冰蓝）、单栏、细线条、以文字为主的排版，自动跟随系统的浅色 / 深色模式，右上角可以手动切换
- 文章页：阅读时长、目录（宽屏固定在右侧并高亮当前章节，窄屏折叠在正文上方）、标题锚点、上一篇 / 下一篇
- 代码块：显示语言、一键复制，浅色 / 深色两套语法高亮配色
- 数学公式：`$...$` 和 `$$...$$` 在构建时由 KaTeX 渲染，只有用到公式的页面才加载 KaTeX 样式
- Mermaid：```` ```mermaid ```` 代码块会渲染成图，只有用到的页面才加载脚本
- 搜索：任意页面按 `/` 或 `⌘K`（Windows 用 `Ctrl+K`）弹出搜索框，可搜标题、标签、摘要和正文；也可以直接打开 `/search/?q=关键词`。索引由 Hugo 生成为 `/index.json`，纯前端搜索，不依赖第三方服务
- 归档：`/archives/` 按年、月展示所有文章的时间线；标签页展示所有标签及文章数

站点标题、简介和 GitHub 链接在 `hugo.toml` 的 `title` 与 `[params]` 里修改；首页的自我介绍在 `layouts/index.html`。样式全部在 `assets/css/main.css`，颜色集中定义在文件顶部的 CSS 变量里。

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

在项目根目录执行（将名字替换成你的文章英文短名）：

```powershell
hugo new content posts/my-new-post.md
hugo server -D
```

第一条命令会使用 `archetypes/posts.md` 生成 `content/posts/my-new-post.md`，自动填写日期、slug，并提供分段和代码块骨架。打开生成的文件，修改标题、摘要、分类和正文即可。文章默认 `draft: true`，所以预览草稿时需要 `-D`。

准备发布时，将 `draft` 改成 `false`，确认日期不在未来，然后运行 `hugo --minify` 检查生产构建。生产构建默认不包含草稿；本地修改和 Git 提交本身不会自动把网站发布到线上，仍需执行你的部署流程。

代码块开头标记语言（如 `go`、`c++`、`shell`、`text`），Hugo 会按对应语言高亮。不想显示目录时，在 front matter 加 `toc: false`。

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

### 提交并发布文章

写完一篇或多篇文章后，在项目根目录运行：

```powershell
.\scripts\publish-posts.ps1
```

脚本会依次执行 Hugo 生产构建、暂存 `content/posts/` 的新增/修改/删除、提交并推送到当前分支。默认提交信息是 `docs: publish blog posts`；需要自定义时：

```powershell
.\scripts\publish-posts.ps1 -Message "docs: publish JavaScript notes"
```

如果你明确要提交仓库中的**所有**改动，而不仅是文章，才使用下面的命令；它会执行 `git add .`：

```powershell
.\scripts\publish-posts.ps1 -All -Message "docs: publish blog updates"
```
