
---
title: Vue.js 知识点总结
date: 2018-09-17 14:04:54
tags: ["Vue.js","JavaScript"]
---
### 基础知识：

*   vue的生命周期： `beforeCreate/created`、`beforeMount/mounted`、`beforeUpdate/updated`、`beforeDestory/destoryed`
*   vue常用指令： `v-for`、`v-bind`（缩写形式`:prop`）、`v-on`(缩写形式`@click=’sss'`)、`v-if/v-else/v-else-if`、`v-model`、`v-once`、`v-html`、`v-show`...
*   vue自定义组件：`Vue.component(‘componentName',{ props:[‘p1’,’p2’], template: ‘<li>{{ p1 }}</li>' })`
*   vue常用实例方法和属性: `data/$data`、`methods/$methods`、`$el`、`computed`(计算属性)、`$watch`、`$set`、`$event`、`$emit`...
*   如果需要更新的属性需要缓存，则使用计算属性的方式，否则可以使用`methods`里的方法来更新属性（`methods`里的方法每次重新渲染都会执行）
*   计算属性默认提供了`getter`，你还可以给它设置`setter`
*   当你数据变化是异步或者开销较大时，可以使用`watch`侦听器来响应数据的变化
*   `v-bind:class`的值可以是一个对象，可实现类似`react`中`classnames`模块的功能
*   自定义组件上的`class`会被渲染拼接到`template`的根节点的`class`属性上（自定义组件上可使用`v-bind:class`来做class的判断显示逻辑）
*   `v-bind:style`可以用来绑定内联样式，这个内联样式的值可以由一个对象来定义（类似css in js的模式）,且可以被定义为数组(多个样式对象)
*   `v-bind:style`可以使用多重值的形式：`<div :style=“display:[‘-webkit-box’,’-ms-flexbox’, ‘flex']"></div>`
*   `v-if/v-else/v-else-if`的时候，可以用key来管理可复用的元素
*   `v-if`是’真正’的渲染，它会确保在切换条件过程中条件块内的元素的事件监听器和子组件适时的销毁和重建
*   `v-if`是惰性的，初始为假，什么也不做，直到为真的时候才渲染元素
*   `v-show`总是渲染元素，只是简单的进行切换
*   `v-if`的切换开销大，`v-show`则是初始渲染开销大，频繁切换使用`v-show`，运行时经常改变则使用`v-if`
*   `v-if`和`v-for`一起使用时，`v-for`的优先级更高
*   `v-for`可遍历数组，第二个参数是索引
*   `v-for`可遍历对象，第二个参数是`key`，第三个参数是索引
*   `v-for`和`<template>`搭配可减少渲染次数
*   `v-for`和自定义组件使用时，需要使用`props`来传递值
*   尽可能的为遍历子元素加上`key`，获得渲染优化
*   数组变异方法：`push/pop/unshift/shift/splice/sort/reverse`改变原始数组
*   数组非变异方法：`filter/concat/slice` 不改变原始数组，总是返回新数组
*   Vue不能检测到数组索引赋值（使用`vm.$set`解决）和修改`length`长度赋值(使用`splice`解决)的情况
*   Vue不能检测对象属性的添加和删除(使用`vm.$set`或`Object.assign`)
*   `is=“todo-item”`这种属性的写法比较适合DOM模板
*   事件修饰符，它们可串联使用：`.stop`、`.prevent`、`.capture`、`.self`、`.once`、`.passive`(尤其适合移动端)
*   `.passive`不用同时和`.prevent`使用，后者会被忽略
*   按键修饰符: `.enter`、`.tab`、`.delete`、`.esc`、`.space`、`.up`、`.down`、`.left`、`.right`
*   系统按键修饰符:`.ctrl`、`.alt`、`.shift`、`.meta(⌘|⊞|◆)`、`.exact`(允许精确控制系统修饰符组合键触发)
*   鼠标修饰符： `.left`、`.right`、`.middle`
*   `v-model`会忽略表单元素的`value`、`checked`、`selected`，仅仅使用实例中的数据作为数据源
*   表单事件修饰符：`.lazy`、`.number`、`.trim`
*   组件是可复用的vue实例，具有vue实例大多数属性和方法
*   组件可复用，每个组件有独立的空间
*   组件上的data必须是一个函数，这样做避免影响了其他组件
*   通过`Vue.component()`全局注册的组件可在其被注册后的任何通过`new Vue()`创建的实例所使用，包含其组件树中的所有组件
*   通过插槽`<slot>`分发内容(其实就是类似于react的children)
*   动态组件`<component>`配合属性`is`来实现
*   解析DOM模板时需要注意下可能会有不生效的情况，需要使用is来传递组件

