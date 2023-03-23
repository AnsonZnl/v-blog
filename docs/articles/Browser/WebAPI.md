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

## Online State

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

## Page Visibility API
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

## Battery API
以下是一个使用Web Battery API的简单示例：

``` html
<!DOCTYPE html>
<html>
<head>
	<title>Web Battery API Example</title>
</head>
<body>
	<h1>Web Battery API Example</h1>
	<div id="battery-status">
		<p>当前电量: <span id="battery-level"></span></p>
		<p>电池状态: <span id="battery-status"></span></p>
	</div>

	<script>
		// 获取电池信息
		navigator.getBattery().then(function(battery) {
			// 更新电量信息
			updateBatteryStatus(battery);

			// 监听电池信息变化
			battery.addEventListener('levelchange', function() {
				updateBatteryStatus(battery);
			});

			battery.addEventListener('chargingchange', function() {
				updateBatteryStatus(battery);
			});
		});

		// 更新电量信息
		function updateBatteryStatus(battery) {
			document.querySelector('#battery-level').textContent = battery.level * 100 + '%';
			document.querySelector('#battery-status').textContent = battery.charging ? '正在充电' : '未充电';
		}
	</script>
</body>
</html>

```
这个例子展示了如何使用Web Battery API来获取电池的状态信息，并在页面上显示当前电量和电池状态。

在这个例子中，我们使用了`navigator.getBattery()`方法来获取电池信息，并使用`battery.addEventListener()`方法来监听电池信息变化。最后，我们使用**updateBatteryStatus()**函数来更新电量信息并在页面上显示。

## Contact Picker API

下面提供一个Web联系人选择器API的示例。以下是使用JavaScript编写的一个基本示例：

HTML：

```html
<input type="text" id="contactPicker" placeholder="Select a contact">
```

JavaScript：

```js
// 获取联系人选择器元素
const contactPicker = document.getElementById("contactPicker");

// 添加点击事件监听器
contactPicker.addEventListener("click", async () => {
  // 请求访问用户的联系人
  const contacts = await navigator.contacts.select(["name", "email"]);

  // 如果用户选择了联系人，则更新输入框的值
  if (contacts.length > 0) {
    const contact = contacts[0];
    const name = contact.name[0];
    const email = contact.email[0].value;
    contactPicker.value = `${name} (${email})`;
  }
});
```

该示例使用了Web Contacts API，它允许您访问用户的联系人。在点击联系人选择器时，它将请求访问用户的联系人。

如果用户选择了联系人，则将联系人的名称和电子邮件地址添加到输入框中。

请注意，此API仅适用于支持它的浏览器，例如Chrome或Firefox。

## Web Share API
以下是一个简单的Web Share API例子：

``` js
// 获取分享按钮元素
const shareButton = document.querySelector('#share-button');

// 添加点击事件监听器
shareButton.addEventListener('click', async () => {
  try {
    // 检查浏览器是否支持Web Share API
    if (navigator.share) {
      // 调用Web Share API分享
      await navigator.share({
        title: '分享标题',
        text: '分享描述',
        url: '分享链接'
      });
    } else {
      // 如果不支持，显示提示信息
      alert('该浏览器不支持Web Share API');
    }
  } catch (error) {
    // 处理异常情况
    console.error('分享失败:', error);
  }
});
```

这个例子假设页面中有一个id为`share-button`的分享按钮元素。当用户点击该按钮时，代码会检查浏览器是否支持Web Share API，如果支持则调用该API进行分享，否则显示一个提示信息。

在`navigator.share`方法中，我们可以传递一个包含`title`、`text`和`url`等属性的对象，用于指定分享内容的标题、描述和链接。如果用户选择分享，系统会弹出一个分享对话框，让用户选择分享方式（例如通过社交媒体、电子邮件等方式分享）。如果用户取消分享，则`navigator.share`方法会返回一个Promise对象，其状态为rejected。我们可以通过捕获该Promise对象的异常来处理分享失败的情况。

## ImageCapture API


以下提供一个基本的Web ImageCapture API示例，如下所示：

HTML代码：

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Web ImageCapture API Demo</title>
  </head>
  <body>
    <h1>Web ImageCapture API Demo</h1>
    <video id="video" width="640" height="480" autoplay></video>
    <br>
    <button id="capture-btn">Capture Image</button>
    <br>
    <canvas id="canvas" width="640" height="480"></canvas>
    <br>
    <img id="captured-img">
  </body>
</html>
```

JavaScript代码：

```javascript
// 获取视频和按钮元素
const video = document.getElementById('video');
const captureBtn = document.getElementById('capture-btn');

// 获取画布和图像元素
const canvas = document.getElementById('canvas');
const img = document.getElementById('captured-img');

// 获取视频流
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(error => {
    console.log(error);
  });

// 设置ImageCapture
let imageCapture;
const track = video.srcObject.getVideoTracks()[0];
imageCapture = new ImageCapture(track);

