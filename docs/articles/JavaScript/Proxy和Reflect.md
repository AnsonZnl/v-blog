## Proxy和Reflect


### Proxy

> Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

用法参考：[阮一峰ES6入门-Proxy](https://es6.ruanyifeng.com/#docs/proxy)

用处：
- 实现拦截和监视外部的访问（set/get）
- 降低函数和类的复杂度
- 在复杂操作前做自定义的处理

场景：
- 抽离校验模块
- 私有属性
- 访问日志
- 预警和拦截
- 过滤性操作
- 中间层代理

### Reflect

Reflect将对应已有的方法，从命令式改为函数式，对比一下两者的区别,如：判断一个属性是否在对象中：
``` js
let obj={a: 'a'}
// 传统写法
'a' in obj
// Reflect写法
Reflect.has(obj,'a')
```

将Reflect当作Object的工具类来用，Proxy和Reflect就成了Object的中间件了。

示例：
``` js
var obj = new Proxy({}, {
    get: (target, key, receiver) => {
        console.log('这里可以记录访问日志。');
        console.log('如果要设置私有属性，那么这里直接抛出一个错误不让访问。',target, key, receiver);
        if (key !== "value") {
            console.log('这里可以预警和拦截');
        }
        return Reflect.get(target, key, receiver);//这里也可以直接操作target[key]
    },
    // set: ...,//这里可以过滤一些操作。
    // apply: ...,//当把obj当作函数执行，如obj()就会进入apply方法。
    // construct: ...,//当new obj() 的时候就会执行construct方法。
    // ... //还有很多方法，请自行去看文档。
});
obj.value = 2;
console.log(obj.value);//就打印出来2，如果有预警和拦截，那么访问别的属性就访问不了。

```

ES6规范后，更希望数据和方法进行分离，对象是纯数据，所有的逻辑都放到reflect上，将不会在新增Object的方法

## 参考
- [详解Proxy（代理）和Reflect（反射）](https://zhuanlan.zhihu.com/p/25664314)
- [ES6中Proxy和Reflect的理解和用法](https://www.jianshu.com/p/9e07f182859b)
