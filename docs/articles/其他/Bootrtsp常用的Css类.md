---
title: Bootstrap常用的Css类
date: 2018-3-21 17:20:14
tags: ["Bootstrap","移动端"]
---

Bootstrap 是基于 HTML、CSS、JavaScript 的，它简洁灵活，使得 Web 开发更加快捷
使用它可以快速开发一个适应手机、平板、电脑的网站，
比如我的
法标珠光卫浴  http://zhangningle.gitee.io/fabiaozhuguangweiyv/
<br>
手机显示：
<img src="http://p0bnwspy9.bkt.clouddn.com/%7DK3U_6LDR5QMILUN%5BGIW9NJ.png" alt="法标珠光卫浴" style="width:75%;" class="about_img">
电脑显示：
<img src="http://p0bnwspy9.bkt.clouddn.com/LX6N$A@_FRZYV4%5B0%25K5IV_5.jpg" alt="法标珠光卫浴" style="width:100%;" class="about_img">

bootstrap常用类记录：
记录一下bootrtsp常用的类，下次使用方便快速查阅！
1.起步
2.全局css样式
    1)按钮相关class
     .btn                按钮基础样式
     .btn-danger         红色按钮
     .btn-warming        黄色按钮
     .btn-success        绿色按钮
     .btn-info           浅蓝色按钮
     .btn-primary        深蓝色按钮
     .btn-lg             大号按钮
     .btn-sm             小号按钮
     .btn-xs             超小号按钮
     .btn-block          块级按钮
    注：用button写按钮时，必须要写type属性

    2)图片相关class
      .img-circle        圆形图片
      .img-rounded       圆角图片
      .img-thumbnail     缩略图片
      .img-responsive    响应式图片

    3)文本相关class
      .text-danger/warming/success/info/primary   文本的5种颜色
      .bg-danger/warming/success/info/primary     5种背景颜色
      .text-uppercase    转大写
      .text-lowercase    转小写
      .text-capitalize   转首字母大写
      .text-left         文本左对齐
      .text-right        文本右对齐
      .text-center       文本居中对齐
      .text-justify      两端调整对齐

    4)辅助类
       .caret            三角符号
       .close            关闭按钮
       .pull-left        左浮动
       .pull-right       右浮动


    5)表格（小重点）
        .table           基础表格
        .table-borderd   带边框的表格
        .table-striped   隔行变色的表格
        .table-hover     带鼠标悬停效果的表格
        .table-responsive  响应式表格，必须使用在table的父元素div上
        注：.table-responsive的正确使用方法。如果想让某一行或某一列变背景，直接在tr或td上加class属性即可

    6)栅格布局系统(重点)
        a.最外层必须是容器类.container或.container-fluid
        b.容器中必须放置行:.row
        c.行中必须放置列:.col

        <div class='container'>
            <div class='row'>
                <div class='col-md-3 col-sm-6 col-xs-12'></div>
            </div>
        </div>

        针对不同的屏幕有不同的列
        .col-lg-*          适用于超大pc屏幕
        .col-md-*          适用于中等pc屏幕
        .col-sm-*          适用于pad屏幕
        .col-xs-*          适用于phone屏幕

        .col-md-offset-1/2/3....     pc屏幕中向右偏移多少个
        .col-sm-offset-1/2/3....     pad屏幕中向右偏移多少个
        .col-xs-offset-1/2/3....     phone屏幕中向右偏移多少个

        不同的列在不同屏幕下哟不同的适用性
        .col-lg-*                     只适用于lg屏幕
        .col-md-*                     适用于lg/md屏幕
        .col-sm-*                     适用于lg/md/sm屏幕
        .col-xs-*                     适用于lg/md/sm/xs屏幕

        可以指定某列在特定尺寸的屏幕下隐藏
        .hidden-lg                    在lg屏幕下隐藏
        .hidden-md                    在md屏幕下隐藏
        .hidden-sm                    在sm屏幕下隐藏
        .hidden-xs                    在xs屏幕下隐藏

        <div class="container">
        	<div class="row">
        	    <div class="col-xs-6">
                    <div class="row">
                        <div class="col-xs-6"></div>
                    </div>
                </div>
        	</div>
        </div>

    7)表单(难点)
        a.默认表单
            <form>
            	<div class="form-group">
                    <label>用户名</label>
                    <input class="form-control">
                    <span class="help-block">用户名可以包含数字，字母和下划线</span>
                </div>
            </form>

        b.行内表单
            <form class='form-inline'>
                <div class='form-group'>
                    <label class='sr-only'>用户名</label>
                    <input class='form-control' placeholder="请输入用户名">
                </div>
            </form>
            注：.sr-only是 除了屏幕阅读器外，其他设备上隐藏该元素，这个是用于屏幕阅读器的，帮助残障人士更好的访问网站。

        c.水平表单(难点)
            <form class='form-horizontal'>
                <div class='form-group'>
                    <div class='col-**-**'>
                        <label>用户名</label>
                    </div>
                    <div class='col-**-**'>
                        <input class='form-control'>
                    </div>
                    <div class='col-**-**'>
                        <span class="help-block">用户名可以包含数字字母和下划线</span>
                    </div>
                </div>
            </form>



