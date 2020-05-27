---
title: jQuery.Ajax调用的接口
date: 2018-5-14 17:20:14
tags: ["jQuery","JSON"]
---
### jQuery-json调用接口

回顾一次面试经历，有一次面试人家问我会不会使用后端的接口（API）
因为当时学的都是写的静态页面 所以自然不知了，虽然那次面试很糟糕，但是收获也是很多的。
面试官后来告诉我一个网站就是这个网站：[showAPI](https://www.showapi.com/);
上面有很多的免费的API接口可以试着调用 ，很感谢那位面试我的大佬。
今天有时间就顺便试了一下，调用了一个API “历史上的今天”
使用的jQuery解析的发送的ajax请求，然后他的服务器会返回一个json数据，使用  `$.each `在循环解析到页面中，虽然很小的一个小练习，但是对前后端数据交互有个更深的理解，
可能对于大家来说还是挺lou的 ，但对我自己来说确实很大的进步了。不喜勿喷。

先放预览地址吧：[历史上的今天](http://zhangningle.gitee.io/javascript-demo/%E5%8E%86%E5%8F%B2%E4%B8%8A%E7%9A%84%E4%BB%8A%E5%A4%A9.html)

代码：
```

 function Jdeta() {
            //alert(typeof dataNum)
            $.ajax({
                type: 'post',
                url: 'http://route.showapi.com/119-42',
                dataType: 'json',
                data: {
                    "showapi_timestamp": formatterDateTime(),
                    "showapi_appid": '61967', //这里需要改成自己的appid
                    "showapi_sign": 'efc7d95dafb14c9dabf3867072d12b28',  //这里需要改成自己的应用的密钥secret
                    "date": ""
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!");
                },
                success: function (result) {
                    console.log(result) //console变量在ie低版本下不能用
                    //alert(result.showapi_res_code + "调用成功")
                    var title = document.getElementById("title");
                    title.innerHTML = result.showapi_res_body.list[0].title;
                    var img = document.getElementById("img");
                    img.src = result.showapi_res_body.list[0].img;
                    var day = document.getElementById("day");
                    day.innerHTML = result.showapi_res_body.list[0].day;
                    var month = document.getElementById("month");
                    month.innerHTML = result.showapi_res_body.list[0].month;
                    var year = document.getElementById("year");
                    year.innerHTML = result.showapi_res_body.list[0].year;
                    var json = eval(result.showapi_res_body.list); //数组     
                    var result = "";
                    $.each(json, function (index) {
                        //循环获取数据    
                        var title = json[index].title;
                        var year = json[index].year;
                        var month = json[index].month;
                        var day = json[index].day;
                        var img = json[index].img
                        result += "标题："+title +"<br/>时间："+ year + "年-" + month + "月-" + day + "日<br/><img src="+img+" alt/>"+"<br><br>";
                    });
                    $("#list").html('');
                    $("#list").html(result);
                }
            });

        }
```