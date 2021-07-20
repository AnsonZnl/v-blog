# Vue 模板编译原理解析

在 Vue 开发过程中，我们通常使用`.vue`文件进行开发，然后上线时打包成一个`js`最后在页面中加载然后渲染 DOM。

那么 他是怎么从`.vue` 文件编译成`.js` 的那，中间发生了什么？

![流程图](https://i.loli.net/2021/07/19/AWp6kCSvLth74Bj.png)

## 运行版本

通常我们利用 vue-cli 去初始化 Vue.js 时，在 Vue 中有两个版本：

- Runtime Only

  - `vue.js`： 完整版本，包含了模板编译的能力；  
    我们在借助 vue-cli 生成的项目时，通常需要使用 webpack 的 vue-loader 工具，将`.vue`文件编译成`.js`文件，因为他是在编译阶段做的，所以只包含运行时的 Vue.js 代码，因此代码总量体积会比较轻。

- Runtime + Compiler
  - `vue.runtime.js`： 运行时版本，不提供模板编译能力，需要通过 vue-loader 进行提前编译。  
    如果我们没有对代码做预编译的时候（如 CND 引入时）但又使用 Vue 的 template 属性并传入一个字符串，则需要在客户端编译模板，如下所示：

```js
// 需要编译器的版本
new Vue({
  template: "<div>{{ hi }}</div>",
});

// 这种情况不需要
new Vue({
  render(h) {
    return h("div", this.hi);
  },
});
```

因为在 Vue.js 中最终的渲染都是通过 render 函数，如果写 template 属性，则需要在编译成 render 函数，那么这个编译过程会发生运行时，所以需要带有编译器的版本。

## 编译过程

在 Vue 源码中编译过程这块[src/platforms/web/entry-runtime-with-compiler.js](https://github1s.com/vuejs/vue/blob/HEAD/src/platforms/web/entry-runtime-with-compiler.js)可以得出编译的三个过程：

- 解析器将模板字符串转换成 AST

  ```js
  const ast = parse(template.trim(), options);
  ```

- 优化语法树

  ```js
  optimize(ast, options);
  ```

- 生成最最终 `render` 函数代码字符串
  ```js
  const code = generate(ast, options);
  ```

### 解析器

编译过程首先是对模板进行解析，生成 element ASTs，他是一种抽象语法树，对于源代码的抽象语法结构的树状表现形式。

这个过程比较复杂，他会用到大量的正则表达式对字符串解析：

为了直观的演示`parse`的过程，我们看一个例子：

```html
<div>
  <p>{{name}}</p>
</div>
```

经过 `parse` 后，生成的 AST 如下：

```js
{
  tag: "div"
  type: 1,
  staticRoot: false,
  static: false,
  plain: true,
  parent: undefined,
  attrsList: [],
  attrsMap: {},
  children: [
      {
      tag: "p"
      type: 1,
      staticRoot: false,
      static: false,
      plain: true,
      parent: {tag: "div", ...},
      attrsList: [],
      attrsMap: {},
      children: [{
          type: 2,
          text: "{{name}}",
          static: false,
          expression: "_s(name)"
      }]
    }
  ]
}
```

这个过程是通过分析模板中的字符串，通过正则匹配（如`<div>`匹配`</div>`）来生成的。

其实模板编译主要是两部分内容，一部分是截取字符串(span、p)，一部分是对截取之后的字符串做解析。

没截取一段标签的开头就 push 到栈中，解析到标签的结束就 pop 出来，当所有的字符串都截取没了也就解析完了（参考[leetCode](https://leetcode-cn.com/problems/valid-parentheses/)）。

这块挺复杂的，细节太多，参考：[Vue.js 技术揭秘-parse](https://ustbhuangyi.github.io/vue-analysis/v2/compile/parse.html#%E6%B5%81%E7%A8%8B%E5%9B%BE)

### 优化器

优化器的目标是找出那些事静态节点并打上标记，而静态节点指的是 DOM 不需要发生改变的节点，如：

```html
<p>我不会发生变化</p>
```

静态节点有两个好处：

1. 每次重新渲染的时候不需要再为静态节点创建新节点了
2. 在 Virtual DOM 中的 patch 可以直接跳过（不会改变就没有必要 patch 了）

优化器的实现原理主要分两部分

1. 第一步：用递归的方式将所有的节点添加`static`属性，标识是不是静态节点
2. 第二步：标记所有的静态根节点

什么是静态根节点？？

```html
<ul>
  <li>我是静态节点1，我不需要发生变化</li>
  <li>我是静态节点2，我不需要发生变化</li>
</ul>
```

ul 就是静态根节点。

做完了优化的过程之后，就会改每个 AST 树上的每一个元素打上标记`static`和`staticRoot`，这会运行时对模板的更新起到了极大的优化作用，会影响接下来执行代码生成的过程。

详细的过程参考: [Vue.js 技术揭秘-optimize](https://ustbhuangyi.github.io/vue-analysis/v2/compile/optimize.htm)

### 生成代码

代码生成器的作用是使用 `elemen ASTs` 生成 `render` 函数代码字符串。

如：

```html
<p title="Berwin" @click="c">1</p>
```

模板生成后的 AST 后生成 render 后是这样的：

```js
with (this) {
  return _c(
    "p",
    {
      attrs: { title: "Berwin" },
      on: { click: c },
    },
    [_v("1")]
  );
}
```

- `_c`是`createElement`可以创建一个元素。
- `_v` 是`createTextVNode`的意思是创建一个文本节点。
- `_s` 是`toString`返回参数中的字符串。

代码生成器的逻辑其实就是使用`element ASTs`去递归，然后拼出`_c('div',[_c('p',[_v(_s(name))])])`的字符串，最后传给`render`

那如何拼出的这个字符串呢？

看下边的代码：

```js
function genElement(el: ASTElement, state: CodegenState) {
  const data = el.plain ? undefined : genData(el, state);
  const children = el.inlineTemplate ? null : genChildren(el, state, true);

  let code = `_c('${el.tag}'${
    data ? `,${data}` : "" // data
  }${
    children ? `,${children}` : "" // children
  })`;

  return code;
}
```

重点是`code`的生成逻辑，`_c`（createElement）函数接受三个参数: `tabName`，`data`，`children`。

所以上面的逻辑就是用 genData 和 genChiildren 获取 data 和 children 然后拼到`_c`中，然后把拼好的`_c(tagName, data, children)`返回。

所以，两个问题：

1. data 如何生成的(genData 的逻辑)
2. children 如何生成的（genChildren 逻辑）

- genData 逻辑：主要靠判断不同的标签类别去生成不同的 data
- genChildren 逻辑：递归加判断

最后将生成的 code 装入 with 中。

至于为什么将代码放入`with(this){..}`中，其实是为了方便取值，先看它的使用方法：

```js
let obj = {
  name: "tom",
};
with (obj) {
  console.log(name); // tom
}
```

- with 的 优点：
  当 with 传入的值非常复杂时，即当 object 为非常复杂的嵌套结构时，with 就使得代码显得非常简洁。

- with 的缺点：
  js 的编译器会检测 with 块中的变量是否属于 with 传入的对象， 上述例子为例，js 会检测 a 和 b 是否属于 obj 对象，这样就会的导致 with 语句的执行速度大大下降，性能比较差。

但是总体来看是优化了代码的结构，所以还是利大于弊的。

具体的参考:[Vue 技术揭秘-codeGen](https://ustbhuangyi.github.io/vue-analysis/v2/compile/codegen.html#generate)


## 参考

- [Vue 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/prepare/build.html#%E6%9E%84%E5%BB%BA%E8%BF%87%E7%A8%8B)

- [Vue loader](https://vue-loader.vuejs.org/zh/guide/#vue-cli) - [Vue
  模板编译原理](https://juejin.cn/post/6863241580753616903) - [vue 底层-template
  模板编译](https://blog.csdn.net/wang729506596/article/details/90947583)

```

```