3.组件
    1.图标字体
         使用方法
         <span class='glyphicon glyphicon-*'></span>
         注：span中不能有任何文本或子标签


    2.按钮组
         .btn-group
         .btn-group-justified         占满屏幕的按钮组
         .btn-group-lg/sm/xs          不同型号的按钮
         .btn-group-vertical          竖直按钮

    3.下拉菜单
        <div class='dropdown'>
            <a data-toggle='dropdown'>触发元素</a>
            <ul class='dropdown-menu'>
                <li>小鸡</li>
                <li>小鸭</li>
                <li>小狗</li>
            </ul>
        </div>

    4.导航
        a.标签页式导航
            <ul class='nav nav-tabs'>
                <li class='active'>
                    <a data-toggle='tab'>详情信息</a>
                </li>
                <li>
                    <a>评论</a>
                </li>
            </ul>
            .nav        去除了li默认的样式
            .nav-tabs   浮动，并增加了下边框
            .active     显示当前页
            .data-toggle  每个li可以来回切换


        b.胶囊式导航
            <ul class='nav nav-pills'>
                <li class='active'>
                    <a data-toggle='tab'>详情信息</a>
                </li>
                <li>
                    <a data-toggle='tab'>评论</a>
                </li>
            </ul>

        c.导航条中的导航
            <ul class='nav navbar-nav'>
                <li class='active'>
                    <a data-toggle='tab'>详情信息</a>
                <li>
                <li>
                    <a data-toggle='tab'>评论</a>
                <li>
            </ul>

    5.警告框
            <div class='alert alert-dismiss alert-danger'>
                <span class='close'  data-dismiss='alert'>$times;</span>
            </div>

    6.进度条
        //普通进度条
        <div class='progress'>
            <div class='progress-bar' style='width:30%'></div>
        </div>

        //带条纹的进度条
        <div class='progress'>
            <div class='progress-bar progress-bar-striped' style='width:30%'></div>
        </div>

        //带条纹会动的进度条
        <div class='progress'>
            <div class='progress-bar progress-bar-striped active' style='width:30%'></div>
        </div>

    7.路径导航(面包屑)
        <ul class="breadcrumb">
            <li><a href="#">新闻</a></li>
            <li><a href="">国内新闻</a></li>
            <li><a href="">泊头新闻</a></li>
        </ul>

    8.分页条(pagination)
        <ul class="pagination">
            <li><a href="#">前一页</a></li>
            <li><a href="#">当前页</a></li>
            <li><a href="#">后一页</a></li>
        </ul>
        注：li里面必须要有a

    9.分页器(pager)
        <ul class="pager">
            <li><a href="">前一页</a></li>
            <li><a href="">后一页</a></li>
        </ul>
    10.徽章(badge)
        <a href="#" class="btn btn-warning">
            收件箱
            <span class="badge">4</span>
        </a>

    11.标签(label)
        <span class="label label-danger">danger</span>
        <span class="label label-warning">warning</span>
        <span class="label label-success">success</span>
        <span class="label label-info">info</span>
        <span class="label label-primary">primary</span>

    12.巨幕
        <div class="jumbotron">
            <h1>hello world</h1>

            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi obcaecati possimus voluptas! Accusantium aperiam,
                autem dolor dolorem eaque molestiae necessitatibus nihil nobis perspiciatis praesentium quidem reiciendis
                sapiente soluta sunt voluptas.</p>
            <p><a href="#" class="btn btn-warning">按钮</a></p>
        </div>

    13.页头
        <div class="page-header">
            <h1>hello world hello world</h1>
        </div>

    14.水井（well）
        <div class="well">
            i have a good idea
        </div>

    15.列表组：
        使用ul>li实现列表组
        <ul class="list-group">
            <li class="list-group-item">首页</li>
            <li class="list-group-item">详情页</li>
            <li class="list-group-item">联系我们</li>
        </ul>

        使用div>a实现列表组(有默认的鼠标悬停效果)
        <div class="list-group">
            <a href="#" class="list-group-item">首页</a>
            <a href="#" class="list-group-item">详情页</a>
            <a href="#" class="list-group-item">联系我们</a>
        </div>

    16.缩略图(缩略图一般配合栅格布局系统使用，实现批量的商品展示)
        <div class="thumbnail">
            <img src="img/1.jpg" alt=""/>
            <div class="caption">
                <p>国画</p>
                <button type="button" class="btn btn-warning">加入购物车</button>
            </div>
        </div>

    17.媒体对象
        <div class="media">
            <div class="media-left"></div>
            <div class="media-body"></div>
        </div>

    18.面板和面板组(面板组内容分为三部分:头，主体，尾部)，多个面板组合(称为面板组)可以实现手风琴的效果
        <div class="panel panel-success">
            <div class="panel-heading"></div>
            <div class="panel-body"></div>
            <div class="panel-footer"></div>
        </div>

