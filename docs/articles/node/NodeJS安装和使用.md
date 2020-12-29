# NodeJS 安装和使用

## 了解 Node

NodeJS :主要应用于开发服务器，做数据 API ,设计路由，和前端的主要区别在于，前端主要负责效果和交互、
node.js 是追求性能极致的产物，主要的三个特点是：
**单线程、Non-blocking I/O、Event Driven**
Nodejs 和其他后端语言的不同：

1. 采用单线程， 所以
2. 需要非阻塞 I/O，所以
3. 需要事件驱动。
   极大地提高了 CPU 的利用率：
4. node 没有自己的语法，使用 V8 引擎，用的是 js，V8 引擎解析 js，效率非常高。并且 V8 中很多东西都是异步的，，Node 就是站在巨人的肩膀上，把 V8 中的一些功能一直到服务器上
5. 没有 web 容器 就是安装配置完成之后，也么有一个根目录。（使用路由）
6. 模块：在 Node.js 中，以模块为单位划分所有的功能，并且提供了一个完成的模块加载机制，我们可以将应用程序划分为各个不同的部分。

## **Windows 命令**

常用命令：
`dir` 列出当下目录下面的所有文件
`cd` 进入指定的目录
`md` 创建文件夹
`rd` 删除文件夹
`cd..` 返回上级目录

![nodejs-4](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/nodejs-4.png)

## **Mac 命令**

`cd ~`进入我们的家目录
`ls` 列出当下目录下面的所有文件
`cd 目录名` 进入指定的目录
`touch 文件名.html`创建一后缀是 html 的文件或者一次`touch a.txt b.html`一次创建多个文件
`mkdir 文件夹名` 新建一个文件夹或者一次`mkdir a b c`新建三个文件夹
`rm 文件/文件夹`删除文件/文件夹
`less index.html`查看文本文件内容
`pwd`看看自己在哪个目录下
`man` 查看某个命令的详情
cd.. 返回上级目录

**小技巧**
用 Tab 键自动补齐命令
比如想到 /System 目录中去，输入 cd /Sy 然后按一下 Tab 键，命令就会自动补齐成 cd /System
操作带名字中带有空格的文件和目录
空格在命令中写成 空格， 比如要进入 My Documents，命令为 cd My Documents

## 进程和线程：

1.进程
系统进行资源分配和调度的基本单位 操作系统的基础，我们写的代码都是放在进程里的 相当于工厂的车间
如：任务管理器 2.线程
九三级的最小计量单位 负责执行进程中的程序，相当于车间里的操作工人，
单线程：
js 是单线程，时间片分割
多线程：
根据任务决定开起几条线程（耗内存）
Node 服务器：
单线程，但很健壮，后台拥有一个 I/O 线程池进行调度。分布式服务器部署。

![nodejs-5](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/nodejs-5.png)

## 安装 node.js

![nodejs-6](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/nodejs-6.png)

[node.js 下载](https://nodejs.org/en/download/)
有些可能需要配置**全局环境变量**

![nodejs-7](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/nodejs-7.png)

node -v
查看版本号

node 进入 node 环境，在这个环境中可以执行 JavaScript 语句

## 让 node.js 跑起来

跑起来 node.js
1.node 命令行下写 js 代码 2.新建.js 文件 > cd 到指定目录 > node index.js

![nodejs-8](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/nodejs-8.png)

建议使用最新的编辑器 有代码提示

## Node.js 的模块发开发

Node 需要模块化开发：
问题： js 缺乏模块化的开发
解决：后来出现了 commonJs （内部） 和 npm（外部 包管理系统）它提供了模块的复用和引用,

CommonJs 的出现 主要是为了弥补 JavaScript 没有模块化开发标准的缺陷，

CommonJS 对模块化的定义：

1. 模块引用 require（“路径”） 2.模块定义 3.模块表识

![nodejs-9](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/nodejs-9.png)

总结： 1.从文件的角度看，每个 js 文件就是一个模块，从结构看，多个 js 文件之间可以相互 require，共同实现一个功能，整体上也是一个模块。 2.在 Node.js 中，一个模块中的定义的变量、函数等。都只能在这个文件内部有效；当需要从此文件外部引用这些变量、函数时，必须使用 exports 进行暴露，然后使用 require 引用。

A：我需要引用你 >> require B
B: 那好 >> 我暴露

13 课至 17 课笔记
视频地址：https://study.163.com/course/courseMain.htm?courseId=1005269026
