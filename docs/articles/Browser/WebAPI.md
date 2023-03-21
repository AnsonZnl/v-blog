# Web API

> 调试结果 Google Chrome 浏览器为准

**参考：**

1. [web-api-examples](https://web-api-examples.github.io/)
2. [MDN-Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
3. [12 Rarely Used JavaScript Web APIs that Will Boost Your Website to THE MOON](https://dev.to/eludadev/12-rarely-used-javascript-web-apis-that-will-take-your-website-to-the-next-level-4lf1#making-your-website-a-fullscreen-experience)
4. [7 JavaScript Web APIs to build Futuristic Websites you didn't know](https://dev.to/ruppysuppy/7-javascript-web-apis-to-build-futuristic-websites-you-didnt-know-38bc)
5. [你（可能）不知道的 web api](https://juejin.cn/post/6844903741024370701#heading-1)

## Broadcast Channel API

> Broadcast Channel API 可以实现同源下浏览器不同窗口，Tab 页，frame 或者 iframe 下的 浏览器上下文 (通常是同一个网站下不同的页面) 之间的简单通讯。

可以简单实现两个页面直接的通信.
页面一：

```html
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

```html
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

## Fullscreen API

Fullscreen API 用于在 Web 应用程序中开启全屏模式，使用它就可以在全屏模式下查看页面/元素。在安卓手机中，它会溢出浏览器窗口和安卓顶部的状态栏（显示网络状态、电池状态等的地方）。

Fullscreen API 方法：

1. requestFullscreen：系统上以全屏模式显示所选元素，会关闭其他应用程序以及浏览器和系统 UI 元素。
2. exitFullscreen：退出全屏模式并切换到正常模式。

可以通过 document.fullscreenElement 判断当前元素是否全屏。可通过判断做 toggle

```js
function toggle() {
    const videoStageEl = document.querySelector(".video-stage");
    if (!document.fullscreenElement) videoStageEl.requestFullscreen();
    else document.exitFullscreen();
}
```

## Online State（网络状态）

就是获取当前的网络状态，同时也有对应的事件去响应网络状态的变化。

```js
window.addEventListener("online", onlineHandler); // 联网时
window.addEventListener("offline", offlineHandler); // 断网时
```

比如很常见的一个需求，断网时提示，网络恢复时刷新。

实现断网重连：

```js
const onlineHandler = () => {
    window.location.reload();
};
const offlineHandler = () => {
    alert("网络异常，请检查您的网络");
};
window.addEventListener("online", onlineHandler);
window.addEventListener("offline", offlineHandler);
```

## Clipboard API

剪切板 API 快速将内容复制到剪切板上，下面是一键复制的方法：

```js
const onClipText = (text) => {
    handleCopyValue(text)
        .then(() => {
            alert("复制成功");
        })
        .catch(() => {
            alert("自动复制失败，请手动复制");
        });
};

const handleCopyValue = (text) => {
    //浏览器禁用了非安全域的 navigator.clipboard 对象
    //在线上环境会报错 TypeError: Cannot read properties of undefined (reading 'writeText')
    if (!navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    } else {
        // 判断是否支持拷贝
        if (!document.execCommand("copy")) return Promise.reject();
        // 创建标签，并隐藏
        const textArea = document.createElement("textarea");
        textArea.style.position = "fixed";
        textArea.style.top = textArea.style.left = "-100vh";
        textArea.style.opacity = "0";
        textArea.value = text;
        document.body.appendChild(textArea);
        // 聚焦、复制
        textArea.focus();
        textArea.select();
        return new Promise((resolve, reject) => {
            // 不知为何，必须写这个三目，不然copy不上
            document.execCommand("copy") ? resolve() : reject();
            textArea.remove();
        });
    }
};
```

## Page Lifecycle(网页生命周期)
我们可以用`document.visibitilityState`来监听网页可见度，是否卸载.. 
在手机和电脑上都会现这种情况，比如页面中有一个视频正在播放，然后在切换tab页后给视频暂停播放，或者有个定时器轮询，在页面不显示的状态下停止无意义的轮询等等。
比如一个视频的例子来展示：
``` js
const video = document.getElementById('vs')

window.addEventListener('visibilitychange',() => {
    // 通过这个方法来获取当前标签页在浏览器中的激活状态。
    switch(document.visibilityState){
        case'prerender': // 网页预渲染 但内容不可见
        case'hidden':    // 内容不可见 处于后台状态，最小化，或者锁屏状态
        video.puase()
        case'visible':   // 内容可见
        video.play()
        case'unloaded':  // 文档被卸载
        video.destory()
    }
});
```
这个API的用处就是用来响应我们网页的状态，如果这个标签页显示则视频就开始播放，隐藏就暂停，关闭就卸载。


## Screen Orientation API
我们可以通过以下代码来演示如何使用Screen Orientation API来控制页面的方向：
``` js
// 获取屏幕方向对象
const orientation = screen.orientation;

// 监听屏幕方向变化事件
orientation.addEventListener('change', () => {
  console.log(`屏幕方向变为：${orientation.type}`);
});

// 锁定屏幕方向为横屏
orientation.lock('landscape').then(() => {
  console.log('屏幕方向已锁定为横屏');
}).catch((err) => {
  console.log(`锁定屏幕方向失败：${err}`);
});

// 解锁屏幕方向
orientation.unlock();

```


在这段代码中，我们首先通过`screen.orientation`获取了屏幕方向对象，并通过`addEventListener`方法监听了屏幕方向变化事件。然后，我们使用`lock`方法将屏幕方向锁定为横屏，并在锁定成功后打印了一条消息。最后，我们使用`unlock`方法解锁了屏幕方向。

需要注意的是，`lock`方法可能会在某些设备上无法生效，因此我们需要在实际使用中进行兼容性测试。


## Vibration API

以下是一个简单的Web Vibration API例子：

```html
<!DOCTYPE html>
<html>
<head>
	<title>Web Vibration API Example</title>
</head>
<body>
	<h1>Web Vibration API Example</h1>
	<button onclick="vibrate()">Vibrate</button>
	<script>
		function vibrate() {
			if ("vibrate" in navigator) {
				navigator.vibrate(1000); // 1秒钟的震动
			} else {
				alert("Vibration API not supported in this browser.");
			}
		}
	</script>
</body>
</html>
```

这个例子中，当用户点击"Vibrate"按钮时，浏览器会尝试通过Web Vibration API来触发设备的震动功能。如果设备支持Web Vibration API，则会进行1秒钟的震动，否则会弹出一个警告框提示用户该功能不被支持。