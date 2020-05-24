---
title: 小程序之iPhone x适配
date: 2019-8-27 15:21:55
tags: ["微信小程序"]
---

[参考小程序iPhone X 视适配](https://www.imooc.com/article/details/id/33529)

在开发小程序时，可能需要适配iPhone x 的时候，你会发现底部的横线会出现遮挡，这时候就要处理下：

在app.js中添加一个检测当前设备是否是iPhoneX的变量：
```
  globalData: {
    userInfo: null,
    isIphoneX: false//判断是否是iPhoneX
  },
  onShow: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        // console.log('手机信息res'+res.model)  
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          that.globalData.isIphoneX = true
        }
      },
    })
  }
```
在需要做兼容的xxx.js中引入：
```
var app= getApp();
Page({
data: {
  isIphoneX: false
},
onLoad: function(){
      // 判断是否为iPhoneX
    var isIphoneX = app.globalData.isIphoneX;
    console.log(isIphoneX ? '是iPhoneX' : '不是iPhoneX')
    this.setData({
      isIphoneX: isIphoneX
    })
  }
})
```
然后在xx.wxml中对需要做兼容的元素做判断 ：
```
  <view class="{{isIphoneX ? 'width30' : 'width10'}}"></view>
```
然后在对应的wxss里设置好对应的类名就ok 了，比较简单方便。