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

Webpack 是目前最火的构建工具，它具有非常多的实用功能：

-   热加载：开发环境下修改代码，页面实时刷新。
-   按需加载：每次打开页面时，只加载当前页面所需要的资源。在切换到其他页面时，再加载对应的资源。
-   代码打包：打包、压缩、分割代码等等。
-   [tree-shaking](https://webpack.docschina.org/guides/tree-shaking/)：打包过程中自动剔除没有使用的代码。

可以通过 loader 和 plugin 处理各种各样的资源依赖。
下面让我们简单的了解一下 [Webpack](https://www.webpackjs.com/) 的 loader[]、 plugin[]和自定义模块加载系统。

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
-   自动移除未引用的代码
-   打包结果依然完全可读(和手写代码一致)

**Rollup 缺点:**

-   加载非 ESM 的第三方模块比较复杂(需要配置一大堆插件)
-   模块最终都被打包到一个函数中，无法实现 HMR
-   浏览器环境中，代码拆分功能依赖 AMD 库

**选用:**

-   开发应用程序 选用 Webpack，大而全
-   开发框架或类库 选用 Rollup，小而美

## Vite

优势：ESModule 开发阶段按需编译，速度很快

开发阶段使用 ESM，生产阶段使用[Rollup](https://www.rollupjs.com/)

**首次加载流程：**

1. 下载一个 Vite 并启动服务，链接 WebSocket
2. 打开浏览器会请求到.vue、.ts、.less 等非浏览器可以解析的文件
3. 服务器接收到这些请求，会将这些.vue 等文件转换 ESM 的 JS 然后响应给浏览器
4. 浏览器接受到这些文件后，因为是 ESM 所以有需要加载的回去加载一次（浏览器缓存有则直接取缓存）

**非首次加载**

1. 在编辑器修改了一个 xx.vue 文件，vite 服务监听到当前文件的变动
2. webSocket 会讲变动的文件和变动的时间戳推送给浏览器
3. 浏览器拿到这变动的文件和变动的时间吹去请求，然后执行首次加载的 3 和 4，在相应一个编译之后的 js 文件。
