# Vue 之虚拟 DOM

## 介绍

### 什么是虚拟 DOM

> 就是用 JS 去按照 DOM 结构来实现的树形结构对象，你也可以叫做 DOM 对象

比如：下边的 HTML 结构可以使用 JavaScript 对象的形式表达出来。

HTMl

```html
<ul id="list">
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>
  <li class="item">Item 3</li>
</ul>
```

JavaScript

```js
var element = {
  tagName: "ul", // 节点标签名
  props: {
    // DOM的属性，用一个对象存储键值对
    id: "list",
  },
  children: [
    // 该节点的子节点
    { tagName: "li", props: { class: "item" }, children: ["Item 1"] },
    { tagName: "li", props: { class: "item" }, children: ["Item 2"] },
    { tagName: "li", props: { class: "item" }, children: ["Item 3"] },
  ],
};
```

然后在通过`createElement`等 DOM API 操作完成从 JavaScript 对象=》真实 DOM 的转化。

### 为什么要用虚拟 DOM？

1. 操作真实 DOM 花销很大，引起重绘、回流等
2. 减少不必要的开销比如三个列表，比如现在替换一种一个列表，通过 diff 后，只需要操作一次列表（局部变动），这样可以提升性能。
3. 其他的比如跨平台（RN、Weex、Flutter），组件的高度抽象化、可以更好的实现 SSR、同构渲染等

## 实现一个虚拟 DOM

## 参考

- [深入剖析：Vue 核心之虚拟 DOM](https://juejin.cn/post/6844903895467032589)
- [我们真的需要虚拟 DOM 吗？](https://juejin.cn/post/6844903850520870926)
- [Vue 核心之虚拟 DOM](https://www.jianshu.com/p/af0b398602bc)
- [Vue2.x-vnode 源码](https://github1s.com/vuejs/vue/blob/HEAD/src/core/vdom/vnode.js)
