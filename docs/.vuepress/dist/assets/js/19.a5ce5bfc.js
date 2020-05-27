(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{418:function(t,e,s){"use strict";s.r(e);var r=s(43),n=Object(r.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("在使用Vue搭建的一个后端管理系统中，我使用axios请求本地的Node环境下的接口，但是请求失败，然后我错误信息是：\n"),s("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/3/15/169808e13bfe3533?w=1159&h=38&f=jpeg&s=12458",alt:"331552554043_.pic.jpg"}}),t._v("\n大概意思就是不能访问"),s("code",[t._v("http://localhost:8080")]),t._v("\n我的Vue项目端口是"),s("code",[t._v("http://localhost:8081")]),t._v("，Node服务端运行在"),s("code",[t._v("http://localhost:8080")]),t._v("端口上，也就是说因为请求端口和响应端口不一致，所以请求失败。\n我也在网上查看了一些关于跨域出现的原因及解决的方法，并记录下来。")]),t._v(" "),s("h2",{attrs:{id:"为什么会有跨域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#为什么会有跨域"}},[t._v("#")]),t._v(" 为什么会有跨域")]),t._v(" "),s("blockquote",[s("p",[t._v("跨域一句话的理解就是：服务端和请求端的地址不一样。")])]),t._v(" "),s("h3",{attrs:{id:"什么是跨域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是跨域"}},[t._v("#")]),t._v(" 什么是跨域")]),t._v(" "),s("p",[t._v("Ajax 的便利性大家都清楚，可以在不向服务器提交完整的页面的情况下，实现局部更新页面。但是浏览器处于对安全方面的考虑，不允许跨域调用其他页面的对象。"),s("br"),t._v("\n其实这个也不能怪浏览器，假设谁都可以随随便便向你发送请求，那样有很大的安全隐患。"),s("br"),t._v("\n根据浏览器的同源策略, 只有当协议，域名，端口相同的时候才算是同源, 反之则均视为是一个跨域的请求."),s("br"),t._v("\n也就是说我刚刚的Vue端口是"),s("code",[t._v("8081")]),t._v("，服务端端口是"),s("code",[t._v("8080")]),t._v("，端口不一样，因为同源策略的存在 ，所有我的请求会失败。")]),t._v(" "),s("blockquote",[s("p",[t._v("一个问题，当找到了原因，这个问题就解决了一半了。")])]),t._v(" "),s("h2",{attrs:{id:"怎么解决跨域"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#怎么解决跨域"}},[t._v("#")]),t._v(" 怎么解决跨域")]),t._v(" "),s("p",[t._v("下面就先介绍三种跨全域的方法：")]),t._v(" "),s("h3",{attrs:{id:"jsonp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#jsonp"}},[t._v("#")]),t._v(" JSONP")]),t._v(" "),s("p",[t._v("应该是最常见解决跨域的方法了，\n他为什么能解决跨域呢，是因为Web 页面上调用 js 文件不受浏览器同源策略的影响，所以通过 Script 便签可以进行跨域的请求：")]),t._v(" "),s("ol",[s("li",[t._v("首先前端先设置好回调函数，并将其作为 url 的参数。")]),t._v(" "),s("li",[t._v("服务端接收到请求后，通过该参数获得回调函数名，并将数据放在参数中将其返回")]),t._v(" "),s("li",[t._v("收到结果后因为是 script 标签，所以浏览器会当做是3脚本进行运行，从而达到跨域获取数据的目的。\n我的前端是"),s("code",[t._v("index.html")]),t._v("，后端是"),s("code",[t._v("server.js")]),t._v("\n后端逻辑：")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("//server.js\nconst url = require('url');\nconst http = require('http');\n\nhttp.createServer((req, res)=>{\nconst data = {\n    x: 10//返回的数据\n};\nconst callback = url.parse(req.url, true).query.callback;\nres.writeHead(200);\nres.end(`${callback}(${JSON.stringify(data)})`);\n//执行回调函数，返回data\n}).listen(3000, 'localhost');\n\nconsole.log('启动服务，监听 localhost:3000');\n")])])]),s("p",[t._v("然后使用"),s("code",[t._v("node server.js")]),t._v("运行\n前端：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("//index.html\n<body>\n    <script>\n\tfunction jsonpCallback(data) {\n\t    console.log('获得 X 数据:' + data.x);\n\t}\n    <\/script>\n    <script src=\"http://localhost:3000?callback=jsonpCallback\"><\/script>\n</body>\n")])])]),s("p",[t._v("之后打开index.html;就可以在控制台看到返回的数据了：\n"),s("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/3/15/169808e13be099dc?w=207&h=85&f=jpeg&s=4222",alt:"341552556856_.pic.jpg"}})]),t._v(" "),s("p",[t._v("至此，通过 JSONP 跨域获取数据已经成功了，jsonp这种方法跨域，他的兼容性很好，可以在古老的浏览器中国使用，因为这种方法是利用了"),s("code",[t._v("<script>")]),t._v("标签的特殊性，所有只支持GET请求。")]),t._v(" "),s("h3",{attrs:{id:"cors"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cors"}},[t._v("#")]),t._v(" CORS")]),t._v(" "),s("p",[t._v('CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing）它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 ajax 只能同源使用的限制。')]),t._v(" "),s("p",[t._v("CORS 需要浏览器和服务器同时支持才可以生效，对于开发者来说，CORS 通信与同源的 ajax 通信没有差别，代码完全一样。浏览器一旦发现 ajax 请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。")]),t._v(" "),s("p",[t._v("因此，实现 CORS 通信的关键是服务器。只要服务器实现了 CORS 接口，就可以跨源通信。")]),t._v(" "),s("p",[t._v("前端：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"><\/script>\n<script>\n$.ajax({\n    url:"http://127.0.0.1:3000",\n    success:function(res){\n        var res = JSON.parse(res);\n        $(\'body\').text(res.data);\n        console.log(res.data);\n    }\n});\n<\/script>\n')])])]),s("p",[t._v("这次前端启动需要使用"),s("code",[t._v("node-server")]),t._v("来启动，使用"),s("code",[t._v("npm install node-server")]),t._v("下载，然后当前目录下使用"),s("code",[t._v("node-server")]),t._v("就可以了\n后端：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("const http = require('http');\n\nhttp.createServer((req, res)=>{\nconst data = {\n    'data': 'Hello world'//返回的数据\n};\nres.writeHead(200, {'Access-Control-Allow-Origin': 'http://127.0.0.1:8080'});\n//设置的头部信息需要和前端请求的地址一致\nres.end(JSON.stringify(data));\n//返回data\n}).listen(3000, '127.0.0.1');\n\nconsole.log('启动服务，监听 127.0.0.1:3000');\n")])])]),s("p",[t._v("使用命令"),s("code",[t._v("node server.js")]),t._v("启动；\n"),s("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/3/15/169808e13bc07597?w=1240&h=792&f=jpeg&s=63249",alt:"211552638161_.pic_hd.jpg"}})]),t._v(" "),s("p",[t._v("CORS与JSONP的使用目的相同，但是比JSONP更强大。")]),t._v(" "),s("p",[t._v("JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。")]),t._v(" "),s("h3",{attrs:{id:"server-proxy"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#server-proxy"}},[t._v("#")]),t._v(" Server Proxy")]),t._v(" "),s("p",[t._v("服务器代理，顾名思义，当你需要有跨域的请求操作时发送请求给后端，让后端帮你代为请求，然后最后将获取的结果发送给你。")]),t._v(" "),s("p",[t._v("假设有这样的一个场景，你的页面需要获取 "),s("a",{attrs:{href:"http://link.zhihu.com/?target=https%3A//cnodejs.org/api",target:"_blank",rel:"noopener noreferrer"}},[t._v("CNode：Node.js专业中文社区"),s("OutboundLink")],1),t._v(" 论坛上一些数据，如通过 "),s("a",{attrs:{href:"https://cnodejs.org/api/v1/topics",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://cnodejs.org/api/v1/topics"),s("OutboundLink")],1),t._v("，当时因为不同域，所以你可以将请求后端，让其对该请求代为转发。")]),t._v(" "),s("p",[t._v("后端代码如下：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("const url = require('url');\nconst http = require('http');\nconst https = require('https');\n\nhttp.createServer((req, res)=>{\nconst path = url.parse(req.url).path.slice(1);\n//核对请求路由是否一致\nif(path === 'topics'){\n    https.get('https://cnodejs.org/api/v1/topics', (resp)=>{\n        //https代发请求\n        let data='';\n        resp.on('data', chunk=>{\n            data+= chunk\n        });\n        resp.on('end', ()=>{\n            res.writeHead(\n                200,\n                {'Content-Type': 'application/json; charset=utf-8'}\n            );\n            res.end(data);\n            //返回数据\n        })\n    })\n}\n\n}).listen(3000, '127.0.0.1');\n\nconsole.log('启动服务，监听 127.0.0.1:3000');\n")])])]),s("p",[t._v("前端代码：")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('<script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"><\/script>\n<script>\n$.ajax({\n    url:"https://cnodejs.org/api/v1/topics",\n    success:function(res){\n        $(\'body\').text(JSON.stringify(res));\n        console.log(res);\n    }\n});\n<\/script>\n')])])]),s("p",[t._v("这样就成功了\n"),s("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/3/15/169808e13bdda705?w=1111&h=815&f=jpeg&s=297478",alt:"221552639459_.pic_hd.jpg"}})]),t._v(" "),s("h3",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("p",[t._v("常用的跨域方式基本就是这三种：")]),t._v(" "),s("ol",[s("li",[t._v("JSONP\n优点是可以兼容老浏览器，缺点是只能发送GET请求")]),t._v(" "),s("li",[t._v("CORS\n优点简单方便，支持post请求，缺点是需要后端的配合,不支持老版浏览器。。")]),t._v(" "),s("li",[t._v("Server Proxy\n优点是前端正常发送ajax请求，缺点是后端会二次请求。")])]),t._v(" "),s("p",[t._v("其他的跨域方式还有："),s("code",[t._v("location.hash")]),t._v("、"),s("code",[t._v("window.name")]),t._v("、"),s("code",[t._v("postMessage")]),t._v("等方式，有时间也可以了解一下。")]),t._v(" "),s("p",[t._v("参考资料：")]),t._v(" "),s("ul",[s("li",[t._v("跨域资源共享 CORS 详解[阮一峰的博客]：http://www.ruanyifeng.com/blog/2016/04/cors.html")]),t._v(" "),s("li",[t._v("关于跨域，你想知道的全在这里：https://zhuanlan.zhihu.com/p/25778815")]),t._v(" "),s("li",[t._v("不要再问我跨域的问题了[sf]：https://segmentfault.com/a/1190000015597029")]),t._v(" "),s("li",[t._v("关于跨域,以及跨域的几种方式[cnblog]：https://www.cnblogs.com/chenshishuo/p/4919224.html")]),t._v(" "),s("li",[t._v("浏览器的同源策略[MDN]:https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy")])])])}),[],!1,null,null,null);e.default=n.exports}}]);