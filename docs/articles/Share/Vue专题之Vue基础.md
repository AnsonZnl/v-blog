 
![前端培训_3_-Vue基础.png](https://i.loli.net/2021/06/04/qIOtizdah8KLrDY.png)
## 简介

特点：MVVM框架，双向绑定，数据驱动，单页面，组件化。

## 区别

Vue 和 jQuery 的区别：不直接操作DOM，而是**操作数据**。

案例：Hello World => 你好，世界

HTML代码：

```xml
<h1>{{msg}}</h1>
```
jQuery实现
```javascript
$("h1").text("你好，世界");
```
Vue 实现
```javascript
this.msg = '你好，世界'
```
## 创建项目

### 1、CDN

```javascript
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```
适合在已有的非Vue项目中，添加Vue，用于页面交互，知道就行了，用的不多。
### 2、Vue-Cli（推荐）

前后端分离项目的开发，

安装[Node.js](http://nodejs.cn/?fileGuid=YhWh3P33JkJGWQvq)（Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。）

使用 NPM（Node Packages Modules，Node的包管理工具）下载

下载 Vue-Cli（基于 Vue.js 进行快速开发的完整系统）

使用命令行工具 cmd 、Git bash、VScode的终端都可以

```c#
# 全局安装vue-cli
npm install -g @vue/cli
# 创建一个新的项目
vue create project-name
# 启动
cd project-name
yarn server
# or
# 可视化的管理界面
vue ui
```
整个项目都用 Vue 开发
## 项目结构

需要开发的项目文件都在 src 目录下面
  ![vue项目文件目录解析.png](https://i.loli.net/2021/06/04/tEqYaDkboK4eCmP.png)
补充：node_modules：项目依赖包（通过`npm install`安装）

## 常用命令

1. 安装依赖：`npm install`/`yarn`/`cnpm install`
2. 启动服务：`npm run dev`/`npm run serve`
3. 项目打包：`npm run build`

2-3参考`package.json`文件的`script`对象

## 切换源

解决 npm 服务器在国内网速慢、丢包的问题。

* [cnpm](https://www.npmjs.com/package/cnpm?fileGuid=YhWh3P33JkJGWQvq)
* [yarn](https://www.npmjs.com/package/yarn?fileGuid=YhWh3P33JkJGWQvq)
## 开发工具

下载开发工具：[VScode下载](https://code.visualstudio.com/Download?fileGuid=YhWh3P33JkJGWQvq)

安装插件：[Extensions for VScode](https://marketplace.visualstudio.com/vscode?fileGuid=YhWh3P33JkJGWQvq)

* Vetur
* ESLint
## 调试工具

Vue-Devtool插件安装

* 火狐浏览器插件（不用翻墙）：[下载地址](https://addons.mozilla.org/zh-CN/firefox/addon/vue-js-devtools/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search&fileGuid=YhWh3P33JkJGWQvq)
* 蓝灯（VPN）：[下载地址](https://github.com/getlantern/lantern?fileGuid=YhWh3P33JkJGWQvq)
* Google浏览器插件（翻墙）：[下载地址](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?fileGuid=YhWh3P33JkJGWQvq)
* 使用方法：[vue-devtools 官网](https://devtools.vuejs.org/?fileGuid=YhWh3P33JkJGWQvq)
## 基本语法

参考：[Vue.js中文官网](https://cn.vuejs.org/?fileGuid=YhWh3P33JkJGWQvq)

v-for / v-key

v-if / v-show

v-bind / :

v-model

v-on:click / @click

## 生命周期

参考：[Vue生命周期](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90?fileGuid=YhWh3P33JkJGWQvq)，示意图：[图片](https://cn.vuejs.org/images/lifecycle.png?fileGuid=YhWh3P33JkJGWQvq)

* beforeCreate（创建之前）
* created（创建之后）
* beforeMount（挂载之前）
* mounted（挂载之后）
* beforeUpdate（更新之前）
* updated（更新之后）
* beforeDestory（销毁之前）
* destroyed（销毁之后）
## 组件

组件化开发是 Vue 的一大特点，组件化开发极大的提升了代码的可复用性，也方便团队分工协作开发。

### 封装组件

```xml
# /src/components/Button.vue
<template>
  <div>
    <button>{{ text }}</button>
  </div>
</template>
<script>
export default {
  props: {
    text: String,
  },
};
</script>
```
### 使用组件

```xml
# /src/view/about.vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Button :text="ButtonText"></Button>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";
export default {
  components: {
    Button,
  },
  data: function() {
    return {
      ButtonText: "我是一个按钮",
    };
  },
};
</script>
```
### 组件传参

使用 props

### 第三方组件库

PC端：iView、Element、Ant Design

移动端：Vant、cube-ui

#### iView

官网地址：[iView](https://www.iviewui.com/?fileGuid=YhWh3P33JkJGWQvq)

下载组件

```plain
npm install view-design --save
```
全局使用组件
```javascript
// main.js
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);
```
#### ivew-admin

>iView-admin是iView生态中的成员之一，是一套采用前后端分离开发模式，基于Vue的后台管理系统前端解决方案。iView-admin2.0脱离1.x版本进行重构，换用Webpack4.0 + Vue-cli3.0作为基本开发环境。内置了开发后台管理系统常用的逻辑功能，和开箱即用的业务组件，旨在让开发者能够以最小的成本开发后台管理系统，降低开发量。

地址：[iview-admin](https://github.com/iview/iview-admin?fileGuid=YhWh3P33JkJGWQvq)

## 其他插件

### Vue-router

路由插件

两种模式

* hash / #
* history / 历史记录
### Axios

HTTP请求库

安装

```plain
npm install axios --save
```
vue.config.js 配置代理
```javascript
const URL = 'https://cnodejs.org'; // 请求的地址
module.exports = {
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    devServer: {
        disableHostCheck: true,
        port: 8080,
        open: true,
        proxy: {
            '/api': { // /api =》'https://cnodejs.org'
                target: URL
            }
        }
    }
};
```
### Vuex

状态管理

## 打包上线

在项目开发完成之后，使用`npm run build`命令来打包项目，打包完成后会生成 dist 文件夹

项目上线时，直接将dist文件夹放到服务器即可

## 练习

1. v-if和v-show的区别？
2. 动态绑定class的用法？
3. 试着封装/使用一个组件？
