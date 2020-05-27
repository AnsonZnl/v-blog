(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{421:function(a,t,s){"use strict";s.r(t);var v=s(43),r=Object(v.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h2",{attrs:{id:"一、javascript概念"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、javascript概念"}},[a._v("#")]),a._v(" 一、JavaScript概念")]),a._v(" "),s("p",[a._v("JavaScript ( JS ) 是一个单线程、解释型的编程语言。")]),a._v(" "),s("h2",{attrs:{id:"二、javascript语言特点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、javascript语言特点"}},[a._v("#")]),a._v(" 二、JavaScript语言特点")]),a._v(" "),s("h3",{attrs:{id:"_2-1-单线程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-单线程"}},[a._v("#")]),a._v(" 2.1 单线程")]),a._v(" "),s("p",[a._v("JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。")]),a._v(" "),s("h3",{attrs:{id:"_2-2-解释型语言"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-解释型语言"}},[a._v("#")]),a._v(" 2.2 解释型语言")]),a._v(" "),s("p",[a._v("自上而下，解释一行，执行一行；不会通篇编译为一个文件再执行。")]),a._v(" "),s("h2",{attrs:{id:"三、-javascript执行过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、-javascript执行过程"}},[a._v("#")]),a._v(" 三、 JavaScript执行过程")]),a._v(" "),s("h3",{attrs:{id:"_3-1-语法分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-语法分析"}},[a._v("#")]),a._v(" 3.1 语法分析")]),a._v(" "),s("p",[a._v("顾名思义 就是检查一遍js代码内有没有出现语法错误（比如少些个分号，多写个括号等）；语法分析期间不会执行代码")]),a._v(" "),s("h3",{attrs:{id:"_3-2-预编译"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-预编译"}},[a._v("#")]),a._v(" 3.2 预编译")]),a._v(" "),s("p",[s("strong",[a._v("预编译发生在函数执行的前一刻")]),a._v(" "),s("strong",[a._v("全局下：")]),a._v("\n全局的变量声明和函数声明则会存放在全局对象内（Global Object 简称GO，它是window的一部分，你可以直接把他理解成window对象）中\n"),s("strong",[a._v("函数体内：")]),a._v("\n预编译会提前把函数里的变量声明和函数声明依据规则存放在该活动对象内（Activation Object，简称AO），")]),a._v(" "),s("p",[a._v("预编译简单理解就是在内存中开辟一些空间，存放一些变量与函数 。")]),a._v(" "),s("p",[a._v("预编译大致可分为4步：")]),a._v(" "),s("ol",[s("li",[a._v("创建AO(GO)对象")]),a._v(" "),s("li",[a._v("找形参和变量声明，将形参和变量名作为AO(GO)属性名，值为undefined")]),a._v(" "),s("li",[a._v("将实参值和形参统一")]),a._v(" "),s("li",[a._v("在函数体里面找函数声明，值赋予函数体。")])]),a._v(" "),s("p",[a._v("所以如果遇到下面这种情况，当函数声明和变量声明名称相同时：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("console.log(a); \nvar a= 1;\nfunction a(){};\n")])])]),s("p",[a._v("编译后的代码其实是：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("var a;\nfunction a(){};\nconsole.log(a);\na= 1;\n")])])]),s("p",[a._v("所以最后输出的是：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("function a() {}\n")])])]),s("h4",{attrs:{id:"预编译小节"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#预编译小节"}},[a._v("#")]),a._v(" 预编译小节")]),a._v(" "),s("p",[s("strong",[a._v("预编译两个小规则")])]),a._v(" "),s("ol",[s("li",[a._v("函数声明整体提升—(具体点说，无论函数调用和声明的位置是前是后，系统总会把函数声明移到调用前面）")]),a._v(" "),s("li",[a._v("变量 声明提升—(具体点说，无论变量调用和声明的位置是前是后，系统总会把声明移到调用前，注意仅仅只是声明，所以值是undefined），只有在解释执行阶段才会进行变量初始化，匿名函数不参与预编译。")])]),a._v(" "),s("p",[s("strong",[a._v("预编译前奏")])]),a._v(" "),s("ol",[s("li",[a._v("imply global 即任何变量，如果未经声明就赋值，则此变量就位全局变量所有(全局域就是window) 。")]),a._v(" "),s("li",[a._v("一切声明的全局变量，全是window的属性。")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("<script>\n  var a=2; \n  console.log(window.a);//2\n<\/script>\n")])])]),s("h3",{attrs:{id:"_3-3-解释执行"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-解释执行"}},[a._v("#")]),a._v(" 3.3 解释执行")]),a._v(" "),s("p",[a._v("预编译完毕之后，JavaScript 脚本开始执行，执行顺序按照从上到下的顺序执行。")]),a._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),s("p",[s("strong",[a._v("JavaScript执行顺序")])]),a._v(" "),s("ol",[s("li",[a._v("语法分析")]),a._v(" "),s("li",[a._v("预编译"),s("br"),a._v("\n2.1. 创建AO(GO)对象"),s("br"),a._v("\n2.2. 找形参和变量声明，将形参和变量名作为AO(GO)属性名，值为undefined"),s("br"),a._v("\n2.3. 将实参值和形参统一"),s("br"),a._v("\n2.4. 在函数体里面找函数声明，值赋予函数体。")]),a._v(" "),s("li",[a._v("解释执行")])]),a._v(" "),s("p",[a._v("练习：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("function a(a){\n    console.log(a);\n    a= 2;\n    console.log(b);\n    var b= 3;\n    console.log(a);\n}\na(1);\nconsole.log(a);\n")])])]),s("p",[a._v("你可以先试想一下结果，然后复制代码到控制台去验证你的答案是否正确。")])])}),[],!1,null,null,null);t.default=r.exports}}]);