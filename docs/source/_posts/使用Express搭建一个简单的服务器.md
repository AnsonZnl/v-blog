---
title: 使用Express搭建一个简单的服务器
date: 2019-1-4 22:21:55
tags: "NodeJS"
---


## Express框架
### Web 应用程序
Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架，为 Web 和移动应用程序提供一组强大的功能。
### API
使用您所选择的各种 HTTP 实用工具和中间件，快速方便地创建强大的 API。
### 性能
Express 提供精简的基本 Web 应用程序功能，而不会隐藏您了解和青睐的 Node.js 功能。

## Express-路由基本使用
下载：` npm install express --save`

### Hello world
新建一个`server.js`文件，然后输入：
```
const express = require('express');
const app= express();

app.get('/', (req, res)=>{
    req.send('Hello world');
});
app.listen(8083, ()=>{
    console.log('Server is running at http://localhost:8083')
})

```
然后运行：` node server.js`
打开：http://localhost:8083/
就出现：
![11546413582_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-b7ae26b3cdafc65a.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 请求和响应
Express 应用使用回调函数的参数： request 和 response 对象来处理请求和响应的数据。
```
app.get('/', function (request, response) {
   // --
})
```

request 和 response 对象的具体介绍：

### Request 对象 
> request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

req.app：当callback为外部文件时，用req.app访问express的实例
req.baseUrl：获取路由当前安装的URL路径
req.body / req.cookies：获得「请求主体」/ Cookies
req.fresh / req.stale：判断请求是否还「新鲜」
req.hostname / req.ip：获取主机名和IP地址
req.originalUrl：获取原始请求URL
req.params：获取路由的parameters
req.path：获取请求路径
req.protocol：获取协议类型
req.query：获取URL的查询参数串
req.route：获取当前匹配的路由
req.subdomains：获取子域名
req.accepts()：检查可接受的请求的文档类型
req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
req.get()：获取指定的HTTP请求头
req.is()：判断请求头Content-Type的MIME类型
### Response 对象 
> response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

res.app：同req.app一样
res.append()：追加指定HTTP头
res.set()在res.append()后将重置之前设置的头
res.cookie(name，value [，option])：设置Cookie
opition: domain / expires / httpOnly / maxAge / path / secure / signed
res.clearCookie()：清除Cookie
res.download()：传送指定路径的文件
res.get()：返回指定的HTTP头
res.json()：传送JSON响应
res.jsonp()：传送JSONP响应
res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
res.redirect()：设置响应的Location HTTP头，并且设置状态码302
res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
res.send()：传送HTTP响应
res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
res.set()：设置HTTP头，传入object可以一次设置多个头
res.status()：设置HTTP状态码
res.type()：设置Content-Type的MIME类型


## Express-路由
> 我们已经了解了 HTTP 请求的基本应用，而路由决定了由谁(指定脚本)去响应客户端请求。
在HTTP请求中，我们可以通过路由提取出请求的URL以及GET/POST参数。

路由的基本形式：
`app.METHOD(PATH, HANDLER)`

1. `app` 表示的是一个Express的实例
2. `METHOD` 是http请求的方法（get, psot..）
3. `PATH` 服务器上的路径
4. `HANDLER `请求之后的执行函数

下面的示例说明了如何定义路由：
```
// 对/news 页面进行get请求
app.get('news', (req, res)=>{
    res.send('Hello news');
});
// 对/about 页面进行post请求
app.post('about', (req, res)=>{
    res.send('Hello about');
});
// 对/list* 可匹配 /list+任意字符
app.get('/list*', (req, res)=>{
    res.send('Hello list pages');
})
```
然后运行：`node server.js`
打开：[http://localhost:8083/](http://localhost:8083/)
![21546417068_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-b8692b839960c7cf.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![31546417103_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-688f54ceb329ceb1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![41546417120_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-e0af0827093b7ac1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## Express-搭建静态资源库

> Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等。

你可以使用 express.static 中间件来设置静态文件路径。例如，如果你将图片， CSS, JavaScript 文件放在 public 目录下，你可以这么写：
`app.use(express.static('public')); `

现在，你就可以访问 public 目录中的所有文件了：
```
public/index.html
public/images
public/images/bg.jpeg
public/css
...
```
如果要使用多个静态资源目录，请多次调用 express.static 中间件函数：
```
app.use(express.static('public'))
app.use(express.static('files'))
```
 Express 在静态目录查找文件，因此，存放静态文件的目录名不会出现在 URL 中。
但是您可以给静态目录添加一个路由：
`app.use('/static', express.static(path.join(__dirname, 'public')))`
设置`/static`为`/public`目录的路由。
现在，你就可以通过带有 /static 前缀地址来访问 public 目录中的文件了。
```
http://localhost:8083/static/css
http://localhost:8083/static/css/index.css
http://localhost:8083/static/image
http://localhost:8083/static/images/bg.jpeg
http://localhost:8083/static/index.html
```
为了安全，最好使用绝对路由：
`app.use('/static', express.static(path.join(__dirname, 'public')))`
然后运行：`node server.js`
打开：[http://localhost:8083/static](http://localhost:8083/static)
就可以访问public下的所有文件，如图：
![61546420083_.pic_hd.jpg](https://upload-images.jianshu.io/upload_images/7072486-8d727856b5ec84a3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## Express-模板引擎之EJS
> EJS 是一套简单的模板语言，帮你利用普通的 JavaScript 代码生成 HTML 页面。

下载Ejs: `npm install ejs --save`
同目录下新建`myejs.js`:
```
const express= require('express');
const app = express();
//设置模板文件的目录,并且新建一个viwes的目录
app.set('views', './views');
//注册模板引擎
app.set('view engine', 'ejs');
//使用res.render()来渲染一个视图并将呈现的HTML字符串发送给客户端；
app.get('/', function(req, res,) {
    res.render('index', { title: '测试' });
});
//监听8083端口
app.listen(8083, ()=>{
    console.log('Server is running at http://localhost:8083')
})

```
在新建views目录中新建index.ejs:
```
 <h1><%= title %></h1>
```
然后运行：`node myejs.js`
打开：[http://localhost:8083](http://localhost:8083)
即可看到：
![](https://upload-images.jianshu.io/upload_images/7072486-b333856ae590d4e1.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

当然，也可以返回一个json文件来渲染视图：
在同目录下新建一个data.json:
```
{
    "list": [
    { "name":"小明" , "age":"6", "sex": "男"},
    { "name":"小红" , "age":"4" ,"sex": "女"},
    { "name":"小亮" , "age":"5" ,"sex": "男"}
    ],
    "source":"神奇二班"
}
```
然后更改myejs.js:
```
const express= require('express');
const fs= require('fs');
const app = express();

//设置模板文件的目录,并且新建一个viwes的目录
app.set('views', './views');
//注册模板引擎
app.set('view engine', 'ejs');
//使用res.render()来渲染一个视图并将呈现的HTML字符串发送给客户端；
app.get('/', function(req, res,) {
    getDataJson((dataJson)=>{
        console.log(dataJson);
        res.render('index', dataJson);
    })
});
//访问data.json 拿到数据解析并返回
const getDataJson=(callBack)=>{
    fs.readFile('./data.json', (err, data)=>{
        if(!err){
            let jsonData= JSON.parse(data);
            callBack(jsonData);
        }else{
            throw err;
        }
    })
}
//监听8083端口
app.listen(8083, ()=>{
    console.log('Server is running at http://localhost:8083')
})

```
然后更改index.ejs:
```
<h4><%=source %></h4>
<ul>
    <% for(var i=0; i<list.length; i++){ %>
        <li><%= list[i].name %> | <%= list[i].age %> | <%= list[i].sex %></li>
    <% } %>    
</ul>
```
然后在运行：    
然后运行：`node myejs.js`    
打开：[http://localhost:8083](http://localhost:8083/)

![](https://upload-images.jianshu.io/upload_images/7072486-62bf6f8073433d15.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



参考：   
[GitHub源码](https://github.com/AnsonZnl/StudyNodeJS/tree/master/demo/expressDemo)    
[Express官方文档](http://www.expressjs.com.cn/)    
[EJS 模板引擎](https://ejs.bootcss.com/)