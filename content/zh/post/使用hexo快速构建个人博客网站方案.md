+++
author = ["whale"]
title= "使用hexo快速构建个人博客网站方案"
slug= "使用hexo快速构建个人博客网站方案"
description = "使快速构建一个简单基本免费的blog书写方案，使用github page + hexo+ cloudflare + obsidian"
date = '2025-03-13T19:34:07+08:00'
type = "post"
draft = false
translationKey = ""
tags = ["web build","tools","easy"]
categories = ["tools build"]
image = "https://cdn.jsdelivr.net/gh/whale4rain/picx-images-hosting@master/20250313/image.7snd6xto8o.png"
+++

>> Note!!
> 可能有缺失的图片，此blog为旧版，现在转为使用hugo
> 参考更新的blog:[]()
## 前言
计算机的芝士零散，有些内容容易忘记，而各种笔记方案皆不尽人意，而构建一个blog网站可以满足各种个性化需求同时满足有时的写作欲望，一个blog网站也足够私人可以更适应书写。所以打算构建一个简单的博客网站来承载这些需求。
而构建一个blog网站的方法多样，应为现有知识和代码能力还有精力尚不足以满足完全搓一个完整的网站，而写作需求又十分紧急，所以组合一下现有的足够简单和舒适的方案来满足需求。

##效果展示

![image](https://cdn.jsdelivr.net/gh/whale4rain/picx-images-hosting@master/20250313/image.7snd6xto8o.png)

![image](https://cdn.jsdelivr.net/gh/whale4rain/picx-images-hosting@master/20250313/image.4n7v7zzijm.webp)


## GitHub page部署网站
部署blog网站，GitHub page 想必是比较简单和省钱的方案之一，
- 新建仓库，注意要求以`username.github.io`为名
- 访问`username.github.io`观察是否完成
## hexo构建网站
[Hexo](https://hexo.io/zh-cn/docs/) 是一个快速、简洁且高效的博客框架。
前置要求：[Node.js](https://nodejs.org/zh-cn) , [git](https://git-scm.com/)
进入网页直接下载即可
hexo下载
`npm install -g hexo-cli`
新建网站文件，这个文件就是网站的主体
```shell
hexo init <floder>
cd <floder>
npm install
```
会得到文件夹结构如下：
```
.  
├── _config.yml  配置文件
├── package.json  下载的应用程序配置文件
├── scaffolds  模板文件（在obsidian配置中有用）
├── source 主要改动文件，写blog类的都在这里
|   ├── _drafts  草稿
|   └── _posts  推文（？），网站上显示的文章内容
└── themes 存放hexo的theme相关文件
```
### 重要的命令
- 新建网站`hexo init [floder]`
- 新建文章`hexo new [layout] <title>`

| layout | 路径            | 简单说明      |
| ------ | ------------- | --------- |
| post   | source/_posts | 网站上访问的推文  |
| page   | source        | 导航栏上的各种标签 |
| draft  | source/_dragt | 草稿        |

- 生成总体文件（编辑blog需经过这一步）`hexo generate`,常用`hexo g -d`直接部署
- 发布草稿`hexo publish [layout] <filename>`
- 本地测试网站效果`hexo server`,然后访问[http://localhost:4000/](http://localhost:4000/)在浏览器观察效果
- 清除缓存文件，清理文件`hexo clean`可以很快清理网站文件夹
### 当你想要写一篇博客时主要步骤如下：
```shell
hexo i my_blog
heox n post 一篇博客
写blog
(测试:hexo server)
hexo g -d
```
*使用hexo-server前*
`npm install hexo-server --save`
### 部署网站
首先下载插件
`npm install hexo-deployer-git --save`
然后对_config.yml进行编辑（`ctrl+f`查询`deloy`）
示例：
```yml
deploy:  
  type: git  
  repo: <repository url> #https://github.com/yourname/yourname.github.io  
  branch: main  
  token: 
```
**token来源：**
访问[https://github.com/settings/tokens](https://github.com/settings/tokens)

![[Pasted image 20250214235739.png]]
右下角`Generate new token(classic)`
得到token后**复制**得到一长串复制进上面
完成后就可以通过`hexo g -d`一键完成网站部署
### theme选择
hexo的主题多样，可以在[[themes]]上寻找喜欢的主题
这里以NexT示例:
![](https://hexo.io/themes/screenshots/NexT@2x.jpg)

安装:
```shell
cd my_blog
npm install hexo-theme-next
```
NexT的主题有四个风格选项
- muse
- mist
- pisces
- gemini
可以在_config.yml中修改`theme: next`来修改主题风格
如此你就得到了一个美观的博客网站
# 自定义域名代理设置
国内访问github page往往速度慢甚至无法访问，而访问`username.github.io`似乎比较复杂，如果想要一个酷炫的网站名，可以跟着下面步骤来：
##  购买域名
可以在各种卖域名网站进行购买，这里不做推荐，一个域名往往价格不是很高，大可以选一个便宜有意思的来作为网站域名。
### 在阿里云购买
进入阿里云网站登录，大家都有支付宝什么的十分方便，左上角菜单进入**域名**界面，
![[Pasted image 20250215001947.png]]
推荐可以怪一点，价格更加低廉
注册后需要实名认证的步骤不做赘叙，这里可能需要等待一段时间
##  Cloudfare 代理设置
Cloudfare胜在免费(追重要的一点)，在国内不挂梯子可以以相对较好的速度访问网站
1. 注册
2. 新建域，使用你购买的域名
3. 左侧DNS设置
4. 增加记录
![[Pasted image 20250215002724.png]]
下面四个A类型和CNAME写上，内容如上，IP地址是github.io的地址，域名根据自己的进行修改
把下面的NS
![[Pasted image 20250215003322.png]]
复制到（不同运营商可能不一样）
![[Pasted image 20250215003623.png]]
测试：
```shell
dig yourweb.cn +noall +answer
```
得到ip不是原先设置的ip地址说明代理成功
## github最后设置
在网站仓库最右边的`setting`中的`Pages`中`Custom domain`中
![[Pasted image 20250215004047.png]]
save后一段时间后完成网站部署的全部步骤
## obsidian简化blog书写
书写blog使用markdown语言，markdown是一个十分简单的排版语言
查询[https://markdown.com.cn/](https://markdown.com.cn/)学习语法教程
但是在vscdoe中写markdown有些怪怪的，typora之类的更适合单个markdown的书写，使用obsidian可以很好的实现一个blog网站的长时间持续性的blog书写
1. 下载obsidian
访问[https://obsidian.md/download](https://obsidian.md/download)下载obsidian
2. 使用obsidian打开my_blog文件夹
3. 设置中的忽略文件中除了source之外的都加入忽略文件中防止跑进关系图谱里


![[Pasted image 20250215004955.png]]
4. 修改模板文件夹位置
![[Pasted image 20250215005238.png]]
5. 第三方插件中安装Commander，Shell commands(可选)
相关设置举例：
![[Pasted image 20250215005352.png]]
![[Pasted image 20250215005406.png]]
这样可以简洁地实现在左侧快捷地发布文章和清理文件
6. blog书写
在blog中可以简单地新建文件，左侧栏中地插入模板选项后将文件移入source/\_posts中完成书写
## 结语
上面是十分简单地blog网站与书写方案，还有许多有趣地框架和项目来帮助你书写blog，搭建网站，你也可以从零开始实现一个blog网站。不过，我始终相信书写才是第一位的，即不断地书写才能不断地创造，实现，发展。在ai取代人类的话题中，保持创造的人是无法被取代的。
