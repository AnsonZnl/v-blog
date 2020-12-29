# 初试 MongoDB 学习之 Mongoose 的使用

## mongoose 简介

mongoose 官网：https://mongoosejs.com/

### 为什么要用 Mongoose

> Mongoose 就是一个让我们可以通过 Node 来操作 MongoDB 的一个模块。
> Mongoose 本质是一个对象文档模型（ODM）库，
> 他对 Node 原生的 MongoDB 模块进行了一部优化封装，并且提供了更多的功能。

### Mongoose 的优势

1. 可以像操作对象一样操作数据库
2. 可以为文档创建一个模式结构（Schema）
3. 可以对模型中的文档/文档进行验证
4. 数据可以通过类型转换为对象模型
5. 可以使用中间件来应用业务逻辑挂钩
6. 比 Node 原生的 MongoDB 驱动更容易

### 使用 Mongoose

1. 下载安装 mongoose 模块
   `cnpm install mongoose --save`

2. 引用 mongoose：
   `var mongoose =require("mongoose");`
3. 使用"mongoose"连接数据库：
   `var db =mongoose.connect("mongodb://user:pass@localhost:port/database");`
4. 执行下面代码检查默认数据库 test，是否可以正常连接成功?

```js
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/m_data");
db.connection.on("error", function(error) {
  console.log("数据库连接失败：" + error);
});
db.connection.on("open", function() {
  console.log("数据库连接成功！");
});
db.connection.once("close", () => {
  console.log("连接已经断开成功！");
});
```

## mongoose 基本使用

### mongoose 的几个新的对象

在 MongoDB 中，多个 Document 可以组成 Collection(以下简称集合)，多个集合又可以组成数据库。我们想要操作 MongoDB 数据，那就得先要具备上面所说的包含数据的“文档”，文档又是什么意思呢，请看如下介绍。

1.  **文档** —— 是 MongoDB 的核心概念，是键值对的一个有序集，在 JavaScript 里文档被表示成对象。同时它也是 MongoDB 中数据的基本单元，非常类似于关系型数据库管理系统中的行，但更具表现力。
2.  **集合** —— 由一组文档组成，如果将 MongoDB 中的一个文档比喻成关系型数据库中的一行，那么一个集合就相当于一张表。
3.  **Schema**—— 一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，仅仅只是**定义数据的类型**，可以说是数据属性模型(传统意义的表结构)，又或着是“集合”的模型骨架。
    **mongoose 中任何任何事物都是从 Schema 开始的**。每一个 Schema 对应 MongoDB 中的一个集合(collection)。Schema 中定义了集合中文档(document)的样式。

### 定义一个 Schema（表/ 模式对象）

```js
//新建Schema 定义规则/字段的规则
let Schema = mongoose.Schema;
//定义personSchema的字段（规则）需要new一下 有点像构造函数的样子
let personSchema = new Schema({
  name: String,
  sex: String,
  age: Number,
});
```

**基本属性类型有**：

- String
- Number
- Date
- Boolean
- Buffer
- ObjectId
- Mixed
- Array

**Model**—— 由 Schema 构造生成的模型，根据 Schema 定义的数据类型规则，可操作具体的符合改规则的数据。

### 创建 model（集合）

```js
let personModel = mongoose.model("person", personSchema);
```

person：数据库中的集合名称,当我们对其添加数据时如果 person 已经存在，则会保存到其目录下，如果未存在，则会创建 person 集合，然后在保存数据。

```js
//4. 插入文档
personModel.create(
  {
    name: "张宁乐",
    sex: "男",
    age: 18,
  },
  (err) => {
    if (!err) {
      console.log("插入成功！");
    } else {
      throw err;
    }
  }
);
```

## mongoose 插入和查询

mongoose 查找数据的一些方法：
https://mongoosejs.com/docs/api.html#model_Model.find

### 插入多条数据

```js
personModel.create(
  [
    { name: "张逗逗", age: 2, sex: "男" },
    { name: "牛嘻嘻", age: 2, sex: "女" },
  ],
  (err) => {
    if (!err) {
      console.log("插入成功！");
    } else {
      throw err;
    }
  }
);
```

### 查询

- Model.find()

```js
personModel.find({ name: "张宁乐" }, (err, data) => {
  if (!err) {
    console.log(data);
  } else {
    throw err;
  }
});
```

### 查询所有

- Model.find({}, callback)

```js
personModel.find({}, (err, data) => {
  if (!err) {
    console.log(data);
  } else {
    throw err;
  }
});
```

也可以选择查找数据的条件（0 隐藏 1 显示 id 默认显示） 和 MongoDB 在命令行中的使用方法一样

```js
//查询时只显示name
personModel.find({}, { name: 1, _id: 0 }, (err, data) => {
  if (!err) {
    console.log(data);
  } else {
    throw err;
  }
});
```

在`find()`中 `skip`（查询开始的位置）和`limit`（增加的条数）也可以使用

```js
personModel.find(
  {},
  { name: 1, _id: 0, age: 1 },
  { skip: 0, limit: 2 },
  (err, data) => {
    //只显示name 和 age   从第1开始 每次查询2条
    if (!err) {
      console.log(data);
    } else {
      throw err;
    }
  }
);
```

**MongoDB 的 find()、findOne() 等命令在 mongoose 里都可以使用**
具体可参考 ：https://mongoosejs.com/docs/api.html#model_Model.find

## mongoose 修改和删除

参考： https://mongoosejs.com/docs/api.html#model_Model.update

### 修改方法：

- Model.update()
- Model.updateMany()
- Model.updateOne()
- Model.watch()

```js
personModel.update({ name: "张宁乐" }, { $set: { age: 20 } }, (err, data) => {
  if (!err) {
    console.log("修改成功！");
    console.log(data);
  } else {
    throw err;
  }
});
```

![mongo-3](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/mongo-3.png)

### 删除方法

- Model.remove()
- Model.deleteMany()
- Model.deleteOne()

```js
personModel.remove({ name: "牛嘻嘻" }, (err) => {
  if (!err) {
    console.log("删除成功！");
  } else {
    throw err;
  }
});
```

### 统计文档条数

- Model.count()

```js
personModel.count({}, (err, count) => {
  if (!err) {
    console.log("查询条数成功！ 一共：" + count + "条");
  } else {
    throw err;
  }
});
```

![mongo-4](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/mongo-5.png)

## Entity

Entity—— 由 Model 创建的实体，使用 save 方法保存数据，Model 和 Entity 的操作都能影响数据库的操作，但 Model 比 Entity 更具操作性。
使用 Model 创建 Entity，如下示例:

```js
let mongoose = require("mongoose");
let db = mongoose.connection("mongodb://localhost/m_data");
db.on("open", () => {
  console.log("连接成功！");
});
let Schema = mongoose.Schema;
let personSchema = new Schema({
  name: String,
  sex: String,
  age: Number,
});
let personModel = mongoose.model("person", personSchema);
let personEntity = new personModel({
  name: "许巍",
  sex: "男",
  age: 38,
});
personEntity.save((err, person) => {
  if (!err) {
    console.log("保存成功！");
    console.log(person);
  } else {
    console.log("保存失败！");
  }
});
```

![mongo-5](https://gitee.com/zhangningle/imgs/raw/master/blog/Node/mongo-5.png)

参考：https://blog.csdn.net/swimming_in_IT_/article/details/80723866
