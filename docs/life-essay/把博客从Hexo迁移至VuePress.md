## 为什么选择 VuePress
事实上，从 2017 年开始我就使用 [Hexo](https://hexo.io/) 搭建自己的个人博客，并托管在 `GitHub` 上。

不可否认 `Hexo` 是一个非常优秀的框架，但对我于我仅需要的是一个轻量级博客来说，还是相对繁重。

然后在说说为什么选择 `VuePress`：
- 优秀的 `MarkDown` 语法支持
- 基于 `Vue` 驱动
- 对 `SEO` 友好
- 比 `Hexo` 更轻量级，更快
- 工作原因对 `Vue` 比较熟，上手快

## 如何迁移
- 先去 [VuePress](https://vuepress.vuejs.org/) 官网看文档，撸上手例子。
- 导入 `.md` 文件，书写配置文件，生成导航栏、侧边栏、首页等等。
- 生成静态文件 `dist`，部署到 `github`，可以参考 [部署 Github Page](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)。
- 我是直接部署到私有服务器上的，解析域名，安装 `Nginx`,访问即可。

## 总结
一套撸下来花了一天不到吧，中间也遇到一些小问题，基本百度一下都解决了，部署到了服务器上，访问试了一下，支持移动端，加载很快，感觉不错。


写作规范尽可能遵阮一峰的 [中文技术文档写作规范](https://github.com/ruanyf/document-style-guide)
