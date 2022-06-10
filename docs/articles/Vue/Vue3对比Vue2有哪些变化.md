# Vue2 VS Vue3

## 响应式

Vue3 使用 Proxy 进行的响应式，Proxy 相比于 defineProperty 的优势，Object.defineProperty() 的问题主要有三个：

- 不能监听数组的变化
- 必须遍历对象的每个属性
- 必须深层遍历嵌套的对象

Proxy 在 ES2015 规范中被正式加入，它有以下几个特点：

- 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 Object.defineProperty() 第二个问题
- 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的。

除了上述两点之外，Proxy 还拥有以下优势： Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富 Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法。

## 管理方式

- 代码管理方式
  - Vue2 的核心代码在 src 目录下，使用 rollup 管理。
  - Vue3 使用 monorepo 管理 packages ，目录结构更清晰。
- 类型管理方式
  - Vue2 使用的 Flow,Facebook 维护的静态检查工具，已烂尾
  - Vue3 使用 TypeScript 重构了整个项目，拥抱 TS 生态

## 性能优化

**源码体积优化**

- 首先，移除一些冷门的 feature（比如 filter、inline-template 等）；
- 其次，引入 tree-shaking 的技术，减少打包体积。
  使用 tree-shaking 的原理就是利用 ES5 的模块语法的静态结构（即 import 和 export），通过编译阶段的静态分析，找到没有引入的模块，并打上标记，然后在打包的时候，不打包这些没用到的模块，从而减少项目体积。
  **数据劫持优化**
  Vue2 使用的 Object.defineProperty 的 getter/setter 对对象的属性进行的数据劫持，但是存在一些缺点，比如对于数组的检测支持并不是很好、不能检测对象属性的添加和删除（虽然有$set和$delete，但是还有不太友好）。
  Vue3 使用 Proxy，它劫持的是整个对象，对于对象属性的增加和删除都能检测到

**编译优化**
通过编译阶段对静态模板的分析，编译成 Block Tree，简单来说就是把每个节点都打上一个标记，然后 diff 的时候好判断是否需要更新这个节点，这是一个非常大的性能突破。

**语法优化**
提供 composition API，他的优点包括

- 优化逻辑组织（对比 OptionsAPI），将某个逻辑关注点项目的代码都放在一个函数里，**减少反复横挑**
- 逻辑复用，Vue2 需要使用 mixin 来处理，Vue3 直接使用函数复用

## 总结

- 使用 proxy 代替 getter/setter
- 使用 typescipt 代替 flow 管理类型
- 引入 tree-shaking 减少代码体积
- 使用 composition 组织状态
- 使用 monorepo 代替 rollup 管理代码

## 参考

- [vue-next for GitHub](https://github.com/vuejs/vue-next)
- [Vue3 使用文档](https://composition-api.vuejs.org/zh/)
- [拉钩教育-黄秩-Vue3 源码解析](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=326#/content)
- [掘金 - Vue 3 源码导读](https://juejin.im/post/5d977f47e51d4578453274b3)
- [Vue3.0 源码解读-blog](https://hkc452.github.io/slamdunk-the-vue3/main/)
