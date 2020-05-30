---
title: 使用Promise封装小程序wx.request
date: 2019-11-30 16:20:14
tags: ["小程序"]
---
因为业务需要，每个http请求都要加上一个请求头，所以每次都要写很多重复的代码。

现在尝试把wx.request简单的封装了一下，调用一个request方法，每次请求自动携带header头信息，这样就省事多了，包含了常见的get post put delete 四种请求方法，支持Promise方式调用。

## 封装代码
```js
class request {
  constructor() {
    this._baseUrl = 'https://xxx.com/api';
    this._token = wx.getStorageSync('token');
    this._header = {'Authorization': 'Bearer ' + token}
  }

  /**
   * GET类型的网络请求
   */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /**
   * DELETE类型的网络请求
   */
  deleteRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'DELETE')
  }

  /**
   * PUT类型的网络请求
   */
  putRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'PUT')
  }

  /**
   * POST类型的网络请求
   */
  postRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'POST')
  }

  /**
   * 网络请求
   */
  requestAll(url, data, header, method) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this._baseUrl + url,
        data: data,
        header: header,
        method: method,
        success: (res => {
          if (res.statusCode === 200) {
            //200: 服务端业务处理正常结束
            resolve(res)
          } else {
            //其它错误，提示用户错误信息
            reject(res)
          }
        }),
        fail: (res => {
          reject(res)
        })
      })
    })
  }
}

export default request
```


## 使用方法
在app.js中引入：
```js
import request from './request.js'
App({
  myRequest(){
    return new request();
  }
})
```
然后在要使用的页面里引入使用即可：
```js
const app = getApp();//新建页面时 默认引入
const ajax = app.myRequest();//初始化一个的request() 实例

Page({
  data:{},
  onLoad(){
    this.getData();  
  },
  getData(){
    ajax.getRequest('/getList',{id: 1024}).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })
  }
})
```
使用方法也是异常简单
- 比如Get请求就是：`ajax.getRequest(url: String, data: Object);`
- 比如Post请求就是：`ajax.postRequest(url: String, data: Object);`
- ...




参考：
[封装wx.request](https://juejin.im/post/5b050e5651882542816aabfa)
