---
title: Array的push与unshift方法性能比较分析
date: 2018-9-1 20:45:23
tags: JavaScript
---
从原理就可以知道，unshift的效率是较低的。原因是，它每添加一个元素，都要把现有元素往下移一个位置。但到底效率差异有多大呢？下面来测试一下。 
测试环境的主要硬件：CPU T7100（1.8G）；内存4G DDR2 667；硬盘5400转。主要软件：操作系统为Windows 7；浏览器为Firefox 3.6.9。测试代码：
```
var arr = [ ], s = +new Date; 
// push性能测试 
for (var i = 0; i < 50000; i++) { 
　　arr.push(i); 
} 
console.log(+new Date - s); 
s = +new Date; 
arr = [ ]; 
// unshift性能测试 
for (var i = 0; i < 50000; i++) { 
　　arr.unshift(i); 
} 
console.log(+new Date - s);
```
这段代码分别执行了50000次push和unshift操作，运行一次以后，得出结果： 
12 
1152 
可见，unshift比push要慢差不多100倍！因此，平时还是要慎用unshift，特别是对大数组。那如果一定要达到unshift的效果，有没有其他方法呢？答案是肯定的。 
Array有一个叫做reverse的方法，能够把一个数组反转。先把要放进数组的元素用push添加，再执行一次reverse，就达到了unshift的效果。比如：
```
for (var i = 0; i < 50000; i++) { 
　　arr.push(i); 
} 
arr.reverse(); 

//reverse的性能又如何呢，下面再来测试：
var arr = [ ], s = +new Date; 
for (var i = 0; i < 50000; i++) { 
　　arr.push(i); 
} 
arr.reverse(); 
console.log(+new Date - s);
```
结果是： 
12 
可见，reverse性能极高，甚至于没有额外的消耗，可以放心使用。

当你的才华撑不起你的野心的时候、请潜下心、低下头、好好学习、