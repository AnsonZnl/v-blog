
---
title: NodeJS中的Buffer
date: 2018-11-05 14:04:55
tags: ["NodeJS"]
---


###  Buffer介绍
**为什么要用Buffer？**
 1. 在Node/ES6 出现之前，前端工程师只需要进行一些简单的额字符串或者ODM操作就可以满足业务需求了，所有对二进制数据比较陌生。
 2. 在node出现之后，前端工程师面对的技术场景发送了变化，可以深入到网络传输、文件操作、图片处理等领域。而这些操作与二进制数据紧密相关。
 3. 在Node中的Buffer，是一个二进制数据容器，数据结构和数组类似，专门用于Node中的数据放。



###  新建Buffer 

`Buffer.alloc(size[, fil[,encoding]])`
`size `:新建的buffer期望的长度
`fill `用来预填充新建的Buffer的值 默认0
`encoding `: 编码格式  默认：utf-8
```js
/*
        十六进制：00- ff
        十进制 ：0- 255
        二进制： 00000000- 11111111
        0 / 1 代表一位 == 比特 
        8bit = 1B
        1kb = 1024 B
        1mkb= 1024Kb
        1GB = 1024m
        1TB = 1024GB

*/

// 2. Buffer.alloc(size[, fill[, encoding]])
/*
类数组使用即可 可遍历 可选择下标等等
初始化： 确定的长度 不能改变
填充值

*/
let buffer2= Buffer.alloc(10);//创建了一个长度是10的buffer
buffer2[0]= 10;//可以像使用数组一样使用buffer 
buffer2[1]= oxfc;//传一个十六进制的直接取后两位 fc
buffer2[30]= 1;//这点和数组不同 溢出隐藏 
console.log(buffer2);
```

###  Buffer使用

**使用新方法使用Buffer **
1. Buffer.form(str):将一个字符串转换成buffer
2. Buffer.alloc(size):创建一个指定大小的buffer
3. Buffer.alloUnsafe(size):创建一个指定大小的buffer，但是可能包含敏感数据。
```js
// 历史方法
// let buffer = new Buffer(10);//类似 Array(10) 创建十个空间
// console.log(buffer)// <Buffer 00 00 00 00 00 00 00 00 00 00>

//1. 字符串转成二进制
let str= 'www.zhangningle.top';
let buffer= Buffer.from(str);
console.log(buffer);//<Buffer 77 77 77 2e 7a 68 61 6e 67 6e 69 6e 67 6c 65 2e 74 6f 70>
//把buffer转成十进制的
console.log(buffer.toString())//www.zhangningle.top
// 汉字转换成二进制后 一个汉字要用三个字节表示

```


**Buffer总结点：**
1.  Buffer的结构和数组很像，操作方法也和数组很类似。
2.  Buffer中是以二进制的方式储存数据的
3.  Buffer是Node自带的，不需要引入，直接可以使用。