(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{359:function(n,t,a){"use strict";a.r(t);var e=a(43),c=Object(e.a)({},(function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[a("h3",{attrs:{id:"php-oop-面向对象编程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#php-oop-面向对象编程"}},[n._v("#")]),n._v(" php-oop(面向对象编程)")]),n._v(" "),a("h4",{attrs:{id:"oop的特点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#oop的特点"}},[n._v("#")]),n._v(" oop的特点")]),n._v(" "),a("ul",[a("li",[n._v("php面向对象编程的特点：封装性、继承性、多态性")]),n._v(" "),a("li",[n._v("面向对象编程的优势：代码功能更加清晰，数据处理，用户登陆，内容呈现等各写成一个类，在页面中只需包含这些类、实例化对象，然后再用简洁的语句应用对象就行")]),n._v(" "),a("li",[n._v("类与对象关系：类就像一个人类的群体 我们从类中实例化一个对象 就像是制定一个人。\n面向对象程序的单位就是对象，但对象又是通过类的实例化出来的，所以我们首先要做的就是如何来声明类， 做出来一个类很容易。\n类是一个抽象的概念,具有相同属性（特征）和方法（行为）的一系列个体的集合.\n类的格式："),a("code",[n._v("class 类名 { }")]),n._v("\n类可以理解为一个人的群体，如果我们要把这个人介绍给别人 那么")])]),n._v(" "),a("p",[n._v("首先， 你会介绍这个人姓名、性别、年龄、身高、体重、电话、家庭住址等等。")]),n._v(" "),a("p",[n._v("然后，你要介绍这个人能做什么， 可以开车， 会说英语， 可以使用电脑等等。")]),n._v(" "),a("p",[n._v("从定义的角度可以分为：")]),n._v(" "),a("p",[n._v("1.静态的描述 如：人的姓名、性别、年龄、身高、体重、电话、家庭住址等等 我们将静态的描述称为成员属性")]),n._v(" "),a("p",[n._v("2.动态描述  如：这个人可以开车， 会说英语， 可以使用电脑等等   我们将动态的描述称为成员方法")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v("class 人\n{\n   成员属性：姓名、性别、年龄、身高、体重、电话、家庭住址\n   成员方法：可以开车， 会说英语， 可以使用电脑\n}\n")])])]),a("p",[n._v("一个类的基本构成包括属性和方法，比如我们创建一个Animal类：")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v('class Animal{\n   public $name;\n   // 全局\n   protected $money;\n   //受保护的\n   private $count;\n   //私有的\n   static $num=10;\n   //静态属性 直接用类名调用静态属性  静态属性和静态方法属于类 普通方法也能用静态属性\n   static function asyNum(){\n       //静态方法静 态方法中只能用静态属性\n       echo "<br>调用静态方法中的num是".self::$num;\n       //     静态方法中只能用静态属性  self 引用静态属性$num\n   }\n   function __construct($name1)\n       //     在构造函数里传参数\n   {\n       $this->name=$name1;\n//        初始值\n   }\n\n   function sayName(){\n       echo "<br>他的名字是".$this->name;\n//                          当前函数的\n   }\n//    析构函数 是当对象执行完毕后会销毁对象然后执行析构函数， 析构函数销毁的是new 后的对象 然不是类\n   function __destruct()\n   {\n       // TODO: Implement __destruct() method.\n       echo "<br>对象执行完毕.对象已销毁。只销毁对象不销毁class";\n   }\n\n}\n\n$lis=new Animal("小白");\n///              传参\n$lis->sayName();\necho "<br>静态属性".Animal::$num;\necho Animal::asyNum();\nclass Cat extends  Animal{\n//    继承非私有的属性和方法\n// 方法重写\nfunction sayName(){\n   parent::sayName();\n   //调用父类的方法  方法重写\n   echo "<br>子类的方法";\n   echo "<br>调用父类的静态".parent::$num;\n}\n}\n$cat=new Cat("123");\n$cat->sayName();\n')])])]),a("p",[n._v("public 表示全局，类内部外部子类都可以访问；\nprivate表示私有的，只有本类内部可以使用；\nprotected表示受保护的，只有本类或子类或父类中可以访问；")]),n._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[n._v(' <?\n    //父类\n    class father{\n     public function a(){\n      echo "function a";\n     }\n     private function b(){\n      echo "function b";\n     }\n     protected function c(){\n      echo "function c";\n     }\n    }\n    //子类\n    class child extends father{\n      function d(){\n        parent::a();//调用父类的a方法\n      }\n      function e(){\n       parent::c(); //调用父类的c方法\n      }\n     function f(){\n        parent::b(); //调用父类的b方法\n      }\n    }\n    $father=new father();\n    $father->a();\n    $father->b(); //显示错误 外部无法调用私有的方法 Call to protected method father::b()\n    $father->c(); //显示错误 外部无法调用受保护的方法Call to private method father::c()\n    $chlid=new child();\n    $chlid->d();\n    $chlid->e();\n    $chlid->f();//显示错误 无法调用父类private的方法 Call to private method father::b()\n    ?>\n')])])]),a("p",[n._v("静态属性的 用法：\n子类调用父类的静态属性 加parent：：\n在自己内部的静态方法中调用自己的的静态属性 加self：：")])])}),[],!1,null,null,null);t.default=c.exports}}]);