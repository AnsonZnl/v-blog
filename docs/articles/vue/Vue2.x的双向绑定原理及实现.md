# Vue2.x 的双向绑定原理及实现

## Vue 数据双向绑定原理

Vue 是利用的 Object.defineProperty()方法进行的数据劫持，利用 set、get 来检测数据的读写。

<iframe width="100%" height="300" src="//jsrun.net/RMIKp/embedded/all/light" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

MVVM 框架主要包含两个方面，数据变化更新视图，视图变化更新数据。

视图变化更新数据，如果是像 input 这种标签，可以使用 oninput 事件..

数据变化更新视图可以使用 Object.definProperty()的 set 方法可以检测数据变化，当数据改变就会触发这个函数，然后更新视图。

## 实现过程

我们知道了如何实现双向绑定了，首先要对数据进行劫持监听，所以我们需要设置一个 Observer 函数，用来监听所有属性的变化。

如果属性发生了变化，那就要告诉订阅者 watcher 看是否需要更新数据，如果订阅者有多个，则需要一个 Dep 来收集这些订阅者，然后在监听器 observer 和 watcher 之间进行统一管理。

还需要一个指令解析器 compile，对需要监听的节点和属性进行扫描和解析。

因此，流程大概是这样的：

1. 实现一个监听器 Observer，用来劫持并监听所有属性，如果发生变动，则通知订阅者。
2. 实现一个订阅者 Watcher，当接到属性变化的通知时，执行对应的函数，然后更新视图。
3. 实现一个解析器 Compile，用于扫描和解析的节点的相关指令，并根据初始化模板以及初始化相应的订阅器。

![](https://images2015.cnblogs.com/blog/938664/201705/938664-20170522225458132-1434604303.png)

## 显示一个 Observer

Observer 是一个数据监听器，核心方法是利用 Object.defineProperty()通过递归的方式对所有属性都添加 setter、getter 方法进行监听。

```js
var library = {
  book1: {
    name: "",
  },
  book2: "",
};
observe(library);
library.book1.name = "vue权威指南"; // 属性name已经被监听了，现在值为：“vue权威指南”
library.book2 = "没有此书籍"; // 属性book2已经被监听了，现在值为：“没有此书籍”

// 为数据添加检测
function defineReactive(data, key, val) {
  observe(val); // 递归遍历所有子属性
  let dep = new Dep(); // 新建一个dep
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (Dep.target) { // 判断是否需要添加订阅者，仅第一次需要添加，之后就不用了，详细看Watcher函数
        dep.addSub(Dep.target); // 添加一个订阅者
      }
      return val;
    },
    set: function(newVal) {
      if (val == newVal) return; // 如果值未发生改变就return
      val = newVal;
      console.log(
        "属性" + key + "已经被监听了，现在值为：“" + newVal.toString() + "”"
      );
      dep.notify(); // 如果数据发生变化，就通知所有的订阅者。
    },
  });
}

// 监听对象的所有属性
function observe(data) {
  if (!data || typeof data !== "object") {
    return; // 如果不是对象就return
  }
  Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key]);
  });
}
// Dep 负责收集订阅者，当属性发生变化时，触发更新函数。
function Dep() {
  this.subs = {};
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach((sub) => sub.update());
  },
};
```

思路分析中，需要有一个可以容纳订阅者消息订阅器 Dep，用于收集订阅者，在属性发生变化时执行对应的更新函数。

从代码上看，将订阅器 Dep 添加在 getter 里，是为了让 Watcher 初始化时触发，，因此，需要判断是否需要订阅者。

在 setter 中，如果有数据发生变化，则通知所有的订阅者，然后订阅者就会更新对应的函数。

到此为止，一个比较完整的 Observer 就完成了，接下来开始设计 Watcher.

## 实现 Watcher

订阅者 Watcher 需要在初始化的时候将自己添加到订阅器 Dep 中，我们已经知道监听器 Observer 是在 get 时执行的 Watcher 操作，所以只需要在 Watcher 初始化的时候触发对应的 get 函数去添加对应的订阅者操作即可。

那给如何触发 get 呢？因为我们已经设置了 Object.defineProperty()，所以只需要获取对应的属性值就可以触发了。

我们只需要在订阅者 Watcher 初始化的时候，在 Dep.target 上缓存下订阅者，添加成功之后在将其去掉就可以了。

```js

function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();  // 将自己添加到订阅器的操作
}
 
Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this;  // 缓存自己，用于判断是否添加watcher。
        var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    }
};

```

到此为止， 简单的额Watcher设计完毕，然后将Observer和Watcher关联起来，就可以实现一个简单的的双向绑定了。

因为还没有设计解析器Compile，所以可以先将模板数据写死。



## 参考

- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/)
- [掘金-剖析 Vue.js 内部运行机制](https://juejin.cn/book/6844733705089449991/section/6844733705227862023)
- [博客园-vue 的双向绑定原理及实现](https://www.cnblogs.com/canfoo/p/6891868.html)
- [KKB-vue 源码解析](https://github.com/AnsonZnl/KKB/blob/master/Vue/04Vue%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%9001/REDME.md)
