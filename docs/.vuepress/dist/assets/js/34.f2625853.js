(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{387:function(e,t,r){"use strict";r.r(t);var a=r(43),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h2",{attrs:{id:"引入http模块"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#引入http模块"}},[e._v("#")]),e._v(" 引入Http模块")]),e._v(" "),r("p",[e._v("默认你已经安装了"),r("a",{attrs:{href:"https://nodejs.org/en/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Node.js"),r("OutboundLink")],1),e._v("\nNode当中内置了Http模块；\n可以使用")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('var http= require("http");\n')])])]),r("p",[e._v("引入http模块；")]),e._v(" "),r("h2",{attrs:{id:"hello-world"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#hello-world"}},[e._v("#")]),e._v(" Hello world")]),e._v(" "),r("p",[e._v("用Node.js实现一个HTTP服务器程序非常简单。我们实现一个最简单的Web程序，\n它对于所有请求，都返回Hello world!，新建一个文件夹"),r("code",[e._v("apiDemo")]),e._v(" 在里面新建一个"),r("code",[e._v("server.js")]),e._v("写入：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("// 导入http模块:\nvar http = require('http');\n// 创建http server，并传入回调函数:\nvar server = http.createServer(function (request, response) {\n    // 回调函数接收request和response对象,\n    // 获得HTTP请求的method和url:\n    console.log(request.method + ': ' + request.url);\n    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:\n    response.writeHead(200, {'Content-Type': 'text/html'});\n    // 将HTTP响应的HTML内容写入response:\n    response.end('Hello world!');\n});\n\n// 让服务器监听8080端口:\nserver.listen(8080);\n\nconsole.log('Server is running at http://127.0.0.1:8080/');\n")])])]),r("p",[e._v("然后在当前目录命令提示符下(cmd等)运行， 输入：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("node server.js\n")])])]),r("p",[e._v("然后打开浏览器输入："),r("code",[e._v("http://127.0.0.1:8080/")]),e._v(" 就可以看到：\n"),r("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/12/14/167abd49988fb8f2?w=310&h=193&f=jpeg&s=7500",alt:"91544605447_.pic.jpg"}})]),e._v(" "),r("p",[e._v("同时可以看到命令行中有打印的信息：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("GET: /\nGET: /favicon.ico\n")])])]),r("p",[e._v("主要需要了解的是：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("http.createServer(function(request, response){}) \n")])])]),r("p",[e._v("它的作用是创建一个http服务，里面传一个回调函数，函数中包含两个参数分别是（request，response）。\n其中request是请求对象，response是响应对象。\n可以根据"),r("code",[e._v("request")]),e._v("对象拿到请求头的一些信息，如: "),r("code",[e._v("request.url")]),e._v("--返回请求路径\n响应成功后：\n"),r("code",[e._v("response.writeHead()")]),e._v("————发送一个响应头给请求\n"),r("code",[e._v("response.end('xxx')")]),e._v("————响应成功 返回xxx\n"),r("a",{attrs:{href:"http://nodejs.cn/api/http.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("参考 Nodez中文网-HTTP"),r("OutboundLink")],1)]),e._v(" "),r("h2",{attrs:{id:"路由"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#路由"}},[e._v("#")]),e._v(" 路由")]),e._v(" "),r("p",[e._v("我们是想当访问"),r("code",[e._v("http://127.0.0.1:8080/")]),e._v("的时候返回当前目录的index.html。\n也就是说当"),r("code",[e._v("request.url === '/'")]),e._v("是"),r("code",[e._v("true")]),e._v("时就可以确定当前请求的是根目录了，")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("var url = request.url;\nconsole.log(url);\n// '/'\n")])])]),r("p",[e._v("我们能创建一个服务，并且能使用"),r("code",[e._v("response.end('Hello world!');")]),e._v("返回“Hello world!”。如果想返回一个文件则需要用到Node.js的一个模块了——"),r("strong",[e._v("fs 文件系统")]),e._v("。\n它是Node当中处理文件的模块，首先引入：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("var fs= require('fs');\n")])])]),r("p",[e._v("可以使用"),r("code",[e._v("fs.readFile()")]),e._v("来读取文件")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("fs.readFile('./index.html', function(err, data)  {\n  if (err) throw err;\n  console.log(data);\n// <Buffer 3c 21 44 4f 4...>\n});\n")])])]),r("p",[e._v("回调函数 有两个参数 (err, data)，其中 data 是文件的内容，以二进制形式返回。")]),e._v(" "),r("p",[e._v("然后我们就可以编写代码了，当访问根目录时，返回index.html文件")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("var http= require('http');\nvar fs= require('fs');\nvar server= http.createServer(function(request, response){\n    var url = request.url;\n    if(url === '/'){\n        fs.readFile('./index.html', function(err, data){\n          if(!err){\n            response.writeHead(200, {\"Content-Type\": \"text/html;charset=UTF-8\"});\n            response.end(data)\n          }else{\n              throw err;\n          }\n        });\n    }else{\n        console.log(\"错误\");\n    }\n});\nserver.listen(8080, '127.0.0.1');\n")])])]),r("p",[e._v("然后在当前目录下新建"),r("code",[e._v("index.html")]),e._v("，在这里我们可以写一个ajax请求，一会我们点击按钮来实现ajax请求一组数据：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v(" <div id=\"box\">看不到看不到</div>\n    <button onclick=\"success()\">我是按钮</button>\n    <script>\n    function success(){\n        var http= new XMLHttpRequest();\n        http.onreadystatechange= function(){\n            if(http.status == 200 && http.readyState == 4){\n                var msg= http.responseText;\n                var box= document.getElementById('box');\n                box.innerHTML= JSON.parse(msg).name;\n            }\n        }\n        //发送请求\n        http.open('GET', '/data');\n        http.send();\n    }\n    <\/script>\n")])])]),r("p",[e._v("这段代码是点击按钮的时候 会向"),r("code",[e._v("/data")]),e._v("发起一个ajsx请求,")]),e._v(" "),r("h2",{attrs:{id:"实现简单的api接口"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#实现简单的api接口"}},[e._v("#")]),e._v(" 实现简单的API接口")]),e._v(" "),r("p",[e._v("既然能访问根目录时可以返回html文件，那我们可以自己设定一个url，当请求这个url是我们就给它返回一组json数据。正常来讲这些数据应该是从数据库读取的，在这里只模拟一组json数据，在当前目录新建一个"),r("code",[e._v("data.json")]),e._v("：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v('{"name": "尼古拉丁 * 赵四"}\n')])])]),r("p",[e._v("所以当前的目录结构是：\n"),r("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2018/12/14/167abd4998736425?w=402&h=170&f=jpeg&s=4634",alt:"41544775041_.pic.jpg"}})]),e._v(" "),r("p",[e._v("然后我们可以在server.js中判断一下，当请求的url是"),r("code",[e._v("/data")]),e._v("时，则返回data.json：")]),e._v(" "),r("div",{staticClass:"language- extra-class"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("if(url === '/data'){\n        fs.readFile('./data.json', function(err, data){\n            if(!err){\n                response.writeHead(200, {\"Content-Type\": \"application/json\"});\n                response.end(data);\n            }else{\n                throw err;\n            }\n        })\n    }\n")])])]),r("p",[e._v("然后打开浏览器 "),r("code",[e._v("http://127.0.0.1:8080")]),e._v(" 后，就会出现index.html页面，点击出现的按钮就会触发一个对 "),r("code",[e._v("/data")]),e._v("的ajax请求，当server.js接受到请求后，就会判断"),r("code",[e._v("url === '/data'")]),e._v("，然后它就会吧  "),r("code",[e._v("data.json")]),e._v("返回给我们。")]),e._v(" "),r("p",[e._v("最后的实现是点击按钮出现"),r("strong",[e._v("尼古拉丁 * 赵四")]),e._v("，"),r("br"),e._v("\nGItHub源码："),r("a",{attrs:{href:"https://github.com/AnsonZnl/StudyNodeJS/tree/master/%E8%AF%BE%E7%A8%8B%E8%AF%BE%E4%BB%B6%E5%8F%8A%E7%A4%BA%E4%BE%8B%E4%BB%A3%E7%A0%81/apiDemo",target:"_blank",rel:"noopener noreferrer"}},[e._v("node-apiDemo"),r("OutboundLink")],1),r("br"),e._v("\n参考："),r("br"),e._v(" "),r("a",{attrs:{href:"https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345015296018cac40c198b543fead5c549865b9bd4a000",target:"_blank",rel:"noopener noreferrer"}},[e._v("廖雪峰-http详解"),r("OutboundLink")],1),r("br"),e._v(" "),r("a",{attrs:{href:"http://nodejs.cn/api/fs.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Node-fs"),r("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=n.exports}}]);