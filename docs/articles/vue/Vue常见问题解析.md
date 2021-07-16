# Vue 常见问题解析

## Vue 的响应式的理解

- 什么是响应式
  - 数据发生了变化然后对应变化做出响应
- 为什么是 Vue 需要响应式
  - 因为 MVVM 框架需要解决数据层和视图层的连接关系，通过监听数据变化进行视图更新，所以需要响应式。
- 有什么好处
  - 通过改变数据=》监测数据变化=》更新 DOM。提升了开发效率
- 如何实现的
  - 通过 Object.defineProperty()监听数据变化并做出响应，然后通过 patch 更新
- Vue3 的响应式新的变化
  - 使用 proxy 代替 Object.defineProperty()
  - 扩展了全部的数组方法，可以拦截对象变化（之前是拦截对象的属性）。

## v-if 和 v-for 哪个优先级更高？

1. v-for 优先于 v-if 被解析

2. 我曾经做过实验，把它们放在一起，输出的渲染函数中可以看出会先执行循环再判断条件

3. 实践中也不应该把它们放一起，因为哪怕我们只渲染列表中一小部分元素，也得在每次重渲染的时候遍历整个列表。

4. 通常有两种情况下导致我们这样做：

   - 为了过滤列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。此时定义一个计算属性 (比如 `activeUsers`)，让其返回过滤后的列表即可。

   - 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。此时把 `v-if` 移动至容器元素上 (比如 `ul`、`ol`)即可。

5. 文档中明确指出**永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上**，显然这是一个重要的注意事项。

6. 看过源码里面关于代码生成的部分，

源码中找答案 compiler/codegen/index.js

## 生命周期钩子函数

- 在 `beforeCreate` 钩子函数调用的时候，是获取不到 `props` 或者 `data` 中的数据的，因为这些数据的初始化都在 `initState` 中。
- 然后会执行 `created` 钩子函数，在这一步的时候已经可以访问到之前不能访问到的数据，但是这时候组件还没被挂载，所以是看不到的。
- 接下来会先执行 `beforeMount` 钩子函数，开始创建 VDOM，最后执行 `mounted` 钩子，并将 VDOM 渲染为真实 DOM 并且渲染数据。组件中如果有子组件的话，会递归挂载子组件，只有当所有子组件全部挂载完毕，才会执行根组件的挂载钩子。
- 接下来是数据更新时会调用的钩子函数 `beforeUpdate` 和 `updated`，这两个钩子函数没什么好说的，就是分别在数据更新前和更新后会调用。
- 另外还有 `keep-alive` 独有的生命周期，分别为 `activated` 和 `deactivated`。用 `keep-alive` 包裹的组件在切换时不会进行销毁，而是缓存到内存中并执行 `deactivated` 钩子函数，命中缓存渲染后会执行 actived 钩子函数。
- 最后就是销毁组件的钩子函数 `beforeDestroy` 和 `destroyed`。前者适合移除事件、定时器等等，否则可能会引起内存泄露的问题。然后进行一系列的销毁操作，如果有子组件的话，也会递归销毁子组件，所有子组件都销毁完毕后才会执行根组件的 `destroyed` 钩子函数

## 组件传参

组件通信方式大体有 8 种：

- props
- $emit/$on
- $children/$parent
- $attrs/$listeners
- ref
- \$root
- eventbus
- vuex

根据组件之间的关系讨论使用通信的方式：

- 父子组件
  - 父组件到子组件：props
  - 子组件到父组件：\$emit
  - 通过`$parent`或者`$children` 对象来访问组件实例中的方法和数据。
  - 使用`$listeners`和`.sync`
  - ref
- 兄弟组件
  - EventBus
  - 使用共同的父组件搭桥`this.$parent.$children`
  - vuex
- 无关联组件
  - inject、provide
  - EventBus
  - Vuex
  - \$root

## 父子路由、组件加载顺序

由生命周期钩子函数可知，子组件是在父组件 `mounted` 之后才开始挂载的，所以顺序是：

```
父 beforeCreate
父 create
父 beforeMount
子 beforeCreate
子 create
子 beforeMount
孙 beforeCreate
孙 create
孙 beforeMount
孙 mounted
子 mounted
父 mounted
```

