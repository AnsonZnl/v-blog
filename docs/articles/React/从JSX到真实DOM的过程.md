## 从JSX到真实DOM的过程

当我们在React中编写JSX代码时，JSX并不是直接被网页所认可和支持的，因为JSX实际上是一个JavaScript对象。所以在编译过程中，我们需要将JSX转换为真实的DOM元素，以便在网页上正确地呈现出我们所需要的内容。

这个转换的过程可以通过React的渲染函数——ReactDOM.render()来完成。在这个函数中，它接收两个参数：第一个参数是JSX代码，第二个参数是一个DOM节点，表示我们要将这个组件渲染到哪个DOM节点下。

当React开始渲染组件时，它会解析JSX代码，将其转换为一个虚拟DOM树。这个虚拟DOM树是由React所管理的，其中的每一个节点都对应着一个真实的DOM节点。在完成虚拟DOM树的构建后，React会进行一个「diff算法」，用来比较新的虚拟DOM树和旧的虚拟DOM树之间的差异。这个算法的目的是找出需要更新的那些节点，并对其进行更新。这样，React只需要更新需要改变的那些部分，而不是整个组件都重新渲染一遍。

在完成差异计算之后，React会将需要更新的那些节点转换为真实的DOM元素，并利用浏览器的API将这些元素添加到网页的DOM树中。这样我们就完成了JSX到真实DOM的转换，从而实现了网页的渲染。

过程：
1. jsx语法最终会被Babel编译js对象
2. 然后虚拟DOM会被React.createElement()执行并返回真实的DOM
3. 由render方法将生成的真实DOM并挂到页面上(#app)

流程：书写JSX代码 => Babel编译JSX => 编译后的JSX执行React.createElement的调用 => 传入到ReactElement方法中生成虚拟Dom => 最终返回给ReactDom.render生成真实DOM

最关键的两个函数：

1. `createElement`：接收虚拟DOM对象，参数是标签名、属性和子节点，返回一个包含标签名、属性和子节点的对象。
2. `render`：接收一个虚拟DOM节点作为参数，返回该节点对应的真实DOM元素。
上面的 JSX 代码可以被转换为等价的 React.createElement() 调用，从而创建一个 React 元素。具体过程如下：


## 使用babel编译tsx文件
当我们写一个使用 JSX 的组件，并将其保存为 `example.jsx` 文件时，我们可以使用 Babel 进行转换，生成一个普通的 JavaScript 文件 `example.js`。以下是一个简单的方法将 `example.jsx` 转换为 `example.js`：

1. 使用 Node.js 安装 Babel 的基本依赖：

```
npm install --save-dev @babel/core @babel/cli @babel/preset-react
```

2. 创建一个 `.babelrc` 文件，并添加以下内容。这些将 Babel 配置为将 JSX 转换为标准的 JavaScript 代码：

```
{
  "presets": ["@babel/preset-react"]
}
```

3. 在命令行中使用以下命令将 JSX 转换为 JavaScript：

```
npx babel example.jsx --out-file example.js
```

这将使用在第二步中定义的插件集，将 `example.jsx` 文件转换为 `example.js` 文件。


```
const element = (
    <div className="my-class">
        <p>Hello, World!</p>
    </div>
);

// 编译后的代码
const element = React.createElement(
    "div",
    { className: "my-class" },
    React.createElement(
        "p",
        null,
        "Hello, World!"
    )
);
```

理解这个过程的关键是 JSX 语法只是一种语法糖。当我们使用 JSX 时，Babel 这样的工具会将 JSX 转换为普通的 JavaScript 代码，并将 React.createElement() 函数用来创建 React 元素。这些元素最终被 React 用来构建虚拟 DOM，以用于后续的渲染。由于这个过程需要在运行时进行，因此可以在浏览器中使用 JSX 语法，因为浏览器能够动态执行 JavaScript 代码。

## 使用JS模拟Bebal这个过程
好的，以下是使用原生JS（不依赖 Babel）将 JSX 转换为 JavaScript 的步骤：

首先，我们需要将 JSX 代码包含在 HTML 文件中，以便在浏览器中运行。以下是一个示例：

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>JSX to JS</title>
</head>
<body>
	<div id="root"></div>
	<script>
		// 在此处添加 JSX 代码
	</script>
</body>
</html>
```

接下来，我们需要在页面中添加一个 JavaScript 脚本来将 JSX 转换为标准的 JavaScript 代码。这是一个过程：

1. 创建一个函数，将 JSX 代码作为其输入参数。

2. 创建一个新的 `div` 元素，并将其添加到文档的根节点中。

3. 将 JSX 代码中的标签名称转换为标准的 HTML 元素名称。

4. 将 JSX 中的所有属性名称转换为标准的 HTML 属性名称。

5. 将 JSX 中的所有属性值添加到 HTML 元素的属性中。

6. 递归遍历所有子元素，并将它们添加到 HTML 元素中。

7. 将生成的 HTML 元素添加到根节点中。

以下是示例代码：

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>JSX to JS</title>
</head>
<body>
	<div id="root"></div>
	<script>
		// 1. 创建一个将 JSX 代码转换为 HTML 元素的函数
		function jsxToHTMLElement(jsxCode) {
			// 2. 创建一个新的 div 元素
			const element = document.createElement('div');

			// 3. 获取标签名称（用于创建 HTML 元素）
			const tagName = jsxCode.match(/(?:<)([a-zA-Z]+)/)[1].toLowerCase();

			// 4. 获取所有属性，并将它们添加到 HTML 元素中
			const attributes = jsxCode.match(/(?:<+[a-zA-Z]+)([a-zA-Z \-]+=['"][^"']*["'])+/);
			if (attributes) {
				// 将所有属性名称和值添加到 HTML 元素中
				attributes[0].match(/([a-zA-Z\-]+)=["']?([^"']*)/g).forEach(attr => {
					const [name, value] = attr.split('=');
					element.setAttribute(name, value.replace(/"/g, ''));
				});
			}

			// 5. 将所有子元素逐个转换为 HTML 元素，并将它们添加到当前元素中
			const children = jsxCode.match(/(?:>)([\s\S]*)(?:<\/)/);
			if (children) {
				children[1].trim().split(/(?=<)/).forEach(child => {
					const childElement = jsxToHTMLElement(child);
					element.appendChild(childElement);
				});
			}

			// 6. 返回生成的 HTML 元素
			return element;
		}

		// 7. 调用 jsxToHTMLElement() 函数将 JSX 代码转换为 HTML 元素，并将其添加到页面中
		const jsxCode = `
			<div>
				<h1 class="title">Hello, World!</h1>
				<p>This is some text.</p>
			</div>
		`;
		const rootElement = document.getElementById('root');
		const htmlElement = jsxToHTMLElement(jsxCode);
		rootElement.appendChild(htmlElement);
	</script>
</body>
</html>
```

总之，这是一种使用原生JS将JSX转换为JavaScript的基本方法，尽管这种方法在复杂的JSX中可能不太实用。 在实际项目中，您应该使用专门为此目的构建的库（例如React）。