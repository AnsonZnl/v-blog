# CSS 布局

## 盒模型

### 组成

盒模型主要包含四部分：

-   margin
-   border
-   padding
-   content

### 两种盒模型

-   W3C 标准盒模型：context = width
-   IE 盒模型：border + padding = width

### 切换盒模型

-   box-sizing: content-box; # W3C 盒模型
-   box-sizing: border-box; # IE 盒模型

## 什么是 BFC？如何形成的？特点是什么？有哪些应用场景？

### 什么是 BFC

-   Box：Box 是 CSS 布局的对象和基本单位，你可以理解一个页面就是由很多的 Box 组成的
-   Formatting Context：即格式化上下文，它是存在页面中的一块独立的渲染区域。
-   BFC：全称是 Box formatting Context 翻译过来就是“块级格式化范围”。它是存在于页面中的一块独立渲染的区域，有一套单独的渲染规则。这里的元素不会在布局上影响到外面的元素（比如浮动/定位的元素等等）。
    **通俗一点讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论怎样翻江倒海，都不会影响到外部。**

### 如何形成的

-   根元素（`<body>`）
-   浮动元素（float 的值不为 none）
-   绝对定位元素（元素的 position 为 absolute 或 fixed）
-   行内块元素（元素的 display 是 inline-block）
-   表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
-   表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
-   匿名表格单元格元素（元素的 display 为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
-   overflow 值不为 visible 的块元素 -弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
-   网格元素（display 为 grid 或 inline-grid 元素的直接子元素） 等等。

### BFC 特点

-   BFC 垂直方向边距(margin)重叠
-   BFC 是一个独立的容器，外面的元素不会影响到里面的元素
-   BFC 的区域与会与浮动元素的 box 重叠
-   计算 BFC 高度的时候浮动元素也会参与计算

### 应用场景

-   防止浮动后导致的父元素高度塌陷

也就是清楚浮动，就是将父元素变为一个 BFC 就可以解决。如设置：overflow:hidden;

-   避免外边距折叠

两个块同在一个 BFC 会造成垂直方向的外边距折叠，但如果对这两个块分别设置 BFC，那么边距重叠的问题就不存在了。

-   不和浮动元素重叠

在一个 BFC 中使用两个 BFC 可以做两列布局时使用

## 常见布局

### 圣杯

### 双飞翼

## 居中布局

### 水平居中

-   行内元素：`text-align:center;`
-   块级元素：`margin:0 auto;`
-   绝对定位和移动：`absolute + transform`
-   绝对定位和负边距：`absolute + margin`
-   flex: `flex + justify-content:center;`

### 垂直居中

-   子元素为单行文本：`line-height:height;`
-   绝对定位： `absolute + transform`
-   flex: `flex + align-item:center;`
-   table：`display:table-cell;vertical-align:middle;`
-   利用 position 和 top 和负的 margin

### 水平垂直居中(空间居中)

-   grid：`display: grid; place-items: center;`
-   flex: `display: flex; margin: auto;(子元素)`

## 文字超出显示省略号

### 单行

```css
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

### 多行

```css
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

## Flex 布局

Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

使用`display: flex;`属性（行内使用`display:inline-flex;`），可以将一个元素指定为 Flex 布局

采用 Flex 布局的元素，称为“容器”，他的所有子元素为容器成员，称为“项目”

容器中默认存在两条轴：

-   水平的主轴
-   垂直的交叉轴

