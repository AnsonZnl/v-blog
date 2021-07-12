# Vue 常见问题解析

## v-if 和 v-for 哪个优先级更高？

分析：此题考查常识，文档中曾有[详细说明](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%BF%85%E8%A6%81)；也是一个很好的实践题目，项目中经常会遇到，能够看出面试者应用能力。

思路分析：总分总模式

1. 先给出结论
2. 为什么是这样的
3. 它们能放一起吗
4. 如果不能，那应该怎样
5. 总结

回答范例：

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

## compone
