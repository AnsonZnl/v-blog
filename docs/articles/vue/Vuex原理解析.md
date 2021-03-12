Vuex
核心思想：store，基于 Vue 响应式的全局对象。

- Vuex 的状态储存是响应式的，当 Vue 组件从 store 中去读状态时，若 store 中状态发生变化，那么相应的组件也会得到更新。
- 你不能直接改变 store 的值，改变 store 中的状态的唯一途径就是显式的提交，这样可以方便我们跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好的了解我们的应用。

![vuex 图](https://ustbhuangyi.github.io/vue-analysis/assets/vuex1.png)

Vuex 初始化

实现 install 方法，在 beforeCreate 中进行 mixin，实例化 this.\$store。
通过模块与模块之间的关系，建立模块树

安装模块
通过 installModule 完成模块下的 state、getters、actions、mutations 的初试工作，并通过递归遍历的方式，完成多有子模块的安装工作。

初始化 store.\_vm
将 getters 和 state 联系起来，利用了 Vue 中的 computed

通过 key 访问，store。getters 的某个值时，其实就是访问了 store.\_vm[key]，也就是 computed[key]。

总结：
把 store 想象成一个数据仓库，为了方便管理，又把大的 store 拆分成一个一个的 modules，
