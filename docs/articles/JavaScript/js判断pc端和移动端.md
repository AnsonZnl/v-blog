---
title: js判断浏览设备
date: 2017-12-26 19:02:25
tags: ["JavaScript","HTML"]
---

### js判断浏览设备

**在移动端火热的web界，估计现在开发网站都会开发pc端和移动端吧？**
**可是用户访问网站时怎么确定是访问网站刚刚好就是用户使用设备所匹配网站呢？**
我最近就打算做一个网站pc端+移动端的。
刚好遇见这个问题就此记下来：
很简单！还是使用万能的js来解决这个问题,一段代码搞定！
```
<script>
if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){
    window.location.href='移动端网址';
}
</script>
```
当然网上流传的方法不止一种，适合自己的才是最好的。