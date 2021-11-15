# 前端知识体系

## 计算机基础

### 网络协议

- http
  - http1.0/1.1/1.2 的差异
  - https 和 http 的区别
  - 缓存
    - 强缓存
    - 协商缓存
- TCP
  - 可靠链接
  - TCP 三次握手的过程
- UDP
  - 非可靠链接
- websocket
  - websocket 实现
  - websocket 原理

### 设计模式

- 单例模式
- 构造器模式
- 发布订阅模式
- 装饰器模式
- ...

### 算法（leetCode）

- 排序
- 分治
- 递归
- 双指针
- 动态规划
- ...

### 数据结构

- 栈
- 队列
- 链表
- 二叉树
- 散列表
- ...

## 前端开发

### HTML

- HTML5 新标签
- 语义化
- 本地储存
  - localStorage
  - sessionStorage

### CSS

- 盒模型（w3c 和 IE）
- flex 布局
- CSS3 新特性
- less/sess

### JavaScript

- ECMAScript 核心语法
- DOM/BOM 相关 API
- AJAX/Fatch 网络请求
- 继承/原型链/作用域
- 各种情况下的 this 指向
- 闭包形成的原因和优缺点
- EventLoop（浏览器和 Node 的区别）
- ES6/ES7 等新语法
- Promise/async/await
- TypeScript/Flow 等


### React
- JSX
- HOOK
- 生命周期
- 组件传参

### Vue

- 生命周期每个函数调用前后都发生了什么
- 组件传参方式
- Vue 原理（响应式/vNode/Diff）
- Vuex 原理
- Vue-router 原理
- 组件库
  - ElementUI
  - iView
  - Vant
  - Ant Design

### 小程序

- 用户授权流程
- 微信支付流程
- 项目上线流程
  - 本地环境
  - 测试环境
  - 线上环境
- 云开发
  - 云函数
  - 云储存
  - 云数据库
- 组件化开发
- 客户端兼容（安卓、iOS、平板、电脑）
- 跨端开发
  - Taro
  - uni-app

### 公众号网页开发（H5）

- code、access_token、openid、unionid 的获取方式
- 用户授权流程
- 微信支付流程
- js-wx-sdk 的应用
- 无法使用本地 Storage，只能使用 cookie

### Node

- 基础库（fs、http、path..）
- npm 库（发布包和拉取包）
- yarn
- Webpack
  - loader
  - plugins
- Express
- Koa
  - 中间件的原理
- PM2

### 工程化
  - Webpack
  - Vite
  - Rollup

### 浏览器

- 从输入 url 到页面显示发生了什么？
- 浏览器渲染原理(DOM tree/CSSOM tree 的生成)
- 浏览器缓存（cookie/localStorage/sessionStorage）
- 事件机制（冒泡/捕捉）
- DOM 的重绘/回流
- 事件循环（EventLoop）
- web work
- WPA
- 内核
  - JS引擎
  - 渲染引擎
- 跨域
  - 产生原因
  - 解决办法
- 

### 性能分析

- 浏览器

  - Performance
  - Lighthouse

- 小程序
  - audit
  - wx.onError
  - 体验评分、小程序助手[性能分析]板块
  - wx.getPerformance

### 性能优化

- 首屏加载

  - DSN 部署
  - SSR

- 白屏率

  - 骨架屏

- 服务可用性
  - 懒加载
  - DNS 预加载

### 异常错误上报
- Sentry
- 基于自带的错误监控
  - window.onerror
### 前端安全

- XSS
- CFRS
