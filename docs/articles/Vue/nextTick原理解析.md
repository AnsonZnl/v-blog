# \$nextTick 原理解析

## nextTick 是什么

\$nextTick：根据官方文档的解释，它可以在 DOM 更新完毕之后执行一个回调函数，并返回一个 Promise（如果支持的话）

```js
// 修改数据
vm.msg = "Hello";

// DOM 还没有更新
Vue.nextTick(function() {
  // DOM 更新了
});
```

这块理解 EventLoop（事件循环） 的应该一看就懂，其实就是在下一次事件循环开始时开始更新 DOM，避免中间频繁的操作引起页面的重绘和回流。

对于这块不太懂的可以看[一次搞懂EventLoop](./../JavaScript/一次搞懂-JS事件循环之宏任务和微任务.md)

这块引用官方文档：

> 可能你还没有注意到，Vue 在更新 DOM 时是**异步执行**的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。
> 这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

列如当设置`vm.text = 'new value'`时，该组件不会立即重新渲染，当刷新队列时，组件会在下一个事件循环‘tick’中更新，

```JS
<div id="example">{{message}}</div>
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

一般在设置了`this.xx='xx'`数据后，立即得到最新的 DOM 数据时，才会用到`$nextTick`，因为 DOM 的更新是异步进行的，所以获取需要用到这个方法。

- [Vue 异步更新策略](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

## 更新流程（源码解析）

1. 当数据被修改时，watcher 会侦听到变化，然后会将变化进行入队：

```js
/*
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
```

2. 并使用 nextTick 方法添加一个 flushScheduleQueue 回调

```js
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (!config.async) {
        flushSchedulerQueue();
        return;
      }
      nextTick(flushSchedulerQueue);
    }
  }
}
```

3. flushScheduleQueue 加入到 callback 数组中，并且异步执行

```js
function nextTick(cb, ctx) {
  var _resolve;
  callbacks.push(function() {
    if (cb) {
      try {
        cb.call(ctx); // !! cb 就是加入的回调
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    // 异步执行 操作 见timerFunc
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== "undefined") {
    return new Promise(function(resolve) {
      _resolve = resolve;
    });
  }
}
```

4. timerFunc 操作就是异步执行了依次判断使用：Promise.then=>MutationObserver=>setImmediate=>setTimeout

```js
var timerFunc;

if (typeof Promise !== "undefined" && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function() {
    p.then(flushCallbacks);
    // 1. Promise.then
    if (isIOS) {
      setTimeout(noop);
    }
  };
  isUsingMicroTask = true;
} else if (
  !isIE &&
  typeof MutationObserver !== "undefined" &&
  (isNative(MutationObserver) ||
    MutationObserver.toString() === "[object MutationObserverConstructor]")
) {
  // 2.  MutationObserver
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  timerFunc = function() {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  // 3. setImmediate
  timerFunc = function() {
    setImmediate(flushCallbacks);
  };
} else {
  //4. setTimeout
  timerFunc = function() {
    setTimeout(flushCallbacks, 0);
  };
}
```

5. flushCallbacks 遍历所有的 callbacks 并执行

```js
function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
```

6. 其中就有前面加入的 flushScheduleQueue，利用 queue 中的 watcher 的 run 方法，更新组件

```js
for (index = 0; index < queue.length; index++) {
  watcher = queue[index];
  watcher.run();
}
```

## 总结

以上就是 vue 的 nextTick 方法的实现原理了，总结一下就是：

1. Vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行

2. microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕

3. 因为兼容性问题，vue 不得不做了 microtask 向 macrotask 的降级方案

## 参考

- [Vue-nextTick 源码地址](https://github1s.com/vuejs/vue/blob/HEAD/dist/vue.common.dev.js)
- [全面解析Vue.nextTick实现原理](https://mp.weixin.qq.com/s?__biz=Mzg4MTYwMzY1Mw==&mid=2247495702&idx=1&sn=757a0817674daedb86fb9eb34c657a2d&source=41#wechat_redirect)
