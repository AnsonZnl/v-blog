# NodeJS文件系统（fs）与流（stream）

## **文件系统（File System）：**

1.  在Node中，文件系统的交互是非常重要的，服务器的本质就是将本地的文件发送给客户端，
2.  Node通过fs模块来和文件系统进行交互，该模块提供了一些标准的文件访问API类打开、读取、写入文件、以及与其交互。
3.  要是用fs模块，首先要从核心模块中加载； 使用 const fs= require('fs') ; 来引入

### fs使用特点：

1.  fs模块中的所有操作都有两种形式可供选择同步和异步，
2.  同步文件系统会阻塞程序的执行，也就是除非操作完毕，否则不会向下执行代码。
3.  异步文件系统不会阻塞程序的执行，而是在操作完成时，通过回调函数将结果返回。

```js
//1. 引入模块
const fs= require("fs");
// console.log(fs)

//2. 打开文件
// fs.open 异步读取（通常用异步 需设置回调函数）  
// fs.openSync 同步读取（读取时会阻塞线程）

let hello = fs.openSync("hello.txt", "w");
//                     不存在会自动新建

//3. 写入内容
fs.writeFileSync(hello,'hello word!');

//4. 保存并退出
fs.closeSync(hello);

```
 [](https://github.com/AnsonZnl/StudyNodeJS/blob/master/%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/%E8%AF%BE%E6%97%B630-%E8%AF%BE%E6%97%B634%E7%AC%94%E8%AE%B0.md#%E8%AF%BE%E6%97%B631)

### 文件操作：

1.  打开文件： 
`fs.open(path,flags[,mode],callback)`
 异步打开 异步都是回调 回调嵌套回调
`fs.openSync(path,flags[,mode])`
同步打开 
    

文件标记（flags）： [http://nodejs.cn/api/fs.html#fs_fs_open_path_flags_mode_callback](http://nodejs.cn/api/fs.html#fs_fs_open_path_flags_mode_callback)


一、同步打开文件
```js
    //1. 引入模块 
    let fs = require('fs');

    //2.打开文件 同步
    var fd=fs.openSync('1.txt', 'w');

    //3.写入内容
    fs.writeFileSync(fd,"hello world!"); 

    //4. 保存并关闭
    fs.closeSync(fd);
```
 二、异步打开文件
```js
   //1.引入模块
   let fs = require('fs');

   //2. 打开文件
   fs.open('1.txt', 'a', (err, fd)=>{
       //2.1判断是否出错
       if(!err){
           //正确 2.2写入文件
           fs.writeFile(fd, "今天天.....气真好！", (err)=>{
                //2.2.1 写入成功
                if(!err){
                    console.log('写入成功');
                }else{
                    throw err;
                }
                //2.3 关闭文件
                fs.close(fd, (err)=>{
                    if(!err){
                        console.log('文件以保存并关闭')
                    }else{
                        throw err;
                    }
                })
           })
       }else{
           throw err;
       }
   })

```
[](https://github.com/AnsonZnl/StudyNodeJS/blob/master/%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/%E8%AF%BE%E6%97%B630-%E8%AF%BE%E6%97%B634%E7%AC%94%E8%AE%B0.md#%E8%AF%BE%E6%97%B632)
### 使用文件流写入
文件流写入： [http://nodejs.cn/api/fs.html#fs_fs_createwritestream_path_options](http://nodejs.cn/api/fs.html#fs_fs_createwritestream_path_options)

```js
//同步操作
//1. 引入模块
let fs= require('fs');

//2.建立通道
let ws = fs.createWriteStream('fsw.txt')

//3.打开通道
ws.once('open', ()=>{
    console.log('通道已经打开');
})

ws.once('close', ()=>{
    console.log('通道已经关闭');
})

//4\. 写入内容
ws.write('我爱你，');
ws.write('我爱你，');
ws.write('我爱你，');

```

 [](https://github.com/AnsonZnl/StudyNodeJS/blob/master/%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/%E8%AF%BE%E6%97%B630-%E8%AF%BE%E6%97%B634%E7%AC%94%E8%AE%B0.md#%E8%AF%BE%E6%97%B633)

### 读写文件： 
文档地址：[http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback](http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback)
读取文档：

```js
//1. 引入模块
let fs = require('fs');

//2. 读取文件
fs.readFile('source/hello.txt','utf8',(err,data)=>{
    //判断是否成功
    if(!err){
        console.log(data);//
        // console.log(data.toString());
        //data 默认读取的是二进制 使用toString() 方法转换成
    }else{
        throw err;
    }
})

读取图片：

//3. 读取图片
fs.readFile("source/psb.jpg",(err,data)=>{
    //判断是否成功
    if(!err){
        //写入图片
        fs.writeFile('img.jpg', data, (err)=>{
            if(!err){
                console.log('写入成功！')
            }else{
                throw err;
            }
        })
    }else{
        throw err;
    }
});

```

[](https://github.com/AnsonZnl/StudyNodeJS/blob/master/%E8%AF%BE%E7%A8%8B%E7%AC%94%E8%AE%B0/%E8%AF%BE%E6%97%B630-%E8%AF%BE%E6%97%B634%E7%AC%94%E8%AE%B0.md#%E8%AF%BE%E6%97%B634)

**读取视频:**

```js
//1. 引入模块
let fs= require('fs');

//2. 读取视频
fs.readFile('source/cddbb.mp4', (err, data)=>{
    if(!err){
        // 写入视频
        fs.writeFile('nmx.mp4', data, (err)=>{
            if(!err){
                console.log('写入成功！');
            }else{
                throw err;
            }
        })
    }else{
        throw err;
    }
})

//3. 流式文件的读入（批量文件处理）
let re= fs.createReadStream('source/cddbb.mp4');
//建立读取流
let ws= fs.createWriteStream('新建的视频.mp4');
//建立写入流

//4. 创建管道
re.pipe(ws);//文件流传输
console.log('文件流传输完成')
```
参考：[详解NodeJS文件系统fs](https://www.jb51.net/article/133553.htm)
我的GitHub总结的[NodeJS笔记](https://github.com/AnsonZnl/StudyNodeJS)