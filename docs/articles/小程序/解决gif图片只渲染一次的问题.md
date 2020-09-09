## 描述

微信小程序开中，遇到 gif 图只执行一次的bug，经过多方测试，之后通过以下方式实现。

**问题描述**：加载本地 gif 时，第一次播放之后始终保持在终点的状态，再次加载时，不会重新播放

**解决方案**：把本地 gif 的路径换成线上的，然后在最后加上时间戳即可解决

**方案缺陷**：可能会造成卡顿，但目前尚未找到更好的解决方案

## 附上代码

**wxml**

```html
<image bindload="gifImgLoad" src="{{gifUrl}}"></image>
```

**js**

``` js
page({
  data:{
    gifUrl: 'http://xxx.com/xx.gif',//线上地址
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
