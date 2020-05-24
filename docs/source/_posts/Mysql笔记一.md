---
title: Mysql常用命令
date: 2017-12-19 20:10:20
tags:  [php]
---
## 创建一个mysql表
输入命令 连接mysql 数据库
`winpty mysql -uroot -p`
1. 建数据库语句 
`create database name`
//创建 数据库   数据库名字

## 使用数据库
`use name`
//使用数据库 名字

1. 创建表语句
`create table name (id int auto_increment,name varchar(15),age int,sex char(2),primary key(id))`
//          名称   id 类型      自增     名字 可变的最多15                         主键数据唯一标示

2. 删除表
`drop table name`

3. 修改表
增加列
`alter table name add place varchar(20)`
删除列
`alter table name drop place`

4. 向数据表中插入数据
`insert into name(name,age,sex) values("zhang","10","male")`

5. 删除数据表中的数据
 `delete  from name where name="zhang"`

6. 修改表中的数据
`update name set name="www" where name="zhang"`

7. 查询数据表中的数据
`select * from name`
