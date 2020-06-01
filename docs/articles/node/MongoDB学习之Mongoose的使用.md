#  初试MongoDB学习之Mongoose的使用
##  mongoose简介
mongoose官网：https://mongoosejs.com/

### 为什么要用Mongoose
>Mongoose就是一个让我们可以通过Node来操作MongoDB的一个模块。
Mongoose本质是一个对象文档模型（ODM）库，
他对Node原生的MongoDB模块进行了一部优化封装，并且提供了更多的功能。

### Mongoose的优势
1. 可以像操作对象一样操作数据库
2. 可以为文档创建一个模式结构（Schema）
3. 可以对模型中的文档/文档进行验证
4. 数据可以通过类型转换为对象模型
5. 可以使用中间件来应用业务逻辑挂钩
6. 比Node原生的MongoDB驱动更容易

### 使用Mongoose
1. 下载安装mongoose模块
`cnpm install mongoose --save`

2. 引用mongoose：
`var mongoose =require("mongoose");`
3. 使用"mongoose"连接数据库：
`var db =mongoose.connect("mongodb://user:pass@localhost:port/database");`
4. 执行下面代码检查默认数据库test，是否可以正常连接成功?
```js
var mongoose =require("mongoose");
var db =mongoose.connect("mongodb://localhost/m_data");
db.connection.on("error",function (error) {
   console.log("数据库连接失败：" + error);
});
db.connection.on("open",function () {
   console.log("数据库连接成功！");
});
db.connection.once('close', ()=>{
    console.log('连接已经断开成功！')
})
```
## mongoose基本使用

### mongoose的几个新的对象
在MongoDB中，多个Document可以组成Collection(以下简称集合)，多个集合又可以组成数据库。我们想要操作MongoDB数据，那就得先要具备上面所说的包含数据的“文档”，文档又是什么意思呢，请看如下介绍。

1.  **文档** —— 是MongoDB的核心概念，是键值对的一个有序集，在JavaScript里文档被表示成对象。同时它也是MongoDB中数据的基本单元，非常类似于关系型数据库管理系统中的行，但更具表现力。
2. **集合** —— 由一组文档组成，如果将MongoDB中的一个文档比喻成关系型数据库中的一行，那么一个集合就相当于一张表。
3. **Schema**—— 一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，仅仅只是**定义数据的类型**，可以说是数据属性模型(传统意义的表结构)，又或着是“集合”的模型骨架。
**mongoose中任何任何事物都是从Schema开始的**。每一个Schema对应MongoDB中的一个集合(collection)。Schema中定义了集合中文档(document)的样式。
### 定义一个Schema（表/ 模式对象）
```js
//新建Schema 定义规则/字段的规则
let Schema= mongoose.Schema;
//定义personSchema的字段（规则）需要new一下 有点像构造函数的样子
let personSchema= new Schema({
    name: String,
    sex: String,
    age: Number
});
```
**基本属性类型有**： 
* String
*  Number
* Date
* Boolean
* Buffer
* ObjectId
* Mixed
* Array

**Model**—— 由Schema构造生成的模型，根据Schema定义的数据类型规则，可操作具体的符合改规则的数据。

### 创建model（集合）

```js
let personModel= mongoose.model('person', personSchema);
```
  person：数据库中的集合名称,当我们对其添加数据时如果person已经存在，则会保存到其目录下，如果未存在，则会创建person集合，然后在保存数据。
```js
//4. 插入文档
personModel.create({
    name: '张宁乐',
    sex: '男',
    age: 18
}, (err)=>{
   if(!err){
       console.log('插入成功！')
   }else{
       throw err;
   }
});
```

## mongoose 插入和查询
mongoose查找数据的一些方法：
https://mongoosejs.com/docs/api.html#model_Model.find

### 插入多条数据
```js
personModel.create([
    {name:'张逗逗',age: 2,sex: '男'},
    {name:'牛嘻嘻',age: 2,sex: '女'}
], (err)=>{
   if(!err){
       console.log('插入成功！')
   }else{
       throw err;
   }
})
```

### 查询
* Model.find() 
```js
personModel.find({name: '张宁乐'}, (err, data)=>{
    if(!err){
        console.log(data)
    }else{
        throw err;
    }
})
```
### 查询所有 
* Model.find({}, callback) 
```js
personModel.find({}, (err, data)=>{
    if(!err){
        console.log(data)
    }else{
        throw err;
    }
})
```
也可以选择查找数据的条件（0隐藏 1显示 id默认显示） 和MongoDB在命令行中的使用方法一样  
```js
//查询时只显示name 
personModel.find({}, {name: 1, _id: 0}, (err,data)=>{
    if(!err){
        console.log(data)
    }else{
        throw err;
    }
})
```
在`find() `中  `skip`（查询开始的位置）和`limit`（增加的条数）也可以使用  
```js
personModel.find({}, {name: 1, _id: 0, age: 1}, {skip: 0, limit: 2}, (err, data)=>{
    //只显示name 和 age   从第1开始 每次查询2条 
    if(!err){
        console.log(data)
    }else{
        throw err;
    }
})
```

**MongoDB的find()、findOne() 等命令在 mongoose里都可以使用**
具体可参考 ：https://mongoosejs.com/docs/api.html#model_Model.find



##   mongoose 修改和删除
参考： https://mongoosejs.com/docs/api.html#model_Model.update

### 修改方法：
* Model.update()
* Model.updateMany()
* Model.updateOne()
* Model.watch()

```js
personModel.update({name: '张宁乐'}, {$set: {age: 20}}, (err, data)=>{
   if(!err){
       console.log('修改成功！')
       console.log(data)
   }else{
       throw err;
   }
})
```
![4a9f49d480f66c5a64cb9a833459fdd.png](https://upload-images.jianshu.io/upload_images/7072486-22be72d3058566fa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 删除方法

* Model.remove()
* Model.deleteMany()
* Model.deleteOne()
```js
personModel.remove({name:'牛嘻嘻'}, (err)=>{
    if(!err){
        console.log('删除成功！')
    }else{
        throw err;
    }
})

```
### 统计文档条数 
* Model.count() 
```js
personModel.count({}, (err,count)=>{
    if(!err){
        console.log('查询条数成功！ 一共：' + count + '条');
    }else{
        throw err;
    }
})
```
![2b7684dc310af51ac7fb50e5daa1123.png](https://upload-images.jianshu.io/upload_images/7072486-25dcaed274322130.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##  Entity
 Entity—— 由Model创建的实体，使用save方法保存数据，Model和Entity的操作都能影响数据库的操作，但Model比Entity更具操作性。
使用Model创建Entity，如下示例:
```js
let mongoose= require('mongoose');
let db= mongoose.connection('mongodb://localhost/m_data');
db.on('open', ()=>{
    console.log('连接成功！')
})
let Schema= mongoose.Schema;
let personSchema= new Schema({
    name: String,
    sex: String,
    age: Number
});
let personModel= mongoose.model('person', personSchema);
let personEntity = new personModel({
    name: '许巍',
    sex: '男',
    age: 38
})
personEntity.save((err, person)=>{
    if(!err){
        console.log('保存成功！')
        console.log(person);
    }else{
        console.log('保存失败！')
    }
})
```
![c85c9b12f87f890e10e74f23555c802.png](https://upload-images.jianshu.io/upload_images/7072486-cef62c6a437fa126.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

参考：https://blog.csdn.net/swimming_in_IT_/article/details/80723866

