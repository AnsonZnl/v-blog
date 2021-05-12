## 模块化的意义

将代码拆分成独立的块，然后再把这些块使用模块模式连接起来实现不同的功能。

就像小时候玩的拼图一样，不同的拼图组合在一起就可以拼成任意的形状。

这种模式的背后思想也很简单：**把逻辑分块、各自封装，相互独立，同时自行决定引入执行那些外部模块以及暴露自身的那些模块。**

这个基本的思想是所有的 JavaScript 模块系统的基础。

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

**暴露模块：**`module.exports = value`或者`exports.xx = value`(exports 是一个导出的对象)

**引入模块：**`require(xx)`，如果是第三方模块，xxx 为模块名，如果为自定义模块，xxx 为模块的文件路径。

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

全程是 Asynchronous Module Definition - 异步模块定义

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

### UMD

### ESmodule

### 揺树（tree-shaking）

## 参考

- [前端模块化详解](https://juejin.cn/post/6844903744518389768)
