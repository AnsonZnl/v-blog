---
title: php笔记一
date: 2017-12-5 20:23:20
tags: ["php"]
---

#### 为什么学PHP？

** 学web前端也有一年多了，真是一入前端深四海，不入坑不知道坑有多深。这一年来从html、css 到javascript、
后来又学了jQuery、Bootstrap、Vue.js几个js框架。经过在老师的建议下学了php，而且自己想对这方面有更多的了解。
**

一、php是什么？
>PHP（外文名:PHP: Hypertext Preprocessor，中文名：“超文本预处理器”）是一种通用开源脚本语言。语法吸收了C语言、Java和Perl的特点，利于学习，使用广泛，主要适用于Web开发领域。PHP 独特的语法混合了C、Java、Perl以及PHP自创的语法。它可以比CGI或者Perl更快速地执行动态网页。用PHP做出的动态页面与其他的编程语言相比，PHP是将程序嵌入到HTML（标准通用标记语言下的一个应用）文档中去执行，执行效率比完全生成HTML标记的CGI要高许多；PHP还可以执行编译后代码，编译可以达到加密和优化代码运行，使代码运行更快。

载自百度知道

二、php能干什么？
>PHP 能做任何事。PHP 主要是用于服务端的脚本程序，因此您可以用 PHP 来完成任何其它的 CGI 程序能够完成的工作，例如收集表单数据，生成动态网页，或者发送/接收 Cookies。但 PHP 的功能远不局限于此。
PHP 脚本主要用于以下三个领域。
      服务端脚本。这是 PHP 最传统，也是最主要的目标领域。开展这项工作您需要具备以下三点：PHP 解析器（CGI 或者服务器模块）、WEB 服务器和 WEB 浏览器。您需要在运行 WEB 服务器时，安装并配置 PHP，然后，可以用 WEB 浏览器来访问 PHP 程序的输出，即浏览服务端的 PHP 页面。请查阅“安装”一章以获取更多信息。命令行脚本。您可以编写一段 PHP 脚本，并且不需要任何服务器或者浏览器来运行它。通过这种方式，您仅仅只需要 PHP 解析器来执行。这种用法对于依赖 cron（Unix 或者 Linux 环境）或者 Task Scheduler（Windows 环境）的日常运行的脚本来说是理想的选择。这些脚本也可以用来处理简单的文本。请参阅“PHP 的命令行模式”以获取更多信息。编写客户端的 GUI 应用程序。对于基于窗口式的应用程序来说，PHP 或许不是一种最好的语言，但是如果您非常精通 PHP，并且希望在您的客户端应用程序中使用 PHP 的一些高级特性，您可以利用 PHP-GTK 来编写这些程序。用这种方法，您还可以编写跨平台的应用程序。PHP-GTK 是 PHP 的一个扩展，在通常发布的 PHP 包中并不包含它。如果您对 PHP-GTK 感兴趣，请访问其网站以获取更多信息。

载自百度知道.
三、php笔记一
解决中文乱码一 在开头写：
```<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>```
PHP代码应该写在```<?php?>```
解决中文乱码二：
```header("Content-type: text/html; charset=utf-8");```
```echo```是输出的意思：
```echo "您好";```
定义变量使用```$```
如
```$y=10;
echo var_dump($z);
# 查看数据类型
```
#### 数据类型:
boolean （布尔型）
integer （整型）
float （浮点型, 也称作 double)
string （字符串）
两种复合类型：
array （数组）
object （对象）
最后是两种特殊类型：
resource　（资源）
NULL　（NULL）



不用传址:
```
echo "<br>";
function fun2($qq1){
    $qq1=20;
    echo "qq2这个值是".$qq1;
}
$qq2=20;
fun2($qq2);
```
用传址:
```
echo "<br>";
$qq2=30;
function fun3(&$qq1){
    $qq1=24;
    echo "qq2 改变为传址这个值是".$qq1;
};
fun3($qq2);
//qq1=qq2 都是30 然后 qq1改为24  qq2也是24 因为加了&qq1
echo "<br>";
echo "传址之后qq2的值是".$qq2;
//qq1=qq2 都是30
```
全局变量:
```
$m=50;
function fun4(){
    global $m;#局部改变使用全局变量
    $m=20;
}
echo "<br>";
fun4();
echo "<br>";
echo "$m";
echo "<br>";
```

局部变量:
```
$h=10;
function fun5(){
    $h=40;
    return $h;
}
$h=fun5();# 把局部转为全局
echo "$h";
```
静态变量:
 用static 定义 静态变量只存在于函数作用域内，也就是说，静态变量只存活在栈中。
