

# Vuex原理解析

核心思想：store，基于 Vue 响应式的全局对象。

- Vuex 的状态储存是响应式的，当 Vue 组件从 store 中去读状态时，若 store 中状态发生变化，那么相应的组件也会得到更新。
- 你不能直接改变 store 的值，改变 store 中的状态的唯一途径就是显式的提交，这样可以方便我们跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好的了解我们的应用。

## 特点
1. 集中式储存管理应用的所有组件的状态。
2. 并与相应的规则保证状态以一种可预测的方式改变。
状态管理
- state：驱动应用的数据源
- view：将state映射到视图当中
- actions：响应在view上的状态变化。

![单向数据流](https://ustbhuangyi.github.io/vue-analysis/assets/vuex.png)

## Vuex 核心思想
store：一个包含大部分状态的容器，他和全局变量的区别有两点不同：
- Vuex状态时响应式的，数据会驱动视图发生变化。
- 你不能直接改变store，改变的途径只能使用commit一个mutation，因为这样可以方便跟踪每一个状态的变化。

通过定义和状态隔离的概念并强制遵守一定的规则，会使得代码易于维护。

![](https://ustbhuangyi.github.io/vue-analysis/assets/vuex1.png)

## Vuex 初始化

### 安装
- 实现一个install，接受一个vue实例
 - 使用mixin在beforeCreat中执行vuexInit方法
 - 把options.store保存在所有组件的this.$store当中。

### Store实例化
在 import Vuex 后，会实例化其中的Store对象，返回store实例并传入new Vue 的options，也就是options.store。

初始化 store.\_vm
将 getters 和 state 联系起来，利用了 Vue 中的 computed

通过 key 访问，store。getters 的某个值时，其实就是访问了 store.\_vm[key]，也就是 computed[key]。
### 初始化模块

Vuex允许我们将store分割成多个模块（module）,每个模块都有自己的store mutation action getter。

可以将store理解一个root module，下面的modules就是子模块。（树形结构）

模块管理：注册=》构建=》加载模块=》建立关系

### 安装模块
初始化之后，对模块中的state、getters、mutation、actions做初始化工作。

执行installModule
- registerMustion
- registerAction
- registerGetter

### 初始化 store._vm
 resetStoreVm
- forEach所有的值
- 将所有的值变成响应式的
- getters是借助computed实现的

### 总结
安装，mixin在beforeCreate中进行this.$store的实例化
把store想象成一个数据仓库，为了方便管理，将store拆分成了一些modules，每个moduels又分别定义了state,getter,mutations,actions，通过递归+遍历的方式完成了初始化。
为了更好的封装性和复用性，还定义了namespace的概念。
最后定义了一个内部的Vue实例，用来建立state和getters的联系，并且可以在严格模式下检测state的变化是不是来自外部的，确保求变的state的唯一途径就是显式的提交mutation。

## API
store的API分析

### 数据获取
`store.state.a.b.xx`在installModule实现的

### 数据存储
修改通过mutation去修改，通过commit方法去提交一个mutation。
mutation必须是一个同步函数，用与同步修改
action类似于mutation，并且可以包含异步操作。
通过dispatch方法提交一个action。


### 语法糖

mapState

mapGetters

mapMutations

mapActions

### 动态更新模块

通过store上提供的一个registerModule方法，支持传入一个路径进行动态模块定义。
相应的也提供动态卸载模块的方法，unregisterModule方法，也是接受接受一个路径。

### 总结
Vuex提供API包括数据的存取、语法糖、模块的动态更新等，值得学习。

Vue.js技术揭秘-Vuex：https://ustbhuangyi.github.io/vue-analysis/v2/vuex/#%E4%BB%80%E4%B9%88%E6%98%AF-%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%A8%A1%E5%BC%8F-%EF%BC%9F


