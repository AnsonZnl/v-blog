---
title: 使用Ajax请求数据
date: 2017-12-26 9:04:54
tags: ["Ajax","php","JavaScript"]
---

## ajax的简单使用
**接触php和Mysql后就一直想学ajax,今天终于开始尝试了写一个小的ajax实现页面的局部刷新了。**
### 什么是ajax？
>AJAX 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。
AJAX = 异步 JavaScript 和 XML。
AJAX 是一种用于创建快速动态网页的技术。
通过在后台与服务器进行少量数据交换，AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
传统的网页（不使用 AJAX）如果需要更新内容，必需重载整个网页面。
有很多使用 AJAX 的应用程序案例：新浪微博、Google 地图、开心网等等。
**ajax 是异步更新，使用太多比较频繁的请求会增加服务器的负担，** 
**ajax的无刷新技术，无需用户等待即可更新局部页面，增加用户体验。**
## 实现思路
因为ajax是与后台数据进行数据传输交互等等，所以需要启动服务器构建php+mysql环境。
在服务器可访问到的文件夹下新建一个ajax文件。
文件一：``index.html``用户浏览的页面
文件二：``action.php``保存数据的的页面，（只是一个简单的ajax案例，暂时不连接数据库）
首先在页面写一个按钮：
index.html中<body>的内容是：
```
<button onclick="getData()">我漂亮吗？</button>
//一个简单的按钮 点击触发‘getData()’事件
<div  id="box"></div>
//点击在‘box中按钮出来的文字，
```
index.html中要添加js代码：
```
function getData() {
        var xmlhttp;
        if (window.XMLHttpRequest)
        {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
            //兼容最新浏览器IE7+, Firefox, Chrome, Opera, Safari
        }
        else
        {// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            //兼容老版本的
        }
        xmlhttp.open("GET","action.php",true);
        //         传参方式 发送的文件  是否异步true（异步）或 false（同步）
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("flag=select&name=zhang");
        //      发送  传递参数
        xmlhttp.onreadystatechange=function () {
            if(xmlhttp.readyState==4&&xmlhttp.status==200){
                console.log(xmlhttp.responseText);
                document.getElementById("box").innerHTML=xmlhttp.responseText;
                // var data1=JSON.
            }
            }
    }
```
在action.php中写点击后要返回的数据：
```
if(isset($_POST["flag"])){
 echo "漂亮";
}
```
好啦！这样在后台打开就可以直接出来了，点击按钮‘我漂亮吗？’，下方就会立即出来"漂亮"，
是不是特别棒呢！可以增加**用户体验**呢。
