# Vue 之虚拟 DOM

## 介绍

### 为什么要学习虚拟 DOM

尤大推荐，Vue.js 在用。
![learnvDom.png](https://i.loli.net/2021/05/21/YmWge4I37CBz5Ji.png)

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

使用 JavaScript 的对象结构去描述一个 DOM，然后渲染到页面上。
第一步：得有一个创建虚拟 DOM 的方法（称为 createElement）
第二步：通过虚拟 DOM 生成真实 DOM 的方法（render）
第三步：将生成后的真实 DOM 插入页面中(renderDom)

### 创建虚拟 DOM

先来了解一个基本的 DOM 的组成:

```html
<ul id="list">
  <li class="item">Item 1</li>
</ul>
```

分别对应三个属性：

- type：`div`
- props: `id="list"`
- children：`{type: "li",props:{class:"item"},children:"Item 1"}`

明确了属性和值，我们可以借助构造函数去批量的创建虚拟 DOM 了，

```js
// element.js
class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}
```

`createElement`函数，用于将创建后的虚拟 DOM 返回

```js
// createElement.js
function createElement(type, props, children) {
  return new Element(type, props, children);
}
```

### 生成真实 DOM

通过一个 render 函数将 vDOM 转化为真实的 DOM。

```js
// render.js
// render 方法可以将虚拟DOM转化为真是的DOM
function render(vDom) {
  let { type, props, children } = vDom;
  // 创建元素
  let el = document.createElement(type);
  // 遍历props，设置属性
  for (let key in props) {
    setAttr(el, key, props[key]);
  }
  // 遍历子节点
  // 如果是虚拟DOM，就递归
  // 不是就是文本节点，直接创建
  children.forEach((childEl) => {
    childEl =
      childEl instanceof Element
        ? render(childEl)
        : document.createTextNode(childEl);
    el.appendChild(childEl);
  });
  // 创建完毕返回节点
  return el;
}
// 设置属性
function setAttr(node, key, value) {
  if (key === "value") {
    // 如果是value，则表明是input、textarea节点
    let tagName = node.tagName.toLowerCase();
    if (tagName == "input" || tagName == "textarea") {
      node.value = value;
    } else {
      node.setAttribute(key, value);
    }
  } else if (key === "style") {
    // 直接设置的行内样式
    node.style.cssText = value;
  } else {
    // 设置的属性 比如class、id、dataset等
    node.setAttribute(key, value);
  }
}
```

通过 renderDom 将生成后的真实 DOM 挂载到制定的元素上

```js
// renderDom.js
// 将生成的真实DOM，添加到目标元素中
function renderDom(el, target) {
  target.appendChild(el);
}
```

### 使用

接下来，就是见证奇迹的时刻了

```js
// index.js
// 描述虚拟DOM的JS对象
let jsDomObj = {
  type: "ul",
  props: {
    class: "list",
  },
  children: [
    createElement(
      "li",
      {
        class: "item",
      },
      ["周杰伦"]
    ),
    createElement(
      "li",
      {
        class: "item",
      },
      ["林俊杰"]
    ),
    createElement(
      "li",
      {
        class: "item",
      },
      ["王力宏"]
    ),
  ],
};
// 通过createElement将JS对象转化为虚拟DOM
let virtualDom = createElement(
  jsDomObj.type,
  jsDomObj.props,
  jsDomObj.children
);
// 打印 虚拟DOM
console.log("虚拟DOM\n", virtualDom);

// 渲染虚拟DOM得到真实的DOM结构
let el = render(virtualDom);

// 打印 真实DOM
console.log("真实DOM\n", el);

// 直接将DOM添加到页面内
renderDom(el, document.getElementById("root"));
```

打开页面后，发现了 list 渲染成功！！
![vDom2.png](https://i.loli.net/2021/05/21/BwVA41jIMfo9J7m.png)
我们可以查看控制台打印的结果：
![vDomandrDom.png](https://i.loli.net/2021/05/21/CspGVoALWk9tQ4x.png)

## Diff 算法

这就是所谓的 Virtual DOM 算法。包括几个步骤：

1. 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。
2. 然后用新的树和旧的树进行比较，记录两棵树差异把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了 Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。

可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）。

### 结语

Vue 编译也分两个版本

- 一个是运行时+编译器，比如使用 vue-cli，是通过 webpack 的 vue-loader 将模板编译成真实 DOM 的
- 一个是运行时，比如直接使用 CDN 将整个 Vue 代码引入到项目当中，则使用 render 方法编译的。

Vue.js 使用的 Virtual DOM 参考的是开源库 [github-snabbdom](https://github.com/snabbdom/snabbdom) 有兴趣的可以看一下他的源码。

## 参考

- [深入剖析：Vue 核心之虚拟 DOM](https://juejin.cn/post/6844903895467032589)
- [我们真的需要虚拟 DOM 吗？](https://juejin.cn/post/6844903850520870926)
- [Vue 核心之虚拟 DOM](https://www.jianshu.com/p/af0b398602bc)
- [Vue2.x-vnode 源码](https://github1s.com/vuejs/vue/blob/HEAD/src/core/vdom/vnode.js)
- [Vue.js 技术揭秘之 Vdom](https://ustbhuangyi.github.io/vue-analysis/v2/data-driven/virtual-dom.html)
- [Github-snabbdom](https://github.com/snabbdom/snabbdom)
