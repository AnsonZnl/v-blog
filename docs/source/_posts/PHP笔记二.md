---
title: php笔记二
date: 2017-12-8 8:34:03
tags: "php"
---
#### PHP 全局变量 - 超全局变量
**
PHP 中的许多预定义变量都是“超全局的”，这意味着它们在一个脚本的全部作用域中都可用。在函数或方法中无需执行 global $variable; 就可以访问它们。
**
##### 超全局变量：
```
$GLOBALS
$_SERVER
$_REQUEST
$_POST
$_GET
$_FILES
$_ENV
$_COOKIE
$_SESSION
```
##### $GLOBALS['var'] ：
$GLOBALS['var'] 是外部的全局变量$var本身。
```
$v=500;
function g(){
    $GLOBALS["c"]=$GLOBALS["v"]+$GLOBALS["v"];
    echo $GLOBALS["c"];
}
g();//1000
```
##### $_SERVER:
 $_SERVER超级全局变量包含由web服务器创建的信息，它提供了服务器和客户配置及当前请求环境的有关信息。根据服务器不同，$_SERVER中的变量值和变量个数会有差别，
 不过一般都可以找到CGI1.1规范中定义的变量
以下结果默认在 
```
http://localhost/aaa/index.php?p=222&q=333 
```
下执行
结果：
```
$_SERVER['QUERY_STRING'] = "p=222&q=333";
$_SERVER['REQUEST_URI']  = "/aaa/index.php?p=222&q=333";
$_SERVER['SCRIPT_NAME']  = "/aaa/index.php";
$_SERVER['PHP_SELF']     = "/aaa/index.php";

由实例可知：
$_SERVER["QUERY_STRING"]  获取查询 语句，实例中可知，获取的是?后面的值
$_SERVER["REQUEST_URI"]   获取 http://localhost 后面的值，包括/
$_SERVER["SCRIPT_NAME"]   获取当前脚本的路径，如：index.php
$_SERVER["PHP_SELF"]      当前正在执行脚本的文件名
```
//http://www.runoob.com/php/php-post.html  参考界面
##### $_GET:
预定义的 $_GET 变量用于收集来自 method="get" 的表单中的值。
从带有 GET 方法的表单发送的信息，对任何人都是可见的（会显示在浏览器的地址栏），并且对发送信息的量也有限制。
form.html 文件代码如下：
```
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>

<form action="welcome.php" method="get">
名字: <input type="text" name="fname">
年龄: <input type="text" name="age">
<input type="submit" value="提交">
</form>

</body>
</html>
```
当用户点击 "Submit" 按钮时，发送到服务器的 URL 如下所示：
```
http://www.runoob.com/welcome.php?fname=Runoob&amp;age=3
```
"welcome.php" 文件现在可以通过 $_GET 变量来收集表单数据了（请注意，表单域的名称会自动成为 $_GET 数组中的键）：
```
欢迎 <?php echo $_GET["fname"]; ?>!<br>
你的年龄是 <?php echo $_GET["age"]; ?>  岁。
```
如图：
![](http://www.runoob.com/wp-content/uploads/2013/08/form2.gif)
**何时使用 method="get"？**
- 在 HTML 表单中使用 method="get" 时，所有的变量名和值都会显示在 URL 中。
- 注释：所以在发送密码或其他敏感信息时，不应该使用这个方法！
- 然而，正因为变量显示在 URL 中，因此可以在收藏夹中收藏该页面。在某些情况下，这是很有用的。
- 注释：HTTP GET 方法不适合大型的变量值。它的值是不能超过 2000 个字符的。

##### $_POST ：
预定义的 $_POST 变量用于收集来自 method="post" 的表单中的值。
从带有 POST 方法的表单发送的信息，对任何人都是不可见的（不会显示在浏览器的地址栏），并且对发送信息的量也没有限制。
注释：然而，默认情况下，POST 方法的发送信息的量最大值为 8 MB（可通过设置 php.ini 文件中的 post_max_size 进行更改）。
form.html 文件代码如下：
```
<html>
<head>
<meta charset="utf-8">
<title>菜鸟教程(runoob.com)</title>
</head>
<body>

<form action="welcome.php" method="post">
名字: <input type="text" name="fname">
年龄: <input type="text" name="age">
<input type="submit" value="提交">
</form>

</body>
</html>
```
当用户点击 "提交" 按钮时，URL 类似如下所示：
```
http://www.runoob.com/welcome.php
```
"welcome.php" 文件现在可以通过 $_POST 变量来收集表单数据了（请注意，表单域的名称会自动成为 $_POST 数组中的键）：
```
欢迎 <?php echo $_POST["fname"]; ?>!<br>
你的年龄是 <?php echo $_POST["age"]; ?>  岁。
```
如图：
![](http://www.runoob.com/wp-content/uploads/2013/08/form1.gif)
**何时使用 method="post"？**
- 从带有 POST 方法的表单发送的信息，对任何人都是不可见的，并且对发送信息的量也没有限制。
- 然而，由于变量不显示在 URL 中，所以无法把页面加入书签。

**PHP $_REQUEST 变量**
- 预定义的 $_REQUEST 变量包含了 $_GET、$_POST 和 $_COOKIE 的内容。
- $_REQUEST 变量可用来收集通过 GET 和 POST 方法发送的表单数据。

**你可以将 "welcome.php" 文件修改为如下代码，它可以接受 $_GET、$_POST等数据。**
```
欢迎 <?php echo $_REQUEST["fname"]; ?>!<br>
你的年龄是 <?php echo $_REQUEST["age"]; ?>  岁。
```