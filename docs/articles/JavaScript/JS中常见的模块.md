## 模块化的意义

将代码拆分成独立的块，然后再把这些块使用模块模式连接起来实现不同的功能。

就像小时候玩的拼图一样，不同的拼图组合在一起就可以拼成任意的形状。

这种模式的背后思想也很简单：**把逻辑分块、各自封装，相互独立，同时自行决定引入执行那些外部模块以及暴露自身的那些模块。**

这个基本的思想是所有的 JavaScript 模块系统的基础。

文中代码：https://github.com/ansonznl/

### 模块化的好处

- 避免命名冲突(减少命名空间污染)
- 更好的分离, 按需加载
- 更高复用性
- 高可维护性

## JS 中常见的模块

### IIFE 模式：匿名函数自调用（闭包）

主要应用在浏览器端。

利用闭包的原理创造一个独有的函数作用域来保存私有变量，达到模块化的效果。

**使用**

HTML

```html
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
  console.log(myModule.get()); // output-data(获取内部数据)
  myModule.set("new data"); // 设置内部数据
  console.log(myModule.data); //output-undefined (不能访问模块内部数据)
  myModule.data = "xxxx"; //不是修改的模块内部的data
  console.log(myModule.get()); //output-new data 修改后的值
</script>
```

JS

```js
// module.js文件
(function(window) {
  let data = "data";
  //获取数据
  function get() {
    return data;
  }
  // 修改数据
  function set(val) {
    data = val;
  }
  //暴露行为
  window.myModule = {
    get,
    set,
  };
})(window);
```

### CommonJS

主要应用在服务端，如果在浏览器端运行需要借助其他工具（Browserify）。

**暴露模块：** `module.exports = value`或者`exports.xx = value`(exports 是一个导出的对象)

**引入模块：** `require(xx)`，如果是第三方模块，xxx 为模块名，如果为自定义模块，xxx 为模块的文件路径。

**特点**

- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。

**使用**
在 Node 中 安装 uniq 函数。

```base
npm init
npm install uniq --save
```

```js
// module.js
let arr = [1, 2, 2, 3, 3];
module.exports = {
  arr,
};
```

```js
// app.js
let module1 = require("./module.js");
let uniq = require("uniq");

console.log(uniq(module1.arr)); // [1,2,3]
```

### AMD

全称是 Asynchronous Module Definition - 异步模块定义

和 CommonJS 不同的是 AMD 采用非同步的方式来加载模块。

**基本语法**

定义暴露模块

```js
// 定义没有依赖的模块
define(function() {
  return 模块;
});
// 定义有依赖的模块
define(["module1", "module2"], function(m1, m2) {
  return 模块;
});
```

引入使用模块

```js
require(["module1", "module2"], function(m1, m2) {
  使用m1 和 m2;
});
```

**使用案例**

```html
<!-- index.html -->
<body>
  <!-- 引入require.js并指定js主文件的入口 -->
  <script
    data-main="main"
    src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.js"
  ></script>
</body>
```

```js
// main.js
(function() {
  require(["module.js"], function(module) {
    let currentUrl = module.getUrl();
    alert("当前页面的URl：" + currentUrl);
  });
})();
```

```js
// module.js
// 定义模块
define(function() {
  let url = window.location.href;

  function getUrl() {
    return url.toUpperCase();
  }
  // 暴露模块
  return {
    getUrl,
  };
});
```

更多的使用方法请参考：https://requirejs.org/

### CMD

CMD---是 SeaJS 在推广过程中对模块定义的规范化产出，是一个同步模块定义，是 SeaJS 的一个标准，SeaJS 是 CMD 概念的一个实现，SeaJS 是淘宝团队提供的一个模块开发的 JS 框架。

什么时候用到什么时候引入，即用即返回，这是一个同步概念。

**特点：** CMD 是 AMD 在基础上改进的一种规范，和 AMD 不同在于依赖模块的执行机制不同，CMD 是就近依赖，而 AMD 是前置依赖。

**环境：** 浏览器环境

**语法：**

- 导入：define(function(require, exports, module){})
- 导出：define(function(){return '值'})

**使用**

```js
// main.js
define(function(require, exports, module) {
  var moduleA = require("./module.js");
  alert(moduleA.a); // 打印出：hello world
});
// module.js
define(function(require, exports, module) {
  exports.a = "hello world";
});
```

