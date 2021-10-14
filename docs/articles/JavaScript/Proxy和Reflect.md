## Proxy和Reflect
ES6新增的两个方法，将之前对于对象深层次的操作可以转移在专有方法中处理

### Proxy

> Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

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

Proxy接收两个参数，返回一个带有'代理'功能的对象.
- target：要包装的对象，可以是任何参数，包括函数。
- handler：代理配置，带有‘钩子’函数的对象，如set\get等方法

``` js
// 写一个对象obj，当读取对象中的属性不存在时返回0
var obj = new Proxy({value: '100'}, {
    get: (target, key, receiver) => {
        return key in target ? target[key] : 0;
    }
});

console.log(obj.value);// 100
console.log(obj.xx);// 0

```

可选择除了get还有set、has、ownKeys等，具体可以查看[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)。

Proxy和Object.defineProperty的区别：
- Proxy可以直接代理一个对象，而后者只可以拦截这个对象的属性
- Proxy可以监听的方法更多
- Proxy可以对数组进行代理，功能更强大
- 用法不同，Proxy的方式更直接，更便于理解

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

监听Map、Set、Date、Promise等都是用了所谓的'内部插槽'的方式，也就是说访问他们的属性是不可以通过Proxy的set、set方法进行拦截的

``` js
let map = new Map();

let proxy = new Proxy(map, {});

proxy.set('test', 1); // Error
```

幸运的是可以使用Reflect解决
``` js
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)
```


## 参考
- [阮一峰ES6入门-Proxy](https://es6.ruanyifeng.com/#docs/proxy)
- [【推荐阅读】Proxy 和 Reflect](https://juejin.cn/post/6844904090116292616)