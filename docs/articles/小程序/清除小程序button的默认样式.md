---
title: 清除小程序button的默认样式
date: 2019-11-30 16:20:14
tags: ["小程序"]
---

## 彻底清除小程序按钮的默认样式

wxml：
```html
<button hover-class="none"></button>
```
wxss：
```css
button{
  line-height: 1;
  margin:0;
}
button::after{
  border:none;
}
input{
  outline:none;
  border:none;
  list-style: none;
}
```