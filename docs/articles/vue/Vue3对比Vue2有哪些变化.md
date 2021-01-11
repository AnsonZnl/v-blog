## Vue2.x

Vue.js 2.x 是采用数据劫持结合发布者-订阅者模式的方式，通过**Object.defineProperty()**方法来劫持各个属性的 setter、getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 都加上 setter 和 getter 。

这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化 compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图 Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:

1.在自身实例化时往属性订阅器(dep)里面添加自己

2.自身必须有一个 update()方法

3.待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。 MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果 著作权归「程序员成长指北-koala」所有。

```html
//vue实现数据双向绑定的原理就是用Object.defineproperty()重新定义（set方法）对象设置属性值和（get方法）获取属性值的操纵来实现的。
//Object.property()方法的解释：Object.property(参数1，参数2，参数3)
返回值为该对象obj
//其中参数1为该对象（obj），参数2为要定义或修改的对象的属性名，参数3为属性描述符，属性描述符是一个对象，主要有两种形式：数据描述符和存取描述符。这两种对象只能选择一种使用，不能混合使用。而get和set属于存取描述符对象的属性。
//这个方法会直接在一个对象上定义一个新属性或者修改对象上的现有属性，并返回该对象。

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="myapp">
      <input v-model="message" /><br />
      <span v-bind="message"></span>
    </div>
    <script type="text/javascript">
      var model = {
        message: "",
      };
      var models = myapp.querySelectorAll("[v-model=message]");
      for (var i = 0; i < models.length; i++) {
        models[i].onkeyup = function() {
          model[this.getAttribute("v-model")] = this.value;
        };
      }
      // 观察者模式 / 钩子函数
      // defineProperty 来定义一个对象的某个属性
      Object.defineProperty(model, "message", {
        set: function(newValue) {
          var binds = myapp.querySelectorAll("[v-bind=message]");
          for (var i = 0; i < binds.length; i++) {
            binds[i].innerHTML = newValue;
          }
          var models = myapp.querySelectorAll("[v-model=message]");
          for (var i = 0; i < models.length; i++) {
            models[i].value = newValue;
          }
          this.value = newValue;
        },
        get: function() {
          return this.value;
        },
      });
    </script>
  </body>
</html>
```

## Vue3

## Proxy 相比于 defineProperty 的优势

Object.defineProperty() 的问题主要有三个：

- 不能监听数组的变化
- 必须遍历对象的每个属性
- 必须深层遍历嵌套的对象

Proxy 在 ES2015 规范中被正式加入，它有以下几个特点：

- 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 Object.defineProperty() 第二个问题
- 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的。

除了上述两点之外，Proxy 还拥有以下优势： Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富 Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法。

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
