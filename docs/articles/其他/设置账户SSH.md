---
title: 添加账户SSH （免密码上传）
date: 2018-1-6 10:09:45
tags: ["Hexo"]
---
## SSH
以前没有添加SSH时，每次上传博文都要输入一次账户和密码，异常麻烦，这次我吧博客部署了三个git托管的主流平台（Guthub/Coding/码云）那可是要输三次账户名和密码的，为了方便节省时间就在网上找了找关于ssh教程，
奈何都不是很全面，遇见不少坑，今天自己爬完坑自己记录一下，下次万一用到还可以翻出来看看，
- [参考](https://www.2cto.com/kf/201603/496122.html)
- 配置SHH
配置shh key是让本地git项目与远程的github建立联系
* 检查是否已经有SSH Key，打开Git Bash，输入
``<code class="hljs bash">cd ~/.ssh</code>``
如果没有.ssh这个目录，则生成一个新的SSH，输入
``<code class="hljs lasso">ssh-keygen -t rsa -C "your e-mail"</code>``
注意1: 此处的邮箱地址，你可以输入自己的邮箱地址；注意2: 此处的「-C」的是大写的「C」
* 接下来几步都直接按回车键,然后系统会要你输入密码
``<code class="hljs ruby">Enter passphrase (empty for no passphrase):<输入加密串>``
``Enter same passphrase again:<再次输入加密串></code>``
这个密码会在你提交项目时使用，如果为空的话提交项目时则不用输入。这个设置是防止别人往你的项目里提交内容。
注意：输入密码的时候没有*字样的，你直接输入就可以了。
* 最后看到这样的界面，就成功设置ssh key了
![kl](https://www.2cto.com/uploadfile/Collfiles/20160329/20160329134812521.jpg)
### 添加 SSH Key 到 GitHub和Coding
打开Git Bash，然后输入
``cd ~/.ssh``
进入到.shh文件夹中再输入ls，查看是否有id_rsa.pub文件
![](https://www.2cto.com/uploadfile/Collfiles/20160329/20160329134812522.png)
输入cat命令，打开id_rsa.pub文件
``cat id_rsa.pub``
![](https://www.2cto.com/uploadfile/Collfiles/20160329/20160329134812523.png)
* 再鼠标全选中右击复制
* 再配置到GitHub和Coding的SSH中
进入Github官网，点击+旁边的头像，再按settings进入设置
![](https://www.2cto.com/uploadfile/Collfiles/20160329/20160329134812524.png)
在点击New SSH key创建
![](https://www.2cto.com/uploadfile/Collfiles/20160329/20160329134812525.png)
title输入邮箱，key里面粘贴刚才右击复制的内容,再点Add SSH key
![](https://www.2cto.com/uploadfile/Collfiles/20160329/20160329134812526.png)