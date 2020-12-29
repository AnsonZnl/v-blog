# 使用 NodeJS 写一个简单的 api 接口

## 引入 Http 模块

默认你已经安装了[Node.js](https://nodejs.org/en/)
Node 当中内置了 Http 模块；
可以使用

```js
var http = require("http");
```

引入 http 模块；

## Hello world

用 Node.js 实现一个 HTTP 服务器程序非常简单。我们实现一个最简单的 Web 程序，
它对于所有请求，都返回 Hello world!，新建一个文件夹`apiDemo` 在里面新建一个`server.js`写入：

```js
// 导入http模块:
var http = require("http");
// 创建http server，并传入回调函数:
var server = http.createServer(function(request, response) {
  // 回调函数接收request和response对象,
  // 获得HTTP请求的method和url:
  console.log(request.method + ": " + request.url);
  // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
  response.writeHead(200, { "Content-Type": "text/html" });
  // 将HTTP响应的HTML内容写入response:
  response.end("Hello world!");
});

// 让服务器监听8080端口:
server.listen(8080);

console.log("Server is running at http://127.0.0.1:8080/");
```

然后在当前目录命令提示符下(cmd 等)运行， 输入：

```bash
node server.js
```

然后打开浏览器输入：`http://127.0.0.1:8080/` 就可以看到：
![nodejs-2](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/nodejs-2.png)

同时可以看到命令行中有打印的信息：

```
GET: /
GET: /favicon.ico
```

主要需要了解的是：

```
http.createServer(function(request, response){})
```

它的作用是创建一个 http 服务，里面传一个回调函数，函数中包含两个参数分别是（request，response）。
其中 request 是请求对象，response 是响应对象。
可以根据`request`对象拿到请求头的一些信息，如: `request.url`--返回请求路径
响应成功后：
`response.writeHead()`————发送一个响应头给请求
`response.end('xxx')`————响应成功 返回 xxx
[参考 Nodez 中文网-HTTP](http://nodejs.cn/api/http.html)

## 路由

我们是想当访问`http://127.0.0.1:8080/`的时候返回当前目录的 index.html。
也就是说当`request.url === '/'`是`true`时就可以确定当前请求的是根目录了，

```js
var url = request.url;
console.log(url);
// '/'
```

我们能创建一个服务，并且能使用`response.end('Hello world!');`返回“Hello world!”。如果想返回一个文件则需要用到 Node.js 的一个模块了——**fs 文件系统**。
它是 Node 当中处理文件的模块，首先引入：

```js
var fs = require("fs");
```

可以使用`fs.readFile()`来读取文件

```js
fs.readFile("./index.html", function(err, data) {
  if (err) throw err;
  console.log(data);
  // <Buffer 3c 21 44 4f 4...>
});
```

回调函数 有两个参数 (err, data)，其中 data 是文件的内容，以二进制形式返回。

然后我们就可以编写代码了，当访问根目录时，返回 index.html 文件

```js
var http = require("http");
var fs = require("fs");
var server = http.createServer(function(request, response) {
  var url = request.url;
  if (url === "/") {
    fs.readFile("./index.html", function(err, data) {
      if (!err) {
        response.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
        response.end(data);
      } else {
        throw err;
      }
    });
  } else {
    console.log("错误");
  }
});
server.listen(8080, "127.0.0.1");
```

然后在当前目录下新建`index.html`，在这里我们可以写一个 ajax 请求，一会我们点击按钮来实现 ajax 请求一组数据：

```js
 <div id="box">看不到看不到</div>
    <button onclick="success()">我是按钮</button>
    <script>
    function success(){
        var http= new XMLHttpRequest();
        http.onreadystatechange= function(){
            if(http.status == 200 && http.readyState == 4){
                var msg= http.responseText;
                var box= document.getElementById('box');
                box.innerHTML= JSON.parse(msg).name;
            }
        }
        //发送请求
        http.open('GET', '/data');
        http.send();
    }
    </script>
```

这段代码是点击按钮的时候 会向`/data`发起一个 ajsx 请求,

## 实现简单的 API 接口

既然能访问根目录时可以返回 html 文件，那我们可以自己设定一个 url，当请求这个 url 是我们就给它返回一组 json 数据。正常来讲这些数据应该是从数据库读取的，在这里只模拟一组 json 数据，在当前目录新建一个`data.json`：

```json
{ "name": "尼古拉丁 * 赵四" }
```

所以当前的目录结构是：
![nodejs-3](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/nodejs-3.png)

然后我们可以在 server.js 中判断一下，当请求的 url 是`/data`时，则返回 data.json：

```js
if (url === "/data") {
  fs.readFile("./data.json", function(err, data) {
    if (!err) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(data);
    } else {
      throw err;
    }
  });
}
```

然后打开浏览器 `http://127.0.0.1:8080` 后，就会出现 index.html 页面，点击出现的按钮就会触发一个对 `/data`的 ajax 请求，当 server.js 接受到请求后，就会判断`url === '/data'`，然后它就会吧 `data.json`返回给我们。

最后的实现是点击按钮出现**尼古拉丁 \* 赵四**，  
GItHub 源码：[node-apiDemo](https://github.com/AnsonZnl/StudyNodeJS/tree/master/%E8%AF%BE%E7%A8%8B%E8%AF%BE%E4%BB%B6%E5%8F%8A%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81/apiDemo)

## 参考

- [廖雪峰-http 详解](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345015296018cac40c198b543fead5c549865b9bd4a000)
- [Node-fs](http://nodejs.cn/api/fs.html)
