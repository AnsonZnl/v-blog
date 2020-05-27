---
title: MongoDB中常用语句
date: 2018-11-17 22:23:20
tags: ["NodeJS","MongoDB"]
---
### MOngoDB  删除语句
**delete()删除**
1. 删除一个集合
`db.collection.deleteOne()`
2. 删除多个集合
`db.collection.deletMany();`


**remove()删除**
1. 删除所有的name：李四的数据
`db.student.remove({name:"李四"});`
2. 只删除一条sex:男的数据 仅删除一条
`db.student.remove({sex:"男"},true);`
3. 删除全部
`db.student.remove({});`


### 数据库假删除
有时候用户删除操作的时候，需求是这样的，仅是隐藏这条数据，并不是真的从数据库中删除。
这时候就用到假删除了，
比如这个是张三发的两篇微博：
```
db.student.insert([
    {name:"张三",content:"今天心情好",isDel:0},
    {name:"张三",content:"今天心情一般",isDel:0},
]);
```
![b21d2b7140562e21fcbe9c168e02da9.png](https://upload-images.jianshu.io/upload_images/7072486-0cf6106c47156b0e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


用户增加两条数据，但只保留后一条，删除前一条，这时候用到假删除 ，在添加数据时加上一个字段`isDel:0 `     
所以当用户删除数据时候 执行的不是remove方法而是update方法
```
db.student.update({"_id" : ObjectId("5bd6a46f1eb7a22fa07cb382")},{
    $set:{
      isDel:1
    }
});
```
![98cf763807e662cd724e6d65f1638fb.png](https://upload-images.jianshu.io/upload_images/7072486-c1ca4b50a635972c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
当`isDel:0`是表示用户没有删除 为1是表示用户已经删除

所以在查询的时候要筛选name和isDel条件即可
```
db.student.find({name:"张三",isDel:0});
```
查询到用户没有删除的数据:

![121b7fc4d6f40af1de843359cdbf585.png](https://upload-images.jianshu.io/upload_images/7072486-a917d02348ba2b6e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后就可以实现假删除了。
### 批量数据的操作和修改
1. 向集合中插入10000个文档
```
var arr= [];
for(var i=0;i<10000;i++){
   arr.push({counter:i});
}
db.demos.insert(arr);
db.demos.find();
```
2. 查询demos中counter为666的文档
`db.demos.find({counter:666});`
3. 查询demos中counter小于66的文档
`db.demos.find({counter:{$lt:666}});`
4. 查询demos中counter大T666的文档
`db.demos.find({counter:{$gt:666}});`
5. 查询demos中counter大于66小于666的文档1120查吉demos集合中的前10余数据
`db.demos.find({counter:{$gt:66, $lt:666}});`
6. 查石demos集合中的第1字到20条数据
`db.demos.find().limit(10);`
7. 查春demos集合中的第2 1条到30条数据  分页功能   skip从多少条开始 limit每次查询多少条 
```
db.demos.find().skip(0).limit(10);//第一页 从0条开始 每查询10条
db.demos.find().skip(10).limit(10);//第二页 从10条开始 每查询10条
db.demos.find().skip(20).limit(10);//第三页 从20条开始 每查询10条

```


### 集合中文档关系

1. 一对一（noe to noe）: 
比如：人和身份证   老公和老婆
2. 一对多（noe to many）:
比如：父母和孩子  用户和物品
3. 多对多（many to many）:
比如：老师和学生


####  一对一 
以内嵌文档的形式体现，
```
//一对一
db.aAndb.insert([
 {name:"杨过",wife:{name:"小龙女",sex:"女"},sex:"男"},
  {name:"杨过",wife:{name:"小龙女",sex:"女"},sex:"男"}
])

db.aAndb.find();
```

#### 一对多
通过内嵌文档的形式实现或者通过集合的形式实现
```
//一对多  比如  微博 和 微博评论
//添加微博
db.weibo.insert([
{weibo:"世界这么大，我想去看看"},
{weibo:"我要做一名web开发者！！！"}
])

db.weibo.find();
```
添加评论
```
db.comments.insert([
{
weibo_id: ObjectId("5bdd89e06a5e78f4cfc2b9c8"),
list:[
   "那你有钱吗",
    "一个人吗？？去呢啊？？",
    "加油！！"
]
},
{
weibo_id: ObjectId("5bdd89e06a5e78f4cfc2b9c9"),
list:[
   "那你要学习HTML",
   "那还要你要学习css",
    "加油！！"
]
}
]);

db.comments.find();
```
查询一对多
```
var weibo_id= db.weibo.findOne({"weibo" : "世界这么大，我想去看看"})._id;
db.comments.find({weibo_id: weibo_id});
```


#### 多对多的关系
比如：学生和老师
可以通过多文档关联，
```
//多对多  老师《------》学生

//插入老师集合
db.teachers.insert([
{
  name:"语文老师",
  teacher_id: 1,
  student_id:[
     1001,
     1002,
     1003
  ]
  },
{
  name:"数学老师",
  teacher_id: 2,
  student_id:[
     1001,
     1002,
     1003
  ]
  },
{
  name:"英语老师",
  teacher_id: 3,
  student_id:[
     1001,
     1002,
     1003
  ]
 }
])

db.teachers.find();


//插入学生集合
db.students.insert([
{
  name:"小明",
  student_id: 1001,
  teacher_id:[
     1,
     2,
     3
  ]
  },
{
  name:"小红",
  student_id: 1002,
  teacher_id:[
     1,
     2,
     3
  ]
  },
{
  name:"小刚",
  student_id: 1003,
  teacher_id:[
     1,
     2,
     3
  ]
 }
])

db.students.find();
db.teachers.find();
```

###  排序和索引

#### 排序：
查询文档时，默认是按照_id的值进行排序的（升序）
sort() 可以用来指定文档的排序规则，sort() 内部需要传递一个对象来指定文档的排序规则 ，其中1表示升序 ，-1表示降序
limit skip sort 的顺序可以任意改变 ，运行时会自动调整。
不希望它默认按照id排序  希望它按照工资来排序
```
//按照工资升序排列

db.section.find().sort({wages:1});

//优先按照工资升序排列  如果遇到相同的就在  按照id升序排列
db.section.find().sort({wages: 1},{_id: -1});

```
#### 索引：
展示字段中 部分内容
或者是提取这个字段内的部分内容
在查询时 ，可以在第二个参数来设置查询的结果投影

>索引： find({ 查询条件 }, { 检索范围（1显示 0隐藏）})
注意： `_id `如果不设置默认是1（显示） 可手动隐藏

`db.section.find({}, {name: 1});`
```
//只显示name和wages字段
`db.section.find({}, {name: 1, _id: 0, wages: 1});`
```
![a07a1f2945204ef671ddebc28871c00.png](https://upload-images.jianshu.io/upload_images/7072486-1b481d1c9381e28f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


