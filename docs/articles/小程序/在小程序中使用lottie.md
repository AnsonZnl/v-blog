
## 安装
在小程序的根目录下：
```
npm init -y # 初始化 package.json
npm install --save lottie-miniprogram
```
- 开启使用 npm 模块    
在微信开发工具右上角，打开**详情**勾选**使用npm模块**

- 生成 npm     
在微信开发者工具点击**工具**->**生成npm**

### 使用
wxml
``` html
<canvas id="canvas" type="2d"></canvas>
<button bindtap="click">点我预览动画</button>
```
js
```js
import lottie from 'lottie-miniprogram'//引入lottie npm包
Page({
  data: {
   
  },
  onLoad() {
    
  },
  onReady() {
    
  },
  click() {//按键点击事件
    wx.createSelectorQuery().select('#canvas').node(res => {
      const canvas = res.node
      const context = canvas.getContext('2d')
      canvas.width = 300//设置宽高，也可以放到wxml中的canvas标签的style中
      canvas.hight = 300
      lottie.setup(canvas)//要执行动画，必须调用setup,传入canvas对象
 
      lottie.loadAnimation({//微信小程序给的接口，调用就完事了，原理不太懂
        loop: true,//是否循环播放（选填）
        autoplay: true,//是否自动播放（选填）
        path:'https://cdn.你的域名.com/aaa.json',//lottie json包的网络链接，可以防止小程序的体积过大，要注意请求域名要添加到小程序的合法域名中
        rendererSettings:{
          context//es6语法：等同于context:context（必填）
        }       
      })
    }).exec()
  }
})
```


### 参考
- [微信小程序npm支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)
- [微信小程序使用lottie-CSDN](https://blog.csdn.net/Xiao_peng117/article/details/102693084)
- [lottie-miniprogram for github](https://github.com/wechat-miniprogram/lottie-miniprogram#readme)
- [阿里巴巴在线制作lottieJSON动画](https://design.alipay.com/emotion)