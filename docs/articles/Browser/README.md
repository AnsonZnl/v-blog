# 浏览器

> 调试结果Google Chrome浏览器为准

## Web API

**参考：**
1. [web-api-examples](https://web-api-examples.github.io/)
2. [MDN-Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
3. [12 Rarely Used JavaScript Web APIs that Will Boost Your Website to THE MOON](https://dev.to/eludadev/12-rarely-used-javascript-web-apis-that-will-take-your-website-to-the-next-level-4lf1#making-your-website-a-fullscreen-experience)

### Broadcast Channel API
> Broadcast Channel API 可以实现同 源 下浏览器不同窗口，Tab 页，frame 或者 iframe 下的 浏览器上下文 (通常是同一个网站下不同的页面) 之间的简单通讯。


可以简单实现两个页面直接的通信.
页面一：
``` html
  <body>
    <button onclick="send()">点我给2页面发送最新时间</button>
    <script>
      // 连接到广播频道
      var bc = new BroadcastChannel("test_channel"); // 发送简单消息的示例
      function send() {
        bc.postMessage(new Date().toLocaleTimeString());
      }
    </script>
  </body>
```
页面二：
``` html
  <body>
    <div>当前时间：<span id="msg"></span></div>
    <script>
      // 连接到广播频道
      var bc = new BroadcastChannel("test_channel"); // 发送简单消息的示例// 简单示例，用于将事件打印到控制台
      bc.onmessage = function (ev) {
        console.log("发过来的数据", ev);
        msg.innerHTML = ev.data;
        // bc.close(); // / 断开频道连接
      };
    </script>
  </body>
```

### Fullscreen API

Fullscreen API 用于在 Web 应用程序中开启全屏模式，使用它就可以在全屏模式下查看页面/元素。在安卓手机中，它会溢出浏览器窗口和安卓顶部的状态栏（显示网络状态、电池状态等的地方）。

Fullscreen API 方法：

1. requestFullscreen：系统上以全屏模式显示所选元素，会关闭其他应用程序以及浏览器和系统 UI 元素。
2. exitFullscreen：退出全屏模式并切换到正常模式。

可以通过 document.fullscreenElement 判断当前元素是否全屏。可通过判断做toggle

```js
function toggle() {
  const videoStageEl = document.querySelector(".video-stage")
  if(!document.fullscreenElement)
    videoStageEl.requestFullscreen()
  else
    document.exitFullscreen()
}
```





## Audio 
