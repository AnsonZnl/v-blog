# 浏览器
> 调试结果Google Chrome浏览器为准

## Web API

### Broadcast Channel API
> Broadcast Channel API 可以实现同 源 下浏览器不同窗口，Tab 页，frame 或者 iframe 下的 浏览器上下文 (通常是同一个网站下不同的页面) 之间的简单通讯。

MDN 文档链接： https://developer.mozilla.org/zh-CN/docs/Web/API/Broadcast_Channel_API

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