
- Koa源码地址：[https://github.com/koajs/koa](https://github.com/koajs/koa)
- [Koa 中文文档](https://koa.bootcss.com/)
- [Koa 官方英文文档](https://github.com/koajs/koa/tree/master/docs)

## 前言
> Koa是继Express后新的Node框架,由Express原班人马开发,相比Express更加简洁,源码只有2000多行,结合最新的ECMA语法,这使得Koa更小 更具有表现力 更健壮,因为每个中间件的执行结果都是Promise,结合Async Await抛弃复杂的传统回调形式。并且错误结果处理起来也更加方便

## 创建一个简单的Koa服务
``` js
// yarn add koa
const Koa = require('koa');
const app = new Koa();
app.use((ctx)=>{
    ctx.body = 'Hello Koa';
})
app.listen(9001,()=>{
    console.log('🎉服务开启成功,端口号为:9001')
})
```
## 分析源码并实现自己的Koa
![image.png](https://s2.loli.net/2022/08/04/hrXDndIewobpcq2.png)

1. 创建一个新的文件夹,使用npm init初始项目,package.json中添加启动命令
``` js
{
  "name": "koa-server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "serve": "nodemon server.js"
  }
}
```
2. 文件夹内新建koa文件夹并使用npm init初始项目,package.json中指定入口文件
``` js
{
  "name": "koa",
  "version": "1.0.0",
  "main": "./lib/application.js"
}
```

3. 在koa文件中新建lib文件,在lib文件中新建application.js context.js request.js response.js

![image.png](https://s2.loli.net/2022/08/04/8B2zmxqHdPphuiE.png)

## 分析并实现request.js文件

Koa源码中request.js文件做了很多请求相关的参数处理,通过get/set的访问方式对属性进行了包装,使用户获取属性更加方便

``` js
//节选自：https://github.com/koajs/koa/blob/master/lib/request.js
/**
* Get request URL.
* @return {String}
* @api public
*/

get url () {
  return this.req.url
},

/**
* Set request URL.
* @api public
*/

set url (val) {
  this.req.url = val
},

```

- 实现自己的request.js

内部的this指向ctx.request, 所以ctx.request上面必须有req对象,该对象指向原生的request对象

``` js
const url = require('url');
module.exports = {
  get query() {
    const { query } = url.parse(this.req.url);
    return query;
  },
  get path() {
    const { pathname } = url.parse(this.req.url);
    return pathname;
  },
};
```

## 实现context.js

- context除了提供自身方法和属性外,还对其他属性进行了委托 ``(将请求相关的属性委托到ctx.requset上,将响应相关的属性和方法代理到ctx.response)``.  
- 用户访问ctx.body其实访问的是ctx.request.body``(后续创建上下文对象ctx时,会将request挂载到ctx身上)``.  
- delegate的原理就是 ``__defineGetter__``,``__defineSetter__``属性,可以访问对象属性时,将属性委托到其他对象身上

``` js
const delegate = require('delegates');
const proto = (module.exports = {
  // 给context自身添加属性和方法
  toJSON() {
    return {};
  },
});

// 当直接访问ctx.xx时 委托到ctx.response.xx身上
delegate(proto, 'response')
  .access('body')
  .access('status');

// 当直接访问ctx.xx时 委托到ctx.request.xx身上
delegate(proto, 'request')
  .access('query')
  .access('path')
  .access('url');

```

[delegates](https://github.com/tj/node-delegates)是一个对象访问代理的JS库。

[__defineGetter__](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__)方法可以将一个函数绑定在当前对象的指定属性上，当那个属性被读取时，就调用这个绑定的方法。（其实可以使用Object.defineProperty、对象的get/set、proxy代替）

1. delegate内部也是通过__defineGetter__, __defineSetter__两种方法实现的属性委托
2. 上面的context实现方式, 也可以通过下面__defineGetter__, __defineSetter__直接实现

``` js
const proto = (module.exports = {
  // 给context自身添加属性和方法
  toJSON() {
    return {};
  },
});
function defineGetters(taregt, key) {
  proto.__defineGetter__(key, function() {
    return this[taregt][key];
  });
}
defineGetters('request', 'query');
defineGetters('request', 'path');
defineGetters('request', 'url');
defineGetters('response', 'body');
defineGetters('response', 'status');

function defineSetters(target, key) {
  proto.__defineSetter__(key, function(value) {
    this[target][key] = value;
  });
}
defineSetters('response', 'body');
defineSetters('response', 'status');
```

## 分析并实现response.js

将cxt.header代理到this.res.header上。

``` js
// https://github.com/koajs/koa/blob/master/lib/response.js
/**
   * Return response header.
   *
   * @return {Object}
   * @api public
   */

  get header () {
    const { res } = this
    return typeof res.getHeaders === 'function'
      ? res.getHeaders()
      : res._headers || {} // Node < 7.7
  },

  /**
   * Return response header, alias as response.header
   *
   * @return {Object}
   * @api public
   */

  get headers () {
    return this.header
  },

  /**
   * Get response status code.
   *
   * @return {Number}
   * @api public
   */

  get status () {
    return this.res.statusCode
  },
```

- response内部通过get set 提供了很多响应相关的属性和方法
- 简单实现自己的response.js

``` js
const response = {
  _body: undefined,
  get body() {
    return this._body;
  },
  set body(value) {
    this._body = value;
  },
  get status() {
    return this.res.statusCode;
  },
  set status(code) {
    this.res.statusCode = code;
  },
};
module.exports = response;
```

## 剖析application源码并实现它

### (1）构造函数

- 继承Events函数,可以直接订阅或发布事件
- 通过Object.create()分别创建context,request,response对象,目的是为了基于原型链创建一个新对象,避免全局中多个程序造成对象引用污染
- 创建中报错间件的集合middleware

``` js
module.exports = class Application extends EventEmitter {
  constructor() {
    super();
    // 创建全新的context request response对象
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    // 保存中间件的数组
    this.middleware = [];
  }
}
```

## (2）use()
1. 验证并添加中间件
``` js
use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    // 将注册的中间件添加到数组中管理
    this.middleware.push(fn);
 }
```

![image.png](https://s2.loli.net/2022/08/05/ZlzrVMJmIiLCfkx.png)