// 添加事件监听器
captureBtn.addEventListener('click', () => {
  // 拍照
  imageCapture.takePhoto()
    .then(blob => {
      // 将照片显示在画布上
      const url = URL.createObjectURL(blob);
      canvas.getContext('2d').drawImage(img, 0, 0);
      
      // 将照片显示在图像元素中
      img.src = url;
    })
    .catch(error => {
      console.log(error);
    });
});
```

这个示例将显示一个视频元素和一个“Capture Image”按钮。当用户点击按钮时，它将使用ImageCapture API拍摄照片，并在画布和图像元素中显示照片。

请注意，此示例仅适用于支持MediaStreamTrack和ImageCapture API的浏览器。

## Selection API


下面是一个Web Selection API的例子，如下所示：

HTML代码：

``` html
<!DOCTYPE html>
<html>
<head>
	<title>Web Selection API Example</title>
	<style>
		.highlight {
			background-color: yellow;
		}
	</style>
</head>
<body>
	<h1>Web Selection API Example</h1>
	<p>Select text in the paragraph below to see the API in action.</p>
	<p id="demo">The Web Selection API allows you to retrieve and manipulate text selections made by the user.</p>
</body>
</html>
```

JavaScript代码（web-selection-api.js）：

``` js
// 获取文本节点
const demoEl = document.getElementById('demo');

// 监听文本节点的选择事件
demoEl.addEventListener('mouseup', handleSelection);

// 处理选择事件
function handleSelection() {
    // 获取用户选择的文本
    const selection = window.getSelection();
    const selectedText = selection.toString();
    // 如果选择的文本不为空
    if (selectedText) {
        // 创建一个新的高亮节点
        const highlightEl = document.createElement('span');
        highlightEl.classList.add('highlight');

        // 将高亮节点插入到选择范围中
        const range = selection.getRangeAt(0);
        range.surroundContents(highlightEl);

        // 取消选择
        selection.removeAllRanges();
    }
}
```

这个例子演示了如何使用Web Selection API来获取用户选择的文本，并将其高亮显示。

当用户在页面上选择文本时，会触发`mouseup`事件，然后调用`handleSelection`函数来处理选择事件。

在`handleSelection`函数中，我们首先使用`window.getSelection()`方法获取用户选择的文本，然后检查是否选择了文本。

如果选择了文本，我们创建一个新的`span`元素，并将其添加到选择范围中，然后使用`removeAllRanges()`方法取消选择。最后，我们使用CSS样式将高亮显示的文本突出显示。


## Srceen Capture API
``` html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Web Screen Capture API Example</title>
</head>
<body>
	<h1>Web Screen Capture API Example</h1>

	<button id="start-capture">Start Capture</button>
	<button id="stop-capture">Stop Capture</button>

	<canvas id="canvas" width="640" height="480"></canvas>

	<script>
		// 获取DOM元素
		const startCaptureBtn = document.getElementById('start-capture');
		const stopCaptureBtn = document.getElementById('stop-capture');
		const canvas = document.getElementById('canvas');

		// 获取媒体流（屏幕共享）并将其渲染到canvas中
		async function startCapture() {
			try {
				const mediaStream = await navigator.mediaDevices.getDisplayMedia();
				const context = canvas.getContext('2d');
				context.drawImage(video, 0, 0, canvas.width, canvas.height);
			} catch(err) {
				console.error("Error: " + err);
			}
		}

		// 停止捕获并停止媒体流
		function stopCapture() {
			const tracks = mediaStream.getTracks();
			tracks.forEach(track => track.stop());
		}

		// 注册按钮单击事件
		startCaptureBtn.addEventListener('click', startCapture);
		stopCaptureBtn.addEventListener('click', stopCapture);
	</script>
</body>
</html>
```

这个例子中，页面上有两个按钮，一个用于开始捕获屏幕，另一个用于停止捕获。捕获的内容被呈现在一个画布上。在 `startCapture()` 函数中，我们使用 `navigator.mediaDevices.getDisplayMedia()` 方法获取屏幕共享的媒体流，并将其渲染到canvas上。在 `stopCapture()` 函数中，我们停止所有媒体流的所有轨道，以结束捕获过程。

## Intersection Observer API
以下是一个示例，演示了如何使用 Intersection Observer API 在元素进入视口时进行检测：
``` html
<!DOCTYPE html>
<html>
  <head>
    <title>Intersection Observer Example</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background-color: green;
        margin-bottom: 50px;
      }
      .visible {
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>

    <script>
      const boxes = document.querySelectorAll('.box');

      const options = {
        rootMargin: '0px',
        threshold: 0.5
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      }, options);

      boxes.forEach(box => {
        observer.observe(box);
      });
    </script>
  </body>
</html>

```

在这个示例中，我们首先选择所有具有“box”类的元素。然后，我们创建一个带有0像素的rootMargin和0.5的阈值的IntersectionObserver实例。这意味着当元素的50％位于视口内时，它将被视为可见。

然后，我们循环遍历每个盒子元素，并在我们的观察者实例上调用observe方法，将盒子元素作为参数传递。

最后，在IntersectionObserver实例的回调函数中，我们检查每个条目是否与视口相交。如果是，则将“visible”类添加到条目的目标元素中，否则将其删除。

