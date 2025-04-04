---
title: "打造专属你的nvim配置指西"
description: "打造专属你的nvim配置指西"
summary: ""
date: 2025-04-04T20:37:39+08:00
lastmod: 2025-04-04T20:37:39+08:00
draft: false
weight: 810
categories: []
tags: []
contributors: []
pinned: false
homepage: false
seo:
  title: "" # custom title (optional)
  description: "" # custom description (recommended)
  canonical: "" # custom canonical URL (optional)
  noindex: false # false (default) or true
---
## 前前言

在配置完lazyvim，更新后报错，加上lazyvim的各种配置不是很对我胃口于是转向自己配置一个nvim，在lazy.nvim进行插件管理后发现配置一个nvim比你想象的简单，同时也可一个个人定制化的代码工具。

## Why nivm?

一开始见到vim的时候觉得各种操作，什么hjkl控制移动，什么normal、insert、visual模式，只觉得麻烦和反人类。但是因为课程原因，强调命令行使用和操作的时候频繁的键盘鼠标切换让我难以专注，但是nvim的使用却更加舒服，而在不熟练时对于小项目的开发也非常舒服，而nvim在代码编辑这一操作上确实方便很多，转回各种文本编辑环境的时候还有些不适应。

当然各种ide也有相应的快捷键，但是当面对无数个`ctrl+who`时

>  你的名字是？

这时候就会佩服vim切换模式编辑这一设计的高明之处——提供统一连续的操作逻辑，编辑时就编辑，操作时就操作，选择时就选择，明确同时减少中断，而相应的体验会在使用的越熟练时更加舒服。
## Start from installration

