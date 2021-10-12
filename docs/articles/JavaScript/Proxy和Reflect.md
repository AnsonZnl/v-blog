## Proxy和Reflect



Reflect将对应已有的方法，从命令式改为函数式，对比一下两者的区别,如：判断一个属性是否在对象中：
``` js
let obj={a: 'a'}
// 传统写法
'a' in obj
// Reflect写法
Reflect.has(obj,'a')
```

ES6规范后，更希望数据和方法进行分离，对象是纯数据，所有的逻辑都放到reflect上，将不会在新增Object的方法

## 参考
- https://zhuanlan.zhihu.com/p/25664314