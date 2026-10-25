# whale4rain

一个使用 [Hugo](https://gohugo.io/) 构建的技术博客，内容用 Markdown 管理。

主题使用 [PaperMod](https://github.com/adityatelange/hugo-PaperMod)（和 [Lil'Log](https://lilianweng.github.io/) 同款），以 git submodule 的形式放在 `themes/PaperMod`，固定在支持 Hugo 0.145 的版本。克隆仓库时需要带上子模块：

```powershell
git clone --recurse-submodules https://github.com/whale4rain/whale4rain.github.io.git
# 已经克隆过的话：
git submodule update --init
```

- 站点配置（标题、简介、菜单、社交链接、阅读时间、目录等）都在 `hugo.toml`
- 归档 `/archives/`、搜索 `/search/` 分别由 `content/archives.md`、`content/search.md` 生成
- 本仓库只在 `layouts/` 里补充了三处：数学公式（`$...$`、`$$...$$`，构建时用 KaTeX 渲染）、Mermaid 图（```` ```mermaid ```` 代码块）、去掉代码块首尾空行。需要改样式时，新建 `assets/css/extended/custom.css` 即可覆盖主题样式，不要直接改 `themes/PaperMod`

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
