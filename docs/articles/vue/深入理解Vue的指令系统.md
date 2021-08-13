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

Vue除了提供内置指令外，为了更大的扩展性，还提供了自定义指令的功能，让使用这根据实际需要开发自己需要的指令。

当然也分全局指令和局部指令。

### 自定义全局指令



### 自定义局部指令





## 参考

- [vue自定义指令--directive](https://segmentfault.com/a/1190000018767046)
