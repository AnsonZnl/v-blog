## 知识讲解
 koa2框架是一个基于中间件的框架，也就是说，需要使用到的功能，比如路由（koa-router），日志（koa-logger），都可以找到相应的中间件库，即npm包，然后通过app.use(…)引进来。    
 本文的主题：实现文件上传就是通过引用相应的中间来实现的。
 我查了一下资料，发现可以实现文件上传的中间件有3个，选择其中一个就可以了：
 1. koa-body
 2. busboy
 3. koa-multer    
 
 关于以上三种中间件的差异可以自行网上查资料，这里我选择比较顺眼的koa-body，实用简单。
## 代码实现
 步骤一：下载koa-body npm包
 ``` js
 npm install koa-body --save
```
 步骤二：在koa项目中引用koa-body中间件

 ``` js
 const koaBody = require('koa-body');
 app.use(koaBody({
     multipart: true,
     formidable: {
         maxFileSize: 20010241024    // 设置上传文件大小最大限制，默认2M
     }
 }));

```
 步骤三：使用koa-body中间件后，即可通过ctx.request.files获取上传的文件    
 提醒：     
 新版本的koa-body通过ctx.request.files获取上传的文件    
 旧版本的koa-body通过ctx.request.body.files获取上传的文件    
 朋友们千万不要入坑哈，本人就入坑过半天。

步骤四：获取到文件之后，通过fs将文件保存到服务器的指定目录
 上传单个文件：
 ``` js
router.post('/uploadfile', async (ctx, next) => {
   // 上传单个文件
   const file = ctx.request.files.file; // 获取上传文件
   // 创建可读流
   const reader = fs.createReadStream(file.path);
   let filePath = path.join(__dirname, 'public/upload/') + /${file.name};
   // 创建可写流
   const upStream = fs.createWriteStream(filePath);
   // 可读流通过管道写入可写流
   reader.pipe(upStream);
   return ctx.body = "上传成功！";
 });

```
 上传多个文件:
 ```js
router.post('/uploadfiles', async (ctx, next) => {
   // 上传多个文件
   const files = ctx.request.files.file; // 获取上传文件
   for (let file of files) {
     // 创建可读流
     const reader = fs.createReadStream(file.path);
     // 获取上传文件扩展名
     let filePath = path.join(__dirname, 'public/upload/') + /${file.name};
     // 创建可写流
     const upStream = fs.createWriteStream(filePath);
     // 可读流通过管道写入可写流
     reader.pipe(upStream);
   }
  return ctx.body = "上传成功！";
 });
 ```
## 前端代码
 顺便把前端的代码也附上，前端通过提交表单，把文件发送到你的服务器
``` js

 <form action="http://localhost:8080/api/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file" id="file" value="" multiple="multiple" />
    <input type="submit" value="提交"/>
</form>

```
## 最后总结
 今天在项目中实现文件上传的时候，也一不小心入了一下坑，为什么呢？（请看以上步骤三）    
 在网上找的大部分资料都是通过ctx.request.body.files来获取上传的文件，这个是旧版本的koa-body的获取文件方法，为了安全考虑，新版本的koa-body采用ctx.request.files来获取文件。    
 总结原因，以后要学会找官方文档，以官方文档为主，其他文档为辅，这样才对。 