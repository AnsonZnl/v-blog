# CSS 布局

## 什么是 BFC？如何形成的？特点是什么？有哪些应用场景？

### 什么是 BFC

- Box：Box 是 CSS 布局的对象和基本单位，你可以理解一个页面就是由很多的 Box 组成的
- Formatting Context：即格式化上下文，它是存在页面中的一块独立的渲染区域。
- BFC：全称是 Box formatting Context 翻译过来就是“块级格式化范围”。它是存在于页面中的一块独立渲染的区域，有一套单独的渲染规则。这里的元素不会在布局上影响到外面的元素（比如浮动/定位的元素等等）。
  **通俗一点讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论怎样翻江倒海，都不会影响到外部。**

### 如何形成的

- 根元素（<body>）
- 浮动元素（float 的值不为 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 是 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素 -弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素） 等等。

### BFC 特点

- BFC 垂直方向边距(margin)重叠
- BFC 是一个独立的容器，外面的元素不会影响到里面的元素
- BFC 的区域与会与浮动元素的 box 重叠
- 计算 BFC 高度的时候浮动元素也会参与计算

### 应用场景

- 防止浮动后导致的父元素高度塌陷

也就是清楚浮动，就是将父元素变为一个 BFC 就可以解决。如设置：overflow:hidden;

- 避免外边距折叠

两个块同在一个 BFC 会造成垂直方向的外边距折叠，但如果对这两个块分别设置 BFC，那么边距重叠的问题就不存在了。

- 不和浮动元素重叠

在一个BFC中使用两个BFC可以做两列布局时使用

## 水平居中布局

## 空间居中布局

- Grid 布局

```css
.container {
  display: grid;
  place-items: center;
}
```

## 文字超出显示省略号

- 单行

```html
<style>
p{
  /* 控制显示文字的长度 */
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  /*禁止换行显示*/
  white-space: nowrap;
  background-color: #ffe51a;
}
<style>

<body>
    <p>哈哈哈哈哈哈哈，哈哈哈哈哈，哈哈哈哈哈哈哈</p>
</body>

```

- 多行

```html
<style>
p {
    width: 100px;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    /*控制在3行*/
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
    background-color:#ffe51a;
}
<style>

<body>
    <p>哈哈哈哈哈哈哈，哈哈哈哈哈，哈哈哈哈哈哈哈</p>
</body>

```
