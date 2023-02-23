构建工具就是指能自动对代码执行检验、转换、压缩等功能的工具。从目前市场上流行的构建工具来看，常见的功能有：

- 代码转换，例如将 ts 文件转换为 js 文件。
- 代码打包，将有关联的代码打包在一起。
- 代码压缩、文件压缩、gzip 压缩等。
- 热加载，修改代码后自动刷新页面。
- 代码检验，检查代码格式是否符合规范。 ...

在开发中使用构建工具，能够大大的提升了开发效率。

由于前端构建工具比较多，所以本章选取了其中的三个 [Webpack](https://webpack.docschina.org/concepts/)、[Rollup](https://www.rollupjs.com/)、[Vite](https://github.com/vitejs/vite) 来进行讲解。

## Webpack

Webpack 是目前最火的构建工具，它具有非常多的实用功能：

热加载：开发环境下修改代码，页面实时刷新。
按需加载：每次打开页面时，只加载当前页面所需要的资源。在切换到其他页面时，再加载对应的资源。
代码打包：打包、压缩、分割代码等等。
[tree-shaking](https://webpack.docschina.org/guides/tree-shaking/)：打包过程中自动剔除没有使用的代码。
可以通过 loader 和 plugin 处理各种各样的资源依赖。
下面让我们简单的了解一下 [Webpack](https://www.webpackjs.com/) 的 loader[]、 plugin[]和自定义模块加载系统。

## Rollup

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
