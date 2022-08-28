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

### Fullscreen API

Fullscreen API 用于在 Web 应用程序中开启全屏模式，使用它就可以在全屏模式下查看页面/元素。在安卓手机中，它会溢出浏览器窗口和安卓顶部的状态栏（显示网络状态、电池状态等的地方）。

Fullscreen API 方法：

1. requestFullscreen：系统上以全屏模式显示所选元素，会关闭其他应用程序以及浏览器和系统 UI 元素。
2. exitFullscreen：退出全屏模式并切换到正常模式。

下面来看一个常见的例子，使用全屏模式观看视频：

``` js
<body>
    <header>
        <h2>Web APIs<h2>
    </header>
    <div class="web-api-cnt">
        <div class="web-api-card">
        <div class="web-api-card-head">
            Demo - Fullscreen
        </div>
        <div class="web-api-card-body">
        <div id="error" class="close"></div>
        <div>
            This API makes fullscreen-mode of our webpage possible. It lets you select the Element you want to view in fullscreen-mode, then it shuts off the browsers window features like URL bar, the window pane, and presents the Element to take the entire width and height of the system.

In Android phones, it will remove the browsers window and the Android UI where the network status, battery status are displayed, and display the Element in full width of the Android system.
        </div>
        <div class="video-stage">
            <video id="video" src="./video.mp4"></video>
            <button onclick="toggle()">Toogle Fullscreen</button>
        </div>
        <div>
            This API makes fullscreen-mode of our webpage possible. It lets you select the Element you want to view in fullscreen-mode, then it shuts off the browsers window features like URL bar, the window pane, and presents the Element to take the entire width and height of the system.

In Android phones, it will remove the browsers window and the Android UI where the network status, battery status are displayed, and display the Element in full width of the Android system.
        </div>
        </div>
        </div>
    </div>
</body>

<script>
    const l =console.log

    function toggle() {
        const videoStageEl = document.querySelector(".video-stage")
        if(videoStageEl.requestFullscreen) {
            if(!document.fullscreenElement){
                videoStageEl.requestFullscreen()
            }
            else {
                document.exitFullscreen()
            }
        } else {
            error.innerHTML = "此设备不支持 Fullscreen API"
            error.classList.remove("close")        
        }
    }
</script>
```
