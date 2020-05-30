---
title: 如何在小程序中使用async/await
date: 2020-05-29 23:09:03
tags: "小程序"
---
# 为什么要使用async/await

 假如两个异步，第一个获取列表，第二个获取列表里的第一个的详情。这时候应该怎么做？

1. 在第一个请求之后里写第二个请求，这可能是你第一个想法，可是这个深度是5层、10层呢？代码将会变的无法维护，也就是我们俗称的回调地狱

2. 使用Promise，使用一直点then。但是如果出现错误，不容易捕捉到。

3. 最优雅的写法，async 和 await。

我们使用 [CNode Api]( https://cnodejs.org/api ) 练习，先获取首页文章列表，然后在获取第一个文章的详情。

## 一、使用Callback

```js

Page({
  onLoad: function () {
    this.ajax1()
  },
  ajax1(){
    const that = this;
    wx.request({
      url: 'https://cnodejs.org/api/v1/topics',
      success:res=>{
        console.log(1, res)
        let firstId = res.data.data[0].id;
        that.ajax2(firstId)
      }
    })
  },
  ajax2(id){
    wx.request({
      url: `https://cnodejs.org/api/v1/topic/${id}`,
      success:res=>{
        console.log(2, res)
      }
    })
  }
})
```

## 二、使用Promise

```js
Page({
  onLoad: function () {
    this.ajax1()
      .then(id => {
        return this.ajax2(id)
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  },
  ajax1() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cnodejs.org/api/v1/topics',
        success: res => {
          console.log(1, res)
          let firstId = res.data.data[0].id;
          resolve(firstId)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  ajax2(id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://cnodejs.org/api/v1/topic/${id}`,
        success: res => {
          console.log(2, res)
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
})
```

对比回调，使用Promise的链式调用就优雅很多了。

## 三、使用async、await

小程序增强编译：[代码增强编译]( [https://developers.weixin.qq.com/miniprogram/dev/devtools/codecompile.html#%E5%A2%9E%E5%BC%BA%E7%BC%96%E8%AF%91](https://developers.weixin.qq.com/miniprogram/dev/devtools/codecompile.html#增强编译) )

需要在微信开发者工具中勾选 **增强编译**

```js
Page({
  onLoad: function () {
    (async ()=>{
      let id = await this.ajax1()
      let res = await this.ajax2(id)
      console.log(res)
    })()
  },
  ajax1() {
    return new Promise((resolve, reject) => {
      wx.request({
        url: 'https://cnodejs.org/api/v1/topics',
        success: res => {
          console.log(1, res)
          let firstId = res.data.data[0].id;
          resolve(firstId)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  ajax2(id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `https://cnodejs.org/api/v1/topic/${id}`,
        success: res => {
          console.log(2, res)
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
})
```

参考：[微信小程序中使用 async/await的方法实例分析]( https://www.jb51.net/article/185993.htm )