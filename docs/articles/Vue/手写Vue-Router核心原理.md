## 手写 vue-router 核心原理

在[Vue-Router 原理解析](./Vue-Router原理解析.md)里已经知道了，Vue-router 是通过监听路由变化，拿到路由的 URL（hash 模式下#后面的字段）然后通过匹配对应的组件，最后将组件渲染到对应的`<router-view>`上。

整个大体流程是这样的，具体实现还是有很多细节需要注意，这些我们可以通过实现一个自己的 router 来学习。

## 参考

- [手写 Vue-router 核心原理，再也不怕面试官问我 Vue-router 原理](https://juejin.cn/post/6854573222231605256#heading-1)
- [手写简化版 Vue-router](https://zhuanlan.zhihu.com/p/47331073)
- [手写 Vue-核心原理](https://github.com/Sunny-lucking/howToBuildMyVueRouter)
