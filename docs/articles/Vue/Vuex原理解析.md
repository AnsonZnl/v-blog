# Vuex 原理解析

核心思想：store，基于 Vue 响应式的全局对象。

- Vuex 的状态储存是响应式的，当 Vue 组件从 store 中去读状态时，若 store 中状态发生变化，那么相应的组件也会得到更新。
- 你不能直接改变 store 的值，改变 store 中的状态的唯一途径就是显式的提交，这样可以方便我们跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好的了解我们的应用。

## 特点

1. 集中式储存管理应用的所有组件的状态。
2. 并与相应的规则保证状态以一种可预测的方式改变。
   状态管理

- state：驱动应用的数据源
- view：将 state 映射到视图当中
- actions：响应在 view 上的状态变化。

![单向数据流](https://ustbhuangyi.github.io/vue-analysis/assets/vuex.png)

## Vuex 核心思想

store：一个包含大部分状态的容器，他和全局变量的区别有两点不同：

- Vuex 状态时响应式的，数据会驱动视图发生变化。
- 你不能直接改变 store，改变的途径只能使用 commit 一个 mutation，因为这样可以方便跟踪每一个状态的变化。

通过定义和状态隔离的概念并强制遵守一定的规则，会使得代码易于维护。

![](https://ustbhuangyi.github.io/vue-analysis/assets/vuex1.png)

## Vuex 初始化

### 安装

- 实现一个 install，接受一个 vue 实例
- 使用 mixin 在 beforeCreat 中执行 vuexInit 方法
- 把 options.store 保存在所有组件的 this.\$store 当中。

### Store 实例化

在 import Vuex 后，会实例化其中的 Store 对象，返回 store 实例并传入 new Vue 的 options，也就是 options.store。

初始化 store.\_vm
将 getters 和 state 联系起来，利用了 Vue 中的 computed

通过 key 访问，store。getters 的某个值时，其实就是访问了 store.\_vm[key]，也就是 computed[key]。

### 初始化模块

Vuex 允许我们将 store 分割成多个模块（module）,每个模块都有自己的 store mutation action getter。

可以将 store 理解一个 root module，下面的 modules 就是子模块。（树形结构）

模块管理：注册=》构建=》加载模块=》建立关系

### 安装模块

初始化之后，对模块中的 state、getters、mutation、actions 做初始化工作。

执行 installModule

- registerMustion
- registerAction
- registerGetter

### 初始化 store.\_vm

resetStoreVm

- forEach 所有的值
- 将所有的值变成响应式的
- getters 是借助 computed 实现的

### 总结

安装，mixin 在 beforeCreate 中进行 this.\$store 的实例化
把 store 想象成一个数据仓库，为了方便管理，将 store 拆分成了一些 modules，每个 moduels 又分别定义了 state,getter,mutations,actions，通过递归+遍历的方式完成了初始化。
为了更好的封装性和复用性，还定义了 namespace 的概念。
最后定义了一个内部的 Vue 实例，用来建立 state 和 getters 的联系，并且可以在严格模式下检测 state 的变化是不是来自外部的，确保求变的 state 的唯一途径就是显式的提交 mutation。

## API

store 的 API 分析

### 数据获取

`store.state.a.b.xx`在 installModule 实现的

### 数据存储

修改通过 mutation 去修改，通过 commit 方法去提交一个 mutation。
mutation 必须是一个同步函数，用与同步修改
action 类似于 mutation，并且可以包含异步操作。
通过 dispatch 方法提交一个 action。

### 语法糖

mapState

mapGetters

mapMutations

mapActions

### 动态更新模块

通过 store 上提供的一个 registerModule 方法，支持传入一个路径进行动态模块定义。
相应的也提供动态卸载模块的方法，unregisterModule 方法，也是接受接受一个路径。

### 总结

Vuex 提供 API 包括数据的存取、语法糖、模块的动态更新等，值得学习。

### 最佳实践

Vuex 存储的数据是在内存中的，所以页面一刷新数据就消失了。解决方法就是利用浏览器的本地缓存和 Vuex 中做一个中间代理。缓存做为代理方，存储数据，Vuex 作为获取方，从本地缓存中拿去数据。

**缓存方式的选择**

- cookie：跟随域名的 cookie，5k,会带在 http 请求上
- sessionStorage：会话储存 5M，页面关闭数据清除
- localStorage：永久储存 5M，不清楚一直存在

他们的优劣和使用场景不同，localStorage 适合储存不变的数据，比如网站的 logo。sessionStorage 适合存储一些临时的数据，比如个人信息、token。而 cookie 储存较小，而且会带在着 http 请求上，不易过大，但是兼容性较好，比如在微信网页内，只能使用 cookie 进行储存。

**优秀的第三方库**

可以借助第三方库来更方便的操作本地缓存。

- [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)
- [js-cookie](https://github.com/js-cookie/js-cookie)
- [vue-savedata](https://www.npmjs.com/package/vue-savedata)

### 参考

- [Vue.js 技术揭秘-Vuex](https://ustbhuangyi.github.io/vue-analysis/v2/vuex/#%E4%BB%80%E4%B9%88%E6%98%AF-%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%A8%A1%E5%BC%8F-%EF%BC%9F)
