## ios 微信浏览器视频自动播放问题解决方法【亲测有效】

播放自动视频的两个前提条件

- 设置自动播放 autoplay
- 设置静音 muted

有些限制必须有点击操作，这个看需求，如果实现不了进入页面自动播放可以考虑价格播放按钮，引导用户点击。

因为我的视频不需要显示控件，不需要全屏播放 这些就统统去掉了。

```html
<video
  src=""
  id="videoRef"
  autoplay
  muted
  x5-video-player-type="h5"
  webkit-playsinline="true"
  x-webkit-airplay="true"
  playsinline="true"
  x5-video-player-fullscreen="true"
></video>
```

```css
#videoRef video::-webkit-media-controls {
  display: none !important;
}
```

问题描述：由于浏览器限制，视频不能够自动播放，需要用户手势触发才可以。

解决方法：通过微信浏览器提供的`WeixinJSBridgeReady`做桥接后就可以绕过这一限制。

上面链接中的操作比较繁琐，在此给出简化版本（亲测可用）：

```js
function doPlay() {
  WeixinJSBridge.invoke("getNetworkType", {}, function (e) {
    var $video1 = $("#video1");
    var $video2 = $("#video2");
    $video1[0].play();
    $video2[0].play();
  });
}

if (window.WeixinJSBridge) {
  doPlay();
} else {
  document.addEventListener(
    "WeixinJSBridgeReady",
    function () {
      doPlay();
    },
    false
  );
}
```

需要注意的是，监听 WeixinJSBridgeReady 事件后，回调函数里需要调用一下 invoke，在 invoke 中操作视频才可以生效。

另外，页面不需要引入 jweixin-1.0.0.js，微信浏览器会自带 api。
