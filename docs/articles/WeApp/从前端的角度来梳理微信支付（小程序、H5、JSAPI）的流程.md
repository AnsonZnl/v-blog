# 从前端的角度来梳理微信支付（小程序、H5、JSAPI）的流程

因业务需要，开发微信支付功能，涉及三种支付方式：

- JSAPI 支付：微信内网页支付，需要开通微信服务号
- 小程序支付：在小程序中支付，需要开通小程序
- H5 支付：在手机浏览器（出微信内网爷）中网页支付

使用微信支付的前提必开通微信商户号，要使用到那种的支付方式要前需在商户平台开通（要审核）。

支付的钱最终都会到商户号里（一般由公司财务开通）。

开发微信支付的过程中大大小小坑还是踩了不少，终于做完了，整理下开发流程。

参考：

- [微信支付-接入指引](https://pay.weixin.qq.com/static/applyment_guide/applyment_index.shtml)
- [微信支付-开发文档](https://pay.weixin.qq.com/wiki/doc/api/index.html)

## 小程序支付

### 开发流程

1. 小程序端请求创建订单接口，后端统一下单获取 `orderId` 并返回
2. 小程序端获取通过[wx.login()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html)获取`code`
3. 小程序端拿这`code`和`orderId`请求后端接口，获取支付所需数据
4. 获取支付所需数据之后，小程序端调用[wx.requestPayment()](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html)接口，直接调用起支付页面
5. 判断是否支付成功后的逻辑

### 伪代码

```js
async function wxPay(goodId) {
  // 1. 创建订单 获取orderId
  let orderId = await ajax("POST", "/api/OrderProgram/CreateTheOrder", {
    goodId, // 商品id
  });
  // 2. 获得 code
  let code = await wxlogin(); // 基于pr封装的wx.login()方法
  // 3. 获取支付的数据
  let payData = await ajax("POST", "/api/OrderProgram/WxXcxPay", {
    orderId,
    code,
  });
  // 4. 发起支付
  let res = await payment(payData); // 基于pr封装的wx.requestPayment()方法
  // 5. 判断是否支付成功
  let payResult = res.errMsg;
  if (payResult == "requestPayment:ok") {
    console.log("支付成功");
  } else if (payResult == "requestPayment:fail cancel") {
    console.log("用户取消支付");
  } else {
    console.log("支付失败");
  }
}
```

### 注意事项

1. 申请微信小程序账号
   申请成功可拿到 AppID（小程序 id）和 AppSecret（小程序密钥）
   申请类型为企业性质，否则无法接入微信支付
2. 微信小程序认证
   通过认证的小程序才能接入微信支付和绑定商户平台
3. 申请商户平台账号
   需要第一步申请的 AppID
   申请成功可拿到 MchID（商户 id）和 MchKey（商户密钥）
4. 信小程序关联商户号
   微信和商户都认证成功后，在微信后台微信支付菜单中进行关联
5. 接入微信支付
   在微信后台微信支付菜单中进行接入

### 参考

- [小程序支付文档](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_3&index=1)
- [小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html)

## H5 支付

### 开发流程

1. 前端端请求创建订单接口，后端统一下单获取 `orderId` 并返回
2. 前端带着 `orderId` 请求支付接口，获得 `mweb_url`，
3. 然后跳转 `mweb_url` 会跳转微信自动调用微信支付
4. 支付后返回支付页，判断是否支付成功（需发送请求后端查询）
   4.1 刷新页面，获取最新的支付（订单）状态。
   4.2 设置一个的按钮"我已支付"，让用户点击自动查询状态。

### 伪代码

```js
async function wxH5Pay(goodId) {
  // 1. 创建订单 获取orderId
  let orderId = await ajax("POST", "/api/OrderProgram/CreateTheOrder", {
    goodId, // 商品id
  });
  // 2. 获取支付跳转的URL
  let mweb_url = await ajax("POST", "/api/OrderProgram/WxH5Pay", { orderId });
  // 3. 跳转URL去微信支付
  if (mweb_url) {
    location.href = mweb_url;
  } else {
    console.log("回调地址出错");
  }
  // 4. 支付后返回支付页，判断是否支付成功
  // 4.1 刷新页面，获取最新的订单(商品)状态。
  // 4.2 设置一个"我已支付"的按钮，让用户点击之后查询状态。
}
```

### 注意事项

- 在商户平台设置正确的支付域名
- 调试需要在线上，如果嫌麻烦可以使用内网穿透（Ngrok 或花生壳）
- 需对`redirect_url`进行`urlencode`处理
- H5 支付不能直接在微信客户端内调起，请在外部浏览器调起。

### 参考

- [微信支付-H5 支付-开发步骤](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_4)

## JSAPI 支付（微信内网页支付）

### 开发流程

- 商品页

1. 前端商品页创建订单，在后端统一下单后获取 `orderId`
2. 前端带着 `orderId` 跳转到支付页，

- 支付页

1. 获取 `code`
   1. 第一次进入页面，判断是否路径中有 `code`
   2. 没有 `code`，请求数据跳转授权页面，`code` 会通过回调地址一起返回回来
   3. 拿到 `code`，发送给后端，后端解析到 `openid`，保存好。
2. 点击确定支付按钮，触发 `wxPay()` 方法
   1. 发送 `orderId` 给后端，获取 `wxData`
   2. `wxData` 中包含 `wx.config` 和 `wx.chooseWXPay` 两个接口的数据。
   3. 先调用 `wx.config()`然后在调用 `wx.chooseWXPay()`，如果一切正常，支付页面就会弹出。
3. 支付状态通过后端去查询

### 伪代码

- 商品页

```js
// 1. 创建订单 获取orderId
let orderId = await ajax("POST", "/api/OrderProgram/CreateTheOrder", {
  goodId, // 商品id
});
// 2. 携带id 跳转到支付页
this.$router.push({ name: "wx_pay_page", params: { orderId: id } });
```

- 入口文件(`main.js`)

```js
// main.js 引入 js-sdk
import wx from "weixin-js-sdk";
```

- **支付页 HTML**

```html
<template>
  <div>
    <button @click="wxPay">点击支付</button>
  </div>
</template>
```

**支付页 JS**

```js
// Vue
data(){
    return {
        orderId: this.$route.params.orderId, // 订单id
        url: '',// 获取code的url
        wxData: null,// js-sdk接口所需的数据
    }
},
mounted(){
    // 判断是否有code
    this.getCode()
}
methods: {
    getCode() {
        var code = this.getUrlPram("code");
        if (code != null) {
            this.code = code;
            // 拿到 code 发给 后端
            this.sendCode(code);
        } else {
            // 去拿code
            this.getUrl();
        }
    },
    getUrl() {
        // 请求后端拿到url所需数据，然后跳转页面在通过回调地址返回，获取code.
        this.axios
            .post("/api/OrderProgram/GetOpenidAndAccessToken", {
                orderId: this.orderId,
            })
            .then((data) => {
                this.url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${data.appId}&redirect_uri=${data.redirect_uri}&response_type=${data.response_type}&scope=${data.scope}&state=${data.state}`;
                window.location.href = this.url;
            })
            .catch((err) => {
                console.log(err);
            });
    },
    sendCode(code) {
        // 发送code给后端 后端解析出openid
        this.axios
            .post("/api/OrderProgram/GetOpenidAndAccessTokenFromCode", {
                code: code,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    wxPay: async function() {
        // 发送orderid，获取wx.chooseWXPay和wx.config所需的参数
        this.wxData = await this.axios.post(
            "/api/OrderProgram/WxJSAPIPay",
            { orderId: this.orderId }
        );
        let wxConfigData = this.wxData.wxConfigData // 获取wx.chooseWXPay()所需数据
        let wxPayData = this.wxData.wxPayData;// 获取wx.config()所需数据
        this.$wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: wxConfigData.appId, // 必填，公众号的唯一标识
            timestamp: wxConfigData.timeStamp, // 必填，生成签名的时间戳
            nonceStr: wxConfigData.nonceStr, // 必填，生成签名的随机串
            signature: wxConfigData.paySign, // 必填，签名
            jsApiList: [
                "chooseWXPay",
            ],
        });
        // 执行支付
        this.$wx.chooseWXPay({
            timestamp: wxPayData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: wxPayData.nonceStr, // 支付签名随机串，不长于 32 位
            package: wxPayData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: wxPayData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: wxPayData.paySign, // 支付签名
            success: (res) => {
                this.$toast("支付成功");
            },
            fail: (err) => {
                this.$toast("支付失败");
            },
        });
    },
}
```

### 同时支持 H5 支付和 JSAPI 支付

```js
// 在创建订单之后，就判断环境使用哪种方法支付。
if (isWx()) {
  this.WXPay(orderId); // 带着orderId跳转到支付页逻辑
} else {
  this.H5Pay(orderId); // 执行上面H5支付中的创建订单之后的逻辑
}
// 判断是否是微信浏览器
function isWx() {
  let uAgent = navigator.userAgent.toLowerCase();
  reutrn(/micromessenger/.test(uAgent)) ? true : false;
}
```

### 注意事项

- 开通微信商户号 - 设置支付目录（如果是 Vue 这类 SPA 页面，到根目录即可，也就是#号之前的地址）
  ![wxpay1.png](https://i.loli.net/2020/11/19/4XFPVlYrHLk8g7p.png)
- 开通微信公众号（服务号） - 设置安全域名、设置授权域名
  ![wxpay8.png](https://i.loli.net/2020/11/19/m5IhT3RfBQkg9MY.png)
- 收集参数：appId 和 AppSecret

- 添加 Web 开发工具开发者（需要开发者同时开发者关注开发的微信公众号和微信公众账号安全助手）[参考文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Web_Developer_Tools.html)
  ![wxpay3.png](https://i.loli.net/2020/11/19/zTOxPq7QD9sgjhr.png)

* 设置回调域名（例如：`www.xx.com/pay`，最后获取的 code 会拼在此回调地址后返回，返回后如`www.xx.com/pay?code=xxxx`）[参考 1](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
  ![wxpay5.png](https://i.loli.net/2020/11/19/H8lFo4hEIwMU3ku.png)

* 获取 code

  - 参考[获取 code 文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

  - 在微信客户端网页打开授权地址，跳转之后，在返回的回调地址之后拿到 `code`：

```
https://open.weixin.qq.com/connect/oauth2/authorize
?appid=你的appid
&redirect_uri=你的回调地址（拿到code后返回）
&response_type=code（返回类型，默认code）
&scope=snsapi_base（授权范围，静默授权拿到openid）
&state=STATE(自定义状态，非必填)
#wechat_redirect（重定向使用必须携带）
```

`redirect_uri`参数要和你在微信公众号里设置的回调域名一致（例如：`www.xx.com/pay`）,需要注意的是这 url 需要`urlEncode`。

请求这个地址之后，`code` 会以你设置的`redirect_uri`地址里的参数带回来，拿到之后传给后端就行了。

- 前端引入 js-skd

  - 使用`script`引入[js-sdk](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
  - 下载使用 `npm` 包[weixin-js-sdk](https://www.npmjs.com/package/weixin-js-sdk)

- 获取 `wx.config` 的参数
  ![wxpay6.png](https://i.loli.net/2020/11/19/3cnG8dCalupfT7A.png)
- 获取 `wx.chooseWXPay` 所需的参数
  ![wxpay7.png](https://i.loli.net/2020/11/19/CcrgNvwx8lbjq7B.png)

### 参考

- [微信支付-JSAPI](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_1)
- [微信公众号-网页授权](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
- [JS-SDK 开发文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
- [小程序、H5 登录授权、分享、支付流程](https://blog.csdn.net/weixin_40814356/article/details/103948635)
- [wx.config 接口注入时`signature`参数需要注意，坑比较多](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#62)
- [我的 JS-SDK 使用总结](https://shimo.im/docs/QHHQ6Cr66Wtx8g9Y)

## 总结

整个流程走下来，给我的体验是：小程序支付最方面（因为配置少），其次是 H5，JSAPI 支付最麻烦（文章一多半都在写它）

在微信支付功能开发过程中，其实最麻烦的不是开发流程，而是他的各种配置和授权流程，为了拿到所需的参数而来回折腾。

开发过程中的一些参数是经常用到的，如 appid、openid、orderId

支付流程大径相同，先获取到用户的 openid，知道你是谁，然后统一下单拿到 orderId 再去处理不同平台的支付方式

开发时候用到的相关文档，一定要**仔细**阅读二遍以上为止！！

遇到问题不要死刚，多百度多 Google，说不准你遇到的问题已经有无数的人遇到过并且已经有成熟的解决方案了。

前端和后端要多沟通，有什么问题(难点)随时反馈，需要什么参数好好说，遇到观点不一致的时候千万要注意控制住情绪，切莫撕逼（.——.）。

因为本人水平有限，对后端流程懂得不多，只能以前端的角度来梳理整个支付流程。

以上，希望对你有所帮助。
