构建工具就是指能自动对代码执行检验、转换、压缩等功能的工具。从目前市场上流行的构建工具来看，常见的功能有：

-   模块化方案，对不同模块的代码进行兼容整合。
-   代码转换，例如将 es6/es7、ts 等高级语法转换为 js 文件，将 less、sass 转换为 css。
-   线上质量，不同浏览器和浏览器多版本的兼容。
-   开发效率，项目的冷启动和二次启动的时间，热更新的时间影响开发效率。
-   代码打包，将有关联的代码打包在一起。
-   代码压缩、文件压缩、gzip 压缩等。
-   热加载，修改代码后自动刷新页面。
-   代码检验，检查代码格式是否符合规范 ...

在开发中使用构建工具，能够大大的提升了开发效率。

由于前端构建工具比较多，所以本章选取了其中的三个 [Webpack](https://webpack.docschina.org/concepts/)、[Rollup](https://www.rollupjs.com/)、[Vite](https://github.com/vitejs/vite) 来进行讲解。

## Webpack

[Webpack](https://webpack.docschina.org/) 是目前最火的构建工具，它具有非常多的实用功能：

-   热加载：开发环境下修改代码，页面实时刷新。
-   按需加载：每次打开页面时，只加载当前页面所需要的资源。在切换到其他页面时，再加载对应的资源。
-   代码打包：打包、压缩、分割代码等等。
-   [tree-shaking](https://webpack.docschina.org/guides/tree-shaking/)：打包过程中自动剔除没有使用的代码。
-   可以通过 loader 和 plugin 处理各种各样的资源依赖。

下面让我们简单的了解一下 [Webpack](https://www.webpackjs.com/) 的 loader[https://webpack.docschina.org/concepts/loaders/]、 plugin[https://webpack.docschina.org/concepts/plugins/]和自定义模块加载系统。

### loader

loader 用于对模块的代码转换，如将 Typescript 转为 Javascript、将 less、sass 转为 css、将.vue、.tsx 等文件转为 js、css 等。

**loader 特性**

-   loader 支持链式调用。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行。链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。最后，链中的最后一个 loader，返回 webpack 所期望的 JavaScript。
-   loader 可以是同步的，也可以是异步的。
-   loader 运行在 Node.js 中，并且能够执行任何操作。
-   loader 可以通过 `options` 对象配置（仍然支持使用 `query` 参数来设置选项，但是这种方式已被废弃）。
-   除了常见的通过 `package.json` 的 `main` 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 `loader` 字段直接引用一个模块。
-   插件(plugin)可以为 loader 带来更多特性。
-   loader 能够产生额外的任意文件。

可以通过 loader 的预处理函数，为 JavaScript 生态系统提供更多能力。用户现在可以更加灵活地引入细粒度逻辑，例如：压缩、打包、语言转译（或编译）和 [更多其他特性](https://webpack.docschina.org/loaders)。

**plugin**
[plugin](https://webpack.docschina.org/plugins/) 目的在于解决 loader 无法实现的其他事，

常用的 plugin 有：

-   `define-plugin`：定义环境变量 (Webpack4 之后指定 mode 会自动配置)
-   `ignore-plugin`：忽略部分文件
-   `html-webpack-plugin`：简化 HTML 文件创建 (依赖于 html-loader)
-   `web-webpack-plugin`：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用
-   `uglifyjs-webpack-plugin`：不支持 ES6 压缩 (Webpack4 以前)
-   `terser-webpack-plugin`: 支持压缩 ES6 (Webpack4)
-   `webpack-parallel-uglify-plugin`: 多进程执行代码压缩，提升构建速度
-   `mini-css-extract-plugin`: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代 extract-text-webpack-plugin)
-   `serviceworker-webpack-plugin`：为网页应用增加离线缓存功能
-   `clean-webpack-plugin`: 目录清理
-   `ModuleConcatenationPlugin`: 开启 Scope Hoisting
-   `speed-measure-webpack-plugin`: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
-   `webpack-bundle-analyzer`: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)

**Loader 和 Plugin 的区别**

`Loader` 模块导出一个运行在 Node 上的 JavaScript 函数。该函数对接受的内容进行转换，返回转换后的结果。因为 webpack 只认识 JS，所以 loader 相当于它的翻译官，对资源做转译的预处理工作。 -可以尝试[编写一个 laoder](https://webpack.docschina.org/contribute/writing-a-loader/)以理解它是如何运行的。

`Loader` 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。

```js
module.exports = {
    module: {
        rules: [
            {test: /\.css$/, loader: "css-loader"},
            {test: /\.ts$/, loader: "ts-loader"},
        ],
    },
};
```

`Plugin`是一个基于事件流的插件，它是一个具有 apply 方法的 JavaScript 对象。apply 方法会被 webpack compiler 调用，并且在整个编译生命周期都可以访问 compiler 对象。

`ConsoleLogOnBuildWebpackPlugin.js`

```js
const pluginName = "ConsoleLogOnBuildWebpackPlugin";

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        const {webpack} = compiler;
        compiler.hooks.run.tap(pluginName, (compilation) => {
            console.log("webpack 构建正在启动！");
        });
    }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```

`Plugin` 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。
有兴趣的可以[编写一个 Plugin](https://webpack.docschina.org/contribute/writing-a-plugin/#creating-a-plugin)

`webpack.config.js`

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // 访问内置的插件
const path = require("path");

module.exports = {
    entry: "./path/to/my/entry/file.js",
    output: {
        filename: "my-first-webpack.bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({template: "./src/index.html"}),
    ],
};
```

### 参考：

-   [「吐血整理」再来一打 Webpack 面试题](https://juejin.cn/post/6844904094281236487)
-   [前端构建工具进化历程](https://mp.weixin.qq.com/s/o8B8HAczZtIZM8V_HHwNqg)

## Rollup

> Rollup 是一个 JavaScript 的模块化打包工具，可以帮助我们编译小的代码到一个大的、复杂的代码中，比如一个库或者一个应用程序。

### Rollup 和 Webpack 的区别

-   Webpack 适合构建大型项目开发（Vue、React），而 Rollup 适合构建类库的开发（Vue、React、Vite 源码都是基于它构建的）
-   Rollup 是一个 ES Module 打包工具，如果打包 CommonJS 等需要插件支持
-   Rollup 对比 Webpack 它的配置更简单、友好
-   Rollup 基于 ES Module 所带来的 Tree Shaking 的友好支持
-   Rollup 是一个更纯粹的专注于 Javascript 的打包工具（当然也可以处理 CSS、Vue 等需要安装插件）
-   Rollup 中不支持 HMR（热替换），因为模块最终被打包到一个函数中

### Rollup 常用的插件

-   `@rollup/plugin-node-resolve`——支持导入外部模块
-   `@rollup/plugin-commonjs`——支持导入 CommonJS
-   `@rollup/plugin-babel @babel/core @babel/preset-env`——支持 JS 最新语法、兼容
-   `@rollup/plugin-terser`—— 代码压缩
-   `rollup-plugin-vue @vue/compiler-sfc`——处理 Vue 文件

在[这里](https://github.com/rollup/awesome)可以找到很多优秀的 Rollup 插件

### 总结

**Rollup 优势:**

-   输出结果更加扁平(执行效率更高)
-   自动移除未引用的代码(Tree Shaking)
-   打包结果依然完全可读(和手写代码一致)

**Rollup 缺点:**

-   加载非 ESM 的第三方模块比较复杂(需要配置一大堆插件)
-   模块最终都被打包到一个函数中，无法实现 HMR
-   浏览器环境中，代码拆分功能依赖 AMD 库

**选用:**

-   开发应用程序 选用 Webpack，大而全
-   开发框架或类库 选用 Rollup，小而美

## Vite

Vite 相比于 Webpack 而言，没有打包的过程，而是直接启动了一个开发服务器 devServer。Vite 劫持浏览器的 HTTP 请求，在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再返回给浏览器(整个过程没有对文件进行打包编译)。所以编译速度很快。

Vite 底层使用 Esbuild 实现对.`ts、jsx、.`js 代码文件的转化，所以先看下什么是 es-build。
Esbuild 是一个 JavaScript`` Bundler 打包和压缩工具，它提供了与 Webpack、Rollup 等工具相似的资源打包能力。可以将 JavaScript 和 TypeScript 代码打包分发在网页上运行。但其打包速度却是其他工具的 10 ～ 100 倍。

生产阶段使用[Rollup](https://www.rollupjs.com/)打包。

Vite 其核心原理是利用浏览器现在已经支持 ES6 的 import,碰见 import 就会发送一个 HTTP 请求去加载文件，Vite 启动一个 koa 服务器拦截这些请求，并在后端进行相应的处理将项目中使用的文件通过简单的分解与整合，然后再以 ESM 格式返回返回给浏览器。Vite 整个过程中没有对文件进行打包编译，做到了真正的按需加载，所以其运行速度比原始的 webpack 开发编译速度快出许多！

**首次加载流程：**

1. 下载一个 Vite 并启动服务，链接 WebSocket
2. 打开浏览器会请求到.vue、.ts、.less 等非浏览器可以解析的文件
3. 服务器接收到这些请求，会将这些.vue 等文件转换 ESM 的 JS 然后响应给浏览器
4. 浏览器接受到这些文件后，因为是 ESM 所以有需要加载的回去加载一次（浏览器缓存有则直接取缓存）

**非首次加载**

1. 在编辑器修改了一个 xx.vue 文件，vite 服务监听到当前文件的变动
2. webSocket 会讲变动的文件和变动的时间戳推送给浏览器
3. 浏览器拿到这变动的文件和变动的时间吹去请求，然后执行首次加载的 3 和 4，在相应一个编译之后的 js 文件。

![vite 热更新流程.png](https://s2.loli.net/2023/03/07/AMJOBaXDTKG6csV.png)

### 总结

最后总结下`Vite`相关的优缺点：

-   优点：

    -   快速的冷启动: 采用`No Bundle`和`esbuild`预构建，速度远快于`Webpack`
    -   高效的热更新：基于`ESM`实现，同时利用`HTTP`头来加速整个页面的重新加载，增加缓存策略
    -   真正的按需加载: 基于浏览器`ESM`的支持，实现真正的按需加载

-   缺点

    -   生态：目前`Vite`的生态不如`Webapck`，不过我觉得生态也只是时间上的问题。
    -   生产环境由于`esbuild`对`css`和代码分割不友好使用`Rollup`进行打包

`Vite.js`虽然才在构建打包场景兴起，但在很多场景下基本都会优于现有的解决方案。如果有生态、想要丰富的`loader`、`plugins`的要求可以考虑成熟的`Webpack`。在其余情况下，`Vite.js`不失为一个打包构建工具的好选择。

### 参考

-   [深入理解 Vite 核心原理](https://juejin.cn/post/7064853960636989454#heading-6)
-   [Vite 介绍及实现原理<超详细、纯干货！>](https://zhuanlan.zhihu.com/p/424842555)
-   [深入浅出 vite（核心原理 + 手撕 mini-vite）](https://juejin.cn/post/7026285200766140453)

## 总结

-   webpack：大而全，但是对于大型项目开发过于笨重。
-   rollup：适合作用于类库开发
-   Vite: 快、小，但是浏览器支持不足，面向未来的工具。
![image.png](https://s2.loli.net/2023/03/07/QoDAifO1aGdKhyI.png)