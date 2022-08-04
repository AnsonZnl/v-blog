
Koa源码地址：[https://github.com/koajs/koa](https://github.com/koajs/koa)

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

```

