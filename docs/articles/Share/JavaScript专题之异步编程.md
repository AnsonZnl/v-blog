![JS-异步代码maind.png](https://i.loli.net/2021/05/25/NPWO6ebLlzcmDhH.png)

## 前言

异步，就是非同步....

这节内容可能会有点枯燥，但是却是 JavaScript 中非常重要的概念，非常有必要去学习。

## 目的

- 提升开发效率，编写易维护的代码

## 引子问题

- 请求时候为什么页面卡死？？

```js
$.ajax({
  url: "www.xx.com/api",
  async: false, // true
  success: function(result) {
    console.log(result);
  },
});
```

- 为什么数据更新了，DOM 却没有更新？？

```js
// 异步批量更新DOM（vue-nextTick）
// <div id="app">{{num}}</div>
new Vue({
  el: "#app",
  data: {
    num: 0,
  },
  mounted() {
    let dom = document.getElementById("app");
    while (this.num !== 100) {
      this.num++;
    }
    console.log("Vue num=" + this.num, "DOM num=" + dom.innerHTML);
    // Vue num=100,DOM num=0
    // nextTick or setTimeout
  },
});
```

## 产生异步的原因

原因：单线程（一个时间点，只做一件事），浏览器的 JS 引擎是单线程导致的。

**单线程**是指在 JS 引擎中负责解释和执行 IavaScript 代码的线程只有一个，不妨叫它主线程。

所谓单线程，就是指一次只能完成一件任务。如果有多个任务，就必须排队，前面一个任务完成再执行后面一个任务。

先看看一下浏览器内核的线程图:
![Browser thread.jpg](https://i.loli.net/2021/05/28/gdJ9TxQimsZlaOk.jpg)

其中，**渲染线程和 JS 线程互斥**。

假设有两个函数，一个修改一个删除，同时操作一个 DOM 节点，假如有多个线程的话，两个线程一起执行，肯定就死锁了，就会有问题。

为什么 JS 要设计为单线程，因为浏览器的特殊环境。

单线程的优缺点：

> 这种模式的好处是实现起来比较简单，执行环境相对单纯；**坏处是只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应（假死），往往就是因为某一段 Javascript 代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行。**

常见的堵塞（死循环）：

```js
while (true) {}
```

JS 在设计之初就以运行在浏览器中的脚本语言，所以也不想搞得这么复杂，就设计成了单线程，也就是，**一个时间点，只能做一件事。**

为了**解决单线程堵塞**这个缺点：产生了异步。

拿吃泡面举例：

- 同步：买泡面=》烧水（盯着）=》煮面=》吃泡面
- 异步：买泡面=》烧水（水开了热水壶响-回调）=》看电视=》煮面（面好了热水壶响-回调）=》看电视=》熟了叫我=》吃泡面

看电视就是异步操作，热水壶响，就是回调函数。

## 异步编程

JS 中大多的代码都是同步执行的，只有极个别的函数是异步执行的，异步执行的代码，则需要异步编程。

### 异步代码

```js
setTimeout(() => {
  console.log("log2");
}, 0);
console.log("log1");
// ?? log1 log2
```

异步代码的特点：**不是立即执行，而是需要等待，在未来的某一个时间点执行。**

| **同步代码**   | **异步代码**                      |
| -------------- | --------------------------------- |
| `<script>`代码 | 网络请求（Ajax）                  |
| I/O 操作       | 定时器（setTimeout、setInterval） |
| 渲染操作       | Promise（then）                   |
|                | async/await                       |

### 回调函数

异步代码最常见的写法就是使用回调函数。

- HTTP 网络请求（请求成功、识别后执行 xx 操作）
- DOM 事件绑定机制（用户触发事件后执行 xx 操作）
- 定时器（setTimeout、setInterval）（在达到设定时间后执行 xx 操作）

```javascript
// 注意到click方法中是一个函数而不是一个变量
// 它就是回调函数
$("#btn_1").click(function() {
  alert("Btn 1 Clicked");
});
// 或者
function click() {
  // 它就是回调函数
  alert("Btn 1 Clicked");
}
$("#btn_1").click(click);
```

回调函数的缺点也很明显，容易产生回调地狱：
![callbackhell.png](https://i.loli.net/2021/05/28/zPsXJnZQYr9HyKC.png)

### 异步编程的三种方式

- callback

```js
function getOneNews() {
  $.ajax({
    url: topicsUrl,
    success: function(res) {
      let id = res.data[0].id;
      $.ajax({
        url: topicOneUrl + id,
        success: function(ress) {
          console.log(ress);
          render(ress.data);
        },
      });
    },
  });
}
```

- promise

```js
function getOneNews() {
  axios
    .get(topicsUrl)
    .then(function(response) {
      let id = response.data.data[0].id;
      return axios.get(topicOneUrl + id);
    })
    .then((res) => {
      render(res.data.data);
    })
    .catch(function(error) {
      console.log(error);
    });
}
```

- async/await

```js
async function getOneNews() {
  let listData = await axios.get(topicsUrl);
  let id = listData.data.data[0].id;
  let data = await axios.get(topicOneUrl + id);
  render(data.data.data);
}
```

### 在线预览

预览地址：[http://jsrun.net/s43Kp/embedded/all/light](http://jsrun.net/s43Kp/embedded/all/light?fileGuid=VrTQqvKGDjDypqhr)

### 问题？？

如果多个异步代码同时存在，那么执行顺序应该是怎样的？那个先执行、那个后执行了？

## 宏任务和微任务

异步代码的划分，异步代码分宏任务和微任务。

| **宏任务（不着急）**   | **微任务(着急)** |
| ---------------------- | ---------------- |
| `<script>`整体代码     | Promise          |
| setTimeout/setInterval |                  |

## 事件循环（Event loop）

![EventLoopmind.png](https://i.loli.net/2021/05/28/NbSdByKkDsPXI7o.png)

执行顺序：

1. 执行整体代码`<script>`（宏任务）
2. 执行所有微任务
3. 执行一个宏任务
4. 执行渲染线程
5. 2->3->2->3...依次循环（在 2、3 步中又创建了新的宏、微任务）

重复从宏任务和微任务队列里拿出任务去执行。

## 总结

因为浏览器设计的原因，JS 线程和渲染线程互斥，所以 JS 线程被设计成了单线程。

因为单线程执行一些操作（如网络请求）时有堵塞的问题，所有产生了异步。

因为有了异步，所以产生了异步编程，从而有了回调函数。

因为回调函数写多了会产生回调地狱，所有又有了解决回调地狱的 Promise 写法

自 ES7 标准后有了比 Promise 更加优雅的写法 ———— async/await 写法，也是异步编程的最终解决方法。

因为 JS 的代码分为同步和异步代码，同步代码的执行顺序不必多说，自上而下的执行。

但是如果有多个异步的代码，他的执行顺序又是怎么的呢？？

为了解决多个异步代码的执行顺序问了，有了事件循环（EventLoop），将异步任务区分为宏任务、微任务，依据规则依次执行。

至此 完！

## 练习

```js
console.log("script start");
setTimeout(function() {
  console.log("timeout1");
}, 10);
new Promise((resolve) => {
  console.log("promise1");
  resolve();
  setTimeout(() => console.log("timeout2"), 10);
}).then(function() {
  console.log("then1");
});
console.log("script end");
```

写出 log 的输出结果，并说出理由。

## 参考

- [浅谈浏览器多进程与 JS 线程](https://segmentfault.com/a/1190000013083967)
- [一次搞懂-JS 事件循环之宏任务和微任务](https://www.zhangningle.top/articles/JavaScript/%E4%B8%80%E6%AC%A1%E6%90%9E%E6%87%82-JS%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E4%B9%8B%E5%AE%8F%E4%BB%BB%E5%8A%A1%E5%92%8C%E5%BE%AE%E4%BB%BB%E5%8A%A1.html)
- [【JS】深入理解事件循环,这一篇就够了!(必看)](https://zhuanlan.zhihu.com/p/87684858)
- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly)
- [浏览器的线程有哪些](https://www.cnblogs.com/hustxychen/p/9412656.html)