### Vue组件

*   全局注册/局部注册
*   局部注册组件在子组件中不可用
*   全局注册的行为必须在根Vue实例创建之前发生
*   `camelCase`的属性可以在组件中使用`kebab-case`
*   可以以对象的模式指定每一个`props`属性的类型
*   父级`props`的更新会向下流动，反之则不行
*   由于JavaScript对象和数组是引用传入的，所以当子组件对props的改变将会影响到父组件
*   props类型校验可以是原生构造对象的中的任意一个，也可以自定义检验类型，通过`instanceof`检查
*   对于绝大多数特性来说，外部传入的值会替换掉组件内部设置好的值，如input的type属性，但有的属性则是会进行合并，如class
*   `inhertAttrs:false`设置不希望根元素继承特性，可以使用`$attrs`属性来设置继承的目标元素
*   `v-on`在设置事件监听器时，会把事件名全部转换成小写，推荐始终使用`kebab-case`的事件名
*   `v-model`可以使用自定义组件中的`model`属性自定义
*   父组件模板的所有东西都会在父级作用域内编译，子组件的所有内容都会在子组件作用域内编译
*   插槽(`<slot></slot>`)/具名插槽(`<slot name=“header"></slot>`)/作用域插槽(`slot/slot-scope`)
*   `<keep-alive>`组件可用来缓存被切换后隐藏的组件的状态
*   `$root`访问根实例，`$parent`访问父组件实例(不推荐)
*   父组件访问子组件，使用`$refs`属性来获取设置了`ref`属性的子组件
*   `provide`属性允许我们指定要分享给后代组件使用的方法，然后后代组件使用`inject`属性来获得祖先组件分享的方法(依赖注入)
*   事件侦听器（`$emit`派发的事件）

    *   `v-on` 指令侦听
    *   `$on` 侦听一个事件
    *   `$once` 一次性侦听一个事件
    *   `$off` 停止侦听一个事件
*   慎用递归组件
*   尽量避免组件的循环引用
*   优先使用`template`来定义模板，而不是`inline-template`
*   `$forceUpdate`来强制更新view
*   组件包含大量静态内容时，可使用`v-once`来标记，缓存静态内容

### 过渡 & 动画

*   `transition`组件控制过渡动画，可以给任何元素和组件添加进入/离开过渡
*   当插入或删除`transition`中的元素时，vue会做如下处理

    *   自动嗅探元素是否使用了css过渡和动画，适当时机添加/删除类名
    *   元素的钩子函数会在适当时机被调用
    *   元素既没有钩子函数也没有css动画，插入和删除操作在下一帧立即执行（浏览器逐帧动画机制）
*   过渡的类名

    *   `v-enter/v-enter-active/v-enter-to`
    *   `v-leave/v-leave-active/v-leave-to`
*   css动画用法同css过渡，区别是类名`v-enter`不会在DOM插入后立即删除，而是在`animationend`事件触发时删除
*   自定义过渡类名，使用以下属性指定:

    *   `enter-class/enter-active-class/enter-to-class`
    *   `leave-class/leave-active-class/leave-to-class`
    *   自定义类名优先级高于普通的类名
*   使用`typ`e属性设置`transition`或`animation`来申明vue使用的动画类型
*   `transition`组件上使用`duration`来设置动画执行的时间
*   可以使用钩子函数

    *   `beforeEnter/enter/afterEnter/enterCancelled`
    *   `beforeLeave/leave/afterLeave/leaveCancelled`
    *   钩子函数使用`v-on`指令绑定
    *   钩子和结合过渡和动画使用，也可以单独使用
    *   在`enter/leave`中，必须使用`done()`来进行回调，否则会同步调用，过渡或动画会立即完成
    *   对于纯使用JavaScript来进行的动画，推荐使用`v-bind:css=“false”`来取消css的检测，减少css的影响
*   可使用`apear`设置初始渲染的过渡

    *   `apear/apear-active/apear-to`
    *   `beforeApear/apear/afterApear/apearCancelled`
*   多元素过渡，设置唯一`key`
*   过渡模式:

    *   `In-out` 新元素先过渡，完成后当前元素过渡离开
    *   `out-in` 当前元素先过渡，完成后新元素过渡进入
    *   `默认行为`：进入和离开同时发生
