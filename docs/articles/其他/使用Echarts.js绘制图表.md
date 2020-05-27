---
title: 使用Echarts.js绘制图表
date: 2018-6-30 20:45:23
tags: ["Echarts.js"]
---
**Echarts.js是基于canvas 图画，可视化数据工具。**
## Echarts官方案例
官网下载[Echarts](http://echarts.baidu.com/)
 然后引入官网下载Echarts.js
```
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <title>ECharts 入门示例--柱状图</title>
    <script src="../js/echarts.js"></script>
  </head>
  <body>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
   <div id="main" style="width: 600px;height:400px;">

   </div>

   <script type="text/javascript">
       // 基于准备好的dom，初始化echarts实例
       var myChart = echarts.init(document.getElementById('main'));

       // 指定图表的配置项和数据
       var option = {
           title: {
               text: 'ECharts 入门示例'
               //标题
           },
		   //工具箱
           tooltip: {
		       show: true,
			   feature:{
			       saveAsImage:{
				       show: true
				   }
			   }
		   },
		   //图例
           legend: {
               data:['销量']
           },
           //x轴
           xAxis: {
               data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
           },
           //Y轴
           yAxis: {},
		   //数据
           series: [{
               name: '销量',
               type: 'bar',
               data: [5, 20, 36, 10, 10, 20]
           }]
       };

       // 使用刚指定的配置项和数据显示图表。
       myChart.setOption(option);
</script>
  </body>
</html>


```
如图：![](http://p0bnwspy9.bkt.clouddn.com/Y%29XNBRN8%5DD%25@1W78XTXFA25.png)


更多的配置可以看官方的[配置项手册](http://echarts.baidu.com/option.html#title)，每一项都有很详细的说明。

## 异步读取数据 填充图表
正常来说我的图表的数据都是异步加载的 不会都是写死的 按照教程的异步加载 我的浏览器是报一个错误 大概意思就是访问的数据应该是以``http: ``开头的 不然读取不到
需要开启一个虚拟的服务器才可以读取本地的json数据 我是用node开启了一个本地服务器。
参考：https://www.cnblogs.com/leoxuan/p/6513591.html
本地创建了dataj.json 文件 用于储存数据,然后异步请求。
因为使用jquery的ajax，所以引入了一个jquery。
cnd使用的[BootCND](http://www.bootcdn.cn/) 非常好用。
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ECharts ajax加载</title>
    <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
    <script src="https://cdn.bootcss.com/echarts/4.1.0.rc2/echarts-en.common.js"></script>
  </head>
  <body>

    <div id="main" style="width:600px;height:400px;">

    </div>
    若在Chrome浏览器下 想要访问本地的data.json文件必须开起一个本地的虚拟服务器以http开头
    <br>
    <a href="https://www.cnblogs.com/leoxuan/p/6513591.html">原文博客地址：https://www.cnblogs.com/leoxuan/p/6513591.html</a>
    <script>
    var myChart = echarts.init(document.getElementById('main'));
// 显示标题，图例和空的坐标轴
myChart.setOption({
    title: {
        text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {
        data:['第一年销量','第二年销量']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: '第一年销量',
        type: 'bar',
        data: []
    },
      {
        name: '第二年销量',
        type: 'bar',
        data: []
      }
  ]
});

// 异步加载数据
$.get('http://localhost:8082/example/data.json').done(function (data) {
    // 填入数据
    myChart.setOption({
        xAxis: {
            data: data.name
        },
        series: [{
            // 根据名字对应到相应的系列
            name: '第一年销量',
            data: data.data1
        },{
          name: '第二年销量',
          data: data.data2
        }]
    });
});
    </script>
  </body>
</html>

```
data.json
```
{"name":["Android","IOS","PC","Other"],"data1":[420,200,360,100],"data2":[460,260,390,200]}

```
如图：![](http://p0bnwspy9.bkt.clouddn.com/15F%5DLE1V8%25%5BRKUWN$Y7S30A.png)


