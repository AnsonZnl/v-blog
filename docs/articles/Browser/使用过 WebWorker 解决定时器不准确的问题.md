# 使用过 WebWorker 解决定时器不准确的问题

在使用定时器的时候，因为 JS 单线程的原因，经常会导致定时器不准确的问题发生，尤其是在 tab 页切换时尤为明显。

web worker 可以为我们提供一个线程去执行我们额外的功能（当然也有一些限制，不可以使用 window、DOM 等对象），我们可以使用 web worker 里面运行一个不受其他同步任务干扰的定时器，在到达时间后通知主线程即可。

worker 代码

```js
const cntWorker = () => {
    const _self = self;
    const timer = 10 * 60 * 1000;
    // const timer = 10 * 1000
    setInterval(() => {
        _self.postMessage({ time: +new Date() });
    }, 10 * 60 * 1000);
};
//
// 把脚本代码转为string
let code = cntWorker.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

export default worker_script;
```

## 参考

-[阮一峰-Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

-   [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)