*   多个组件过渡使用动态组件实现
*   列表过渡 `<transition-group>`

    *   以真实元素呈现，默认为`<span>`，可使用tag更改呈现标签
    *   过渡模式不可用
    *   内部需要唯一`key`
*   列表排序过渡，使用的是`FLIP`动画，使用类名`v-move`来定义class

### 可复用性 & 组合

*   `mixins`混入属性发生冲突时，以组件数据优先（一层属性深度浅合并）
*   `mixins`混入方法发生冲突时，会将函数合并为一个数组，优先执行混入方法，其次执行组件方法
*   `Vue.extend`策略和`mixins`相同
*   慎用全局混入
*   合并策略可以自定义（参考`vuex`的具体实现：`Vue.config.optionMergeStrategies`）
*   全局自定义指令：`Vue.directive()`
*   局部自定义指令：属性`directives`，类型为`Object`
*   钩子函数

    *   **bind** 指令第一次绑定到元素时调用，只执行一次，可用于一次性初始化设置
    *   **inserted** 元素插入父节点时调用
    *   **update** 所有VNode更新时调用，可能发生在子*VNode*之前
    *   **componentUpdated** 指令所在组件在*VNode*和其子*VNode*更新后调用
    *   **unbind** 指令与元素解绑时调用
*   钩子函数都会被传入以下参数：

    *   **el** 指令绑定元素，可操作DOM
    *   **binding** 指令描述对象
    *   **vnode** Vue生成的虚拟节点
    *   **oldVnode** 上一个`Vnode`，仅在`update`和`componentUpdated`中使用
*   指令接受所有合法的JavaScript表达式

### 渲染函数 & JSX

*   `render`函数接受`createElement`方法作为参数
*   `createElement`方法的作用是创建一个虚拟节点(VNode)
*   `createElement`参数比较复杂，参照官网：参数
*   组件树中的`VNodes`必须唯一
*   render中的`v-if/v-for`可以使用`if/else`和`map`重写
*   插槽使用`this.$slot.default`访问，作用域插槽使用`this.$scopeSlots.default`访问和设置
*   可以使用插件`babel-plugin-transform-vue-jsx`支持JSX语法
*   将h作为`createElement`的别名是Vue生态的一个惯例，也是JSX要求的
*   函数式组件 关键词：functional
*   函数式组件渲染开销低，但相应的，它不会出现在Vue devtools的组件树里边
*   函数式组件要求你自己实现同名特性的替换与智能合并
*   Vue的模板实际编译成了`render`方法实现的`VNode`，可以使用`Vue.compile()`方法来输出编译结果

### 插件

*   插件会为vue提供全局的功能，包括但不限于以下几种：

    *   添加全局的属性或方法，如[vue-custom-element](https://github.com/karol-f/vue-custom-element)
    *   添加全局的资源（指令、过滤器、过渡等），如：[vue-touch](https://github.com/vuejs/vue-touch)
    *   通过全局`mixins`添加一些组件选项，如：[vue-router](https://github.com/vuejs/vue-touch)
    *   添加Vue实例方法，通过添加到`Vue.prototype`上实现
    *   一个独立的库，同时有自己的API，又实现以上部分功能，如：[vue-router](https://github.com/vuejs/vue-touch)
*   Vue插件有一个公开的方法`install`，第一个参数是Vue构造器，第二个参数是一个可选对象。
*   插件的使用通过全局方法`Vue.use(MyPlugin)`使用，只会注册一次插件
*   在CommonJS中，应该始终显式的调用`Vue.use`方法
*   社区插件列表[awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries)

### 过滤器

```
{{ msg | filter }}
<div v-bind=“msg | filter"></div>
```
*   全局过滤器使用Vue.filter()创建
*   局部过滤器使用对象属性filters创建
*   过滤器函数总是接收表达式的值作为第一个参数，过滤器可以有多个，值依次向后传递
*   过滤器可以接收额外的参数

### 构建 & 部署

*   ```<script>```标签引入```[vue.min.js](https://vuejs.org/js/vue.min.js)```
*   使用`vue-cli`

    *   webpack + vue-loader
    *   browserify + vueify
    *   rollup + rollup-plugin-vue
*   利用钩子函数`Vue.config.errorHandler`定义配置来跟踪运行时错误，可以搭配`[Sentry](https://sentry.io/)`使用（[集成配置](https://sentry.io/for/vue/)）
*   单文件组件（`.vue`文件）
