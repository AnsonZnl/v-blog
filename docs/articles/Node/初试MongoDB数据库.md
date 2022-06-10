# 初试 MongoDB 数据库

## 数据库基本概念

**数据库（Database）基本概念：**

1. 数据库就是按照一定的数据结构来组织，储存和管理数据的仓库
2. 我们写的程序都是在内存中运行的，一旦程序运行结束或者计算机断点，程序运行中的数据就会全部丢失；所以我们就需要将一些程序的数据持久化到键盘之中，以确保数据的安全性。
3. 数据库则是大批量数据持久化的普遍选择，1.文件 2. 数据库

**为什么都采用数据库来储存数据:**

- 数据库是有结构的
- 数据库可以提供各种接口，让数据处理（增删改查）快捷方便
- 各种语言（PHP jsp .net..）提供了完善的接口

![mongo-1](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/mongo-1.png)

## 数据库分类

1. ROBMS（关系型数据库）：
   - 比如 MySql 、sql server Oracle 等
   - 特点 通过一张张表来建立关联
   - 基本都使用 SQL 语言来管理数据库，
2. Nosql (非关系型数据库)：
   - 没有行 、列的概念 用 json 类储存数据
   - 集合相当于“表”，文档相当于“行”
   - 标准化和非标准化的摩擦。
   - 标准化限制创新，非标准话不能统一

**特征**：
使用键值（Key Value）储存数据；
MongoDB 的逻辑结构是一种层次结构，主要由：文档(document)、集合(collection)、数据库(database)这三部分组成的。

- 文档(document)：由键/值对构成，像{a:1}；{s:”abc”}等，它是 MongoDB 核心单元，MongoDB 的文档（document），相当于关系数据库中的一行记录。
- 集合（Collection）：多个文档组成一个集合（collection），相当于关系数据库的表。
- 数据库（database）：多个集合（collection），逻辑上组织在一起，就是数据库（database）。
  一个 MongoDB 实例支持多个数据库（database）。

**关系型数据库和非关系型数据库区别：**
关系型数据库比较结构化，操作不是很灵活，菲关系型数据库操作灵活，但不适合大型数据存储，比较适合微架构，两者是相辅相成的关系
![mongo-2](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/mongo-2.png)

**非关系型数据库使用方面：**

1. 数据模型比较简单
2. 需要灵活性更强的后台系统
3. 对数据库性能要求比较高
4. 不需要高度的数据一致性

**非关系型数据库主要适合小微型架构的使用**

## 数据库 MongoDB 安装

MongoDB（非关系型数据库）：

1. 适合快速开发 web 应用而设计的数据库系统
2. 设计目标是极简、灵活、经常在 web 应用栈的业务层被运用
3. 它的数据模型是面向文档的，类似于 json 的结构
4. 所以这个数据库中是各种各样的 json, 并以键值形式对存储

安装：
下载:https://www.mongodb.com/
偶数是稳定版，奇数是开发版
最好下载 64 位的系统版本的

**配置环境变量:**

1. 新建--->安装到 bin 路径复制到环境变量
2. 创建 data->db 文件夹
3. 打开命令行输入 mongod 启动 DB 服务器
4. 指定端口号和路径 mongod --dbpath d:\data\db
5. 将 MongDB 设置为系统服务，data\log
   创建配置文件在 bin 下穿件文件 mongod.cfg
   执行一段命令：

```
sc.exe create MongoDB binPath= "\"F:\MongoDB\Server\3.2\bin\mongod.exe\" --service --config= \"F:\MongoDB\Server\3.2\mongod.cfg\"" DisplayName= "MongoDB" start= "auto"
```

主要是让 MongoDB 一直运行在内存中
参考资料：
https://www.cnblogs.com/wzlblog/p/6364045.html
https://www.cnblogs.com/chenlq/p/6515876.html

## 在命令行中使用 MongoDB 插入命令

**MongoDB 的组成：**

- 数据库 数据库是一个仓库 在仓库里可以放集合
- 集合： 集合类似数组 在集合里可以放文档
- 文档：文档是数据库中最小的单位 我们储存和操作的内容都是文档。

**基本指令：**
`show dbs` 显示当前所有的数据库
`use` 数据库名 进入到指定数据库
`db` 显示当前所在的数据库
`show collections` 显示数据库中的所有集合

使用管理员打开 cmd
输入 `mongo`进入 MongoDB 的环境
进入 MongoDB 的环境才能执行 MongoDB 的命令
然后使用命令行进行 CRUD(增删改查)：
`db.<collection>.insert(doc)`

**举例子：**
想 school 数据库中的学生集合 student 中插入一个新的学生对象
增加一条数据：
`db.student.insert({id:"001",name:"znl",age:18,sex:“男”})`
在当前的集合（school）中新建一条数据

查询一条数据：
`db.<collection>.find();`

如：`db.student.find();`
回车 就能查询 student 下的所有数据
插入多条数据：

```js
db.集合名.insert([
    {name:"张三",age:18,sex:"man"},
    {name:"张三",age:18,sex:"man"},
    {name:"张三",age:18,sex:"man"},
    {id:18，name:"张三",age:18,sex:"man"}
]);
```

> 插入多条数据时把多条语句放在一个数组里
> 插入可随便插入 不必拘泥于字段是否相同 当插入的字段不存在时会自动创建该字段

查看更多更多操作：http://www.mongodb.org.cn/manual/

## MongoDB 可视化工具 【NOSQL】

然而一直使用命令行操作是很麻烦的事情，所以推荐使用 NOSQL 可视化工具
安装可视化工具下载地址：https://www.mongodbmanager.com/download

## 使用可视化工具

可视化工具 查找功能：
插入(insert)语句：

```js
db.student(集合名字).insert([
  { id: 1, name: "znl", age: 18 },
  { id: 1, name: "znl", age: 18 },
]);
```

查询语句：
`db.student(集合name).find();`

设定条件查询：
`db.student.find({ "_id" : ObjectId("5bd01c825f0d528d36a2c06f")});`
查询 id 对应的数据
`db.student.find({age:18,name:"张三"});`
查询所有的 age 是 18 并且 name 是张三的人
`db.student.findOne({age:18,name:"张三"});`
查询单条符合条件的数据

操作符-查询有多少条数据：
`db.student.find().count();`
或
`db.student.find().length();`
返回数据总条数

查询符合条件数据的条数：
`db.student.find({name:"张三"}).length();`
返回符合 name:"张三"的条数

## 数据库更新命令

更新原有的字段的数据：

```js
db.student.update(
  { name: "张三" },
  {
    $set: {
      name: "刘五",
      age: 45,
    },
  }
);
```

把匹配到的`name:"张三"`的数据都更新成 `name:"刘五", age:45`
也可以新增没有的字段 直接写入就可以
**\$set ：有这个字段就修改 没有这个字段就新增**

删除一个字段：

```js
db.student.update({"name":"张三"}，{$unset:{
    age:1
}});
```

查询`name:张三`的一条数据 然后删除它的 age 字段

修改多条：

```js
db.student.updateMany(
  { sex: "man" },
  {
    $set: {
      aihao: "玩游戏",
    },
  }
);
```

把符合`sex:man`的语句都新增（修改）一条`aihao:"玩游戏"`
**\$set ：有则修改 无则新增**

更新多条数据方法 2：

```js
db.student.update(
  { name: "张三" },
  {
    $set: {
      name: "王五",
    },
  },
  {
    multi: true,
  }
);
```

参考文档：https://docs.mongodb.com/manual/tutorial/query-documents/
