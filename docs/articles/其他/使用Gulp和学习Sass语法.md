---
title: 使用Gulp和学习Sass语法
date: 2018-1-24 12:42:44
tags: ["Sass","CSS","Gulp","NodeJS"]
---
## 前要
系统：win7、win10
终端工具：cmd（或使用系统终端：win+R -> 输入cmd -> 回车） 
gulp官网地址：[http://www.gulpjs.com.cn/](http://www.gulpjs.com.cn/) 
gulp中文文档：[http://www.gulpjs.com.cn/docs/](http://www.gulpjs.com.cn/docs/) 
gulp插件地址：[http://gulpjs.com/plugins](http://gulpjs.com/plugins) 
gulpAPI地址：[http://www.gulpjs.com.cn/docs/api/](http://www.gulpjs.com.cn/docs/api/)
## 一、安装node
window下，下载node安装即可。 
node下载地址：[http://nodejs.cn/download/](http://nodejs.cn/download/) 
安装比较简单，基本一直下一步即可，安装路径随意。
为了确保Node已经正确安装，我们执行几个简单的命令。
`` node -v ``
回车（Enter），如果正确安装的话，你会看到所安装的Node的版本号，接下来看看npm。
`` npm -v ``
这同样能得到npm的版本号。
如果这两行命令没有得到返回，可能node就没有安装正确，尝试重启下命令行工具，如果还不行的话，只能进行重装。
![](http://p0bnwspy9.bkt.clouddn.com/sass1.jpg)
**推荐使用cnpm  由于国外的网速不稳定 cnpm 比较好用**
注：cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm。后面的演示均使用cnpm 
**安装cnpm**
执行 
`` npm install cnpm -g --registry=https://registry.npm.taobao.org ``
**2. 检测cnpm是否安装成功**
![](http://p0bnwspy9.bkt.clouddn.com/sass2.jpg)
输入
`` cnpm -v ``
返回版本号即成功
## 三、全局安装gulp
**全局安装gulp**
在cmd命令行中执行
`` cnpm install gulp -g ``
下载之后查看是否安装正确
`` ulp -v ``
![](http://p0bnwspy9.bkt.clouddn.com/sass4.jpg)
## 四、项目文件根目录新建package.json
示例：进入 D:/WWW/test 项目文件夹中 
![](http://p0bnwspy9.bkt.clouddn.com/sass3.jpg)
执行命令
`` cnpm init ``
![](http://p0bnwspy9.bkt.clouddn.com/sass5.jpg)
**查看项目文件根目录，是否新建package.json，且内容是否和你终端中输入的一致。 **
package.json内容如下:
``` {
  "name": "test",
  "version": "1.0.0",
  "description": "我是描述",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
} ```
## 五、本地安装gulp插件
**注：全局安装gulp是为了执行gulp任务，本地安装gulp则是为了调用gulp插件的功能**
进入你的项目文件路径中后，执行
```cnpm install gulp --save-dev ```
![](http://p0bnwspy9.bkt.clouddn.com/sass5a.jpg)
## 六、新建gulpfile.js
gulpfile.js是gulp的配置文件，放于项目目录中。
``` //gulpfile.js 示例文件

//导入你所需要用的工具包 require('node_modules里对应模块')
var gulp = require('gulp'),
    sass = require('gulp-sass');

// scss 任务
gulp.task('sass',function(){
  return gulp.src('src/css/test.scss') //获取该任务需要的文件
      .pipe( sass() )                  //该任务调用的模块
      .pipe( gulp.dest('src/css') );   //将在 src/css 文件夹中生产test.css
});

// 默认任务
gulp.task('default',['sass','watch1']);

//监听文件
gulp.task('watch1',function(){
    return gulp.watch('src/css/test.scss',['sass']);
    //监听 src/css/test.scss 文件，修改时自动执行 sass 任务。
}); ```
## 七、运行gulp中的sass
![](http://p0bnwspy9.bkt.clouddn.com/sass6.jpg)
**执行gulp 调用default中的所有任务**
![](http://p0bnwspy9.bkt.clouddn.com/sass7.jpg)
如图：开启监听事件，当 src/css/test.scss 发生修改时，会自动执行sass任务。 
![](http://p0bnwspy9.bkt.clouddn.com/sass8.jpg)
sass的编译（gulp-sass）
less编译 （gulp-less）
重命名（gulp-rename）
图片转换为base64-encoded （gulp-img64）
自动添加css前缀（gulp-autoprefixer）
压缩css（gulp-clean-css）
js代码校验（gulp-jshint）
合并js文件（gulp-concat）
压缩js代码（gulp-uglify）
压缩图片（gulp-imagemin）
自动刷新页面（gulp-livereload，谷歌浏览器亲测，谷歌浏览器需安装livereload插件）
图片缓存，只有图片替换了才压缩（gulp-cache）
更改提醒（gulp-notify）
阻止 gulp 插件发生错误导致进程退出并输出错误日志(gulp-plumber)

## 八、参考文件
本文参考借鉴多篇文章 在 加上自己的实际测试后，写了这篇文章。 
如有不妥之处和疑问的地方，请留言赐教，谢谢。 
关于gulp的介绍，可参考官网： 
gulp官网地址：[http://www.gulpjs.com.cn/](http://www.gulpjs.com.cn/) 
gulp中文文档：[http://www.gulpjs.com.cn/docs/](http://www.gulpjs.com.cn/docs/) 
gulp插件地址：[http://gulpjs.com/plugins](http://gulpjs.com/plugins) 
gulpAPI地址：[http://www.gulpjs.com.cn/docs/api/](http://www.gulpjs.com.cn/docs/api/) 
本文还参考了文章： 
[http://www.cnblogs.com/2050/p/4198792.html](http://www.cnblogs.com/2050/p/4198792.html) 
[http://www.ydcss.com/archives/18](http://www.ydcss.com/archives/18) 
http://blog.csdn.net/qq_23215957/article/details/51050460
等等…如侵权请联系删除。
