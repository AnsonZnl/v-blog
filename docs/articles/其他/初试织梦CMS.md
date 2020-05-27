---
title: 初试织梦CMS
date: 2018-3-11 17:20:14
tags: ["CMS"]
---

## 织梦CMS
这些天学习了织梦cms内容管理系统，
> 织梦内容管理系统(DedeCms) 以简单、实用、开源而闻名，是国内最知名的PHP开源网站管理系统，也是使用用户最多的PHP类CMS系统，在经历多年的发展，目前的版本无论在功能，还是在易用性方面，都有了长足的发展和进步，DedeCms免费版的主要目标用户锁定在个人站长，功能更专注于个人网站或中小型门户的构建，当然也不乏有企业用户和学校等在使用该系统。

1. 安装好phpstudy(phpStudy是一个PHP调试环境的程序集成包。该程序包集成最新的Apache+PHP+MySQL+phpMyAdmin+ZendOptimizer,一次性安装，无须配置即可使用，是非常方便、好用的PHP调试环境)
2. 去织梦官网下载最新的织梦后台模板，
3. 下完把梦后台放在phpstudy的后台的www目录下，并配置站点域名。打开运行


phpstudy下载：http://www.phpstudy.net/
织梦cms下载：http://www.dedecms.com/products/dedecms/downloads/
HostsEditor 编辑hosts文件（配置域名）：https://pan.baidu.com/s/1o79DCAu

简单熟悉织梦的后台操作后，开始自己学着做模板，
首先先熟悉织梦的标签生成器的使用：
学会后可以很方便的构造自己喜欢的网站

常用的的织梦标签有：
都是常用的一些标签，大家可以用ctrl+F实现搜索。

网站名称：{dede:global.cfg_webname/}
 
网站根网址：{dede:global.cfg_basehost/}
 
网站根目录：{dede:global.cfg_cmsurl/}
 
网页主页链接：{dede:global.cfg_indexurl/}
 
网站描述：{dede:global.cfg_description/}
 
网站关键字：{dede:global.cfg_keywords/}
 
模板路径：{dede:global.cfg_templets_skin/}
 
调用页面：{dede:include filename="head.htm"/}
 
网站编码：{dede:global.cfg_soft_lang/}
-----------------------------------------------------------------------------------------------
调用时间：[field:pubdate function=MyDate('y-m-d',@me)/]
 
调用缩略图：
{dede:arclist row=10 orderby=pubdate type='image.' imgwidth='定义图片宽度' imgheight='高度'}
[field:image/]
{/dede:arclist}
 
调用缩略图原图：
[field:litpic runphp='yes'] 
$youjoys = array("-lp", "_lit"); 
@me = str_replace ($youjoys, "", @me); 
[/field:litpic]
 
调用单个栏目：
```
{dede:type}
<a href="[field:typelink /]">[field:typename /]</a>
```
{/dede:type}
-----------------------------------------------------------------------------------------------
文章标题：{dede:field.title/}
 
文章描述：{dede:field.description function='html2text(@me)'/}
 
文章关键词：{dede:field.keywords/}
 
当前位置：{dede:field name='position'/}
 
文章时间：{dede:field.pubdate function="MyDate('Y-m-d H:i',@me)"/}
 
文章来源：{dede:field.source/}
 
文章作者：{dede:field.writer/}
 
文章内容：{dede:field.body/}
 
上一篇：{dede:prenext get='pre'/}
 
下一篇：{dede:prenext get='next'/}
 
点击量：<script src="{dede:field name='phpurl'/}/count.php?view=yes&aid={dede:field name='id'/}&mid={dede:field name='mid'/}" type='text/javascript' language="javascript"></script>
-----------------------------------------------------------------------------------------------
channel|频道标签：
 
标签名称：channel
标记简介：织梦常用标记，通常用于网站顶部以获取站点栏目信息，方便网站会员分类浏览整站信息
功能说明：用于获取栏目列表
适用范围：全局使用
 
基本语法：
```
{dede:channel type='top' row='8' currentstyle="<li><a href='~typelink~' class='thisclass'>~typename~</a> </li>"}
 <li><a href='[field:typelink/]'>[field:typename/]</a> </li>
{/dede:channel}
```
参数说明：
typeid = '0'  栏目ID
reid = '0' 上级栏目ID
row = '100' 调用栏目数
col = '1' 分多少列显示（默认为单列）
type = 'son | sun' son表示下级栏目,self表示同级栏目,top顶级栏目
currentstyle = '' 应用样式
 
底层模板字段：
ID(同 id),typeid, typelink, typename, typeurl,typedir(仅表示栏目的网址)
 
[field:id/]
[field:typeid/]
[field:typelink/] 调用栏目名称，点击直接跳转该栏目列表
[field:typename/] 调用栏目名称，无链接
[field:typeurl/]
[field:typedir/]
 