4.插件
    1.折叠效果
        <div class="collapse" id="collapseExample">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus deleniti ea expedita fugiat ipsum, natus
                optio recusandae vitae. Assumenda autem doloremque dolores ipsam ipsum modi molestias perferendis placeat, ut
                vero!</p>
        </div>

        折叠效果的两个重要扩展
            1.手风琴----重点
                面板组+折叠效果插件
            2.响应式导航条---重点&&难点
            “响应式导航条”必须配合折叠效果插件使用。
               响应式导航条在PHONE中只显示一个LOGO + 一个汉堡包按钮，其他菜单项全在折叠下拉菜单中；PAD和PC中，下拉菜单要实现绝对对位，定位到LOGO后面去。
                  “响应式导航条”必须配合折叠效果插件使用。
                     响应式导航条在PHONE中只显示一个LOGO + 一个汉堡包按钮，其他菜单项全在折叠下拉菜单中；PAD和PC中，下拉菜单要实现绝对对位，定位到LOGO后面去。

                    Bootstrap中导航条分类：
                    (1)按颜色分：
                  		白底黑字：  .navbar-default
                  		黑底白字：  .navbar-inverse
                    (2)按定位方式分：
                  		相对定位：	默认
                  		固定定位：  .navbar-fixed-*
                    (3)按所在位置分：
                  		固定在顶部：  .navbar-fixed-top
                  		固定在底部：  .navbar-fixed-bottom

                    <div class="navbar navbar-default">
                    <div class="container">
                      <!--导航条头部 = brand + toggle-->
                      <div class="navbar-header">
                      </div>
                      <!--导航条折叠部分 = 导航 + 链接 + 表单 + 按钮 ...-->
                      <div id="my-menu" class="collapse navbar-collapse">
                      </div>
                    </div>
                  </div>


              Bootstrap中导航条分类：
              (1)按颜色分：
            		白底黑字：  .navbar-default
            		黑底白字：  .navbar-inverse
              (2)按定位方式分：
            		相对定位：	默认
            		固定定位：  .navbar-fixed-*
              (3)按所在位置分：
            		固定在顶部：  .navbar-fixed-top
            		固定在底部：  .navbar-fixed-bottom

              <div class="navbar navbar-default">
              <div class="container">
                <!--导航条头部 = brand + toggle-->
                <div class="navbar-header">
                </div>
                <!--导航条折叠部分 = 导航 + 链接 + 表单 + 按钮 ...-->
                <div id="my-menu" class="collapse navbar-collapse">
                </div>
              </div>
            </div>

    2.补充：列偏移 vs 列排序
          列偏移：控制一列出现的位置，某列偏移后，后续的列都会随之偏移——只能往右偏移
            col-lg/md/sm/xs-offset-*
          列排序：控制一列出现的位置，某列可以往左拉或往右推——可以往右往左调整——某列排序后，其他列没有任何影响！
            col-lg/md/sm/xs-push-*
            col-lg/md/sm/xs-pull-*

    2.Boostrap第四部分：jQuery插件
          Bootstrap基于jQuery提供了十几个插件函数，可以有两种调用方法：
            (1)JS调用方式：  $('a').dropdown( );
            (2)data-*调用方式： <a data-toggle="dropdown"></a>
          提示：官方推荐使用方式2！但有两个插件提交特别：需要方式1和2同时使用才能奏效。

    3.Boostrap第四部分：jQuery插件——下拉菜单
    	<div class="dropdown">
    		<a data-toggle="dropdown">触发元素</a>
    		<ul class="dropdown-menu">
    	</div>

    4. Boostrap第四部分：jQuery插件——导航
     	<ul class="nav nav-tabs">
    		<li class="active"><a href="#">二十元套餐</a></li>
    		<li><a data-toggle="tab" href="#">二十元套餐</a></li>
    	</ul>

    5. Boostrap第四部分：jQuery插件——警告框
      <div class="alert">
    	<span class="close" data-dismiss="alert">&times;</span>
      </div>

    6. Boostrap第四部分：jQuery插件——折叠
    	<a data-toggle="collapse" href="#box">展开收起</a>
    	<div id="box" class="collapse"></div>

    7. Boostrap第四部分：jQuery插件——工具提示
          对HTML元素的title属性的呈现效果加以改观。
              <ANY title="工具提示的内容" data-toggle="tooltip">
              <script>
                $('[data-toggle="tooltip"]').tooltip();
              </script>
          注意：此插件必须同时声明data-*和js调用！还有一些可选参数，参考手册即可。

    8. Boostrap第四部分：jQuery插件——弹出框
          <ANY title="弹出框的标题" data-content="弹出框的内容" data-toggle="popover">
          <script>
            $('[data-toggle="popover"]').popover();
          </script>
      注意：此插件必须同时声明data-*和js调用！还有一些可选参数，参考手册即可。


    Module：模块
    Model：模型
    Modal：模态对话框

    9.Boostrap第四部分：jQuery插件—— 模态框 —— 重点
      Modal：模态对话框——在父窗口中弹出的子窗口，只要不关闭，则父窗口无法再获得输入焦点。
          <a data-toggle="modal" href="#mid">打开模态框</a>
          <button data-toggle="modal" data-target="#mid">打开模态框</button>
      模态框必需的HTML结构：
      <div id="mid" class="modal">  半透明遮罩层
    	<div class="modal-dialog">  尺寸位置
    		<div class="modal-content">  背景/边框/倒角/阴影
    			<div class="modal-header">
    	            <span data-dismiss="modal" class="close">&times;</span>
                </div>
    			<div class="modal-body"></div>
    			<div class="modal-footer"></div>
    		</div>
    	</div>
      </div>

    10. jQuery插件——轮播广告 —— 重点
          提示：轮播广告的结构比较复杂！只要记得根元素 div.carousel（旋转木马），剩余的全靠Bootlint的错误提示。
          <div class="carousel" data-ride="carousel">
        	<div class="carousel-inner">
        		<div class="item active">
        			<img>
        		</div>
        	</div>
          </div>
         练习：
        (1)为每个广告添加说明文字
        (2)添加“上一条”、“下一条”按钮
        (3)添加序号指示器
