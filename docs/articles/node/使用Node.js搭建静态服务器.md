---
title: 使用NodeJS 搭建静态服务器
date: 2018-12-21 16:21:55
tags: ["NodeJS"]
---


>我们可以使用Node设定一个目录，然后让Web程序变成一个文件服务器。要实现这一点，我们只需要解析request.url中的路径，然后在本地找到对应的文件，把文件内容发送出去就可以了。

解析URL需要用到Node.js提供的url模块，它使用起来非常简单，通过parse()将一个字符串解析为一个Url对象：
```js
var url= require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

```
解析之后是：
```js
    Url {
        protocol: 'http:',
        slashes: true,
        auth: 'user:pass',
        host: 'host.com:8080',
        port: '8080',
        hostname: 'host.com',
        hash: '#hash',
        search: '?query=string',
        query: 'query=string',
        pathname: '/path/to/file',
        path: '/path/to/file?query=string',
        href:
         'http://user:pass@host.com:8080/path/to/file?query=string#hash' 
        }
```
处理本地文件目录需要使用Node.js提供的path模块，它可以方便地构造目录：
```js
var path = require('path');

// 解析当前目录:
console.log(path(__dirname));
//__dirname 表示当前所在目录  '/Users'

// 组合完整的文件路径:当前目录+'pub'+'index.html':
var filePath = path.join(__dirname, 'fileServer', 'index.html');
// '/Users/fileServer/index.html'
```

使用path模块可以正确处理操作系统相关的文件路径。在Windows系统下，返回的路径类似于`C:\Users\fileServer\index.html`，这样，我们就不关心怎么拼接路径了。

最后，我们实现一个文件服务器file_server.js：
```js
var 
    http= require('http'),
    fs= require('fs'),
    url= require('url'),
    path= require('path');
    
// 从命令行参数获取root目录，默认是当前目录:
var root= path.join(__dirname, 'static', 'index.html');

//创建服务器
var server= http.createServer(function(request, response){
    //获得ur的path 类似'/css/index.css'
    var pathName= url.parse(request.url).pathname;
    //获得对应的本地文件路径 类似’static/css/index.css‘
    var filePath= path.join(root);
    //获取文件状态
    console.log(filePath);
    fs.stat(filePath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filePath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');
```
当你的html文件是这样的时候：
```html
<head>
    <meta charset="UTF-8">
    <title>Road</title>
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
    <img src="/images/bg.jpeg" alt="11">
    <h1>书山有路勤为径,学海无涯苦做舟。</h1>
    <script src="js/index.js"></script>
</body>
```
然后请求`http://127.0.0.1:8080/index.html`就会打印出：
![101544689152_.pic.jpg](https://upload-images.jianshu.io/upload_images/7072486-5c918eec1e59e4ad.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

当然他只能发起请求，想要请求到并且正确返回还需要设置文件的ContentType属性。
我们可以使用`path.extname`获取请求文件的后缀：
```js
let extname = path.extname('css/index.css');
// .css
```
我们获取到后缀之后就可以根据后缀来设置它的ContentType，这里需要用到一个mime.json文件，然后使用一个函数去匹配:
```js
//mime 读取mime.json 里面存储了常见的文件的ContentType 为请求的对应的文件设置对应的 ContentType 属性
function getContentType(extName, callBack){
                //      文件后缀   回调函数
    //读取mime.json
    fs.readFile('./mime.json', (err, data)=>{
        if(err){
        //读取失败 抛出错误
            throw err;
            return;
        }
        // 读取成功
        let mimeJson = JSON.parse(data);
        //转码 将json字符串转化成对象
        let contentType = mimeJson[extName] || 'text/plain';
        //取出对应json中 对应的 请求的后缀的相匹配的 ContentType 属性
        callBack(contentType);
        //执行这个回调函数 并传参contentType
    })
}
```
搭建静态服务器的步骤应该是：
1. 先拿到请求文件的后缀名(extname)
2.  引入mime.json 文件并读取->转码
3. 匹配和后缀对应的ContentType
4. 使用回调函数 所有请求的文件 都会拿到后缀 然后自动匹配相应的ContentType
5. 执行getContentType函数


```js
            getContentType(extname, (contentType)=>{
                res.writeHead(200, {"Content-Type": contentType + ';charset=UTF-8'})
                res.end(data)
            })
```
## 参考：
- [常见文件的mime类型](https://blog.csdn.net/kuangshp128/article/details/75207984)
- [GitHub-Node 学习笔记](https://github.com/AnsonZnl/StudyNodeJS/blob/master/%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/%E8%AF%BE%E6%97%B666-%E8%AF%BE%E6%97%B671%E7%AC%94%E8%AE%B0.md)

- [参考-Node path模块相关方法](https://www.cnblogs.com/xxchi/p/6382892.html)