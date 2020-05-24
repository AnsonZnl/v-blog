---
title: php笔记之oop笔记一
date: 2017-12-18 19:42:02
tags: "php"
---
### php-oop(面向对象编程)

#### oop的特点

* php面向对象编程的特点：封装性、继承性、多态性
* 面向对象编程的优势：代码功能更加清晰，数据处理，用户登陆，内容呈现等各写成一个类，在页面中只需包含这些类、实例化对象，然后再用简洁的语句应用对象就行
* 类与对象关系：类就像一个人类的群体 我们从类中实例化一个对象 就像是制定一个人。
 面向对象程序的单位就是对象，但对象又是通过类的实例化出来的，所以我们首先要做的就是如何来声明类， 做出来一个类很容易。
 类是一个抽象的概念,具有相同属性（特征）和方法（行为）的一系列个体的集合.
类的格式：``class 类名 { }``
类可以理解为一个人的群体，如果我们要把这个人介绍给别人 那么

首先， 你会介绍这个人姓名、性别、年龄、身高、体重、电话、家庭住址等等。

然后，你要介绍这个人能做什么， 可以开车， 会说英语， 可以使用电脑等等。

从定义的角度可以分为：

1.静态的描述 如：人的姓名、性别、年龄、身高、体重、电话、家庭住址等等 我们将静态的描述称为成员属性

2.动态描述  如：这个人可以开车， 会说英语， 可以使用电脑等等   我们将动态的描述称为成员方法
 ```
 class 人
{
	成员属性：姓名、性别、年龄、身高、体重、电话、家庭住址
	成员方法：可以开车， 会说英语， 可以使用电脑
}
 ```
 一个类的基本构成包括属性和方法，比如我们创建一个Animal类：
 ```
class Animal{
    public $name;
    // 全局
    protected $money;
    //受保护的
    private $count;
    //私有的
    static $num=10;
    //静态属性 直接用类名调用静态属性  静态属性和静态方法属于类 普通方法也能用静态属性
    static function asyNum(){
        //静态方法静 态方法中只能用静态属性
        echo "<br>调用静态方法中的num是".self::$num;
        //     静态方法中只能用静态属性  self 引用静态属性$num
    }
    function __construct($name1)
        //     在构造函数里传参数
    {
        $this->name=$name1;
//        初始值
    }

    function sayName(){
        echo "<br>他的名字是".$this->name;
//                          当前函数的
    }
//    析构函数 是当对象执行完毕后会销毁对象然后执行析构函数， 析构函数销毁的是new 后的对象 然不是类
    function __destruct()
    {
        // TODO: Implement __destruct() method.
        echo "<br>对象执行完毕.对象已销毁。只销毁对象不销毁class";
    }

}

$lis=new Animal("小白");
///              传参
$lis->sayName();
echo "<br>静态属性".Animal::$num;
echo Animal::asyNum();
class Cat extends  Animal{
//    继承非私有的属性和方法
// 方法重写
function sayName(){
    parent::sayName();
    //调用父类的方法  方法重写
    echo "<br>子类的方法";
    echo "<br>调用父类的静态".parent::$num;
}
}
$cat=new Cat("123");
$cat->sayName();
```
public 表示全局，类内部外部子类都可以访问；
private表示私有的，只有本类内部可以使用；
protected表示受保护的，只有本类或子类或父类中可以访问；
```
 <?
    //父类
    class father{
     public function a(){
      echo "function a";
     }
     private function b(){
      echo "function b";
     }
     protected function c(){
      echo "function c";
     }
    }
    //子类
    class child extends father{
      function d(){
        parent::a();//调用父类的a方法
      }
      function e(){
       parent::c(); //调用父类的c方法
      }
     function f(){
        parent::b(); //调用父类的b方法
      }
    }
    $father=new father();
    $father->a();
    $father->b(); //显示错误 外部无法调用私有的方法 Call to protected method father::b()
    $father->c(); //显示错误 外部无法调用受保护的方法Call to private method father::c()
    $chlid=new child();
    $chlid->d();
    $chlid->e();
    $chlid->f();//显示错误 无法调用父类private的方法 Call to private method father::b()
    ?>
```
静态属性的 用法：
子类调用父类的静态属性 加parent：：
在自己内部的静态方法中调用自己的的静态属性 加self：：