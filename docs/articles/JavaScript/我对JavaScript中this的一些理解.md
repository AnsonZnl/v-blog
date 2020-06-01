# 我对JavaScript中this的一些理解
因为日常工作中经常使用到`this`，而且在JavaScript中`this`的指向问题也很容易让人混淆一部分知识。    
这段时间翻阅了一些书籍也查阅了网上一些资料然后结合自己的经验，为了能让自己更好的理解`this`，进而总结一篇文章。
## this 是什么
`this`是 JavaScript 语言的一个关键字。它是函数运行时，在函数体内部自动生成的一个对象，只能在函数体内部使用。    
实际是在函数被调用时才发生的绑定，也就是说`this`具体指向什么，取决于你是怎么调用的函数。

## this 指向的四种情况
这四种情况基本涵盖了JavaScript中常见的`this`指向问题
### 1. 全局的函数调用，this指向window
```js
var a = 1;
function fn() {
   console.log(this.a);
}
fn();  // 1
```
这种 情况下的`this`其实就是`window`对象，这个很好理解。
但是还有一种情况，就是匿名函数的`this`也会指向`window`。
```js
var a= 'window';
var obj={a: 'object'}
obj.fn=function(){
	console.log(this.a);//Object
	+function(){
		console.log(this.a)//window
	}()
}
obj.fn()
```
匿名函数的执行环境具有全局性，因此它的`this`对象通常指向windows。    
如果对此有疑惑，可以看知乎上的答案：[知乎 - 匿名函数的this指向为什么是window?](https://www.zhihu.com/question/21958425)
### 2. 作为对象方法的调用，this指向该对象
```js
var a ='window'
var obj={
  a: 'object',
  fn: function(){
    console.log(this.a);
  }
}

obj.fn(); // object
```
当函数作为某个对象的方法调用时，`this`就指这个函数所在的对象。
### 3. 作为构造函数调用，this指向实例
```js
function fn() {
　this.x = 1;
}
var obj = new fn();
console.log(obj.x) // 1
```
构造函数中的`this`，在通过`new`之后会生成一个新对象，this就指这个新对象。    
对`new`有疑问的话，可以看 [冴羽的博客 JavaScript深入之new的模拟实现 ](https://github.com/mqyqingfeng/Blog/issues/13)
### 4. 使用call/apply/bind调用, this指向第一个参数
```js
var obj1={
  a: 'boj1'
}
var obj2={
  a: 'obj2'
}
var obj3={
  a: 'obj3'
}
function fn(){
  console.log(this.a);
}
// apply
fn.apply(obj1);// 'obj1'
// call
fn.call(obj2);// 'obj2'
// bind
var fnBind= fn.bind(obj3);
fnBind();// 'obj3'
```
`call/ apply / bind `都有一个共同的特点，就是改变`this`的指向，使用这种方法可以把别人的方法拿过来用到自己身上。

第一个参数为 `null` 的时候，视为指向 `window`.
```js
var a='window'
var obj={
  a: 'boj',
  fn: function (){
    console.log(this.a);
  }
}
obj.fn.call(null);// 'window'
```
在这里如果是`obj.fn()`调用的`fn()`方法，`this`应该指向`obj`没错。
但是因为`call(null)`的存在，改变了指向，所以`this`指向了`window`。

## 深入理解
正因为比较难理解，所以`this`指向也是面试时最容易遇到的问题，比如下面这道我曾遇到的一个面试题：
```js
var length = 10;
function fn(){
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function(fn){
    fn();//10
    arguments[0]();//2 这里的this指向的arguments，所以获取的是arguments.length
  }
};
obj.method(fn, 1);
```
在这道题里，不仅考察了对`this`熟悉程度，还考察了函数的传参形式、作用域、以及`arguments`这种特殊的数组的理解。    
只有真正理解了这些才能正确的判断`this`究竟指向了谁。    
所以，只有对`JavaScript`中的各项知识点深入理解，才会对`this`的概念越加清晰。

参考：    
- [阮一峰 - Javascript 的 this 用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)    
- [前端开发博客 - 深入理解JavaScript this](http://caibaojian.com/deep-in-javascript-this.html)

