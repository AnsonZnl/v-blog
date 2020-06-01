# JavaScript对象/原型链
## 对象的原型是什么？
Object是引用类型，包括：Object 、Array 、Function 、Data等。
**JavaScript对每个创建的对象都会设置一个原型，指向它的原型对象。**

当我们用obj.xxx访问一个对象的属性时，JavaScript引擎先在当前（this）对象上查找该属性，如果没有找到，就到其原型对象上找(数组是Array.prototype,function是function。prototype)，如果还没有找到，就一直上溯到Object.prototype对象，最后，如果还没有找到，就只能返回undefined。

比如创建了一个Array对象：
```js
var arr = [1,2,3]
```
其原型链是：
```js
arr ----> Array.prototype ----> Object.prototype ----> null
```
Array.prototype定义了indexOf()、shift()等方法，因此你可以在所有的Array对象上直接调用这些方法。甚至你都可以在Array.prototype自定义方法，但是没有必要最后不要这样做。

当我们创建一个函数时：
```js
function foo(){
  return 0;
}
```
函数也是一个对象 ，他的原型链是：
```js
foo ----> Function.prototype ----> Object.prototype ----> null
```
由于Function.prototype定义了apply()等方法，因此，所有函数都可以调用apply()方法。

## 用构造函数创建对象
用函数来创建对象比直接用var = {...}创建对象要方面的多，它就是构造函数。
构造函数的首字母都应该大写
首先先创建一个构造函数：
```js
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
}
```
可以用关键字new来调用这个函数，并返回一个对象：
```js
var xiaoming = new Student('小明');
xiaoming.name; // '小明'
xiaoming.hello(); // Hello, 小明!
```
注意，如果不写new，这就是一个普通函数，它返回undefined。但是，如果写了new，它就变成了一个构造函数，它绑定的this指向新创建的对象，并默认返回this，也就是说，不需要在最后写return this;。

新创建的xiaoming的原型链是：
```js
xiaoming ----> Student.prototype ----> Object.prototype ----> null

```
也就是说，xiaoming的原型指向函数Student的原型。如果你又创建了xiaohong、xiaojun，那么这些对象的原型与xiaoming是一样的：
```js
xiaoming ↘
xiaohong -→ Student.prototype ----> Object.prototype ----> null
xiaojun  ↗
```
用new Student()创建的对象还从原型上获得了一个constructor属性，它指向函数Student本身：
```js
console.log(xiaoming.constructor === Student)//true
```
我们可以用instanceof来检测对象类型；
```js
console.log(xiaohong instanceof Object);//true
console.log(xiaohong instanceof Student);//true
console.log(xiaoming instanceof Object);//true
console.log(xiaoming instanceof Student);//true
```

这个例子中所创建的对象即是Object的实例 也是Student的实例，因为所有的对象都继承自Object

参考：js高程第六章
参考：[廖雪峰的博客](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014344997235247b53be560ab041a7b10360a567422a78000) 
