(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{413:function(t,n,a){"use strict";a.r(n);var e=a(43),s=Object(e.a)({},(function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("因为日常工作中经常使用到"),a("code",[t._v("this")]),t._v("，而且在JavaScript中"),a("code",[t._v("this")]),t._v("的指向问题也很容易让人混淆一部分知识。"),a("br"),t._v("\n这段时间翻阅了一些书籍也查阅了网上一些资料然后结合自己的经验，为了能让自己更好的理解"),a("code",[t._v("this")]),t._v("，进而总结一篇文章。")]),t._v(" "),a("h2",{attrs:{id:"this-是什么"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#this-是什么"}},[t._v("#")]),t._v(" this 是什么")]),t._v(" "),a("p",[a("code",[t._v("this")]),t._v("是 JavaScript 语言的一个关键字。它是函数运行时，在函数体内部自动生成的一个对象，只能在函数体内部使用。"),a("br"),t._v("\n实际是在函数被调用时才发生的绑定，也就是说"),a("code",[t._v("this")]),t._v("具体指向什么，取决于你是怎么调用的函数。")]),t._v(" "),a("h2",{attrs:{id:"this-指向的四种情况"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#this-指向的四种情况"}},[t._v("#")]),t._v(" this 指向的四种情况")]),t._v(" "),a("p",[t._v("这四种情况基本涵盖了JavaScript中常见的"),a("code",[t._v("this")]),t._v("指向问题")]),t._v(" "),a("h3",{attrs:{id:"_1-全局的函数调用，this指向window"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-全局的函数调用，this指向window"}},[t._v("#")]),t._v(" 1. 全局的函数调用，this指向window")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("var a = 1;\nfunction fn() {\n   console.log(this.a);\n}\nfn();  // 1\n")])])]),a("p",[t._v("这种 情况下的"),a("code",[t._v("this")]),t._v("其实就是"),a("code",[t._v("window")]),t._v("对象，这个很好理解。\n但是还有一种情况，就是匿名函数的"),a("code",[t._v("this")]),t._v("也会指向"),a("code",[t._v("window")]),t._v("。")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("var a= 'window';\nvar obj={a: 'object'}\nobj.fn=function(){\n\tconsole.log(this.a);//Object\n\t+function(){\n\t\tconsole.log(this.a)//window\n\t}()\n}\nobj.fn()\n")])])]),a("p",[t._v("匿名函数的执行环境具有全局性，因此它的"),a("code",[t._v("this")]),t._v("对象通常指向windows。"),a("br"),t._v("\n如果对此有疑惑，可以看知乎上的答案："),a("a",{attrs:{href:"https://www.zhihu.com/question/21958425",target:"_blank",rel:"noopener noreferrer"}},[t._v("知乎 - 匿名函数的this指向为什么是window?"),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"_2-作为对象方法的调用，this指向该对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-作为对象方法的调用，this指向该对象"}},[t._v("#")]),t._v(" 2. 作为对象方法的调用，this指向该对象")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("var a ='window'\nvar obj={\n  a: 'object',\n  fn: function(){\n    console.log(this.a);\n  }\n}\n\nobj.fn(); // object\n")])])]),a("p",[t._v("当函数作为某个对象的方法调用时，"),a("code",[t._v("this")]),t._v("就指这个函数所在的对象。")]),t._v(" "),a("h3",{attrs:{id:"_3-作为构造函数调用，this指向实例"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-作为构造函数调用，this指向实例"}},[t._v("#")]),t._v(" 3. 作为构造函数调用，this指向实例")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("function fn() {\n　this.x = 1;\n}\nvar obj = new fn();\nconsole.log(obj.x) // 1\n")])])]),a("p",[t._v("构造函数中的"),a("code",[t._v("this")]),t._v("，在通过"),a("code",[t._v("new")]),t._v("之后会生成一个新对象，this就指这个新对象。"),a("br"),t._v("\n对"),a("code",[t._v("new")]),t._v("有疑问的话，可以看 "),a("a",{attrs:{href:"https://github.com/mqyqingfeng/Blog/issues/13",target:"_blank",rel:"noopener noreferrer"}},[t._v("冴羽的博客 JavaScript深入之new的模拟实现 "),a("OutboundLink")],1)]),t._v(" "),a("h3",{attrs:{id:"_4-使用call-apply-bind调用-this指向第一个参数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-使用call-apply-bind调用-this指向第一个参数"}},[t._v("#")]),t._v(" 4. 使用call/apply/bind调用, this指向第一个参数")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("var obj1={\n  a: 'boj1'\n}\nvar obj2={\n  a: 'obj2'\n}\nvar obj3={\n  a: 'obj3'\n}\nfunction fn(){\n  console.log(this.a);\n}\n// apply\nfn.apply(obj1);// 'obj1'\n// call\nfn.call(obj2);// 'obj2'\n// bind\nvar fnBind= fn.bind(obj3);\nfnBind();// 'obj3'\n")])])]),a("p",[a("code",[t._v("call/ apply / bind")]),t._v("都有一个共同的特点，就是改变"),a("code",[t._v("this")]),t._v("的指向，使用这种方法可以把别人的方法拿过来用到自己身上。")]),t._v(" "),a("p",[t._v("第一个参数为 "),a("code",[t._v("null")]),t._v(" 的时候，视为指向 "),a("code",[t._v("window")]),t._v(".")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("var a='window'\nvar obj={\n  a: 'boj',\n  fn: function (){\n    console.log(this.a);\n  }\n}\nobj.fn.call(null);// 'window'\n")])])]),a("p",[t._v("在这里如果是"),a("code",[t._v("obj.fn()")]),t._v("调用的"),a("code",[t._v("fn()")]),t._v("方法，"),a("code",[t._v("this")]),t._v("应该指向"),a("code",[t._v("obj")]),t._v("没错。\n但是因为"),a("code",[t._v("call(null)")]),t._v("的存在，改变了指向，所以"),a("code",[t._v("this")]),t._v("指向了"),a("code",[t._v("window")]),t._v("。")]),t._v(" "),a("h2",{attrs:{id:"深入理解"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#深入理解"}},[t._v("#")]),t._v(" 深入理解")]),t._v(" "),a("p",[t._v("正因为比较难理解，所以"),a("code",[t._v("this")]),t._v("指向也是面试时最容易遇到的问题，比如下面这道我曾遇到的一个面试题：")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("var length = 10;\nfunction fn(){\n  console.log(this.length);\n}\nvar obj = {\n  length: 5,\n  method: function(fn){\n    fn();//10\n    arguments[0]();//2 这里的this指向的arguments，所以获取的是arguments.length\n  }\n};\nobj.method(fn, 1);\n")])])]),a("p",[t._v("在这道题里，不仅考察了对"),a("code",[t._v("this")]),t._v("熟悉程度，还考察了函数的传参形式、作用域、以及"),a("code",[t._v("arguments")]),t._v("这种特殊的数组的理解。"),a("br"),t._v("\n只有真正理解了这些才能正确的判断"),a("code",[t._v("this")]),t._v("究竟指向了谁。"),a("br"),t._v("\n所以，只有对"),a("code",[t._v("JavaScript")]),t._v("中的各项知识点深入理解，才会对"),a("code",[t._v("this")]),t._v("的概念越加清晰。")]),t._v(" "),a("p",[t._v("参考："),a("br"),t._v(" "),a("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("阮一峰 - Javascript 的 this 用法"),a("OutboundLink")],1),a("br"),t._v(" "),a("a",{attrs:{href:"http://caibaojian.com/deep-in-javascript-this.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("前端开发博客 - 深入理解JavaScript this"),a("OutboundLink")],1)])])}),[],!1,null,null,null);n.default=s.exports}}]);