访问neovim官网下载nvim[https://neovim.io/](https://neovim.io/)

也可以在仓库release界面下载https://github.com/neovim/neovim/releases

有了nvim还不够，nvim具有强大丰富的社区和插件，这就有各种不同的插件管理方案，我选择了lazy.nvim，和lazyvim不同，lazy.nvim不是一个nvim的发行版，不是一个开包即用的nvim，而是一个新兴的插件管理器，官网下载https://lazy.folke.io/installation

**Requirements[](https://lazy.folke.io/#️-requirements)**

- Neovim >= **0.8.0** (needs to be built with **LuaJIT**)
- Git >= **2.19.0** (for partial clones support)

这时候可以开始配置了！

你也可以参考youtube上的教学视频，十分详细，对配置过程十分详细，也有对使用的说明，非常值得参考！https://youtu.be/6pAG3BHurdM

## How to config nvim?

要知道如何配置，首先要知道配置逻辑，是点击安装按钮安装，还是在对应配置文件下添加代码，还是在文件夹中粘贴配置文件，安装nvim后，配置文件夹可能没有自动创建，下面让我们来手动操作：

**For Linux/Macos**

新建`.config/nvim`文件

**For windows**

新建`$env:LOCALAPPDATA\nvim`也就是`C:\Users\Yourself\AppData\Local\nvim`

之后的操作对于不同系统都是一样的，这同样意味着你配置一次后可以非常方便的在其他系统使用同样的配置文件（可能有的地方需要修改）

在这个文件夹下构建下面的结构
```cmd
|   init.lua
+---lua //核心配置文件夹
    +---config  //除插件外的配置文件
    |       colorscheme.lua  //主题配置
    |       keymaps.lua      //键位设置
    |       lazy.lua         //lazy.nvim管理插件
    |       options.lua      //全局配置
    |
    \---plugins  //插件配置文件
        |
        \---lsp  //lsp配置(先不用管)
```

像上面创建文件及文件夹后我们进入下一步配置

## Overall Configration in config

在配置插件文件之前，我们先了解config中的各个配置文件并进行配置，而你已经发现我们配置nvim使用的是`lua`语言，放心即使不会lua也可以实现完整的配置，因为lua是和python一样易读方便，而且也基本不需要确切的语法知识。

你可以阅读来[learn Lua in Y minutes](https://learnxinyminutes.com/lua/)先了解lua语言

### init.lua

init.lua可以差不多视作neovim配置的中枢，在其他配置文件的内容都在init.lua中整合，使用如下语法

```lua init.lua
require("config.options")
require("config.keymaps")
require("config.lazy")
```

在option.lua,keymaps.lua,lazy.lua中的配置只有在init.lua整合后才会发挥作用

而繁多插件因为我们使用了lazy.nvim管理插件，其配置都在lazy.lua中进行配置

### options.lua

这个文件中放置nvim的各种配置

``` lua options.lua
local opt = vim.opt

-- Hint: use `:h <option>` to figure out the meaning if needed
opt.clipboard = "unnamedplus" -- use system clipboard
opt.completeopt = { "menu", "menuone", "noselect" }
opt.mouse = "a" -- allow the mouse to be used in Nvim

-- Tab
opt.autoindent = true
opt.tabstop = 4 -- number of visual spaces per TAB
opt.softtabstop = 4 -- number of spacesin tab when editing
opt.shiftwidth = 4 -- insert 4 spaces on a tab
opt.expandtab = true -- tabs are spaces, mainly because of python

-- UI config
opt.number = true -- show absolute number
opt.relativenumber = true -- add numbers to each line on the left side
opt.cursorline = true -- highlight cursor line underneath the cursor horizontally
opt.splitbelow = true -- open new vertical split bottom
opt.splitright = true -- open new horizontal splits right
opt.termguicolors = true -- enabl 24-bit RGB color in the TUI
opt.showmode = false -- we are experienced, wo don't need the "-- INSERT --" mode hint
opt.signcolumn = "yes" -- always show sign column
-- Searching
opt.incsearch = true -- search as characters are entered
opt.hlsearch = false -- do not highlight matches
opt.ignorecase = true -- ignore case in searches by default
opt.smartcase = true -- but make it case sensitive if an uppercase is entered
```


这些配置是相对总体的配置，比如对Tab对窗口的配置等，对UI的配置，因为很多内容都在插件中有直接的配置，所以这里的配置需求不是很多

### keymap.lua

通过调整默认快捷键来得到更加舒服的编程体验

```lua keymap.lua
-- define common options
local opts = {
	noremap = true, -- non-recursive
	silent = true, -- do not show message
}
vim.g.mapleader = " " -- set leader to space
local keymap = vim.keymap

-----------------
-- Insert mode --
-----------------

keymap.set("i", "jk", "<Esc>", opts) -- jk to escape

-----------------
-- Normal mode --
-----------------
-- switch $ to 9

keymap.set("n", "9", "$", opts)


-- Hint: see `:h vim.map.set()`
-- Better window navigation
keymap.set("n", "<C-h>", "<C-w>h", opts)
keymap.set("n", "<C-j>", "<C-w>j", opts)
keymap.set("n", "<C-k>", "<C-w>k", opts)
keymap.set("n", "<C-l>", "<C-w>l", opts)
keymap.set("n", "<leader>sv", "<C-w>v", opts) -- split window vertically
keymap.set("n", "<leader>sh", "<C-w>s", opts) -- split window horizontally
-- Better buffer navigation
keymap.set("n", "<leader>bn", ":BufferLineCycleNext<CR>", opts) -- next buffer
keymap.set("n", "<leader>bp", ":BufferLineCyclePrev<CR>", opts) -- previous buffer
keymap.set("n", "<leader>bd", ":BufferLineCloseLeft<CR>", opts) -- close buffer

--取消高亮
keymap.set("n", "<leader>nh", ":nohl<CR>", opts)
-- Resize with arrows
-- delta: 2 lines
keymap.set("n", "<C-Up>", ":resize -2<CR>", opts)
keymap.set("n", "<C-Down>", ":resize +2<CR>", opts)
keymap.set("n", "<C-Left>", ":vertical resize -2<CR>", opts)
keymap.set("n", "<C-Right>", ":vertical resize +2<CR>", opts)
keymap.set("n", "<leader>wd", "<cmd>close<CR>", { desc = "Close current split" }) -- close current split window
-------------------
--plugin's keymap--
-------------------

-- Treesitter context
vim.keymap.set("n", "[c", function()
	require("treesitter-context").go_to_context(vim.v.count1)
end, opts) --- go to previous context

-----------------
-- Visual mode --
-----------------

-- Hint: start visual mode with the same area as the previous area and the same mode
keymap.set("v", "<", "<gv", opts)
keymap.set("v", ">", ">gv", opts)
keymap.set("v", "J", ":m '>+1<CR>gv=gv", opts)
keymap.set("v", "K", ":m '<-2<CR>gv=gv", opts)

-----------------
---Visual Blok --
-----------------

keymap.set("x", "I", "I", opts) -- 确保 Shift + I 正常工作
```

其中`keymap.set("i", "jk", "<Esc>", opts) -- jk to escape`比较推荐，毕竟频繁使用遥远的`esc`对小指很不友好，而两种模式的切换是十分频繁，所以使用`jk`双键来替代`esc`。

其中plugin的配置可以等对应插件配置完成后再进行配置

其他的配置可以自己尝试不做赘述。

其中主要修改`spec`和`colorscheme`的内容，其中

```lua
-- Bootstrap lazy.nvim
--https://youtu.be/6pAG3BHurdM
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
	local lazyrepo = "https://github.com/folke/lazy.nvim.git"
	local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
	if vim.v.shell_error ~= 0 then
		vim.api.nvim_echo({
			{ "Failed to clone lazy.nvim:\n", "ErrorMsg" },
			{ out, "WarningMsg" },
			{ "\nPress any key to exit..." },
		}, true, {})
		vim.fn.getchar()
		os.exit(1)
	end
end
vim.opt.rtp:prepend(lazypath)

-- Make sure to setup `mapleader` and `maplocalleader` before
-- loading lazy.nvim so that mappings are correct.
-- This is also a good place to setup other settings (vim.opt)
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"

-- 设置for Neovide
if vim.g.neovide then
	-- 字体
	vim.o.guifont = "FiraCode Nerd Font Mono:h11"

	-- 透明
	-- vim.g.neovide_opacity = 0.9
	-- vim.g.neovide_normal_opacity = 0.9
	-- 窗口颜色
	vim.g.neovide_title_background_color = "#282828"
	-- string.format("%x", vim.api.nvim_get_hl(0, { id = vim.api.nvim_get_hl_id_by_name("Normal") }).bg)
	vim.g.neovide_title_text_color = "#ebdbb2"
	-- 无空闲
	vim.g.neovide_no_idle = true
	-- 记住窗口大小
	vim.g.neovide_remember_window_size = true

	vim.g.neovide_cursor_vfx_mode = "wireframe"
end

-- Setup lazy.nvim
require("lazy").setup({
	spec = {
		-- import your plugins
		{ import = "plugins" },
		{ import = "config.colorscheme" },
		{ import = "plugins.lsp" },
		--{import = "plugins.nvim-treesitter"},
		--{import = "plugins.nvim-treesitter-context"},
		--{import = "plugins.lsp.mason"},
		--{import = "plugins.lsp.lspconfig"},
		--{import = "plugins.telescope"},
		--{import = "plugins.nvim-cmp"},
	},
	opt = { colorscheme = "gruvbox" },
	-- Configure any other settings here. See the documentation for more details.
	-- colorscheme that will be used when installing plugins.
	install = { colorscheme = { "gruvbox" } },
	-- automatically check for plugin updates
	checker = { enabled = true },
})

```
其中主要修改`spec`和`colorscheme`的内容

```lua
spec = {
    -- import your plugins
    { import = "plugins" },
    { import = "config.colorscheme"},
    { import = "plugins.lsp"}
  },
```
就是指明配置的插件的位置，即是插件配置文件的放置处，`colorscheme`是主题的指明，而插件的安装只需要再plugins中放置插件配置再启动nvim就会自动安装

### 主题配置

```lua colorscheme.lua
return {
    {
        "nyoom-engineering/oxocarbon.nvim",
        -- Add in any other configuration;
        --   event = foo,
        --   config = bar
        --   end,
        config = function()
            vim.cmd.colorscheme("oxocarbon")
            -- 透明背景
            --vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
            --vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none" })
            --vim.api.nvim_set_hl(0, "NormalNC", { bg = "none" })
        end
    },
}
```


这就是lazy.nvim配置文件的配置框架

```lua
return {
    "插件的仓库名",
    --下面可以没有
    config = function()
        ... --配置设置
    end
}
```

你可以在colorscheme.lua中添加其他的其他的主题配置

而添加其他插件可以访问对应插件的仓库，下面一般会有配置的说明，如果没有直接写出`lazy.nvim`插件的配置，但是都可以直接转换成上面格式直接使用。

### 插件列表


### lsp配置

lsp定义是“The Language Server Protocol (LSP) defines the protocol used between an editor or IDE and a language server that provides language features like auto complete, go to definition, find all references etc.（语言服务器协议（LSP）定义了编辑器或IDE与语言服务器之间使用的协议，该协议提供了自动完成，转到定义，查找所有引用等语言功能。）”

其实就是为vim提供“自动完成，转到定义，查找所有引用等语言功能”，就是像vscode配置各种语言相同的功能，我们使用Mason来lsp管理

1. mason.lua配置
2. lspconfig.lua配置

两个配置都要有

```lua
return {
	"williamboman/mason.nvim",

	dependencies = {
		"williamboman/mason-lspconfig.nvim",
		"WhoIsSethDaniel/mason-tool-installer.nvim",
	},
	config = function()
		-- import mason
		local mason = require("mason")

		-- import mason-lspconfig
		local mason_lspconfig = require("mason-lspconfig")

		local mason_tool_installer = require("mason-tool-installer")

		-- enable mason and configure icons
		mason.setup({
			ui = {
				icons = {
					package_installed = "✓",
					package_pending = "➜",
					package_uninstalled = "✗",
				},
			},
		})
		mason_lspconfig.setup({
			ensure_installed = {
				"ruff",
				"rust_analyzer",
				"clangd",
				"lua_ls",
			},
		})
		mason_tool_installer.setup({
			ensure_installed = {
				"stylua",
				"prettier",
				"isort",
				"flake8",
				"black",
				"clang-format",
				"cpplint",
			},
		})
	end,
}
```

下面lspconfig配置

```lua
return {
	"neovim/nvim-lspconfig",
	event = { "BufReadPre", "BufNewFile" },
	dependencies = {
		"hrsh7th/cmp-nvim-lsp",
		{ "antosha417/nvim-lsp-file-operations", config = true },
		{ "folke/neodev.nvim", opts = {} },
	},
	config = function()
		-- import lspconfig plugin
		local lspconfig = require("lspconfig")
		lspconfig.ruff.setup({
			init_options = {
				settings = {
					-- Ruff language server settings go here
					enable = true,
					lint = {
						enabled = true,
						run = "onsave",
						max_line_length = 120,
					},
					format = {
						enabled = true,
						run = "onSave",
					},
					fix = {
						enabled = false,
						run = "onSave",
					},
				},
			},
		})

		-- import mason_lspconfig plugin
		local mason_lspconfig = require("mason-lspconfig")

		-- import cmp-nvim-lsp plugin
		local cmp_nvim_lsp = require("cmp_nvim_lsp")

		local keymap = vim.keymap -- for conciseness

		vim.api.nvim_create_autocmd("LspAttach", {
			group = vim.api.nvim_create_augroup("UserLspConfig", {}),
			callback = function(ev)
				-- Buffer local mappings.
				-- See `:help vim.lsp.*` for documentation on any of the below functions
				local opts = { buffer = ev.buf, silent = true }
				local map = function(keys, func, desc)
					vim.keymap.set("n", keys, func, { buffer = ev.buf, desc = "LSP: " .. desc })
				end

				opts.desc = "See available code actions"
				keymap.set({ "n", "v" }, "<leader>ca", vim.lsp.buf.code_action, opts) -- see available code actions, in visual mode will apply to selection

				opts.desc = "Smart rename"
				keymap.set("n", "<leader>rn", vim.lsp.buf.rename, opts) -- smart rename

				opts.desc = "Show line diagnostics"
				keymap.set("n", "<leader>d", vim.diagnostic.open_float, opts) -- show diagnostics for line

				opts.desc = "Go to previous diagnostic"
				keymap.set("n", "[d", vim.diagnostic.goto_prev, opts) -- jump to previous diagnostic in buffer

				opts.desc = "Go to next diagnostic"
				keymap.set("n", "]d", vim.diagnostic.goto_next, opts) -- jump to next diagnostic in buffer

				opts.desc = "Show documentation for what is under cursor"
				keymap.set("n", "K", vim.lsp.buf.hover, opts) -- show documentation for what is under cursor

				opts.desc = "Restart LSP"
				keymap.set("n", "<leader>rs", ":LspRestart<CR>", opts) -- mapping to restart lsp if necessary
			end,
		})
		-- used to enable autocompletion (assign to every lsp server config)
		local capabilities = cmp_nvim_lsp.default_capabilities()
		-- -- 设置各种服务器的配置

		mason_lspconfig.setup_handlers({
			-- default handler for installed servers
			function(server_name)
				lspconfig[server_name].setup({
					capabilities = capabilities,
				})
			end,
			["lua_ls"] = function()
				-- configure lua server (with special settings)
				lspconfig["lua_ls"].setup({
					capabilities = capabilities,
					settings = {
						Lua = {
							-- make the language server recognize "vim" global
							diagnostics = {
								globals = { "vim" },
							},
							completion = {
								callSnippet = "Replace",
							},
						},
					},
				})
			end,
		})
	end,
}
```
`ensure_installed`中的是安装的语言配置，重新打开nvim安装完成后`:Mason`会出现下面界面，可以直接在下面配置语言，安装语言，DAP是debug支持，Linter是错误显示，Formatter是格式化代码，移动到对应语言下`I`安装，`X`卸载，非常方便，但是rust似乎没有很好的支持，参考前面我的rust配置可以配置

### 使用TODO
