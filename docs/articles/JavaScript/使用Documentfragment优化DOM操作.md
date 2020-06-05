# DocumentFragment
## DocumentFragment 是什么 ？

> DocumentFragment，文档片段接口，一个没有父对象的最小文档对象。它被作为一个轻量版的 Document 使用，就像标准的 document 一样，存储由节点（nodes）组成的文档结构。与 document 相比，最大的区别是 DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题。
———— MDN

## 使用场景

> 如果要在一个 `ul` 节点中一次性插入 10000 个 `li` 元素怎么办？

``` html
<ul id="parent">
  ...
</ul>
```
## 方法一
你可能第一个想到的方法，也是最简单的方式：
```js
var parent = document.getElementById("parent");
for (var i = 0; i < 10000; i++) {
  var child = document.createElement("li");
  var text = document.createTextNode("" + i);
  child.appendChild(text);
  parent.appendChild(child);
}
```

不过众所周知的原因，对 `DOM` 反复操作会导致页面重绘、回流，效率非常低，而且页面可能会被卡死。

## 方法二
当然，更多能想到的方式应该是，先创造一个 `div` 节点，在内存中直接操作节点，然后把所有节点都凑在一起之后再跟 `DOM` 树进行交互，把所有节点都串在一个 `div` 上，然后再把 `div` 挂到 `DOM` 树上：

```js
var parent = document.getElementById("parent");
var div = document.createElement("div");
for (var i = 0; i < 10000; i++) {
  var child = document.createElement("li");
  var text = document.createTextNode("" + i);
  child.appendChild(text);
  div.appendChild(child);
}
parent.appendChild(div);
```

只跟 `DOM` 树交互一次，性能方面肯定是大有改善的，不过额外插入了一个 `div`，如果说不是跟 `div` 之类的节点进行交互呢，比如在 `table` 中插入 `th`、`td`？

## 方法三
这个时候，就到了 `DocumentFragment` 上场了，翻译过来就是文档片段的意思。

简单来说就是在内存中提供了一个 `DOM` 对象，当我们需要频繁操作 `DOM` 的时候，可以在内存先中创建一个 `DocumentFragment` 文档片段，然后对这个文档片段中进行一系列频繁的 `DOM` 操作，当操作结束后直接插入真实的 `DOM` 节点中，这样所有的节点会被一次插入到真实的文档中，而这个操作仅发生一个重绘的操作。

可以当做是上面一个例子的不需要 `div` 中转版本，插入的时候，直接用其子元素替换其本身，非常完美。

```js
var parent = document.getElementById("parent");
var frag = document.createDocumentFragment();
for (var i = 0; i < 10000; i++) {
  var child = document.createElement("li");
  var text = document.createTextNode("" + i);
  child.appendChild(text);
  frag.appendChild(child);
}
parent.appendChild(frag);
```
## 总结
当应对于频繁的`DOM`操作的场景，可以使用`DocumentFragment`。