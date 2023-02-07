# JS 浅拷贝与深拷贝

## 数据类型

- 基本类型：undefined、null、Boolean、String、Number、Symbol
- 引用类型：Object、Array、Date、Function、RegExp 等

## 存储方式

- 基本类型：基本类型值在内存中占据固定大小，保存在`栈内存`当中，（不包含`闭包`中的变量）
- 引用类型：引用类型保存在`堆内存`中，而栈内存存储的是堆内存中的存储`地址`(引用)。

## 为什么要进行拷贝？

看个例子：

```js
let obj1 = {
  value: "a",
};
let obj2 = obj1;
obj2.value = "b";
console.log(obj1); //{ value: 'b' }
console.log(obj1 === obj2); // true
```

本来只想改变`obj2`的 `value` 的值，但是改变之后连`obj1`的值也一同改变了，很显然，这不是我们想要的的结果。

因为对象是引用类型，所以赋值时的操作仅是赋予相同的地址，当对其中一个对象进行操作时，就会影响其他的对象。解决这个问题就需要使用拷贝了。

拷贝的方式分两种：

- 浅拷贝
  - 基本类型：拷贝值
  - 引用类型：拷贝对象引用。
- 深拷贝
  - 基本类型：拷贝值
  - 引用类型：会创建一个新的引用，将之前的对象完整的拷贝一份出来，并添加至新的引用当中。

## 浅拷贝

### Object.assign()

使用原生的 `Object.assign()` 方法就可以实现引用类型的浅拷贝

```js
let obj1 = {
  value: "a",
};
let obj2 = Object.assign({}, obj1);
obj2.value = "b";
console.log(obj1); //{ value: 'a' }
```

但是如果拷贝的源对象当中包含对象时，`OBject.assign()`方法只会拷贝对象的引用地址

### 扩展运算符

使用 ES6 的扩展运算符也可以达到浅拷贝的效果

```js
let arr1 = [1, 2, 3];
let arr2 = [...arr1];
console.log(arr1 === arr2); //false
```

输出 `false` 就说明克隆成功了，对象可以这么搞

```js
let obj1 = {
  value: "a",
  arr: [1, 2, 3],
};
let obj2 = { ...obj1 };
console.log(obj1 === obj2); // false
console.log(obj1.arr === obj2.arr); // true
```

输出 `false` 就说明克隆成功了，但是里面的数组却克隆失败了，是因为扩展运算符在复制引用类型时，复制的是地址。

这种比较试适合简单的单个数组或者对象使用，简单又方便

## 深拷贝

### JSON.stringify()

如果要拷贝的对象中包含对象，就需要深拷贝了，一般使用原生的方法`JSON.parse(JSON.stringify(obj))`

```js
let obj1 = {
  value: "a",
  obj: {
    value: "b",
  },
  arr: [1, 2, 3],
};
let obj2 = JSON.parse(JSON.stringify(obj1));
console.log(obj1.arr === obj2.arr); // false
console.log(obj1.obj === obj2.obj); // false
```

输出 `false` 就说明克隆成功了

这个也会有一些缺陷，比如 `undefined` 或者有函数的时候就会出现问题，最好的方法是使用递归函数。

这个可以参考[loadsh cloneDeep](https://github.com/lodash/lodash/blob/master/cloneDeep.js)

### 解决循环引用的问题

有种特殊情况需注意就是对象存在循环引用的情况，即对象的属性直接的引用了自身的情况，解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。

关于这块如有疑惑，请仔细阅读[ConardLi 大佬如何写出一个惊艳面试官的深拷贝?](https://segmentfault.com/a/1190000020255831)这篇文章。

### 自己实现深拷贝

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== "object") return obj;
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = new obj.constructor();
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d === obj); // false 克隆成功
console.log(d); // { name: 1, address: { x: 100 }, o: [Circular] }
```

## 使用循环
递归容易爆栈。

其实破解递归爆栈的方法有两条路，第一种是消除尾递归，但在这个例子中貌似行不通，第二种方法就是干脆不用递归，改用循环，

``` js
function cloneLoop(x) {
    const root = {};

    // 栈
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const {parent, key, data} = node;
        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            parent[key] = {};
            res = parent[key];
        }

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}
```
用循环遍历一棵树，需要借助一个栈，当栈为空时就遍历完了，栈里面存储下一个需要拷贝的节点

首先我们往栈里放入种子数据，key用来存储放哪一个父元素的那一个子元素拷贝对象

然后遍历当前节点下的子元素，如果是对象就放到栈里，否则直接拷贝
``` js

```
改用循环后，再也不会出现爆栈的问题了，但是对于循环引用依然无力应对

## 参考

- [MDN-Object.assign](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [ES6-扩展运算符](https://es6.ruanyifeng.com/#docs/array#%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)
- [juejin-浅拷贝与深拷贝](https://juejin.im/post/6844904197595332622#heading-13)
- [如何写出一个惊艳面试官的深拷贝?](https://segmentfault.com/a/1190000020255831)
