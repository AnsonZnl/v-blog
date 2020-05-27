---
title: phpGD验证码二
date: 2018-1-9 15:18:07
tags: ["php"]
---
### php做的验证码二
#### 把验证码添加到登录页面中，
因为学了ajax，所以我直接用ajax做的登录验证码的刷新
```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>登录验证</title>
</head>
<body>
<form action="action.php" method="post">
    用户名：<input name="username" id="username"><br>
    密&nbsp;码：<input name="password" id="password"><br>
    <img id="ImgSrc" src="VerificationCode.php" alt="">
    <a href="javascript:void(0);" onclick="getCode()">看不清</a>
    <br>
    验证码：<input name="code" id="code" onkeyup="checkCode()">
    <br>
    <div id="codeSpan"></div>
    <br>
    <button type="button" onclick="checkForm()">提交</button>
</form>

<script>

    //验证用户密码
    function checkForm() {
        //判断用户名密码是否为空 判断是否符合验证
        var username=document.querySelector("#username");
        var password=document.querySelector("#password");
        var form=document.querySelector("form");
        if(username.value!==""&&password.value!==""){
            form.submit();
            return true;
        }else {
            alert("用户名为空");
            return false
        }
    }
    //切换验证码
    function getCode() {
        imgSrc=document.getElementById("ImgSrc");
        imgSrc.src="VerificationCode.php";
        var codeSpan=document.getElementById("codeSpan");
        var code=document.getElementById("code");
        code.value='';
        codeSpan.innerHTML='';
    }
    //验证验证码
    function checkCode() {
        var code=document.querySelector("#code");
        var xmlhttp;
        if (window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        }else{
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function () {
            if (xmlhttp.readyState==4&&xmlhttp.status==200){
                var codeSpan=document.querySelector("#codeSpan");
                    codeSpan.innerHTML = xmlhttp.responseText;
            }
        };
        xmlhttp.open("POST","action.php",true);
        // xmlhttp.setRequestHeader("Content-type","appliction/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("code="+code.value);
    }
</script>
</body>
</html>
```
最后输出的是：
![](http://p0bnwspy9.bkt.clouddn.com/phpGD3.png)
输出后如图：
![](http://p0bnwspy9.bkt.clouddn.com/phpGD4.png)
#### 封装验证码
把自己的写的一个验证码封装起来，下次方便重复的利用，也顺便复习一下面向对象的思维
```
header("Content-Type: text/html;charset=utf-8");
class VerificarionCode{
    public $width;
    public $height;
    public $image;
    function __construct($widths,$heights)
    {
        //新建画布
        $this->image=imagecreatetruecolor($widths,$heights);
    }
    function imageColor($widths,$heights,$red,$green,$blue){
        //新建矩形白色
        $color=imagecolorallocate($this->image,$red,$green,$blue);
        //填充一下
        imagefilledrectangle($this->image,0,0,$widths,$heights,$color);
    }

    function getRandColor($image){
    //随机颜色
        return imagecolorallocate($image,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255));
    }

    function str($widths,$heights,$lengths){
        //快速创建字符串 $string='asadf132' array_merge 合并成一个数组 join字符串链接数组中的值  赋给string
        $string=join('',array_merge(range(0,9),range('a','z'),range('A','Z')));
    //echo $string;
    //得到字体宽度
        $textWidth=imagefontwidth(28);
        //得到字体高度
        $textHeight=imagefontheight(28);
        $length=$lengths;
        $strZ='';
        for($i=0;$i<$length;$i++){
            //随机每一位颜色
        //    $randColor=imagecolorallocate($image,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255));
            $randColor=imagecolorallocate($this->image,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255));
            $size=mt_rand(19,22);
            $angle=mt_rand(-15,15);
        //    $x=20+40*$i;
        //    $y=30;
            $x=($widths/$length)*$i+$textWidth;
            $y=mt_rand($heights/2,$heights-$textHeight);
            $fontFile='font/FZLTCXHJW.TTF';
            //打乱string这个字符串 然后随机取第一个字符串[0]
            $text=str_shuffle($string)[0];
            $strZ=$strZ.$text;
            imagettftext($this->image,$size,$angle,$x,$y,$randColor,$fontFile,$text);
        }
    }
    function Etpixel($widths,$heights,$EtpNum){
        //添加点，像素做干扰元素
        for($i=1;$i<=$EtpNum;$i++){
            //绘制像素
            $randColor=imagecolorallocate($this->image,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255));
            imagesetpixel($this->image,mt_rand(0,$widths),mt_rand(0,$heights),$randColor);
        }
    }
    function line($widths,$heights,$LineNum){
        //添加线段干扰
        for($i=1;$i<=$LineNum;$i++){
            //绘制线段
            imageline($this->image,mt_rand(0,$widths),mt_rand(0,$heights),mt_rand(0,$widths),mt_rand(0,$heights), $randColor=imagecolorallocate($this->image,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255)));
//                     起始位置          结束位置
        }
    }
    function imagepng(){
        //告诉浏览器以图像形式显示png
        header('content-type:image/png');
        //输出图像
        imagepng($this->image);
        //销毁资源
        imagedestroy($this->image);
    }
}
$demo1 =new VerificarionCode(180,60);
//画布
$demo1->imageColor(180,60,255,255,255);
//图像的数字
$demo1->str(180,60,4);
//干扰点
$demo1->Etpixel(180,60,60);
//干扰线段
$demo1->line(180,60,3);
//png输出
$demo1->imagepng();

```
