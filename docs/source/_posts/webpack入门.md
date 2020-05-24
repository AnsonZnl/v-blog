---
title: Webpack入门
date: 2018-7-19 20:45:23
tags: Webpack
---

## 为什么使用webpack??
**一句话 webpack能够提高了我们的开发效率**
什么是Webpack
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。
### 安装
新建一个空的练习文件夹 如：webpackText
```
//全局安装
npm install -g webpack
//安装到你的项目目录
npm install --save-dev webpack
//npm install --save-dev webpack@版本号
//可下载对应版本的webpack
```
### 正式使用Webpack前的准备
1. 创建package.json文件
```
npm init
```
项目名称和作者等信息回车即可
2. package.json文件已经就绪，我们在本项目中安装Webpack作为依赖包
```
// 安装Webpack
npm install --save-dev webpack
```
3.  创建两个文件夹,app文件夹和public文件夹，app文件夹用来存放原始数据和我们将写的JavaScript模块，public文件夹用来存放之后供浏览器读取的文件（包括使用webpack打包生成的js文件以及一个index.html文件）创建三个文件:

*   `index.html` --放在public文件夹中;
*   `Greeter.js`-- 放在app文件夹中;
*   `main.js`-- 放在app文件夹中;

此时项目结构如下图所示
![项目结构](https://upload-images.jianshu.io/upload_images/7072486-c977d7d00f7a1ec4.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们在**index.html**文件中写入最基础的html代码，它在这里目的在于引入打包后的js文件（这里我们先把之后打包后的js文件命名为`bundle.js`，之后我们还会详细讲述）。
```
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Webpack Sample Project</title>
  </head>
  <body>
    <div id='root'>
    </div>
    <script src="bundle.js"></script>
  </body>
</html>
```
我们在Greeter.js中定义一个返回包含问候信息的html元素的函数,并依据CommonJS规范导出这个函数为一个模块：
```
// Greeter.js
module.exports = function() {
  var greet = document.createElement('div');
  greet.textContent = "Hi there and greetings!";
  return greet;
};
```
main.js文件中我们写入下述代码，用以把Greeter模块返回的节点插入页面。
```
//main.js 
const greeter = require('./Greeter.js');
document.querySelector("#root").appendChild(greeter());
```
根目录下新建webpack.config.js，
```
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {//__dirname 是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
```
为了更方面的打包，在package.json中对scripts对象进行相关设置即可，设置方法如下。
```
{
  "name": "webpack-sample-project",
  "version": "1.0.0",
  "description": "Sample webpack project",
  "scripts": {
    "start": "webpack" // 修改的是这里，JSON文件不支持注释，引用时请清除
  },
  "author": "zhang",
  "license": "ISC",
  "devDependencies": {
    "webpack": "3.10.0"
  }
}
```
命令行中输入`npm start`试试
然后浏览器打开public/index.html
![WechatIMG2.jpeg](https://upload-images.jianshu.io/upload_images/7072486-6493c12b502af61f.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 使用webpack构建本地服务器
1. 安装devserver
```
npm install --save-dev webpack-dev-server
```
注意：webpack3.x的请下载webpack-dev-server2.9，不然会报错
2. 把这些命令加到webpack的配置文件中，现在的配置文件webpack.config.js如下所示
```
module.exports = {
  devtool: 'eval-source-map',

  entry:  __dirname + "/app/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },

  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  } 
}
```
3. 在package.json中的scripts对象中添加如下命令，用以开启本地服务器：
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open"
  },
```
在终端中输入npm run server即可在本地的8080端口查看结果（实时刷新）
![WechatIMG3.jpeg](https://upload-images.jianshu.io/upload_images/7072486-cb7c29cb6d2e9dff.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## Loaders
鼎鼎大名的Loaders登场了！
Loaders是webpack提供的最激动人心的功能之一了。通过使用不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理，比如说分析转换scss为css，或者把下一代的JS文件（ES6，ES7)转换为现代浏览器兼容的JS文件，对React的开发而言，合适的
**Loaders可以把React的中用到的JSX文件转换为JS文件**
 Loaders需要单独安装并且需要在webpack.config.js中的modules关键字下进行配置，Loaders的配置包括以下几方面：
- test：一个用以匹配loaders所处理文件的拓展名的正则表达式（必须）
- loader：loader的名称（必须）
- include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
- query：为loaders提供额外的设置选项（可选）
### Babel
Babel其实是一个编译JavaScript的平台，它可以编译代码帮你达到以下目的：

让你能使用最新的JavaScript代码（ES6，ES7...），而不用管新标准是否被当前使用的浏览器完全支持；
让你能使用基于JavaScript进行了拓展的语言，比如React的JSX；
Babel的安装与配置
Babel其实是几个模块化的包，其核心功能位于称为babel-core的npm包中，webpack可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析Es6的babel-env-preset包和解析JSX的babel-preset-react包）。

一次性安装这些依赖包
```
// npm一次性安装多个依赖模块，模块之间用空格隔开
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react
```
Babel其实可以完全在 webpack.config.js 中进行配置，但是考虑到babel具有非常多的配置选项，在单一的webpack.config.js文件中进行配置往往使得这个文件显得太复杂，因此一些开发者支持把babel的配置选项放在一个单独的名为 ".babelrc" 的配置文件中。我们现在的babel的配置并不算复杂，不过之后我们会再加一些东西，因此现在我们就提取出相关部分，分两个配置文件进行配置（webpack会自动调用.babelrc里的babel配置选项），如下：
```
module.exports = {
    entry: __dirname + "/app/main.js",//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }
        ]
    }
};
```
```
//.babelrc
{
  "presets": ["react", "env"]
}
```
因为webpack4都出来了 我学的这篇是webpack3.5版本的，但是基础的东西都还是一样的，最后放上这个webpack的配置文件，如果每一项都懂的话，入门应该是没问题了。
  ```
// 一个常见的`webpack`配置文件
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
        entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
        output: {
            path: __dirname + "/build",
            filename: "bundle-[hash].js"
        },
        devtool: 'none',
        devServer: {
            contentBase: "./public", //本地服务器所加载的页面所在的目录
            historyApiFallback: true, //不跳转
            inline: true,
            hot: true
        },
        module: {
            rules: [{
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }, {
                            loader: "postcss-loader"
                        }],
                    })
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css")
    ]
};
```
参考：https://www.jianshu.com/p/42e11515c10f
webpack中文网：https://www.webpackjs.com/concepts/
简要理解CommonJS规范：https://blog.csdn.net/u012443286/article/details/78825917
webpack4那点东西：https://juejin.im/post/5abef5e96fb9a028e33b9035