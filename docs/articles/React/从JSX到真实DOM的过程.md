## 从JSX到真实DOM的过程
JSX是 React 的语法糖，它允许在HTML中写JS，它不能被浏览器直接识别，需要通过webpack、babel之类的编译工具转换为JS执行

JSX 是一种 JavaScript 的语法扩展，其中混入了 HTML 标记和组件的语法，它使代码更具可读性，同时也方便了开发人员编写组件树。

在 React 应用中，当代码中出现 JSX 语法时，Babel 编译器会将 JSX 语法转化为普通的 JavaScript 代码。这个转换过程包括两个步骤：

1. 将 JSX 标记转换为 React.createElement 函数调用。

    例如，下面的 JSX 代码：

    ```html
    <div className="app">
        <p>Hello, React!</p>
    </div>
    ```

    将被转换为：

    ```js
    React.createElement(
        'div',
        { className: 'app' },
        React.createElement(
            'p',
            null,
            'Hello, React!'
        )
    );
    ```

    可以看到，每个 JSX 标签都会被 Babel 器转换为一个 React.createElement 函数调用，其中第一个参数为标签名，第二个参数为 Props，第三个参数为子元素。

2. 将 createElement 函数调用转换为虚拟 DOM 节点对象。

    Babel 编译器最终会将 React.createElement 创建的节点对象转换为虚拟 DOM 节点对象，即 Virtual DOM。Virtual DOM 表示在内存中的一个对象树，描述了真实 DOM 中的所有节点及其属性。

    React 在 Virtual DOM 中对比新 DOM 和旧 DOM，发现变化后仅仅更新变化的部分，从而实现了高性能的渲染。

总之，JSX 虽然看起来像 HTML，但实际上是 JavaScript 的语法扩展，在编译过程中转化为 JavaScript 代码，最后在 Virtual DOM 中表达出来。通过 JSX，我们可以在 JavaScript 中描述 UI，使得 React 的组件树更加直观和易于理解。