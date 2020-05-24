---
title: 在小程序中调用API
date: 2018-5-21 17:20:14
tags: ["jQuery","JSON","小程序"]
---
### 在小程序中调用一言API

某一次在csdn看博客，看到了一个功能，就是可以随机显示一句话，都是特别经典的句子，后来便发挥了厚面皮的精神，就去私信问是怎么做的，二话没说那兄弟发给我一个网站，

[一言](https://hitokoto.cn/)
>这个网站是干什么的？
一言网(Hitokoto.cn)创立于2016年，隶属于萌创Team，目前网站主要提供一句话服务。
动漫也好、小说也好、网络也好，不论在哪里，我们总会看到有那么一两个句子能穿透你的心。我们把这些句子汇聚起来，形成一言网络，以传递更多的感动。如果可以，我们希望我们没有停止服务的那一天。
简单来说，一言指的就是一句话，可以是动漫中的台词，也可以是网络上的各种小段子。
或是感动，或是开心，有或是单纯的回忆。来到这里，留下你所喜欢的那一句句话，与大家分享，这就是一言存在的目的。*
*:本段文本源自hitokoto.us.

在**[一言网](https://hitokoto.cn/)**上提供了可调用的API

[一言API接口说明](https://hitokoto.cn/api)
按照他给的参数和返回json数据，成功的在网页中调用了出来
[我的一言deom](http://zhangningle.gitee.io/javascript-demo/%E4%B8%80%E8%A8%80.html)
代码展示:
```

<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>一言</title>
  <style>
    div {
      width: 500px;
      margin: auto;
      text-align: center;
    }
    #hitokoto{
      font-size: 27px;
    }
    p {
      font-size: 20px;
    }

    #btn {
      padding: 15px 50px;
      border: 0;
      background: #00caeb;
      color: #fff;
      font-size: 22px;
      border-radius: 5px;
      cursor: pointer;
    }

    .cc{
      display: block;
      text-align: right;
      padding-right: 20px;
      font-size: 25px;
    }
  </style>
</head>

<body>
  <div>
    <p id="hitokoto"></p>
    <p class="cc">『
      <span id="from"></span>』</p>
  </div>
  <div>
    <button id="btn" onclick="window.location.reload();">
      换一换
    </button>
  </div>
  <!-- 以下写法，选取一种即可 -->

  <!-- 现代写法，推荐 -->
  <!-- 兼容低版本浏览器 (包括 IE)，可移除 -->
  <script src="https://cdn.jsdelivr.net/npm/bluebird@3/js/browser/bluebird.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@2.0.3/fetch.min.js"></script>
  <!--End-->
  <script>
    fetch('https://v1.hitokoto.cn')
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        var hitokoto = document.getElementById('hitokoto');
        hitokoto.innerText = data.hitokoto;
      })
      .catch(function (err) {
        console.error(err);
      })
  </script>

  <!-- 老式写法，兼容性最忧 -->
  <script>
    
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://v1.hitokoto.cn');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);
        var hitokoto = document.getElementById('hitokoto');
        var from = document.getElementById('from');
        hitokoto.innerText = data.hitokoto;
        from.innerText = data.from;
      }
    }
    xhr.send();
  </script>

  <!-- 新 API 方法， 十分简洁 -->
  <script src="https://v1.hitokoto.cn/?encode=js&select=%23hitokoto" defer></script>
</body>

</html>
```
正好最近也在开发小程序，就心里痒痒。
想试试小程序中可不可以调用这个api，
小程序中
>url：这个是要请求的接口地址
data：一个入参
method：请求方式，如果是POST请求必须按上面写，默认是get请求，不用处理。
complete：页面请求完成后的方法，通过that.setData将数据传递给WXML页面。
success：页面加载成功后的执行方法。

如图：
<img src="http://p0bnwspy9.bkt.clouddn.com/yiyxcv.gif">
js代码：
```
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that=this
    wx.request({
      url: 'https://v1.hitokoto.cn',
      header:{
        'content-type': 'application/json'
      },
      success: function (res){
        console.log(res.data)
        that.setData({
          list: res.data
        })
      }
    })
  },
```
看完这个代码，你会想，根据微信小程序的绑定原理，这里边的代码哪里调用了onLoad（）这个函数，不用多想，微信小程序给你省略了这些步骤。直接调用list这个数组就行。
