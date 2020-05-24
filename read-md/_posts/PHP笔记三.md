---
title: php笔记三
date: 2017-12-13 19:01:20
tags: ["php"]
---
### cookie和session 的关系和用法

具体来说cookie机制采用的是在客户端保持状态的方案，而session机制采用的是在服务器端保持状态的方案。
#### cookie
cookie 常用于识别用户。cookie 是服务器留在用户计算机中的小文件。每当相同的计算机通过浏览器请求页面时，它同时会发送 cookie。通过 PHP，您能够创建并取回 cookie 的值。
新建一个cookie：
```
setcookie(name, value, expire, path, domain);
//         名字  键值  过期时间  路径  域名
```
PHP 的 $_COOKIE 变量用于取回 cookie 的值。
在下面的例子中，我们取回了名为 "user" 的 cookie 的值，并把它显示在了页面上：
```
<?php
// Print a cookie
echo $_COOKIE["user"];

// A way to view all cookies
print_r($_COOKIE);
?>
```
在下面的例子中，我们使用 isset() 函数来确认是否已设置了 cookie：
```
<html>
<body>

<?php
if (isset($_COOKIE["user"]))
  echo "Welcome " . $_COOKIE["user"] . "!<br />";
else
  echo "Welcome guest!<br />";
?>

</body>
</html>
```
- cookie中键值只能为字符串
- 序列化serialize($); 成字符串
- 反序列化unserialize($); 成数组

如何删除 cookie？
当删除 cookie 时，您应当使过期日期变更为过去的时间点。
删除的例子：
```
<?php 
// set the expiration date to one hour ago
setcookie("user", "", time()-3600);
?>
```

#### session
PHP session 变量用于存储有关用户会话的信息，或更改用户会话的设置。Session 变量保存的信息是单一用户的，并且可供应用程序中的所有页面使用。
PHP Session 变量
当您运行一个应用程序时，您会打开它，做些更改，然后关闭它。这很像一次会话。计算机清楚你是谁。它知道你何时启动应用程序，并在何时终止。但是在因特网上，存在一个问题：服务器不知道你是谁以及你做什么，这是由于 HTTP 地址不能维持状态。
通过在服务器上存储用户信息以便随后使用，PHP session 解决了这个问题（比如用户名称、购买商品等）。不过，会话信息是临时的，在用户离开网站后将被删除。如果您需要永久储存信息，可以把数据存储在数据库中。
Session 的工作机制是：为每个访问者创建一个唯一的 id (UID)，并基于这个 UID 来存储变量。UID 存储在 cookie 中，亦或通过 URL 进行传导。
开始使用session前，首先要开启session：在页面最开始时加上session_start();
存储 Session 变量
存储和取回 session 变量的正确方法是使用 PHP $_SESSION 变量：
```
<?php
session_start();
// store session data
$_SESSION['views']=1;
?>

<html>
<body>

<?php
//retrieve session data
echo "Pageviews=". $_SESSION['views'];
?>
//输出 Pageviews=1
</body>
</html>
```
session的垃圾回收机制
找到服务器里的配置文件php-ini
```
//修改 session.auto 0（手动启动）1（自动启动）修改后保存重启服务器
查看session的保存地址 session.save
session.gc_probability=1
session.gc_divisor=1000
//他有1/1000分支以的被回收
session。gc_maxlifetime=1400
//最大过期时间
```
- 不同浏览器访问一个网站 会产生不同的session文件
- 如果有则找到session文件 没有则创建一个新的session文件