一般的函数内变量在函数结束后会释放，比如局部变量，但是静态变量却不会。就是说，下次再调用这个函数的时候，该变量的值会保留下来。
```
function fun6(){
    static $k=0;
    $k++;
    echo "$k<br>";
}
fun6();
fun6();
fun6();
```
#### 字符串:
ucfirst  首字母大写:
```
$str1="hello World";
$str2=ucfirst($str1);
echo $str2;//Hello World
```
strtolower 全部转换小写:
```
echo "<br>";
$str3=strtolower($str2);
echo $str3;//hello world
```
strtoupper()  全部转换大写:
```
echo "<br>";
$str4=strtoupper($str3);
echo $str4;//HELLO WORLD
```
strrev 翻转字符串
```
echo "<br>";
$str5=strrev($str4);
echo $str5;//DLROW OLLEH
```
strlen  字符串长度：
```
echo "<br>";
$len=strlen($str3);
for($i=0;$i<$len;$i++){
    echo "<br>".$str3[$i];
}
```
// 字符串重复输出str_repeat(变量名字，重复次数):
```
$str6=str_repeat($str1,3);
echo "<br>";
echo $str6;
```
//补充字符串:
```
// str_pad(变量,"补充的长度","补充的内容",什么方式补充")
//  STR_PAD_BOTH 字符串两边补充
//  STR_PAD_LEFT 字符串左边补充
//  STR_PAD_RIGHT 字符串右边补充
$str7=str_pad($str1,"20","*",STR_PAD_BOTH);
echo "<br>";
echo $str7;
```
trim($)去除字符串的空白:
```
//trim($) 去除字符串两边的空白
//Ltrim($) 去掉左边的空白
//Rtrim($) 去掉右边的空白
$str8="  hello tald   ";
$str9=trim($str8);
echo "<br>";
echo $str9;
```
替换字符串中的字符:
```
//str_replace("把字符串中的...","替换成...",替换那个变量$..);
$str10 = str_replace("l","a",$str8);
echo "<br>";
echo $str10;
```
回车替换换成<br>  nl2br($...):
```
$str11="
111
222
333
";
$str12=nl2br($str11);
echo "<br>";
echo $str12;
```
html原样输出 htmlspecialchars:
```
$str13="<h1>你好，世界！<h1>";
$str14=htmlspecialchars($str13);
echo "<br>";
echo $str14;
```
#### 数组:
```
$arr1=array("kete","lucy","Tom");
echo $arr1[0];
for ($i=0;$i<count($arr1);$i++){
    echo $arr1[$i]."<br>";
    //lucy Tom kate
};
foreach 只用于数组 遍历数组
foreach($arr1 as $value){
    echo $value."<br>";
}
```
关联数组:
```
$arr2=array("0"=>"kate","4"=>"lucy","2"=>"Tom");
foreach($arr2 as $k=>$value){
    echo $k."对应的是".$value."<br>";
    //0对应的是kate
    //4对应的是lucy
    //2对应的是Tom
}
```
二维数组:
```
$arr=array($arr1,$arr2);
echo count($arr,1);//count 长度  不是1的话就是当前的长度 如果是1的话就递归的对数组计数  COUNT_RECURSIVE
//根据键名进行排序 ksort 升序 krsort 降序
krsort($arr2); //j降序
echo "<br>"; //
print_r($arr2);//输出方式1
foreach ($arr2 as $k=>$v){
    echo $k."对应的是".$v."<br>";
}//输出方式2
```

根据键值进行排序 asort升序 arsort 降序:
```
arsort($arr2);//降序
foreach($arr2 as $k=>$v){
    echo $k."对应".$v."<br>";//降序
}
```
range 键数组 ascii码排序:
```
//   range(low,high,step)
//范围函数 （ 数组最低值 ，数组最高值 ，元素之间的步进制 默认1）
$arr3=range("a","e");
print_r($arr3);
//Array ( [0] => a [1] => b [2] => c [3] => d [4] => e )

```
把数组链接成字符串：
```
$arr5=implode($arr1,"0");
//                用什么链接
echo "<br>";
echo $arr5;
```
//把字符串打散成数组:
```
$arr6=explode(" ","hello");
//        用什么分隔开    用什么
echo "<br>";
foreach($arr6 as $k=>$v){
    echo $v."<br>";
    //a c e g
}
```
数组里开头增加元素 (会改变原数组):
```
//array_unshift($..,"添加..")
//在数组开头添加一个元素 会改变原数组
array_unshift($arr1,"we");
foreach($arr1 as $k=>$v){
    echo "<br>";
    echo $v."在数组开头添加一个元素";
}
```
数组里结尾增加元素(会改变原数组) :
```
//网数组里增加元素 array_push($..,"添加..") 添加到数组最后一个元素
//在数组结尾添加一个元素 会改变原数组
array_push($arr1,"123");
print_r($arr1);
//Array ( [0] => we [1] => kete [2] => lucy [3] => Tom [4] => 123 )
foreach($arr1 as $k=>$v){
    echo "<br>";
    echo $v."<br>";
}
//we kete lucy Tom  123
```
删除数组中的元素(会改变原数组)：
```
//array_pop($..) 删除最后一个元素
array_pop($arr1);
foreach ($arr1 as $k=>$v){
    echo $v."<br>";
}
// we kete lucy  Tom
```
array_shift() 删除数组头部的元素(会改变原数组):
```
array_shift($arr1);
foreach ($arr1 as $k=>$v){
    echo "<br>";
    echo $v;
}
//kete lucy om  删除数组头部的元素
```
array_unique() 不允许有重复的元素出现 会自动删除重复元素 (不会改变原始数组)：
```
$arr4=array("1","2","1");
$arr5=array_unique($arr4);
echo "<br>";
foreach($arr5 as $k=>$v){
    echo "<br>".$v."删除数组中重复的元素";
}
//1删除数组中重复的元素
//2删除数组中重复的元素
```

自学php推荐[慕课](https://www.imooc.com/code/858)在线练习，边练边学，并且很多免费视频.