然后，mounted 生命周期被触发。

mounted 被调用完成，到此为止，组件的挂载就完成了，初始化的生命周期结束。

触发钩子的完整顺序：
将路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从 a 组件离开，第一次进入 b 组件：

```
beforeRouteLeave:路由组件的组件离开路由前钩子，可取消路由离开。
beforeEach: 路由全局前置守卫，可用于登录验证、全局路由loading等。
beforeEnter: 路由独享守卫
beforeRouteEnter: 路由组件的组件进入路由前钩子。
beforeResolve:路由全局解析守卫
afterEach:路由全局后置钩子
beforeCreate:组件生命周期，不能访问this。
created:组件生命周期，可以访问this，不能访问dom。
beforeMount:组件生命周期
deactivated: 离开缓存组件a，或者触发a的beforeDestroy和destroyed组件销毁钩子。
mounted:访问/操作dom。
activated:进入缓存组件，进入a的嵌套子组件(如果有的话)。
执行beforeRouteEnter回调函数next。
```

## \$nextTick 原理
参考：[nextTick原理](./nextTick原理解析)
## 数组响应式问题和\$set 原理

熟读文档可以得出，除数组侦听的那几个方法外，其他的方式进行修改是不具有相应式的（如 this.arr[10]=xx）

同样的，具有相应是的对象，也应该在初始化的时候在 data 中声明出来，这样才能让 watcher 在一开始就侦听它，如果是新增的属性，则需要使用`this.$set()`方法了。

在最新的 Vue3.0 中，基于 Proxy 的响应式已经可以支持数组的所有方法了。
但是如果是改变*对象的动态新增属性*和*数组中直接使用索引修改值、直接修改长度*不可以被监测到，但是任然可以使用`Vue.set()`方法解决

