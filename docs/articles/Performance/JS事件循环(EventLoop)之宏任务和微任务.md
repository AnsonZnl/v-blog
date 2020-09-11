# JS事件循环(EventLoop)之宏任务和微任务

众所周知，JS是一门单线程语言，可是浏览器又能很好的处理异步请求，那么到底是为什么呢？

JS 的执行环境一般是浏览器和 Node.js，两者稍有不同，这里只讨论浏览器环境下的Eventloop。

JS 执行的任务一般分为两种：同步任务和异步任务。

- 同步任务：比如声明语句和函数等，读取后依据从上到下从左到右，立即执行。
- 异步任务：比如 ajax 网络请求，setTimeout 定时函数等都属于异步任务。异步任务会通过任务队列(Event Queue)的机制（先进先出的机制）来进行协调。

## 任务队列（Event Queue）

任务队列中的任务也分为两种，分别是：宏任务（Macro-take）和微任务（Micro-take）

任务队列的执行过程是：先**执行一个宏任务**，然后将产生的宏/微任务推入相应的任务队列，**然后在执行一队微任务**，之后再执行宏任务，如此循环。**以上不断重复的过程就叫做Event Loop(事件循环)**。

每一次的循环操作被称为**tick**。

![](https://pic2.zhimg.com/80/v2-a38ad24f9109e1a4cb7b49cc1b90cafe_720w.jpg)


宏任务主要包括：scrip(t整体代码)、setTimeout、setInterval、I/O、UI交互
微任务主要包括：Promise、MutaionObserver




## 参考
- [知乎-【JS】深入理解事件循环,这一篇就够了!(必看)](https://zhuanlan.zhihu.com/p/87684858)
- [掘金小册-前端性能优化-Event Loop 与异步更新策略](https://juejin.im/book/6844733750048210957/section/6844733750115303432)
- [Segmentfault-译文：JS事件循环机制（event loop）之宏任务、微任务](https://segmentfault.com/a/1190000014940904)