
---
title: NodeJS中的CommonJS规范
date: 2018-10-18 14:04:55
tags: ["NodeJS"]
---
### 模块化的意义
>在计算机程序的开发过程中，随着程序代码越写越多，在一个文件里代码就会越来越长，越来越不容易维护。
为了编写可维护的代码，我们把很多函数分组，分别放到不同的文件里，这样，每个文件包含的代码就相对较少，很多编程语言都采用这种组织代码的方式。在Node环境中，一个.js文件就称之为一个模块（module）。

### 理解模块化
最大的好处是大大提高了代码的可维护性。其次，编写代码不必从零开始。当一个模块编写完毕，就可以被其他地方引用。我们在编写程序的时候，也经常引用其他模块，包括Node内置的模块和来自第三方的模块。
使用模块还可以避免函数名和变量名冲突。相同名字的函数和变量完全可以分别存在不同的模块中，因此，我们自己在编写模块时，不必考虑名字会与其他模块冲突。

**每一个文件都可以看成一个模块，模块都可以相互暴露和相互引用**
1.在Node中 一个文件就是一个模块
2.在Node中，通过require()函数来引入外部的模块，引入外部模块要加上 ./ 或者 ../
3.在Node中，每一个js文件中js代码都是独立运行在一个小闭包中，而不是全局作用域，所以一个模块在不引用的情况下它的的变量和函数都在其他模块中无法访问，如果引用到其他模块中，则被引用的文件相当与在一个闭包内，相当与局部变量。
目的：全局变量私有化，避免全局污染。
4.暴露模块中的变量和函数：使用exports
只需要将需要暴露给外部的变量或者方法设置为exports的属性就行，
**可以把exports看做一个全局对象，把所有暴露出来的函数和变量都存放在里面**
Node有一些自带的模块，成为核心模块，他的引用不需要加./ 或者../ 如fs http


![171539764614_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-0d6620b0e8d69fa6.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


引用：`const  moudel = require ('./02.js')`
暴露：`exports.str = srt;`
### CommonJS案例
先写一个01.js暴露出去：
```js
let str = "我是小二";

let test = ()=>{
  console.log("今天天气很好!");
}
exports.str = str;
exports.test = test;

```
在写一个02.js把暴露的01.js引用过来, 然后暴露自身
```js
const module02 = require('./01.js');// [ ./  ../ ]

exports.module02 = module02; //暴露

console.log(module02.str);//我是小二

```
最后在写一个03.js 引用暴露的02.js， 这样在03.js 里就包含了 02.js 和01.js了：
```js
const module03 = require('./02.js');
console.log(module03.module02.str)//我是小二
```
所以最后是这样的：
![161539764109_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-d7e8e14a1da2526b.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

类似一个同心圆

### 案例：写一个求和 / 求平均数的模块

```js
exports.sun = (...numbers)=>{
    let result = 0;
    numbers.forEach((itme)=>{
        result += itme;
    });
    return result;
}

exports.avg= (...numbers)=>{
    let result = 0;
    numbers.forEach((itme)=>{
        result+= itme;
    });
    return result / numbers.length;
}
```


- 参考资料：[廖雪峰的官网-模块开发](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434502419592fd80bbb0613a42118ccab9435af408fd000)

- 视频资料：[网易云课堂-叶建秋-从零玩转Node.js](https://study.163.com/course/courseLearn.htm?courseId=1005269026#/learn/video?lessonId=1052250610&courseId=1005269026)