- [vue3-深入响应式原理](https://v3.cn.vuejs.org/guide/reactivity.html#%E4%BB%80%E4%B9%88%E6%98%AF%E5%93%8D%E5%BA%94%E6%80%A7)
- [Vue-侦听变化注意事项](https://cn.vuejs.org/v2/guide/reactivity.html#%E6%A3%80%E6%B5%8B%E5%8F%98%E5%8C%96%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
- [Vue-数组监测更新](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)

## computed 和 watch

- `computed` 是计算属性，依赖其他属性计算值，并且 `computed` 的值有缓存，只有当计算值变化才会返回内容。
- `watch` 监听到值的变化就会执行回调，在回调中可以进行一些逻辑操作。
- 所以一般来说需要依赖别的属性来动态获得值的时候可以使用 `computed`，对于监听到值的变化需要做一些复杂业务逻辑的情况可以使用 `watch`。

## v-for 中 key 的作用？

- key 的作用主要是为了更搞笑的更新虚拟 DOM
- vue 在 patch 过程中**判断两个节点是否是相同节点时，key 是一个必要条件**，在 patch 国过程中，key 的存在能提高更新的效率。
- 在实际使用中，应该避免将 index 设为 key
- 从源码中可以知道，vue 判断两个节点是否是相同节点，主要判断两者的 key 和元素的类型等，引入如果不设置 key,则会认为这个是相同的节点，从而去做更新操作，造成 DOM 更新，浏览器回流。

源码中找答案：src\core\vdom\patch.js - sameVnode()

```js
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
  );
}
```

## 说说 Diff 算法

> Vue 是基于虚拟 DOM 做更新的，而 Diff 又是其核心部分。

- diff 算法是虚拟 DOM 的产物，Vue 中对应的函数是 patch。核心实现来自于[snabbdom](github.com/snabbdom)；通过新旧 DOM 做对比（即 patch）,将变化的地方转换为真是的 DOM 操作。
- 在 Vue1.x 中是没有 patch，因为界面中每个依赖都有专门的 watcher 负责更新，这样项目规模变大就会变成性能瓶颈，vue2 中为了降低 watcher 粒度，每个组件只有一个 watcher，但需要更新的时候，怎么才能找到发生变化的地方呢？这就需要 patch 了。
- 组件中数据发生变化时，对应的 watcher 会通过更新并执行其更新函数，它会执行渲染函数获取全新虚拟 DOM：newVnode，此时 patch 对比上次渲染结果和新的渲染结果得出最优的差异，从而进行渲染。
- patch 过程遵循深度优先、同层比较的策略：
  - 两个节点之间的比较时
    - 如果他们拥有子节点，会先比较子节点
    - 比较两组子节点时候，会假设头尾节点尽可能相同先做尝试（因为多数的变更不会从头尾开始，也算是一个节约性能的优化方式）
    - 没有找到相同节点后，开始按照通用方式遍历查找
    - 查找结束再按情况处理剩下的节点
  - 借助 key 通常可以非常精确的找到相同节点，因此整个 patch 过程很高效。

## Vue 性能优化方法

答题思路：根据题目描述，这里主要探讨 Vue 代码层面的优化

- 路由懒加载

  ```js
  const router = new VueRouter({
    routes: [{ path: "/foo", component: () => import("./Foo.vue") }],
  });
  ```

* keep-alive 缓存页面

  ```vue
  <template>
    <div id="app">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </template>
  ```

- 使用 v-show 复用 DOM

  ```vue
  <template>
    <div class="cell">
      <!--这种情况用v-show复用DOM，比v-if效果好-->
      <div v-show="value" class="on">
        <Heavy :n="10000" />
      </div>
      <section v-show="!value" class="off">
        <Heavy :n="10000" />
      </section>
    </div>
  </template>
  ```

* v-for 遍历避免同时使用 v-if

  ```vue
  <template>
    <ul>
      <li v-for="user in activeUsers" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </template>
  <script>
  export default {
    computed: {
      activeUsers: function() {
        return this.users.filter(function(user) {
          return user.isActive;
        });
      },
    },
  };
  </script>
  ```

- 长列表性能优化

  - 如果列表是纯粹的数据展示，不会有任何改变，就不需要做响应化

    ```js
    export default {
      data: () => ({
        users: [],
      }),
      async created() {
        const users = await axios.get("/api/users");
        this.users = Object.freeze(users);
      },
    };
    ```

* 如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容

  ```html
  <recycle-scroller class="items" :items="items" :item-size="24">
    <template v-slot="{ item }">
      <FetchItemView :item="item" @vote="voteItem(item)" />
    </template>
  </recycle-scroller>
  ```

  > 参考[vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)、[vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list)

- 事件的销毁

  Vue 组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。

  ```
  created() {
    this.timer = setInterval(this.refresh, 2000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
  ```

* 图片懒加载

  对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。

  ```html
  <img v-lazy="/static/img/1.png" />
  ```

  > 参考项目：[vue-lazyload](https://github.com/hilongjw/vue-lazyload)

- 第三方插件按需引入

  像 element-ui 这样的第三方组件库可以按需引入避免体积太大。

  ```js
  import Vue from "vue";
  import { Button, Select } from "element-ui";

  Vue.use(Button);
  Vue.use(Select);
  ```

* 无状态的组件标记为函数式组件

  ```vue
  <template functional>
    <div class="cell">
      <div v-if="props.value" class="on"></div>
      <section v-else class="off"></section>
    </div>
  </template>

  <script>
  export default {
    props: ["value"],
  };
  </script>
  ```

- 子组件分割

  ```vue
  <template>
    <div>
      <ChildComp />
    </div>
  </template>

  <script>
  export default {
    components: {
      ChildComp: {
        methods: {
          heavy() {
            /* 耗时任务 */
          },
        },
        render(h) {
          return h("div", this.heavy());
        },
      },
    },
  };
  </script>
  ```

* 变量本地化

  ```vue
  <template>
    <div :style="{ opacity: start / 300 }">
      {{ result }}
    </div>
  </template>

  <script>
  import { heavy } from "@/utils";

  export default {
    props: ["start"],
    computed: {
      base() {
        return 42;
      },
      result() {
        const base = this.base; // 不要频繁引用this.base
        let result = this.start;
        for (let i = 0; i < 1000; i++) {
          result += heavy(base);
        }
        return result;
      },
    },
  };
  </script>
  ```
