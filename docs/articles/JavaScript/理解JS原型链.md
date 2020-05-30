---
title: 理解JS 原型链
date: 2019-1-18 22:21:55
tags: ["JavaScript"]
---

一直以来对于JavaScript 的原型链的概念，始终有些东西有一种模糊感，最近刚好有时间就塌下心认真的把《JavaScript高级程序设计》中相关内容认真读了一遍，也查看了很多网上很多资料，以前很多不明白的地方也渐渐明白了起来。    
写一篇文章记录一下最近学习的感悟。
### 字面量创建对象
我们通常创建一个对象无非就两种方式：
```js
 1. var obj= new Object();//new 一个Object的实例
 2. var obj= {};//对象字面量
```
使用对象字面量 和使用new的方式是一样的。
为了简便，一般推荐使用使用字面量：`var o= {};`

### 构造函数创建对象
当我们想要创建自定义的对象时，需要用到构造函数。
构造函数和普通函数有两个区别：    
    1. 便于和普通函数区分，函数名首字母大写。    
    2. 使用 `new` 操作符调用，返回一个实例对象。    

除此之外和普通函数一摸一样。
我们使用构造函数`Person`来创建两个实例对象：
```js
function Person(name){
    this.name = name;
    this.sayName= function (){ alert(this.name) }
 }
var person1 = new Person('小明');
var person2 = new Person('小红');
console.log(person1);//{name: "小明", sayName: fun}
console.log(person2);//{name: "小红", sayName: fun}
```
上面的例子不难理解，虽然这两个实例对象都有`sayName`方法，而且他们两个的作用也是一样的，但却是两个方法，只是名字和作用一样。    

画个图表示一下：
![131547802804_.pic.jpg](http://upload-images.jianshu.io/upload_images/7072486-e6a1cb2af9592327?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


如果还不明白，我在打个比喻：    
就像A街上有一间麦当劳，在B街上也开了一间麦当劳，它们都叫麦当劳，作用也是一样的。但是你总不能说他们是一间麦当劳吧？

```JavaScript
person1.sayName === person2.sayName;//false
```
如果这样的话，我们每构造出来一个对象，都要单独为这个对象创建出一个专属于它自己使用的`sayName`，这是很占用内存的。  

那我们能不能让所有的实例对象都共同使用一个`sayName`方法，来节省内存，提升效率呢？这需要我们先理解原型对象的概念。
###  原型对象
我们先了解原型对象的概念。
> 每个对象都有原型对象（null除外），我们用`__proto__`表示，每个函数都有`prototype`属性，指向实例的原型对象。

对照这句话，按照我们上面的例子，也就是说`Person.prototype`指向`person1`的原型对象(`__proto__`),
```JavaScript
Person.prototype === person1.__proto__; // true
```
为了便于理解，来看一张图。

![71547797523_.pic.jpg](http://upload-images.jianshu.io/upload_images/7072486-f2e5ab0014367d09?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


恩~他们的关系大概就是这样。

### 原型链
原型链简单用一句话概括就是：
> 原型链就是 对象的`__proto__`所连接的链状结构

为了方便我们理解原型链，举一个简单的例子：
```js
function F(){
    this.a = 1;
    this.b = 2;
}
F.prototype.b = 3;
F.prototype.c = 4;
var o = new F();// {a: 1, b: 2}
//原型链：
//o --> o.__proto__ --> o.__proto__.__proto__ --> null
// 其中的 --> 就表示 __proto__ 也就是原型链
console.log(o.a); // 1
// o上有a这个属性吗？有的，该属性的值为1

console.log(o.b); // 2
// o上有b这个属性吗？有的，该属性的值为2
// 原型上也有一个'b'属性,但是它不会被访问到.这种情况称为"属性遮蔽 "

console.log(o.c); // 4
// o上有c这个属性吗？没有，那看看原型上有没有
// o.__proto__上有c这个属性吗？有的，该属性的值为4

console.log(o.d); // undefined
// o上有d这个属性吗？没有,那看看原型上有没有
// o.__proto__ 上有d这个属性吗？没有，那看看它的原型上有没有
// o.__proto__.__proto__ 为 null，停止搜索
// 没有找到d属性，返回undefined。
```
我们画张图来表示：

![91547800262_.pic_hd.jpg](http://upload-images.jianshu.io/upload_images/7072486-95ee1c64fb5b51e0?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



图中这条红色的线就是原型链。
由此可见，**实例对象可访问自己原型对象上的属性和方法**，额..准确来说是:
1. 当一个对象 查找属性或方法时，自己有，停止查找，返回结果。
2. 自己没有，顺着`__proto__`一直向上查找，如找到，停止查找，返回结果。
3. 如果一直找到了原型链的最顶端(null)，还没有找到，返回`undefined`。

我们先回顾一下那个`sayName`的问题：
**怎么让所有的实例对象都是用一个`sayName`方法呢**。    
现在我们可以使用原型对象来解决这个问题了。    
我们把`sayName`方法放到实例的原型对象上面，也就是`Person.prototype`上面来供所有实例使用：
```js
function Person(name){
    this.name = name;
 }
Person.prototype.sayName=function (){
    alert(this.name);
}
var person1 = new Person('小明');
var person2 = new Person('小红');
person1.sayName === person2.sayName;//true
```
用图表示：
![101547801223_.pic.jpg](http://upload-images.jianshu.io/upload_images/7072486-f4d5c032a9b2b20f?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 补充    
**constructor**    
说一下我的经历，一开始理解原型链时，一直在`prototype`、`__proto__`、`constructor`在这个三个属性中绕来绕去。

为了便于理解，我把`constructor`放在最后了。    
`constructor`字面意思就很容易理解，构造函数的意思。
一句话解释:
> 每个原型对象都有一个 constructor 属性指向 关联的构造函数。

还是上面那个例子：
```js
console.log(Person.prototype.constructor);//Person(){ fun }
```
需要注意的一点是，实例对象上没有`constructor`属性。
但是：
```js
console.log(person1.constructor) ;//Person(){ fun }
```
得出这个结果很简单:
实例上查找不到`constructor`属性 --> 顺着`__proto__`在原型对象上找 --> 找到并返回。

**Object.prototype**    
刚才我们说了创建对象的两种方式：字面量创建对象和使用`new`操作符创建对象。    
这两种方式创建出来的对象都会继承`Object.prototyoe`上的方法。
比如，我们使用字面量新创建一个对象`o`:
```js
var o = {value: 1};
o.toString();//"[object Object]"
//查找过程： o --> o.__proto__ 找到返回
o.__proto__ === Object.prototype;//true
```
`o`这个的对象本身并没有`toString`这个方法，但它却可以使用`toString`方法。    
因为它继承了`Object.prototyoe`上的`toString`的方法。

**null**    
既然对象都会继承自`Object.prototype`上面的方法，那它自己的原型又是什么呢。答案是`null`
```js
Object.prototype.__prototype__ === null;//true
```

以上仅自己学习所得，如有不当之处 望指出。