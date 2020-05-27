---
title: JavaScript零散知识整理
date: 2018-7-2 20:45:23
tags: ["JavaScript"]
---


call() 参考：https://blog.csdn.net/ywl570717586/article/details/52681392/
this解读参考：https://juejin.im/post/5b3715def265da59af40a630
函数传入值参考：js高程 p113


### 快速删除尾部数组

```
var arr=[1,2,3,4,5];
arr.length=3;
console.log(arr)//[1,2,3]
```
直接改变数组的length的值

### 从数组中移除重复元素
```
var arr = [1,1,2,2,3,3]
const removeDuplicateltems = arr => [...new Set(arr)];
console.log(removeDuplicateltems(arr))//[1,2,3]
	
```

### 函数作为值传入
```
//把函数作为值传入进去
    function callSomeFunction(someFunction,someArgument){
      return someFunction(someArgument);
    }
```
最终调用的这个函数 他有两个参数， 第一个参数是一个方法 ， 第二个参数是第一个方法的参数。
```
    function add10(num){
      return num + 10;
    }
    var result1=callSomeFunction(add10,10);
      console.log(result1);//20
```
这个例子稍微一看就明白了吧，  传入的10 最终成了add()的参数, 也就是成了num,  所以结果是20
```
    function getGreeting(name){
      return "holle," + name;
    }
    var result2=callSomeFunction(getGreeting, "Nicholas");
    console.log(result2);//holle Nicholas
```
上面的理解了  这个也就不难了  同理 “ Nicholas” 变成了getGreeting() 的参数 name，所以输出结果是 holle Nicholas

### call() 解释

先看看关于call()的官方解释，“调用一个对象的一个方法，以另一个对象替换当前对象。”，看了这样的解释，或许让你更摸不着头脑了。看例子：
```
var x = "我是全局变量";　　　　//定义全局变量x
function a(){　　　　　　　　　//定义函数类结构a　　
    this.x = "我是在函数类结构a中声明的哦";    
}
//定义普通函数，弹出当前指针所包含的变量x的值
function f(){       
    alert (this.x);
}
f.call(new a());//返回值为“我是在函数类结构a中声明的哦”
```
我的理解是，f.call(new a())就是把函数（其实也是对象）f复制到被调用对象“new a()”下面去解析，事实上和下面这段代码的解析结果一样：

```
function a(){
　　this.x = "我是在函数类结构a中声明的哦";
　　alert(this.x);    //我是在函数类结构a中声明的哦
}
a();
```
只不过此时变量X的作用域不同而已，咿…看起来好像有点继承的味道哦，难道不是吗？在上例中,f完全被构造函数a的实力对象继承了，如果说这还不足以说明a.call(b)是一种继承模式，那么再看一个更具有继承味道的用法吧。

```
function f(){    
    this.a ="a";    
    this.b = function(){    
        alert("b");
    }
}
function e(){    
    f.call(this);     
}
var c = new e();
alert(c.a);  //弹出a
c.b();    //弹出b
```
在这个例子中，只要会使用浏览器的朋友，都能看得出来e完全继承了f的属性和方法，否则是无法解释的，因为在e中并没有定义属性a和b，那么按常理推断在e的实例对象c中，并不会出现这两个属性。