例：
```
{dede:channel type='top'}
<a href='[field:typelink /]'>[field:typename/]</a> 
{/dede:channel}
```
注：在没有指定typeid的情况下，type标记与模板的环境有关，如，模板生成到栏目一，那么type='son'就表示栏目一的所有子类
--------------------------------------------------------------------------------------------
arclist|文档列表： 
 
标签名称：arclist
标记简介：织梦常用标记，也称为自由列表标记，其中imglist、imginfolist、specart、coolart、autolist都是由该标记所定义的不同属性延伸出来的别名标记。
功能说明：获取指定文档列表
适用范围：全局使用
 
基本语法：
```
{dede:arclist  flag='h' typeid='' row='' col='' titlelen='' infolen='' imgwidth='' imgheight='' listtype='' orderby='' keyword='' limit='0,1'}
<a href='[field:arcurl/]'>[field:title/]</a>
{/dede:arclist}
```
参数说明：
col='' 分多少列显示（默认为单列），5.3版中本属性可以通过多种方式进行多行显示
如果col='1'要多列显示的可用div+css实现
以下为通过div+css实现多列的示例：
```
<style type=text/css>
div{width:400px;float:left;}
</style>
{dede:arclist row='10' titlelen='24' orderby='pubdate' idlist='' col='2'}
?[field:textlink/]([field:pubdate function=MyDate('m-d',@me)/])<br/>
{/dede:arclist}
```
当col>1将使用原来的table多列方式显示
row='10' 返回文档列表总数
typeid='' 栏目ID,在列表模板和档案模板中一般不需要指定，在首页模板中允许用","分开表示多个栏目；
getall='1' 在没有指定这属性的情况下,在栏目页、文章页模板,不会获取以","分开的多个栏目的下级子类
titlelen = '30' 标题长度 等同于titlelength
infolen='160' 表示内容简介长度 等同于infolength
imgwidth='120' 缩略图宽度
imgheight='90' 缩略图高度
listtype='all' 栏目类型 image含有缩略图 commend推荐
orderby='sortrank' 文档排序方式
§ orderby='hot' 或 orderby='click' 表示按点击数排列
§ orderby='sortrank' 或 orderby='pubdate' 按出版时间排列
§ orderby='near'
§ orderby=='lastpost' 按最后评论时间
§ orderby=='scores' 按得分排序
§ orderby='id' 按文章ID排序
§ orderby='rand' 随机获得指定条件的文档列表
keyword='' 含有指定关键字的文档列表，多个关键字用","分
innertext = '' 单条记录样式
aid='' 指定文档ID
idlist ='' 提取特定文档（文档ID）
channelid 频道ID
limit='起始ID,记录数'  （起始ID从0开始）表示限定的记录范围（如：limit='1,2'  表示从ID为1的记录开始，取2条记录）
flag = 'h' 自定义属性值：头条[h]推荐[c]图片[p]幻灯[f]滚动[s]跳转[j]图文[a]加粗[b]
noflag = '' 同flag，但这里是表示不包含这些属性
orderway='desc' 值为 desc 或 asc ，指定排序方式是降序还是顺向排序，默认为降序
subday='天数' 表示在多少天以内的文档
 
 
用arclist调用于附加表字段的方法：
 
要获取附加表内容，必须符合两个条件
1、指定 channelid 属性
2、指定要获得的字段 addfields='字段1,字段'
如：
{dede:arclist addfields='filetype,language,softtype' row='8' channelid='3'}
[field:textlink /] - [field:softtype /]<br />
{/dede:arclist}
 
底层模板字段：
ID(同 id),typeid,sortrank,flag,ismake,channel,arcrank,click,money,title,shorttitle,color,writer,
source,litpic(同picname),pubdate,senddate,mid, lastpost,scores,goodpost,badpost,notpost,
description(同infos),filename, image, imglink, fulltitle, textlink, typelink,plusurl, memberurl, templeturl,
stime(pubdate 的"0000-00-00"格式)
其中：
```
textlink = <a href='arcurl'>title</a>
typelink = <a href='typeurl'>typename</a>
imglink = <a href='arcurl'><img src='picname' border='0' width='imgwidth' height='imgheight'></a>
image = <img src='picname' border='0' width='imgwidth' height='imgheight' alt=’titile’>
字段调用方法：[field:varname/]
```
如：
{dede:arclist infolen='100'}
[field:textlink/]
<br>
[field:infos/]
<br>
{/dede:arclist}
注：底层模板里的Field实现也是织梦标记的一种形式，因此支持使用PHP语法，Function扩展等功能。
如： 给当天发布的内容加上 (new) 标志
[field:senddate runphp='yes'] 
$ntime = time();
$oneday = 3600 * 24;
if(($ntime - @me)<$oneday) @me = "<font color='red'>(new)</font>";
else @me = "";
[/field:senddate]
