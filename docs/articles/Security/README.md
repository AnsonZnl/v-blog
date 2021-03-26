# 前端安全

## XSS(Cross Site Scripting)跨站脚本攻击

> 跨网站指令码（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程式的安全漏洞攻击，是代码注入的一种。它允许恶意使用者将程式码注入到网页上，其他使用者在观看网页时就会受到影响。这类攻击通常包含了 HTML 以及使用者端脚本语言。

XSS 分为三种：反射型，存储型和 DOM-based

### 攻击方式

XSS 通过修改 HTML 节点或者执行 JS 代码来攻击网站。

例如：某个搜索功能，通过 URL 获取某些参数

```html
<!-- http://www.domain.com?name=<script>alert(1)</script> -->
<div>{{name}}</div>
```

当执行搜素操作时，URL 中的 JS 代码会被执行，这样，页面中就会凭空多出了一弹框。

那如果是获取 cookie 然后发给黑客服务器呢？是不是就有很大的安全隐患了。

根据攻击来源，XSS 攻击可以分为：

- 存储型
- 反射型
- DOM 型

#### 储存型

储存型 XSS 的攻击步骤：

1. 攻击者将恶意代码提交到目标网站的数据库中
2. 当用户打开目标网站时，网站服务端将恶意代码取出后，然后返回给浏览器。
3. 浏览器执行恶意代码

这种攻击常见于保存用户数据的网站，如论坛发帖，商品评论等。

#### 反射型

反射型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 URL 请求，其中包含恶意代码。
2. 用户打开带有恶意代码的 URL，浏览器执行恶意代码。

反射型和储存型的区别：

1. 储存型 XSS 的恶意代码放在数据里，反射型 XSS 的恶意代码放在 URL 里。
2. 反射型 XSS 漏洞常见于 URL 传递参数的功能，如搜索，跳转
3. 储存型 XSS 常见于通过用户提交的内容，如论坛留言，评论等

#### DOM 型 XSS

DOM 型 XSS 的攻击步骤:

1. 攻击者构造出特殊的 URL，其中包含恶意代码
2. 用户打开带有恶意代码的 URL
3. 用户浏览器接受到响应后解析执行，前端 JavaScript 去除 URL 中的恶意代码并执行
4. 恶意代码窃取用户数据并且发送到攻击者的网站，或者冒充用户行为完成恶意操作。

DOM 型 XSS 与前两种 XSS 的区别：

DOM 型 XSS 攻击中，取出和执行恶意代码都由浏览器端完成，是 JavaScript 自身的安全漏铜，而其他两种 XSS 都是服务端的漏铜。

### 防御方式

通过前面的介绍，看到 XSS 攻击的两大因素：

1. 攻击者提交恶意代码
2. 浏览器执行恶意代码

针对第一个要素，在用户输入的内容时进行过滤掉恶意代码。

针对第二个，则应该是在后端写入数据库时，对数据进行过滤。

前端处理的方式可以使用字符串替换的方法，例如：

```js
function escape(str) {
  str = str.replace(/&/g, "&amp;");
  str = str.replace(/</g, "&lt;");
  str = str.replace(/>/g, "&gt;");
  str = str.replace(/"/g, "&quto;");
  str = str.replace(/'/g, "&#39;");
  str = str.replace(/`/g, "&#96;");
  str = str.replace(/\//g, "&#x2F;");
  return str;
}
```

上面的函数就可以将恶意代码进行转译。

也可以借助[js-xss](https://github.com/leizongmin/js-xss)来实现。

通过以上我们可以得出，用户输入不可信，所以使用一些 API 时需要各位的注意，比如.innerHTML、outerHTML、document.write，还有一些框架的 API，比如 Vue 的 v-html 等，使用时都需要谨慎一些。

## CSRF(Cross-site request forgery)跨站请求伪造

> CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求

简单来说，CSRF 就是利用用户的登录态发起恶意请求。

### 攻击方式

CSRF 攻击流程：

1. 受害者登录 a.com，并保留了登录凭证（cookie）’
2. 攻击者引诱受害者访问 b.com
3. b.com 向 a.com 发送一个请求：a.com?act=xx，会默认携带 a.com 的 cookie
4. a.com 收到请求后，会执行相应的操作。
5. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作。

CSRF 可以通过 get 请求，即通过访问 img 的页面，浏览器自动访问目标地址，发送请求。

## SQL 注入攻击
