+++
author = ["whale"]
title= "Lazyvim配置经验"
slug= "Lazyvim配置经验"
description = "使用lazyvim配置使用nvim经验"
date = '2025-03-13T19:26:36+08:00'
type = "post"
draft = false
translationKey = ""
tags = ["nvim","tools","configuration","lazyvim"]
categories = ["how-to","configuration"]
image = "https://user-images.githubusercontent.com/292349/213447056-92290767-ea16-430c-8727-ce994c93e9cc.png"
+++
# 前言

久闻vim大名，编程过程中手不用离开键盘就可以编程确实十分吸引人，~~似乎更Geek点？~~，不过单纯使用原生vim功能确实很少，这时候就要使用现代点的[nvim](https://neovim.io/),配置确实简单，不过本人还是太懒了，选择使用发行版的nvim，其实有很多，我选择使用lazyvim。

# lazyvim 下载

[lazyvim.org](lazyvim.org)官网下载，官网十分详细，下面时Windows系统的下载方法

## Requirements

- Neovim >= **0.9.0** (needs to be built with **LuaJIT**)

- Git >= **2.19.0** (for partial clones support)

- a [Nerd Font](https://www.nerdfonts.com/)(v3.0 or greater) ***(optional, but needed to display some icons)\***

- [lazygit](https://github.com/jesseduffield/lazygit) ***(optional)\***

- a **C** compiler for `nvim-treesitter`. See [here](https://github.com/nvim-treesitter/nvim-treesitter#requirements)

## 安装

   

- 备份nvim配置

```shell
# required
Move-Item $env:LOCALAPPDATA\nvim $env:LOCALAPPDATA\nvim.bak
  
# optional but recommended
Move-Item $env:LOCALAPPDATA\nvim-data $env:LOCALAPPDATA\nvim-data.bak
```

  

- 克隆项目

```shell
  git clone https://github.com/LazyVim/starter $env:LOCALAPPDATA\nvim
```

 

- 移除`.git`

```shell
  Remove-Item $env:LOCALAPPDATA\nvim\.git -Recurse -Force
```

  

- 开始使用

```shell
  nvim
```

十分详细的教程：

 [LazyVim for Ambitious Developers](https://lazyvim-ambitious-devs.phillips.codes/)

# lazyvim个人配置

## 背景透明

 `lua\plugins`下新建colorscheme.lua文件写入

```lua
return {
  "tokyonight.nvim",
  lazy = true,
  opts = {
    style = "storm",
    transparent = true,
    styles = {
      sidebars = "transparent",
      floats = "transparent",
    },
  },
}
```