```html
<body>
  <script
    data-main="main"
    src="https://cdn.bootcdn.net/ajax/libs/require.js/2.3.6/require.js"
  ></script>
</body>
```

Sea.js 用法请参考：https://seajs.github.io/seajs/docs/

### UMD

全称 Universal Module Definition 看名字就知道，特点是兼容 AMD 和 CommonJS 规范，而且兼容全局引入。

**环境：** 服务器环境和浏览器端

**UMD 实现原理很简单：**

- 先判断是否支持 AMD（define 是否存在），存在则使用 AMD 方式加载模块；
- 再判断是否支持 Node.js 模块格式（exports 是否存在），存在则使用 Node.js 模块格式；
- 前两个都不存在，则将模块公开到全局（window 或 global）

**使用**

```js
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    //AMD
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    //Node, CommonJS之类的
    module.exports = factory(require("jquery"));
  } else {
    //浏览器全局变量(root 即 window)
    root.returnExports = factory(root.jQuery);
  }
})(this, function($) {
  //方法
  function myFuncA() {} // 私有方法，因为没有返回
  function myFuncB() {} // 公共方法，因为返回了

  //暴露公共方法
  return {
    myFuncB,
  };
});
```

大家平时引入的 jQuery 的 CND 就是 UMD 的，源码可以查看：https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js

### ES6 Module

在 ES6 之前，模块化主要是社区在推动进行的，从而出现了 CommonJS 和 AMD 两个，前者用于服务器后者用于浏览器，ES6 模块的出现将完全替代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的解决方案。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

**特点** ：

- 按需加载（编译时加载）
- import 和 export 命令只能在模块的顶层，不能在代码块之中（如：if 语句中）,import()语句可以在代码块中实现异步动态按需动态加载

**环境：** 服务器环境和浏览器端

**语法：**

- 导入：`import {modules1,modules1,} from '模块路径'`
- 导出：`export`或者`export default`
- 动态导入：`import('模块路径').then(..)`
  <!-- 揺树（tree-shaking） -->

**使用**

Node 中 先安装 Babel:

```
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
npm install --save @babel/polyfill
# 然后运行
npx babel-node main.js
```

```js
// modules/double.js
let mes = "Hello Modules for double";
function sum(value) {
  return `${mes} - ${value * 2}`;
}
export default {
  mes,
  sum,
};
// main.js
import module from "./modules/double";
console.log(module.sum(10)); // Hello Modules for double - 20
```

浏览器中

**区别**

- 和 CommonJS 的区别：

  - CommonJS 模块输出的是一个值得拷贝，ES6 模块输出的是值的引用
  - CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
  - CommonJS 模块的 require()是同步加载模块，ES6 模块的 import 命令是异步加载，有一个独立的模块依赖的解析阶段。

**缺点**
浏览器和服务器目前的支持不是很好，现阶段使用需要借助一些工具（[Babel](https://www.babeljs.cn/)）。

- 浏览器支持：在新版本的浏览器（如 Chrome）中可以使用`<script type="module" src="./foo.js"></script>`写法
- 服务器支持（Node）有两种模式，分别是 ES6 模块和 CommonJS。
  - 从 Node.js v13.2 开始，默认支持 ES6 模块，但是需要采用`.mjs`为后缀名、或者在`package.json`中修改`type`字段为`module`（推荐）
  - 使用 CommonJS 的话需要以`.cjs`为后缀，也可以设置`package.json`中修改`type`字段为`commonjs`（推荐）。

最好不要两者混用。更多的使用方法可以参考：https://es6.ruanyifeng.com/#docs/module

## 总结

- CommonJS 规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了 AMD CMD 解决方案。
- AMD 规范在浏览器环境中异步加载模块，而且可以并行加载多个模块。不过，AMD 规范开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅。
- CMD 规范与 AMD 规范很相似，都用于浏览器编程，依赖就近，延迟执行，可以很容易在 Node.js 中运行。不过，依赖 SPM 打包，模块的加载逻辑偏重
- **ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。**

## 参考

- [前端模块化详解](https://juejin.cn/post/6844903744518389768)
- [JS 模块](https://segmentfault.com/a/1190000012419990)
- [javascript 中 UMD 规范介绍](https://www.php.cn/js-tutorial-410584.html)
- [ES6 Modules](https://es6.ruanyifeng.com/#docs/module)
- [一篇理解前端模块化：AMD、CMD、CommonJS、ES6](https://mp.weixin.qq.com/s/quoWsIAvLITT6jGWs3higg)
