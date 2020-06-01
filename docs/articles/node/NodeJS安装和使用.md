#  NodeJS安装和使用
## 了解Node
NodeJS :主要应用于开发服务器，做数据API ,设计路由，和前端的主要区别在于，前端主要负责效果和交互、
node.js是追求性能极致的产物，主要的三个特点是：
**单线程、Non-blocking I/O、Event Driven**
Nodejs和其他后端语言的不同：
1. 采用单线程， 所以
2. 需要非阻塞I/O，所以
3. 需要事件驱动。
极大地提高了CPU的利用率：
1. node没有自己的语法，使用V8引擎，用的是js，V8引擎解析js，效率非常高。并且V8中很多东西都是异步的，，Node就是站在巨人的肩膀上，把V8中的一些功能一直到服务器上
2. 没有web容器 就是安装配置完成之后，也么有一个根目录。（使用路由）
4. 模块：在Node.js中，以模块为单位划分所有的功能，并且提供了一个完成的模块加载机制，我们可以将应用程序划分为各个不同的部分。


## **Windows命令**
常用命令：
`dir` 列出当下目录下面的所有文件
`cd` 进入指定的目录
`md` 创建文件夹
`rd` 删除文件夹
`cd..` 返回上级目录
![81539743638_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-01dca1d0f6a9557b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## **Mac命令**
`cd ~`进入我们的家目录
`ls` 列出当下目录下面的所有文件
`cd 目录名` 进入指定的目录
`touch 文件名.html`创建一后缀是html的文件或者一次`touch a.txt b.html`一次创建多个文件
`mkdir 文件夹名` 新建一个文件夹或者一次`mkdir a b c`新建三个文件夹
`rm 文件/文件夹`删除文件/文件夹
`less index.html`查看文本文件内容
`pwd `看看自己在哪个目录下
`man` 查看某个命令的详情
cd.. 返回上级目录

**小技巧**
用 Tab 键自动补齐命令 
比如想到 /System 目录中去，输入 cd /Sy 然后按一下Tab 键，命令就会自动补齐成 cd /System 
操作带名字中带有空格的文件和目录 
空格在命令中写成 空格， 比如要进入 My Documents，命令为 cd My Documents 

## 进程和线程：
  1.进程
     系统进行资源分配和调度的基本单位 操作系统的基础，我们写的代码都是放在进程里的 相当于工厂的车间 
     如：任务管理器
  2.线程
   九三级的最小计量单位 负责执行进程中的程序，相当于车间里的操作工人，
单线程：
    js是单线程，时间片分割
多线程：
   根据任务决定开起几条线程（耗内存）
Node服务器：
   单线程，但很健壮，后台拥有一个I/O线程池进行调度。分布式服务器部署。![91539744120_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-9f4180b756ad90eb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 安装node.js
![101539744899_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-80d875076390ef25.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[node.js 下载](https://nodejs.org/en/download/)
有些可能需要配置**全局环境变量**
![121539745565_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-43497297131cb4b6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

node -v
查看版本号

node 进入node环境，在这个环境中可以执行JavaScript语句

## 让node.js跑起来

跑起来 node.js
 1.node 命令行下写js代码
 2.新建.js文件 > cd 到指定目录 > node index.js
![131539747126_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-65fcfa08be5b8942.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

建议使用最新的编辑器 有代码提示

## Node.js 的模块发开发
Node 需要模块化开发：
问题： js缺乏模块化的开发
解决：后来出现了commonJs （内部） 和npm（外部 包管理系统）它提供了模块的复用和引用,

CommonJs的出现 主要是为了弥补JavaScript没有模块化开发标准的缺陷，

CommonJS对模块化的定义：
1. 模块引用 require（“路径”）
2.模块定义
3.模块表识
![141539756072_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-7fc679453ac23729.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

总结：
1.从文件的角度看，每个js文件就是一个模块，从结构看，多个js文件之间可以相互require，共同实现一个功能，整体上也是一个模块。
2.在Node.js中，一个模块中的定义的变量、函数等。都只能在这个文件内部有效；当需要从此文件外部引用这些变量、函数时，必须使用exports进行暴露，然后使用require引用。

A：我需要引用你  >> require B
B:  那好 >> 我暴露

13课至17课笔记
视频地址：https://study.163.com/course/courseMain.htm?courseId=1005269026