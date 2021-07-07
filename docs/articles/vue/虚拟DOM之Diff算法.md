## 虚拟 DOM 之 Diff 算法

上一节讲了[虚拟 DOM](./一次搞懂-Vue之虚拟DOM)，但是虚拟 DOM 是如何更新的？新旧节点的 path 又是如何进行的？这都需要一个 Diff 来完成。

给定任意两颗数，采用**先序深度优先遍历**的算法，找到最少的转换步骤。

DOM-diff 比较两个虚拟 DOM 的区别，也就是在比较两个对象的区别。

作用：**根据两个虚拟 DOM 对象创建出补丁，然后打补丁、更新 DOM。**

## Diff 逻辑

diff 的作用也了解了，他就是通过对比新老 Node，从而得到最后的 Patch

接受两个参数 newNode 和 oldNode

```js
// diff.js
function diff(odlTree, newTree) {
  // 声明变量 patches 用来存放补丁的对象
  let patches = {};
  // 第一次比较的 应该是树的第0个索引
  let index = 0;
  // 递归树
  walk(odlTree, newTree, index, patches);
  return patches;
}

function walk(oldNode, newNode, index, patches) {
  // 每一个元素都有一个补丁
  let current = [];

  if (!newNode) {
    // ----规则 1 新节点不存在----
    current.push({
      type: "REMOVE",
      index,
    });
  } else if (isString(oldNode) && isString(newNode)) {
    // 是文本节点
    if (oldNode !== newNode) {
      // 文本发生了变化
      current.push({
        type: "TEXT",
        text: newNode,
      });
    }
  } else if (oldNode.type === newNode.type) {
    // 比较属性变化
    let attr = diffAttr(oldNode.props, newNode.props);
    if (Object.keys[attr].length > 0) {
      // 有更新的属性
      current.push({
        type: "ATTR",
        attr,
      });
    }
    // 如果有子节点，递归子节点
    diffChildren(oldNode.children, newNode.children, patches);
  } else {
    // 都没有 说明节点被替换了
    current.push({
      type: "REPLACE",
      newNode,
    });
  }
  // 当前节点有补丁
  if (current.length) {
    patches[index] = current;
  }
}
// 比较是否是 文本 类型
function isString(node) {
  return typeof node === "string";
}
// 比较属性的差异
function diffAttr(oldProps, newProps) {
  let patch = {};
  // 1. 改变的属性
  // 判断新老属性的变更，把最后的变更放在patch中
  for (let key in oldProps) {
    if (oldProps[key] !== newProps[key]) {
      // 以新属性为准，因为新属性是最后的变更
      patch[key] = newProps[key];
    }
  }
  // 2. 新增的属性
  // 判断 假如新的属性，在老属性中没有，也添加patch
  for (let key in newProps) {
    if (!oldProps[key]) {
      patch[key] = newProps[key];
    }
  }
  return patch;
}
// 基于一个num序号来实现的
let num = 0;
// 递归子节点
function diffChildren(oldChildren, newChildren, patches) {
  // 比较老的第一个和新的第一个
  oldChildren.forEach((e, i) => {
    walk(e, newChildren[i], ++num, patches);
  });
}

// https://www.cnblogs.com/wind-lanyan/p/9061684.html
```

### 比较规则

1. 新 Node 节点不存在时：REMOVE
2. 文本的变化：TEXT
3. 节点类型相同，属性不同时：ATTR
4. 接点类型不同，使用替换：REPLACE

## Patch 逻辑

其实就是元素去打补丁，通过 type 然后执行不同的操作如新增、删除、移动、修改等...

```js
// patch

let allPatches;
let index2 = 0;

function patch(node, patches) {
  allPatches = patches;
  // 打补丁
  walk2(node);
}

function walk2(node) {
  let current = allPatches[index2++];
  let childNodes = node.childNodes;
  // 先序遍历 继续遍历递归子节点
  childNodes.forEach((child) => walk2(child));
  if (current) {
    // debugger
    doPatch(node, current);
  }
}

//打补丁
function doPatch(node, patches) {
  // 遍历所有打过的补丁
  patches.forEach((patch) => {
    switch (patch.type) {
      case "ATTR":
        for (let key in patch.attr) {
          let value = patch.attr[key];
          if (value) {
            setAttr(node, key, value);
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case "TEXT":
        node.textContent = patch.text;
        break;
      case "REPLACE":
        let newNode = patch.newNode;
        newNode =
          newNode instanceof Element
            ? render(newNode)
            : document.createTextNode(newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      case "REMOVE":
        node.parentNode.removeChild(node);
        break;
      default:
        break;
    }
  });
}
```

为了便于理解，只是罗列出了一小部分，Vue 的 patch 更复杂，可以参考：[vue 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/components/patch.html)和[vuejs/src/core/vdom/patch](https://github1s.com/vuejs/vue/blob/HEAD/src/core/vdom/patch.js)

## 总结

代码地址：[virtual-dom-study](https://github.com/AnsonZnl/virtual-dom-study)

**捋一下主要方法的作用：**

- Element：创建虚拟 DOM 元素的类
  - createElement：创建虚拟 DOM 并返回
- render：将虚拟 DOM 渲染成真实的 DOM
- diff：对比新老虚拟 DOM，然后返回变更
- patch：将 diff 的变更更新到真实的 DOM 上

**梳理一下整个 DOM-diff 的过程：**

- 用 JS 对象模拟 DOM（虚拟 DOM）
- 把虚拟 DOM 转化成真实的 DOM 并插入到页面中
- 如果有事件改变了虚拟 DOM，就比较两个虚拟 DOM 树的差异，得到差异对象（diff)
- 最后把差异对象（变化）更新到真实的 DOM 树上（patch）

这并不是 Vue，所使用的 diff 方法，只是一个简单的 diff 过程，Vue 的 diff 可以参考：[精读《DOM diff 原理详解》](https://github.com/ascoders/weekly/blob/v2/190.%E7%B2%BE%E8%AF%BB%E3%80%8ADOM%20diff%20%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3%E3%80%8B.md)和[精读《DOM diff 最长上升子序列》](https://github.com/ascoders/weekly/blob/v2/192.%E7%B2%BE%E8%AF%BB%E3%80%8ADOM%20diff%20%E6%9C%80%E9%95%BF%E4%B8%8A%E5%8D%87%E5%AD%90%E5%BA%8F%E5%88%97%E3%80%8B.md)

## 参考

- [学习虚拟 DOM](https://juejin.cn/post/6844903806132568072#heading-8)
