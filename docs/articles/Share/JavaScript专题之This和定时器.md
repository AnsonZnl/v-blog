# JavaScript 专题之 This 和定时器

![前端技术分享（2021-05-10） _1_.png](https://i.loli.net/2021/05/13/DTfjoEXvCBcO6ZK.png)

分享时长：45 分钟分享+15 分钟提问

分享两个在 JS 中非常重要、但又经常遇到问题的两个点。

思维导图：[https://naotu.baidu.com/file/7d05ddb397c649f62136040993cbd04b](https://naotu.baidu.com/file/7d05ddb397c649f62136040993cbd04b)

## 目的

- 分享日常开发工作中常遇到的问题
- 提升工作效率，编写易维护的代码
- 了解前端技术的趋势

## This

JS 关键字：指向当前环境的上下文

### 1. 事件中的 this

在 DOM 事件中，`this`指向当前的 DOM 元素对象。

在 HTML 事件(仅为 `addEventListener` 添加时)，`this` 指向了接收事件的 HTML 元素

```html
<style>
  #box {
    height: 300px;
    line-height: 300px;
    text-align: center;
  }
</style>
<body>
  <div id="box">Hello World</div>
  <script>
    function bluify() {
      console.log(this);
      this.style.backgroundColor = "#00CCFF";
      this.innerHTML =
        this.innerHTML === "Hello World" ? "你好，世界" : "Hello World";
    }
    box.addEventListener("click", bluify, false);
  </script>
</body>
```

### 2. 全局函数、匿名函数，this 指向是全局对象

- 浏览器中指向 `Window`
- Node 环境指向 `Global`

```js
function func() {
  console.log(this); // Window or global
}
func();
```

### 3. 对象的方法调用

`this` 指向当前的对象

```js
const xiaoming = {
  name: "小明",
  getName() {
    console.log(this.name);
  },
};
xiaoming.getName(); // 小明
```

### 4. 构造函数内调用，this 指向实例对象

```js
function Person(name, sex, age) {
  this.name = name;
  this.sex = sex;
  this.age = age;
}
let xiaoming = new Person("小明", "男", 20);
console.log(xiaoming); // { name: '小明', sex: '男', age: 20 }
```

### 5. call/apply/bind 调用

`this` 指向第一个参数

```js
const xiaoming = {
  name: "小明",
  getName() {
    console.log(this.name);
  },
};
const xiaohong = {
  name: "小红",
};
xiaoming.getName.call(xiaohong); // 小红
```

### this 复制引用

**原因：** 用于纠正 `this` 指向不达预期的问题

**应用场景：** 比如在 `setTimeout` 中的函数

**用法：**`let that = this;`

普通函数 VS 箭头函数

```js
var name = "window";
let obj = {
  name: "obj",
  outout1() {
    let that = this;
    setTimeout(function() {
      console.log("普通函数", that.name);
    }, 1000);
  },
  outout2() {
    setTimeout(() => {
      console.log("箭头函数", this.name);
    }, 1000);
  },
};
obj.outout1(); // 普通函数 obj
obj.outout2(); // 普通函数 obj
```

因为箭头函数的`this`是在定义的时候就确定的，使用它可以少写一步 `this` 指向，推荐使用。

## 定时器

- setTimeout：规定 N 秒后执行

- setInterval：规定 N 秒后循环执行

### 参数

- 函数/字符串、字符串会触发`eval()`
- 时长毫秒（ms）
- 传入函数的参数列表

**传入函数**

```js
// setTimeout / setInterval 使用
setTimeout(
  (...args) => {
    let sum = args.reduce((p, c) => p + c);
    console.log(args, sum); //[ 1, 2, 3 ] 6
  },
  1000,
  1,
  2,
  3
);
// 这段代码的意思是：在 1 秒后将这个函数推入执行栈，然后传递参数1,2,3到函数中
```

一秒后开始计算 1,2,3 的和，然后输出。

**传入字符串**

```js
setTimeout("alert(0)", 2000);
```

可以接受一个字符串，默认通过 `eval()` 解析后执行，但是 `eval` 函数非常耗性能，非特殊不推荐。

### 返回值

返回定时器的 ID ，用于清除定时器。

```js
clearInterval(n);
clearTimeout(n);
```

### setTimeout

核心逻辑：N 秒推入执行栈，而不是 N 秒后执行，

使用场景：延迟执行某个操作时

问题：

- 设置 0 秒也会在下一个宏任务中执行（异步）
- 定时器在 for 中输出 1-10 的坑（forEach 不可跳出循环）

**异步**

```js
// for & setTimout
for (var i = 1; i <= 10; i++) {
  setTimeout(() => {
    console.log(i); // ??
  }, 1000);
}
```

因为异步的原因，`setTimeout` 被延迟到下一次事件循环中执行。

**forEach**

forEach 不能跳出循环

```js
let arr = [1, 2, 3];
arr.forEach((e) => {
  console.log(e);
  1, 2, 3;
  e += 1;
  if (e === 2) {
    // break ！X
    // return ！X
  }
});
console.log(arr); // [1, 2, 3];
```

在`forEach`中使用`break`、`return`等都不会跳出循环。

上列操作可以转换为`for`操作

```js
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    break;
  }
  arr[i] += 1;
}
console.log(arr); // [ 2, 2, 3 ]
```

### setInterval

**使用场景**

- 视频学习的定时保存学时
- 扫码登录的轮询

### 问题

**定时器不准确的原因**

- N 秒后推入执行栈，而不是 N 秒后执行
- 会因为前面有代码在执行而导致时间变短

**案例代码：**

假设有一个 HTTP 轮询，每一秒查询一次数据。

```js
let startTime = new Date().getTime();
let count = 0;
setInterval(() => {
  let i = 0;
  while (i++ < 10000000); // 假设这里是查询数据带来的网络延迟，用来增加每次函数执行的时间
  count++;
  console.log(
    "与原设定的间隔时差了：",
    new Date().getTime() - (startTime + count * 1000),
    "毫秒"
  );
}, 1000);
```

代码在执行多次后，定时器会变得不准确，产生误差。

**定时器不及时清楚（小程序中）**

- 不`clear`的话会一直保存在内存中，造成内存泄漏。
- 使用场景：保存学时、人脸识别、考试倒计时等
- 多个页面栈共享定时器
  ![](https://uploader.shimo.im/f/hkgXTlysFxJeiJ4Z.png)

### 解决方法

**定时器不准确**

解决方法：使用`settimeout`模拟`setinterval`

```js
// 自定义一个定时器
let timer = null;
function interval(func, wait) {
  let interv = function() {
    func.call(null);
    timer = setTimeout(interv, wait);
  };
  timer = setTimeout(interv, wait);
}

// 使用定时器
interval(() => {
  let date = new Date();
  console.log("log..", `${date.getMinutes()}: ${date.getSeconds()}`);
}, 1000);

// 清楚定时器
setTimeout(() => {
  clearTimeout(timer);
}, 1000 * 6);
```

**定时器太多清楚不掉，造成内存泄漏**

解决方法：批量清楚定时器

```js
// 清楚当前页面的所有定时器
for (let i = 1; i < 100000; i++) {
  clearInterval(i);
  clearTimeout(i);
}
```

建议及时保存定时器的`id`，用于清除。
