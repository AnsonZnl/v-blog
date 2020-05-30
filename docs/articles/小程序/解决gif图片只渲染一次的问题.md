---
title: 微信小程序：解决gif图片只渲染一次的问题
date: 2020-01-11 11:09:03
tags: ["微信小程序"]
---

## 描述
微信小程序开中，遇到gif图执行一次的需要，经过多方，之后通过以下方式实现。

**问题描述**：加载本地gif时，就算image重新渲染了，gif也会保持在终点的状态，不会重新播放

**解决方案**：把本地gif的路径换成线上的，然后在最后加上时间戳即可解决

**方案缺陷**：可能会造成卡顿，但目前尚未找到更好的解决方案


## 附上代码
wxml
```html
<image bindload="gifImgLoad" src="{{gifUrl}}"></image>
```
js
```js
page({
  data:{
    gifUrl: '图片url',//线上地址
  },
//图片加载成功之后执行
  gifImgLoad(e) {
    var gifurl = this.data.gifUrl;
    var nowTime = +new Date();
    setTimeout(() => {
      this.setData({
        gifUrl: gifurl + '?' + nowTime
    })
  }, 1000)//一秒钟之后消失
})
```