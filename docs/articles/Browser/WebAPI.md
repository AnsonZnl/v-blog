# 学会这几个WebAPI

随着浏览器的日益壮大，浏览器自带的功能也随着增多，在Web开发过程中，我们经常会使用一些 Web API。

本篇文章主要选取了一些有趣且有用的 Web API 进行介绍并且都做了一个简单的例子。


- [Broadcast Channel API](#Broadcast-Channel-API)
- [Fullscreen API](#Fullscreen-API)

<a id="Broadcast-Channel-API"></a>

## Broadcast Channel API

下面是一个使用 Broadcast Channel API 实现简单的跨窗口通信的例子：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Broadcast Channel API Example</title>
  </head>
  <body>
    <div id="message"></div>
    <input type="text" id="input-message">
    <button onclick="sendMessage()">Send Message</button>

    <script>
      const channel = new BroadcastChannel('my-channel'); // 创建一个广播通道对象

      function sendMessage() {
        const inputMessage = document.getElementById('input-message');
        const message = inputMessage.value;
        channel.postMessage(message); // 将消息发送到广播通道中
        inputMessage.value = ''; // 清空输入框内容
      }

      channel.onmessage = (event) => {
        const message = event.data;
        const messageDiv = document.getElementById('message');
        messageDiv.innerHTML = message;
      }
    </script>
  </body>
</html>
```

上面的例子展示了如何使用 Broadcast Channel API 实现在两个窗口之间进行文本消息的双向通信。

在 HTML 中，我们定义了一个输入框和一个按钮，用于输入和发送消息。我们还定义了一个 `div` 元素，用于展示接收到的消息。

在 JavaScript 中，我们创建了一个名为 `my-channel` 的广播通道对象，并定义了一个 `sendMessage` 函数，该函数将输入框中的文本消息发送到广播通道中。

同时，我们在 `channel` 对象上通过 `onmessage` 方法监听广播通道上的消息，一旦有消息发送到该通道，就会触发该方法，在该方法中将接收到的消息展示在 `div` 元素中。

需要注意的是，广播通道的名字需要保持一致，才能实现不同窗口之间的通信。

<a id="Fullscreen-API"></a>

## Fullscreen API

Fullscreen API 用于在 Web 应用程序中开启全屏模式，使用它就可以在全屏模式下查看页面/元素。在安卓手机中，它会溢出浏览器窗口和安卓顶部的状态栏（显示网络状态、电池状态等的地方）。

下面是一个 Fullscreen API 的例子：

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Fullscreen API Example</title>
  </head>
  <body>
    <div id="my-video">
      <video src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" controls></video>
    </div>
    <button onclick="toggleFullscreen()">Fullscreen</button>
    
    <script>
      var videoDiv = document.getElementById('my-video');
      var video = videoDiv.querySelector('video');
      
      function toggleFullscreen() {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          videoDiv.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
        }
      }
    </script>
  </body>
</html>
```

上面的例子展示了如何通过 Fullscreen API 实现一个视频全屏播放的功能。

在 HTML 中，我们定义了一个视频播放器，使用 `controls` 属性添加了播放器的控制栏。同时，我们也定义了一个按钮，点击该按钮可以全屏播放视频。

在 JavaScript 中，我们首先通过 `getElementById` 获取到视频容器，然后通过 `querySelector` 获取到视频元素本身。接着，定义了一个 `toggleFullscreen` 函数来监听按钮的点击事件，并根据当前全屏状态调用 `requestFullscreen` 或 `exitFullscreen` 来切换全屏状态。

需要注意的是，`requestFullscreen` 方法可能会被浏览器阻止，例如因为用户未授权。因此在实际使用中，我们需要使用 `catch` 方法来捕获 `requestFullscreen` 方法的调用错误信息。


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

## Web Performance API 
以下是一个使用 Web Performance API 的例子：

``` js
// 测量页面加载时间
const startTime = window.performance.now();

window.addEventListener('load', () => {
  const loadTime = window.performance.now() - startTime;
  console.log(`页面加载时间为：${loadTime} 毫秒`);
});

// 测量网络时间
const resourceUrl = 'https://example.com/resource';

fetch(resourceUrl)
  .then(response => {
    const fetchTime = window.performance.now() - startTime;
    console.log(`请求时间为：${fetchTime} 毫秒`);

    // 获取网络时间信息
    const entry = performance.getEntriesByName(resourceUrl)[0];
    const start = entry.fetchStart;
    const end = entry.responseEnd;

    console.log(`DNS 查询时间为：${entry.domainLookupEnd - entry.domainLookupStart} 毫秒`);
    console.log(`TCP 握手时间为：${entry.connectEnd - entry.connectStart} 毫秒`);
    console.log(`TLS 握手时间为：${entry.secureConnectionStart ? entry.connectEnd - entry.secureConnectionStart : 'N/A'} 毫秒`);
    console.log(`请求时间为：${entry.responseStart - entry.requestStart} 毫秒`);
    console.log(`响应时间为：${entry.responseEnd - entry.responseStart} 毫秒`);
    console.log(`传输大小为：${entry.transferSize} 字节`);
  });

```

在这个例子中，我们使用了 `Web Performance API `提供的 `performance` 对象来测量页面加载时间和使用 `fetch()` 方法获取资源的网络时间。我们还使用了 `getEntriesByName()` 方法来检索资源的网络时间信息。

## Geolocation API
以下是一个使用 Geolocation API 获取用户当前位置信息的示例代码：
``` js
// 检查浏览器是否支持 Geolocation API
if ('geolocation' in navigator) {
  // 获取用户当前位置信息
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`您的纬度为：${latitude}，经度为：${longitude}`);
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log('用户拒绝了位置请求');
          break;
        case error.POSITION_UNAVAILABLE:
          console.log('无法获取位置信息');
          break;
        case error.TIMEOUT:
          console.log('请求超时');
          break;
        default:
          console.log('发生未知错误');
      }
    }
  );
} else {
  console.log('您的浏览器不支持 Geolocation API');
}

```

在这个例子中，我们首先检查浏览器是否支持 `Geolocation API`。

如果支持，则调用 `navigator.geolocation.getCurrentPosition()` 方法获取用户当前位置信息。该方法接受两个回调函数作为参数：一个成功的回调函数和一个失败的回调函数。

如果获取位置信息成功，则成功的回调函数将被调用，并传递包含位置信息的对象作为参数。否则将调用失败的回调函数，并传递一个描述错误的对象作为参数。

## **参考**

1. [web-api-examples](https://web-api-examples.github.io/)
2. [MDN-Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
3. [12 Rarely Used JavaScript Web APIs that Will Boost Your Website to THE MOON](https://dev.to/eludadev/12-rarely-used-javascript-web-apis-that-will-take-your-website-to-the-next-level-4lf1#making-your-website-a-fullscreen-experience)
4. [7 JavaScript Web APIs to build Futuristic Websites you didn't know](https://dev.to/ruppysuppy/7-javascript-web-apis-to-build-futuristic-websites-you-didnt-know-38bc)
5. [你（可能）不知道的 web api](https://juejin.cn/post/6844903741024370701#heading-1)
