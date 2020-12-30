# Vue3 源码解析

![](https://s0.lgstatic.com/i/image/M00/2C/DC/Ciqc1F8Cn7KAELkqAAJkxFes1zw593.png)

## Vue2 VS Vue3

- 代码管理方式
  - Vue2 的核心代码在 src 目录下
  - Vue3 使用 monorepo 管理 packages ，目录结构更清晰
- 类型管理
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
通过编译阶段对静态模板的分析，编译成 Block Tree，简单来说就是把每个节点都打上一个标记，然后 diff 的时候好判断是否需要更新这个节点。这是一个非常大的性能突破

**语法优化**
提供 composition API，他的优点包括

- 优化逻辑组织（对比 OptionsAPI），将某个逻辑关注点项目的代码都放在一个函数里，**减少反复横挑**
- 逻辑复用，Vue2 需要使用 mixin 来处理，Vue3 直接使用函数复用

## 是否需要升级到 Vue3

- 老项目，不会再有新的需求，无需升级
- 新项目，对浏览器兼容要求不高的，可以小范围使用

边学习边使用

## 组件

### 组件渲染

**虚拟 DOM（vnode）**
Vnode 本质上就是用来描述 DOM 的 Javascript 对象，比如一个这样的 DOM 结构，使用 JS 描述为

```js
// DOM
<button class="btn" style="width:100px;height:50px">
  click me
</button>;
// vnode
const vnode = {
  type: "button",
  props: {
    class: "btn",
    style: {
      width: "100px",
      height: "50px",
    },
  },
  children: "click me",
};
```

Vnode 的优势是什么？

- 跨平台，使用 Vnode 可以进行不同端的渲染
- Vnode 的速度更快，通过 diff 算法对比出那些是需要更改的节点，然后在操作 DOM 进行最小的更改

## 参考

- [vue-next for GitHub](https://github.com/vuejs/vue-next)
- [Vue3 使用文档](https://composition-api.vuejs.org/zh/)
- [拉钩教育-黄秩-Vue3 源码解析](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=326#/content)
- [掘金 - Vue 3 源码导读](https://juejin.im/post/5d977f47e51d4578453274b3)
- [Vue3.0 源码解读-blog](https://hkc452.github.io/slamdunk-the-vue3/main/)
