---
title: CSS3动画
date: 2018-3-17 17:20:14
tags: ["CSS3"]
---
最近一直在做H5的微场景，用到很多css3的特效，在这里把常用的总结一下吧，
* ``border-radius``创建圆角边框
* ``box-shadow `` 添加阴影
* ``background-size`` 属性规定背景图片的尺寸。
* ```
transform: rotateX(120deg);
-webkit-transform: rotateX(120deg);	/* Safari 和 Chrome */
-moz-transform: rotateX(120deg);
```
3d转换
* ``transition`` css3过渡 
CSS3 过渡是元素从一种样式逐渐改变为另一种的效果。
要实现这一点，必须规定两项内容：
规定把效果添加到哪个 CSS 属性上 
规定效果的时长 
* 
```
	CSS3 @keyframes 规则
如需在 CSS3 中创建动画，您需要学习 @keyframes 规则。

@keyframes 规则用于创建动画。在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。

```
创建css3动画，可代替一些js效果，