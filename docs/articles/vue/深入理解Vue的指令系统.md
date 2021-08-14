# 深入理解 Vue 的指令系统

Vue 作为一款 MVVM 框架，其双向绑定实际上是：`JS 数据变化=》DOM 变化`，这快的变化大家都知道了，主要是通过劫持对象属性的`Object.defindProprotys`（Vue3 中改为 Proxy）。
那从 `DOM 变化=》JS 数据变化`的过程是怎么样的呢？这就是今天研究的内容————**Vue 的指令系统**。

## 指令是如何工作的？

比如常见的 v-modal、v-bind、v-on、v-if、v-for 等。不同的指令有不同的效果，具体可以去官网查看[Vue 指令](https://cn.vuejs.org/v2/guide/syntax.html#%E6%8C%87%E4%BB%A4)

从[Vue2.x 的双向绑定原理及实现](./Vue2.x的双向绑定原理及实现.md)中可以知道，其实是获取每个元素的属性，然后找出带有`v-`标示的指令进行解析，将对应的属性或方法设置上去。

对应到代码，其实也很简单。

```html
<div id="app">
    <h1 v-color="red">Hello World</h1>
    <h1 v-color="blue">Hello World</h1>
</div>

<script>
    let app = document.getElementById('app');
    let child = app.children;
    [...child].forEach(el => {
        el.style.color = el.attributes['v-color'].value
    });
<script>
```

## 自定义指令

Vue 除了提供内置指令外，为了更大的扩展性，还提供了自定义指令的功能，让使用这根据实际需要开发自己需要的指令。

当然也分全局指令和局部指令，但是他们所需传递的参数是一样的。

```js
let Opt = {
  // 指令被绑定到元素时调用
  bind: function (el, binding, vnode) {},
  // 元素插入父节点时调用
  inserted: function (el, binding, vnode) {},
  // VNode 更新时（前）调用
  update: function (el, binding, vnode) {},
  // VNode 更新后调用
  componentUpdated: function (el, binding, vnode) {},
  // 指令和元素解绑时调用
  unbind: function (el, binding, vnode) {},
};
```

参数

- el：指令所绑定的元素
- binding
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- Vnode：Vue 的虚拟节点

### 自定义全局指令

定义全局指令的话，范围是全局可用的。

比如最官方的示例：

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive("focus", {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus();
  },
});
```

### 自定义局部指令

实现一个`v-blink`指令，使用在元素上就会有一闪一闪的效果.

HTML：

```html
<h1 v-blink="700">Hello Wrold</h1>
```

JavaScript：

```js
    directives: {
        blink: {
        bind(el, binding, vnode) {
            setInterval(()=>{
                el.style.visibility = el.style.visibility === 'inherit' ? 'hidden' : 'inherit'
            }, binding.expression)
        }
    }
```

## 参考

- [vue 自定义指令--directive](https://segmentfault.com/a/1190000018767046)
- [Vue自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)
