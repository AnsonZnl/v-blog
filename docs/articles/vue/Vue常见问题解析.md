# Vue 常见问题解析

## v-if 和 v-for 哪个优先级更高？

1. v-for 优先于 v-if 被解析

2. 我曾经做过实验，把它们放在一起，输出的渲染函数中可以看出会先执行循环再判断条件

3. 实践中也不应该把它们放一起，因为哪怕我们只渲染列表中一小部分元素，也得在每次重渲染的时候遍历整个列表。

4. 通常有两种情况下导致我们这样做：

   - 为了过滤列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。此时定义一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表即可。

   - 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。此时把 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)即可。

5. 文档中明确指出**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上**，显然这是一个重要的注意事项。

6. 看过源码里面关于代码生成的部分，

源码中找答案 compiler/codegen/index.js

## 生命周期钩子函数

- 在 `beforeCreate` 钩子函数调用的时候，是获取不到 `props` 或者 `data` 中的数据的，因为这些数据的初始化都在 `initState` 中。
- 然后会执行 `created` 钩子函数，在这一步的时候已经可以访问到之前不能访问到的数据，但是这时候组件还没被挂载，所以是看不到的。
- 接下来会先执行 `beforeMount` 钩子函数，开始创建 VDOM，最后执行 `mounted` 钩子，并将 VDOM 渲染为真实 DOM 并且渲染数据。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。
- 接下来是数据更新时会调用的钩子函数 `beforeUpdate` 和 `updated`，这两个钩子函数没什么好说的，就是分别在数据更新前和更新后会调用。
- 另外还有 `keep-alive` 独有的生命周期，分别为 `activated` 和 `deactivated`。用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 actived 钩子函数。
- 最后就是销毁组件的钩子函数 `beforeDestroy` 和 `destroyed`。前者适合移除事件、定时器等等，否则可能会引起内存泄露的问题。然后进行一系列的销毁操作，如果有子组件的话，也会递归销毁子组件，所有子组件都销毁完毕后才会执行根组件的 `destroyed` 钩子函数

## 组件传参

- 父子组件
  - 父组件到子组件：props
  - 子组件到父组件：\$emit
  - 通过`$parent`或者`$children` 对象来访问组件实例中的方法和数据。
  - 使用`$listeners`和`.sync`
- 兄弟组件
  - 使用共同的父组件搭桥
  - `this.$parent.$children`
  -
- 无关联组件
  - inject、provide
  - Event Bus
- 全局数据管理
  - Vuex

## 父子路由、组件加载顺序

由生命周期钩子函数可知，子组件是在父组件 `mounted` 之后才开始挂载的，所以顺序是：

```
父 beforeCreate
父 create
父 beforeMount
子 beforeCreate
子 create
子 beforeMount
孙 beforeCreate
孙 create
孙 beforeMount
孙 mounted
子 mounted
父 mounted
```

然后，mounted 生命周期被触发。

mounted 被调用完成，到此为止，组件的挂载就完成了，初始化的生命周期结束。

触发钩子的完整顺序：
将路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从 a 组件离开，第一次进入 b 组件：

```
beforeRouteLeave:路由组件的组件离开路由前钩子，可取消路由离开。
beforeEach: 路由全局前置守卫，可用于登录验证、全局路由loading等。
beforeEnter: 路由独享守卫
beforeRouteEnter: 路由组件的组件进入路由前钩子。
beforeResolve:路由全局解析守卫
afterEach:路由全局后置钩子
beforeCreate:组件生命周期，不能访问this。
created:组件生命周期，可以访问this，不能访问dom。
beforeMount:组件生命周期
deactivated: 离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。
mounted:访问/操作dom。
activated:进入缓存组件，进入a的嵌套子组件(如果有的话)。
执行beforeRouteEnter回调函数next。
```

## \$nextTick 原理

这块理解 EventLoop 的应该一看就懂，其实就是在下一次事件循环开始时开始更新 DOM，避免中间频繁的操作引起页面的重绘和回流。

这块引用官方文档：

> 可能你还没有注意到，Vue 在更新 DOM 时是**异步执行**的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

- [vue 异步更新策略](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

## 数组响应式问题和\$set 原理

熟读文档可以得出，除数组侦听的那几个方法外，其他的方式进行修改是不具有相应式的（如 this.arr[10]=xx）

同样的，具有相应是的对象，也应该在初始化的时候在 data 中声明出来，这样才能让 watcher 在一开始就侦听它，如果是新增的属性，则需要使用`this.$set()`方法了。

在最新的 Vue3.0 中，基于 Proxy 的响应式已经可以支持数组的所有方法了。
但是如果是改变*对象的动态新增属性*和*数组中直接使用索引修改值、直接修改长度*不可以被监测到，但是任然可以使用`Vue.set()`方法解决
- [vue3-深入响应式原理](https://v3.cn.vuejs.org/guide/reactivity.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%93%8D%E5%BA%94%E6%80%A7)
- [Vue-侦听变化注意事项](https://cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
- [Vue-数组监测更新](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)

## computed 和 watch

- `computed` 是计算属性，依赖其他属性计算值，并且 `computed` 的值有缓存，只有当计算值变化才会返回内容。
- `watch` 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。
- 所以一般来说需要依赖别的属性来动态获得值的时候可以使用 `computed`，对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用 `watch`。
