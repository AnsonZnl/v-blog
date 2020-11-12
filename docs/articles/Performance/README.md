# 前端性能优化总结

> 这里的内容是我购买的掘金小册 [前端性能优化原理与实践](https://juejin.im/book/6844733750048210957/section/6844733750031417352) 和自己工作实际遇到的一些优化问题总结而来

性能优化的知识，比较零散，就 web 来说，我所理解的性能优化就是**用户在浏览网页过程中，网页以最快的速度展示，并在使用过程中把卡顿、抖动、加载、白屏等不友好体验降底到无限趋近于 0 的过程**

本人知识所限，只能在前端的角度，从网络、缓存、浏览器渲染、编码的角度来总结一些优化经验。

![](https://user-gold-cdn.xitu.io/2018/10/23/1669f5358f63c0f8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 目录

- [本地储存之 Cookie、webStorage、indexedDB](/articles/Performance/本地储存之Cookie、webStorage、indexedDB.html)
- [HTTP 之缓存机制解析](/articles/Performance/HTTP之缓存机制解析.html)
- [DOM 优化之重绘和回流](/articles/Performance/DOM优化之重绘和回流.html)
- [使用 Documentfragment 优化 DOM 操作](/articles/Performance/使用Documentfragment优化DOM操作.html)
- [事件的防抖和节流](/articles/Performance/事件的防抖和节流.html)
- [JS 事件循环之宏任务和微任务](/articles/Performance/JS事件循环之宏任务和微任务.html)
- [首屏优化之懒加载](/articles/Performance/首屏优化之懒加载.html)

## 从输入 URL 到页面显示，中间发生了什么？

在展开性能优化的话题之前，我想先抛出一个老生常谈的面试问题：

> 从输入 URL 到页面加载完成，发生了什么？

大概过程：首先我们需要通过 DNS（域名解析系统）将 URL 解析为对应的 IP 地址，然后与这个 IP 地址确定的那台服务器建立起 TCP 网络连接，随后我们向服务端抛出我们的 HTTP 请求，服务端处理完我们的请求之后，把目标数据放在 HTTP 响应里返回给客户端，拿到响应数据的浏览器就可以开始走一个渲染的流程。渲染完毕，页面便呈现给了用户，并时刻等待响应用户的操作。

关键的几步分别是：

1. DNS 解析
2. 建立 TCP 链接，发送 HTTP 请求
3. 服务端响应，返回响应数据
4. 浏览器拿到响应数据，解析并渲染出来
5. 渲染完成出来之后，等待用户下一步的操作..

我们根据这几点，逐步分析：

1. DNS 解析
   DNS 解析花时间，如何能减少解析次数或者把解析前置？
   1. 浏览器 DNS 缓存和 DNS prefetch。
2. TCP 每次的三次握手都急死人，有没有解决方案？
   1. 长连接、预连接、接入 SPDY 协议。
3. HTTP 请求呢？
   1. 减少请求的次数和减少请求的体积
4. 浏览器渲染数据呢？
   1. 这部分涉及资源加载优化、服务端渲染、浏览器缓存机制的利用、DOM 树的构建、网页排版和渲染过程、回流与重绘的考量、DOM 操作的合理规避等等——这正是前端工程师可以真正一展拳脚的地方。学习这些知识，不仅可以帮助我们从根本上提升页面性能，更能够大大加深个人对浏览器底层原理、运行机制的理解，一举两得！

总的来说，1、2 是后端甚至运维优化的部分，3、4 才是我们能优化的部分，我们将从**网络层面**和**渲染层**面两个大的维度来逐个点亮前端性能优化的技能树。

## 优化方法

- 减少不必要的 HTTP 请求
  - 雪碧图：CSSSprites（将多张小图片合并成一张图的）
  - 节流和防抖
  - 前端表单验证
- 利用好浏览器缓存
  - http 缓存（强制缓存、协商缓存）
  - 浏览器缓存（localStroage/sessionStroage/cookie/indexdDB）
- 浏览器渲染
  - 减少重绘和回流
  - 减少 DOM 操作（或将多次操作合并为一次）
- 前端代码和资源的压缩

  - Gzip 压 缩
  - 压缩 JS、CSS、HTML 文件：去掉多余空格、回车、注释等
  - 文件压缩：压缩图片、字体等

- 其他
  - CDN 加速：使用静态资源部署在各地的服务器上
  - 如有大量的图片请使用懒加载
  - 频繁的操作请使用节流和防抖
  - CSS 层级不要嵌套超过 3 层
  - 善用缓存（http 缓存和浏览器缓存）
  - 使用小图片（base64 或者 webp 格式的）
  - webpack 按需加载