推荐：[Flex 可视化编程](http://bigerfe.com/yflex)

### 容器的属性

-   **flex-direction**

`flex-direction` 属性决定主轴的方向（即项目的排列方向）。

| 属性           | 描述                               |
| -------------- | ---------------------------------- |
| row            | 默认值，主轴为水平方向，起点在左端 |
| row-reverse    | 主轴为水平方向，起点在右端         |
| row-column     | 主轴为垂直方向，起点在上沿         |
| column-reverse | 主轴为垂直方向，起点在下沿         |

-   **flex-wrap**

默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap 属性定义，如果一条轴线排不下，如何换行。

| 属性         | 描述                   |
| ------------ | ---------------------- |
| nowrap       | 默认，不换行           |
| wrap         | 换行，排在第一行的上方 |
| wrap-reverse | 换行，第一行在下方     |

-   **flex-flow**

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

```css
.box {
    flex-flow: <flex-direction> || <flex-wrap>;
}
```

-   **justify-content**

`justify-content`属性定义了项目在水平的主轴上是如何对齐的

| 属性          | 描述                                                                 |
| ------------- | -------------------------------------------------------------------- |
| flex-start    | 默认，左对齐                                                         |
| flex-end      | 右对齐                                                               |
| conter        | 居中                                                                 |
| space-between | 两端对齐，项目之间的间隔都相等                                       |
| space-around  | 每个项目两侧的间隔相等，所以，项目之间的间隔比项目与边框的间隔大一倍 |

-   **align-items**

`align-items`属性定义项目在垂直的交叉轴上如何对齐。

| 属性       | 描述                                                      |
| ---------- | --------------------------------------------------------- |
| stretch    | 默认值，如果项目未设置高度或为 auto，则占满整个容器的高度 |
| flex-start | 交叉轴的起点对齐（上沿）                                  |
| flex-end   | 交叉轴的终点（下沿）齐                                    |
| center     | 交叉轴的中点对齐                                          |
| baseline   | 项目的第一行文字的基线对准                                |

-   **align-content**

`align-content`属性定义了多根轴线的（垂直方向）对齐方式。如果项目只有一根轴线，该属性不起作用。

| 属性          | 描述                                                                   |
| ------------- | ---------------------------------------------------------------------- |
| stretch       | 默认值，轴线占满整个交叉轴                                             |
| flex-start    | 与交叉轴的起点对齐                                                     |
| flex-end      | 与交叉轴的终点对齐                                                     |
| center        | 与交叉轴的中点对齐                                                     |
| space-between | 与交叉轴两端对齐，轴线之间的间隔评价分布                               |
| space-around  | 每根轴线两侧的间隔都相等。所以，轴线之间的间隔与轴线与边框的间隔大一倍 |

### 项目的属性

-   **order**

`order`定义项目的排列顺序，数值越小，排名越靠前，默认为 0

-   **flex-grow**

`flex-grow`属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

-   **flex-shrink**

`flex-shrink`属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。

-   **flex-basis**

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 `auto`，即项目的本来大小。

-   **flex**

flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。

```css
.item {
    flex: none | [ < "flex-grow" > < "flex-shrink" >? || < "flex-basis" > ];
}
```

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

-   **align-self**

align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

## Grid 布局

**盒子属性**

Grid 即网格布局，一种新的 CSS 布局，是目前唯一一种二维布局，号称最强大的 CSS 布局方案。

**容器和项目**：通过`display: gird;`或者`display: inline-grid`声明一个网格容器，其直系子元素将成为网格项目。

**网格轨道**：通过`grid-template-rows`和`grid-template-columns`定义网格的行高和列宽。

**网格线**：划分网格的线，称为"网格线"（grid line）。水平网格线划分出行，垂直网格线划分出列。正常情况下，n 行有 n + 1 根水平网格线，m 列有 m + 1 根垂直网格线，比如三行就有四根水平网格线。

**参考**

-   [最强大的 CSS 布局 —— Grid 布局](https://juejin.cn/post/6854573220306255880)
-   [MDN-Grid 布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)
-   [阮一峰-CSS Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

## rem 布局原理

rem 是相对长度单位，可以做到一样的取值，在不同尺寸的屏幕上的大小按比例缩放。

**rem 的定义：** rem（font size of the root element）是相对于根元素（即 html 元素）font-size 计算值的倍数。

例如 html 标签设置`font-size:16px`，同时 div 设置`width:1.2rem`。那么这个 div 的宽度就是`1.2rem=16px*1.2=19.2px`。

因此这种方法的适配原理是：根据不同屏幕的宽度，以相同的比例动态修改 html 的 font-size 适配，并将 px 替换成 rem，它可以很好的根据根元素的字体大小来进行变化，从而达到各种屏幕基本一直的效果体验。

参考：

1. [rem 布局原理解析](https://zhuanlan.zhihu.com/p/30413803)
2. [移动端适配方案-REM](https://blog.csdn.net/weixin_38840741/article/details/81364559)

## 大屏适配方案（Scale）

Vue3版本：
``` vue
<template>
  <div class="screen-adapter">
    <div class="content-wrap" :style="style">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { debounce } from 'lodash';
import { onMounted, onBeforeUnmount, ref } from 'vue';
const style = ref({
  width: `1920px`,
  height: `1080px`,
  transform: 'scale(1) translate(-50%, -50%)', // 默认不缩放，垂直水平居中
});

onMounted(() => {
  setScale();
  window.addEventListener(
    'resize',
    debounce(() => setScale(), 100),
  );
});

const getScale = () => {
  const w = window.innerWidth / 1980;
  const h = window.innerHeight / 1080;
  return w < h ? w : h;
};
// 设置缩放比例
const setScale = () => {
  style.value.transform = `scale(${getScale()}) translate(-50%, -50%)`;
};
onBeforeUnmount(() => {
  window.removeEventListener('resize', this.onresize);
});
</script>

<style lang="less">
.screen-adapter {
  width: 100vw;
  min-height: 100%;
  max-height: 100vh;
  overflow: hidden;

  .content-wrap {
    transform-origin: 0 0;
    position: absolute;
    top: 50%;
    left: 50%;
    border: solid 2px red;
  }
}
</style>

```
引入该组件即可使用scale布局，灵感来自于：[大屏可视化屏幕适配的几种方法](https://zhuanlan.zhihu.com/p/443254464)、[数据大屏最简单自适应方案，无需适配rem单位](https://juejin.cn/post/7148733509744459790)

## CSS 画形状

**HTML**

```html
<div class="shape"></div>
```

**CSS**

-   三角形

```css
.shape {
    display: inline-block;
    border-top: solid transparent 100px;
    border-right: solid transparent 100px;
    border-bottom: solid gray 100px;
    border-left: solid transparent 100px;
}
```

## 伪类

什么是伪类？

> 伪类是选择器的一种，它用于选择处于特定状态的元素，比如当它们是这一类型的第一个元素时，或者是当鼠标指针悬浮在元素上面的时候。它们表现得会像是你向你的文档的某个部分应用了一个类一样，帮你在你的标记文本中减少多余的类，让你的代码更灵活、更易于维护。

伪类就是开头为冒号的关键字：

```
:pseudo-class-name
```

### 用户行为类

-   :hover
-   :focus

### 元素选择类

-   :last-child——选择最后一个元素
-   :first-child——选择第一个元素
-   :not(some-element)——反向选择其他元素
-   :nth-child(an+b)——选择所筛选的元素
-

-   [什么是伪类](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#%E4%BB%80%E4%B9%88%E6%98%AF%E4%BC%AA%E7%B1%BB%EF%BC%9F)

## 伪元素

伪元素以类似方式表现，不过表现得是像你往标记文本中加入全新的 HTML 元素一样，而不是向现有的元素上应用类。伪元素开头为双冒号::。

```
::pseudo-element-name
```

常用伪元素一览

-   after（最后一个子元素）
-   before（第一个子元素）

-   [什么是伪元素](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#%E4%BC%AA%E5%85%83%E7%B4%A0%E6%98%AF%E5%95%A5%EF%BC%9F)

## 最佳实践

-   **H5 强制横屏（1）**

```css
@media screen and (orientation: portrait) {
    #app {
        transform-origin: 0 0;
        transform: rotateZ(90deg) translateY(-100%);
        width: 100vh !important;
        height: 100vw !important;
    }
}
```

-   **H5 强制横屏（2）**

```css
@media screen and (orientation: portrait) {
    html {
        width: 100vmin;
        height: 100vmax;
    }
    body {
        width: 100vmin;
        height: 100vmax;
    }
    #content {
        width: 100vmax;
        height: 100vmin;
        transform-origin: top left;
        transform: rotate(90deg) translate(0, -100vmin);
    }
}
@media screen and (orientation: landscape) {
    html {
        width: 100vmax;
        height: 100vmin;
    }
    body {
        width: 100vmax;
        height: 100vmin;
    }
    #content {
        width: 100vmax;
        height: 100vmin;
    }
}
```

-   **样式隔离**

使用 [css-modules](https://github.com/css-modules/css-modules) 为每个 class 生成随机的哈希值，以做到样式的隔离。

参考： [CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)
