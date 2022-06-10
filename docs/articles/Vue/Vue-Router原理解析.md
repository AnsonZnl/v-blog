# Vue-router 原理解析

参考：

- Vue-Router 官网：https://router.vuejs.org/zh/
- Vue 技术揭秘/Vue-Router：https://ustbhuangyi.github.io/vue-analysis/v2/vue-router/

插件机制：实现一个 install 方法，接受一个 Vue 实例。

## 两种模式：hash 模式和 history 模式

**hash 模式**

1. url 后带#的字符，请求时候不会被包含在 http 请求中，每次改变 hash 也不会加载页面
2. hash 改变会触发 hashchange 事件
3. hash 的变化会浏览器记录，浏览器的前进后退都能用。
4. 能兼容到 IE8

**history 模式**

1. 路径上会带上整个链接，但是需要后台做处理，不然会返回 404
2. 通过监听 window.history.pushState()和.replaceState()改变 url，渲染相对应的组件
3. 兼容到 IE10
4. 无惧前进和后退，就怕 F5 刷新，可能会出现 404，所以需要后端配合，使用 Koa 的中间件 connect-history-api-fallback——[参考链接](https://www.codeprj.com/blog/ab14d31.html)，可以配置 nginx 返回一个 index.html。

**abstract**
支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

## 路由注册

通过 Vue.use 的方式执行 vue-router 的 install 方方法，并将 Vue 实例传入进去。

通过 mixin 的方式，在 beforeCreate 和 destroy 中将逻辑混入在每一个组件上

监听路由改变使用的是 Vue 的双向绑定
然后给 Vue 原型上设置`$router`和`$route`两个属性，方便访问。

接着又通过 Vue.component 定义全局的`<router-link>`和`<router-view>`组件
`this.$router`和`this.$route`的区别

this.\$router 相当于一个全局的路由器对象，包含了很多属性和对象（比如 history 对象），任何页面都可以调用其 push(), replace(), go() 等方法。

this.\$route 表示当前路由对象，每一个路由都会有一个 route 对象，是一个局部的对象，可以获取对应的 name, path, params, query 等属性。

## VueRouter 对象

在 beforeCreate 是进行 init

Mathcer 方法
将组件的名字和对应 url 一一匹配

路径切换
通过 URL 匹配对应的组件

完整的导航解析流程

- 导航被触发。
- 在失活的组件里调用 beforeRouteLeave 守卫。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
- 在路由配置里调用 beforeEnter。
- 解析异步路由组件。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫 (2.5+)。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 触发 DOM 更新。
- 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

## 总结：

路径变化是路由中最重要的功能，我们要记住以下内容：路由始终会维护当前的线路，路由切换的时候会把当前线路切换到目标线路，切换过程中会执行一系列的导航守卫钩子函数，会更改 url，同样也会渲染对应的组件，切换完毕后会把目标线路更新替换当前线路，这样就会作为下一次的路径切换的依据。

![Vue-Router 流程图](https://user-gold-cdn.xitu.io/2018/10/18/16684f162d3090eb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
