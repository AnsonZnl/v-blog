---
title: Hexo常用命令
date: 2017-12-5 19:0:03
categories:
tags: ["Hexo"]
keywords:
---

## hexo常用技能

自从使用hexo搭建了自己的博客后，常常因为hexo 的各种命令苦恼，因此更新第一篇博文，首先把自己常用的hexo的命令记录下。

### 一、新建一个菜单：

####  建博客是为的什么？当然是记录自己的学习、生活了，因此先从

​	1.自己的blog目录下打开命令行

````1 $ hexo new page "新建的菜单名字"
2 INFO  Created: ~/blog/source/github/新建的菜单名字.md````

这个指令会在source目录创建一个“新建的菜单名字”的文件夹,并在文件夹中创建一个新建的index.md的文件 
修改``index.md``

````
1 $ vim source/github/index.md 
2 ----
4 title: github
3 date: 2016-08-25 18:27:59
5  ----
6  # 我的第一个标签页

````



修改主题的配置文件,增加一个标签页菜单

```
menu:
  home: / || home
  about: /about/ || user
  tags: /tags/ || tags
  #categories: /categories/ || th
  #archives: /archives/ || archive
  日程表: /日程表/ || calendar
  #sitemap: /sitemap.xml || sitemap
  #commonweal: /404/ || heartbeat
  书影音: /书影音/ || book
  图库: /图库/ || image
  留言板: /留言板/ || edit
  作品展示: /作品展示/ || file-code-o
```

_如果你对标签页的小图标不满意,也可以自己定义,这个图标其实是一种字体,在[fontawesome.io](http://fontawesome.io/icons/) 这个网站可以找到你满意的图标。 
修改方法就是将``||``后面的内容替换掉_

然后执行``hexo claen``

在执行``hexo s``，本地查看无误后

执行``hexo d`` 发布到博客即可

### 二、写文章

在blog目录下执行创建文章指令
````
$ hexo new "blog1"
INFO  Created: ~/blog/source/_posts/blog1.md
````
然后修改source/_posts/blog1.md文件

```
$ vim source/_posts/blog1.md
  1 ---
  2 title: blog1
  3 date: 2016-08-25 18:50:03
  4 tags:
  5 ---
  6 
  7 我的第一篇文章！
```

清理后启动,就可以看到博客中新增加的文章了。

````
1 $ hexo clean
2 $ hexo s --debug
````

### 三、创建分类

新建一篇文章:

````
$ hexo new "new Types"
  INFO  Created: ~/blog/source/_posts/new-Types.md
````

修改文章的类型 : categories

````
$ vim source/_posts/new-Types.md 
   ---
   title: new Types
   date: 2016-08-25 20:23:37
   categories: type1
   description: 这里是内容简介
   --- 
   我的分类是type1
````

清理后启动,就可以看到分类下面多了一个type1类型了

````
$ hexo clean
$ hexo s --debug
````

文章分类是自动的,不需要用户自己创建,只需要自己定义就可以了。

### 四、创建标签

新建一篇文章:

````
$ hexo new "new tags"
  INFO  Created: ~/blog/source/_posts/new-tags.md
````

修改文章的标签 : tags

````
$ vim source/_posts/new-tags.md 
   ---
   title: new Types
   date: 2016-08-25 20:23:37
   tags: tags1
   description: 这里是内容简介
   --- 
   我的标签是tags1
````

清理后启动,就可以看到标签下面多了一个type1标签了

````
$ hexo clean
$ hexo s --debug
````

文章标签是自动的,不需要用户自己创建,只需要自己定义就可以了。