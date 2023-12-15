module.exports = {
  title: "九旬的博客",
  description: "种一棵树最好的时间在十年前，其次是现在。",
  keywords: "前端开发，全栈开发，个人博客，JavaScript、Vue、React、ReactNative、Node，微信小程序,张宁乐，张宁乐的博客，九旬，九旬的博客，WEB前端技术博客，技术，博客",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/img/logo.ico",
      },
    ],
    [
      "script",
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?3cd236a05c52c534bbcc794ec45f52a3";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`,
    ],
  ],
  base: "/",
  erviceWorker: true,
  themeConfig: {
    sidebarDepth: 3,
    lastUpdatedText: "上次更新",
    navbar: [
      {
        text: "主页",
        link: "/",
      },
      {
        text: "技术文章",
        link: "/articles/",
      },
      {
        text: "计算机基础",
        link: "/computer-base/",
      },
      {
        text: "生活杂文",
        link: "/life-essay/",
      },
      {
        text: "关于",
        link: "/about/",
      },
      {
        text: "Github",
        link: "https://github.com/AnsonZnl",
      },
      {
        text: "社区链接",
        children: [
          {
            text: "掘金",
            link: "https://juejin.cn/user/4037062426631288",
          },
          {
            text: "SegmentFault",
            link: "https://segmentfault.com/u/ansonznl",
          },
        ],
      },
    ],
    sidebar: {
      "/life-essay/": [
        {
          text: "生活杂文",
          children: [
            {
              text: "把博客从Hexo迁移至VuePress",
              link: "/life-essay/把博客从Hexo迁移至VuePress.md",
            },
            {
              text: "2020年总结与2021年计划",
              link: "/life-essay/2020年总结与2021年计划.md",
            },
            {
              text: "2021年总结与2022年计划",
              link: "/life-essay/2021年总结与2022年计划.md",
            },
            {
              text: "2022年总结与2023年计划",
              link: "/life-essay/2022年总结与2023年计划.md",
            },
            {
              text: "Chrome常用插件",
              link: "/life-essay/Chrome常用插件.md",
            },
            {
              text: "VSCode常用插件",
              link: "/life-essay/VSCode常用插件.md",
            },
            {
              text: "VScode常用快捷键",
              link: "./VSCode常用快捷键.md",
            },
            {
              text: "如何提高自己的英文阅读水平",
              link: "./如何提高自己的英文阅读水平.md",
            },
            {
              text: "学会如何工作和学习技术一样重要",
              link: "./学会如何工作和学习技术一样重要.md",
            },
            {
              text: "我的颈椎病腰突康复历程",
              link: "./我的颈椎病腰突康复历程.md",
            },
          ],
        },
      ],
      "/computer-base/": [
        {
          text: "数据结构",
          link: "/computer-base/数据结构.md",
        },
        {
          text: "算法",
          link: "/computer-base/算法.md",
        },
        {
          text: "LeetCode",
          link: "/computer-base/LeetCode/两数之和.md",

          children: [
            {
              text: "只出现一次的数字",
              link: "/computer-base/LeetCode/只出现一次的数字.md",
            },
            {
              text: "两数之和",
              link: "/computer-base/LeetCode/两数之和.md",
            },
            {
              text: "有效的括号",
              link: "/computer-base/LeetCode/有效的括号.md",
            },
            {
              text: "合并两个有序链表",
              link: "/computer-base/LeetCode/合并两个有序链表.md",
            },
            {
              text: "最大子序和",
              link: "/computer-base/LeetCode/最大子序和.md",
            },
            {
              text: "回文数",
              link: "/computer-base/LeetCode/回文数.md",
            },
            {
              text: "爬楼梯",
              link: "/computer-base/LeetCode/爬楼梯.md",
            },
            {
              text: "合并两个有序数组",
              link: "/computer-base/LeetCode/合并两个有序数组.md",
            },
            {
              text: "对称二叉树",
              link: "/computer-base/LeetCode/对称二叉树.md",
            },
            {
              text: "二叉树的最大深度",
              link: "/computer-base/LeetCode/二叉树的最大深度.md",
            },
            {
              text: "翻转二叉树",
              link: "/computer-base/LeetCode/翻转二叉树.md",
            },
            {
              text: "合并二叉树",
              link: "/computer-base/LeetCode/合并二叉树.md",
            },
            {
              text: "反转链表",
              link: "/computer-base/LeetCode/反转链表.md",
            },
            {
              text: "字符串相加",
              link: "/computer-base/LeetCode/字符串相加.md",
            },
          ],
        },
        {
          text: "网络协议",
          link: "/computer-base/网络协议.md",
        },
        {
          text: "设计模式",
          link: "/computer-base/设计模式.md",
        },
        {
          text: "Git",
          link: "/computer-base/Git.md",
        },
      ],
      "/articles/": [
        {
          text: "前端知识体系",
          link: "/articles/KnowledgeSystem/",
        },
        {
          text: "前端技术分享",
          link: "/articles/Share/",

          children: [
            {
              text: "JavaScript专题之This和定时器",
              link: "/articles/Share/JavaScript专题之This和定时器.md",
            },
            {
              text: "JavaScript专题之异步编程",
              link: "/articles/Share/JavaScript专题之异步编程.md",
            },
            {
              text: "Vue专题之Vue基础",
              link: "/articles/Share/Vue专题之Vue基础.md",
            },
            {
              text: "Vue专题之Vue进阶",
              link: "/articles/Share/Vue专题之Vue进阶.md",
            },
            {
              text: "大屏定时截图上传需求复盘",
              link: "/articles/Share/大屏定时截图上传需求复盘.md",
            },
          ],
        },
        {
          text: "浏览器",
          link: "/articles/Browser/",
          children: [
            {
              text: "编写属于自己的音乐播放器",
              link: "/articles/Browser/编写属于自己的音乐播放器.md",
            },
            {
              text: "浏览器截屏方案分析",
              link: "/articles/Browser/浏览器截屏方案分析.md",
            },
            {
              text: "前端图片压缩方案",
              link: "/articles/Browser/前端图片压缩方案.md",
            },
            {
              text: "使用过WebWorker解决定时器不准确的问题",
              link: "/articles/Browser/使用过WebWorker解决定时器不准确的问题.md",
            },
            {
              text: "学会这些 Web API 使你的开发效率翻倍",
              link: "/articles/Browser/WebAPI.md",
            },
          ],
          //
        },
        {
          text: "HTML",
          link: "/articles/HTML/",
        },
        {
          text: "CSS",
          link: "/articles/CSS/",
        },
        {
          text: "JavaScript",
          link: "/articles/JavaScript/",
          children: [
            {
              text: "Proxy和Reflect",
              link: "/articles/JavaScript/Proxy和Reflect.md",
            },
            {
              text: "JS中常见的模块",
              link: "/articles/JavaScript/JS中常见的模块.md",
            },
            {
              text: "一次搞懂-JS事件循环之宏任务和微任务",
              link: "/articles/JavaScript/一次搞懂-JS事件循环之宏任务和微任务.md",
            },
            {
              text: "为什么要用setTimeout模拟setInterval？",
              link: "/articles/JavaScript/为什么要用setTimeout模拟setInterval？.md",
            },
            {
              text: "创建对象的几种方法及优缺点",
              link: "/articles/JavaScript/创建对象的几种方法及优缺点.md",
            },
            {
              text: "关于跨域",
              link: "/articles/JavaScript/关于跨域.md",
            },
            {
              text: "理解JS原型链",
              link: "/articles/JavaScript/理解JS原型链.md",
            },
            {
              text: "JS浅拷贝与深拷贝",
              link: "/articles/JavaScript/JS浅拷贝与深拷贝.md",
            },
            {
              text: "我对JavaScript中this的一些理解",
              link: "/articles/JavaScript/我对JavaScript中this的一些理解.md",
            },
            {
              text: "JavaScript的预编译过程分析",
              link: "/articles/JavaScript/JavaScript的预编译过程分析.md",
            },
            {
              text: "JavaScript对象原型链",
              link: "/articles/JavaScript/JavaScript对象原型链.md",
            },
            {
              text: "前端文件下载的正确打开方式",
              link: "/articles/JavaScript/前端文件下载的正确打开方式.md",
            },
          ],
        },
        {
          text: "TypeScript",
          link: "/articles/TypeScript/",
        },
        {
          text: "React",
          link: "/articles/React/",
          children: [
            {
              text: "React中实现简单的Toast组件",
              link: "/articles/React/React中实现简单的Toast组件.md",
            },
            {
              text: "useState的原理及实现",
              link: "/articles/React/useState的原理及实现.md",
            },
            {
              text: "从JSX到真实DOM的过程",
              link: "/articles/React/从JSX到真实DOM的过程.md",
            },
          ],
        },
        {
          text: "React Native",
          link: "/articles/ReactNative/",
        },
        {
          text: "Vue",
          link: "/articles/Vue/",
          children: [
            {
              text: "深入理解Vue的指令系统",
              link: "/articles/Vue/深入理解Vue的指令系统.md",
            },
            {
              text: "Vue模板编译原理解析",
              link: "/articles/Vue/Vue模板编译原理解析.md",
            },
            {
              text: "nextTick原理",
              link: "/articles/Vue/nextTick原理解析.md",
            },
            {
              text: "Vue常见问题解析",
              link: "/articles/Vue/Vue常见问题解析.md",
            },
            {
              text: "虚拟DOM之Diff算法",
              link: "/articles/Vue/虚拟DOM之Diff算法.md",
            },
            {
              text: "一次搞懂-Vue之虚拟DOM",
              link: "/articles/Vue/一次搞懂-Vue之虚拟DOM.md",
            },
            {
              text: "Vuex原理解析",
              link: "/articles/Vue/Vuex原理解析.md",
            },
            {
              text: "Vue-Router原理解析",
              link: "/articles/Vue/Vue-Router原理解析.md",
            },
            {
              text: "Vue知识点总结",
              link: "/articles/Vue/Vue知识点总结.md",
            },
            {
              text: "Vue中的验证登录状态",
              link: "/articles/Vue/Vue中的验证登录状态.md",
            },
            {
              text: "Vue3对比Vue2有哪些变化",
              link: "/articles/Vue/Vue3对比Vue2有哪些变化.md",
            },
            {
              text: "Vue2.x的双向绑定原理及实现",
              link: "/articles/Vue/Vue2.x的双向绑定原理及实现.md",
            },
          ],
        },
        {
          text: "微信小程序/H5",
          link: "/articles/WeApp/",

          children: [
            {
              text: "小程序性能优化和异常监控",
              link: "/articles/WeApp/小程序性能优化和异常监控.md",
            },
            {
              text: "小程序开发相关总结",
              link: "/articles/WeApp/小程序开发相关总结.md",
            },
            {
              text: "公众号网页开发经验总结",
              link: "/articles/WeApp/公众号网页开发经验总结.md",
            },
            {
              text: "从前端的角度来梳理微信支付（小程序、H5、JSAPI）的流程",
              link: "/articles/WeApp/从前端的角度来梳理微信支付（小程序、H5、JSAPI）的流程.md",
            },
            {
              text: "微信小程序用户授权之最佳实践",
              link: "/articles/WeApp/微信小程序用户授权之最佳实践.md",
            },
            {
              text: "使用Promise封装小程序wx.request",
              link: "/articles/WeApp/使用Promise封装小程序wx.request.md",
            },
            {
              text: "微信小程序动态加载swiper时不显示的问题（爬坑）",
              link: "/articles/WeApp/微信小程序动态加载swiper时不显示的问题（爬坑）.md",
            },
            {
              text: "微信小程序授权登录弹框组件",
              link: "/articles/WeApp/微信小程序授权登录弹框组件.md",
            },
            {
              text: "解决gif图片只渲染一次的问题",
              link: "/articles/WeApp/解决gif图片只渲染一次的问题.md",
            },
            {
              text: "小程序-实现蒙版弹出窗",
              link: "/articles/WeApp/小程序-实现蒙版弹出窗.md",
            },
            {
              text: "小程序之瀑布流布局",
              link: "/articles/WeApp/小程序之瀑布流布局.md",
            },
            {
              text: "小程序之iPhoneX适配",
              link: "/articles/WeApp/小程序之iPhoneX适配.md",
            },
            {
              text: "小程序中图片点击全屏-可滑动",
              link: "/articles/WeApp/小程序中图片点击全屏-可滑动.md",
            },
            {
              text: "在小程序中自定义弹窗组件",
              link: "/articles/WeApp/在小程序中自定义弹窗组件.md",
            },
            {
              text: "在小程序中使用async&await",
              link: "/articles/WeApp/在小程序中使用async&await.md",
            },
            {
              text: "小程序中使用Less（最优方式）",
              link: "/articles/WeApp/小程序中使用Less（最优方式）.md",
            },
            {
              text: "小程序生成海报图片并保存",
              link: "/articles/WeApp/小程序生成海报图片并保存.md",
            },
            {
              text: "IOS微信浏览器视频自动播放问题解决方法",
              link: "/articles/WeApp/IOS微信浏览器视频自动播放问题解决方法.md",
            },
          ],
        },
        {
          text: "Node",
          link: "/articles/Node/",
          children: [
            {
              text: "使用PM2部署Next服务",
              link: "/articles/Next/使用PM2部署Next服务.md",
            },
            {
              text: "为了方便写文章，我开发了一个目录树🌲生成器",
              link: "/articles/Next/为了方便写文章，我开发了一个目录树🌲生成器.md",
            },
            {
              text: "如何将Next.js部署到Github Pages",
              link: "/articles/Next/如何将Next.js部署到GithubPages.md",
            },
            {
              text: "使用Next 13、Vercel、Prisma开发的全栈 TodoList",
              link: "/articles/Next/使用Next13、Vercel、Prisma开发的全栈TodoList.md",
            },
            {
              text: "初试MongoDB数据库",
              link: "/articles/Node/初试MongoDB数据库.md",
            },
            {
              text: "NodeJS安装和使用",
              link: "/articles/Node/NodeJS安装和使用.md",
            },
            {
              text: "NodeJs文件系统（fs）与流（stream）",
              link: "/articles/Node/NodeJs文件系统（fs）与流（stream）.md",
            },
            {
              text: "使用Node.js写一个简单的api接口",
              link: "/articles/Node/使用Node.js写一个简单的api接口.md",
            },
            {
              text: "使用Express搭建一个简单的服务器",
              link: "/articles/Node/使用Express搭建一个简单的服务器.md",
            },
            {
              text: "使用Node.js搭建静态服务器",
              link: "/articles/Node/使用Node.js搭建静态服务器.md",
            },
            {
              text: "MongoDB学习之Mongoose的使用",
              link: "/articles/Node/MongoDB学习之Mongoose的使用.md",
            },
            {
              text: "MongoDB中常用语句",
              link: "/articles/Node/MongoDB中常用语句.md",
            },
            {
              text: "koa系列（1）-中间件开发和使用",
              link: "/articles/Node/koa系列（1）-中间件开发和使用.md",
            },
            {
              text: "koa系列（2）-koa2路由实现",
              link: "/articles/Node/koa系列（2）-koa2路由实现.md",
            },
            {
              text: "koa系统（3）-原生koa实现静态资源服务器",
              link: "/articles/Node/koa系统（3）-原生koa实现静态资源服务器.md",
            },
            {
              text: "koa系列（4）-koa实现cookie和session",
              link: "/articles/Node/koa系列（4）-koa实现cookie和session.md",
            },
            {
              text: "koa系列（5）-上传文件",
              link: "/articles/Node/koa系列（5）-上传文件.md",
            },
            {
              text: "NodeJS中Http模块",
              link: "/articles/Node/NodeJS中Http模块.md",
            },
            {
              text: "中间件引擎实现",
              link: "/articles/Node/中间件引擎实现.md",
            },
            {
              text: "最简Koa实现",
              link: "/articles/Node/最简Koa实现.md",
            },
            {
              text: "Koa源码解析与实现",
              link: "/articles/Node/Koa源码解析与实现.md",
            },
          ],
        },
        {
          text: "前端工程化",
          link: "/articles/Engineering/",
          children: [
            {
              text: "Win10安装Docker以及Jenkins(超级详细篇)",
              link: "/articles/Engineering/Win10安装Docker以及Jenkins(超级详细篇).md",
            },
            {
              text: "常用构建工具(Webpack、Vite、Rollup)详解",
              link: "/articles/Engineering/常用构建工具(Webpack、Vite、Rollup)详解.md",
            },
          ],
        },
        {
          text: "前端性能优化",
          link: "/articles/Performance/",

          children: [
            {
              text: "JS事件循环之宏任务和微任务",
              link: "/articles/Performance/JS事件循环之宏任务和微任务.md",
            },
            {
              text: "事件的防抖和节流",
              link: "/articles/Performance/事件的防抖和节流.md",
            },
            {
              text: "使用Documentfragment优化DOM操作",
              link: "/articles/Performance/使用Documentfragment优化DOM操作.md",
            },
            {
              text: "首屏优化之懒加载",
              link: "/articles/Performance/首屏优化之懒加载.md",
            },
            {
              text: "浏览器缓存机制",
              link: "/articles/Performance/浏览器缓存机制.md",
            },
            {
              text: "DOM优化之重绘和回流",
              link: "/articles/Performance/DOM优化之重绘和回流.md",
            },
            {
              text: "微信小程序性能优化",
              link: "/articles/Performance/微信小程序性能优化.md",
            },
          ],
        },
        {
          text: "Java",
          link: "/articles/Java/",
          children: [],
        },
        {
          text: "安全",
          link: "/articles/Security/",
        },
        {
          text: "源码系列",
          link: "/articles/SourceCode/",

          children: [],
        },
        {
          text: "正则表达式",
          link: "/articles/RegExp/",

          children: [],
        },
        {
          text: "阅读列表",
          link: "/articles/ReadList/",
          children: [],
        },
      ],
    },
  },
};
// window.imgBase = 'https://gitee.com/zhangningle/imgs/raw/master/'
