# JavaScript 对象/原型链

## 对象的原型是什么？

Object 是引用类型，包括：Object 、Array 、Function 、Data 等。
**JavaScript 对每个创建的对象都会设置一个原型，指向它的原型对象。**

当我们用 obj.xxx 访问一个对象的属性时，JavaScript 引擎先在当前（this）对象上查找该属性，如果没有找到，就到其原型对象上找(数组是 Array.prototype,function 是 function。prototype)，如果还没有找到，就一直上溯到 Object.prototype 对象，最后，如果还没有找到，就只能返回 undefined。

比如创建了一个 Array 对象：

```js
var arr = [1, 2, 3];
```

其原型链是：

```js
arr---- > Array.prototype---- > Object.prototype---- > null;
```

Array.prototype 定义了 indexOf()、shift()等方法，因此你可以在所有的 Array 对象上直接调用这些方法。甚至你都可以在 Array.prototype 自定义方法，但是没有必要最后不要这样做。

当我们创建一个函数时：

```js
function foo() {
  return 0;
}
```

函数也是一个对象 ，他的原型链是：

```js
foo---- > Function.prototype---- > Object.prototype---- > null;
```

由于 Function.prototype 定义了 apply()等方法，因此，所有函数都可以调用 apply()方法。

## 用构造函数创建对象

用函数来创建对象比直接用 `var = {...}` 创建对象要方面的多，它就是构造函数。
构造函数的首字母都应该大写
首先先创建一个构造函数：

```js
function Student(name) {
  this.name = name;
  this.hello = function() {
    alert("Hello, " + this.name + "!");
  };
}
```

可以用关键字 new 来调用这个函数，并返回一个对象：

```js
var xiaoming = new Student("小明");
xiaoming.name; // '小明'
xiaoming.hello(); // Hello, 小明!
```

注意，如果不写 new，这就是一个普通函数，它返回 undefined。但是，如果写了 new，它就变成了一个构造函数，它绑定的 this 指向新创建的对象，并默认返回 this，也就是说，不需要在最后写 return this;。

新创建的 xiaoming 的原型链是：

```js
xiaoming---- > Student.prototype---- > Object.prototype---- > null;
```

也就是说，xiaoming 的原型指向函数 Student 的原型。如果你又创建了 xiaohong、xiaojun，那么这些对象的原型与 xiaoming 是一样的：

```js
xiaoming ↘
xiaohong -→ Student.prototype ----> Object.prototype ----> null
xiaojun  ↗
```

用 new Student()创建的对象还从原型上获得了一个 constructor 属性，它指向函数 Student 本身：

```js
console.log(xiaoming.constructor === Student); //true
```

我们可以用 instanceof 来检测对象类型；

```js
console.log(xiaohong instanceof Object); //true
console.log(xiaohong instanceof Student); //true
console.log(xiaoming instanceof Object); //true
console.log(xiaoming instanceof Student); //true
```

这个例子中所创建的对象即是 Object 的实例 也是 Student 的实例，因为所有的对象都继承自 Object

参考：

- 《JS 高程》第六章
- [廖雪峰的博客-创建对象](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014344997235247b53be560ab041a7b10360a567422a78000)
