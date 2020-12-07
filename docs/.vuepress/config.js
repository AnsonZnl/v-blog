module.exports = {
  title: 'Anson\'s Blog',
  description: '种一棵树最好的时间在十年前，其次是现在。',
  keywords: "前端开发，个人博客，JavaScript、Vue、Node，微信小程序,张宁乐，张宁乐的博客，WEB前端技术博客",
  head: [
    ['link', {
      rel: 'icon',
      href: '/img/logo.ico'
    }]
  ],
  themeConfig: {
    sidebarDepth: 2,
    smoothScroll: true,
    lastUpdated: '上次更新',
    nav: [{
        text: 'Home',
        link: '/'
      },
      {
        text: '前端',
        link: '/articles/',
        // items: [{
        //   text: 'JavaScript',
        //   link: '/articles/JavaScript/'
        // },{
        //   text: 'Vue',
        //   link: '/articles/Vue/'
        // },{
        //   text: '小程序',
        //   link: '/articles/小程序/'
        // },{
        //   text: 'Node',
        //   link: '/articles/Node/'
        // },{
        //   text: 'TypeScript',
        //   link: '/articles/TypeScript笔记.md'
        // }]
      },
      {
        text: '计算机基础',
        link: '/computer-base/'
      },
      {
        text: '生活杂文',
        link: '/life-essay/'
      },
      // {
      //   text: '友情链接',
      //   items: [
      //     {
      //       text: "JustSong's Blog",
      //       link: 'https://iamazing.cn'
      //     },
      //   ]
      // },
      {
        text: '关于',
        link: '/about/'
      },
      {
        text: 'Github',
        link: 'https://github.com/AnsonZnl'
      },
    ],
    sidebar: {
      "/life-essay/": [{
        title: '博客迁移',
        path: '/life-essay/把博客从Hexo迁移至VuePress'
      }, {
        title: 'Chrome常用插件',
        path: '/life-essay/Chrome常用插件'
      }, {
        title: 'VSCode常用插件',
        path: '/life-essay/VSCode常用插件'
      }, {
        title: '如何正确的使用你的时间',
        path: '/life-essay/如何正确的使用你的时间'
      }, {
        title: '如何不靠运气变富有',
        path: '/life-essay/如何不靠运气变富有'
      }],
      "/computer-base/": [{
          title: '数据结构',
          path: '/computer-base/数据结构'
        },
        {
          title: '算法',
          path: '/computer-base/算法'
        },
        {
          title: '网络协议',
          path: '/computer-base/网络协议'
        },
        {
          title: '设计模式',
          path: '/computer-base/设计模式'
        },
        {
          title: 'Git',
          path: '/computer-base/Git'
        }
      ],
      "/articles/": [{
          title: 'JavaScript',
          path: '/articles/JavaScript/',
          collapsable: true,
          children: [{
              title: '创建对象的几种方法及优缺点',
              path: '/articles/JavaScript/创建对象的几种方法及优缺点'
            },
            {
              title: '关于跨域',
              path: '/articles/JavaScript/关于跨域'
            },
            {
              title: '理解JS原型链',
              path: '/articles/JavaScript/理解JS原型链'
            },
            {
              title: 'JS浅拷贝与深拷贝',
              path: '/articles/JavaScript/JS浅拷贝与深拷贝'
            },
            {
              title: '我对JavaScript中this的一些理解',
              path: '/articles/JavaScript/我对JavaScript中this的一些理解'
            },
            {
              title: 'JavaScript的预编译过程分析',
              path: '/articles/JavaScript/JavaScript的预编译过程分析'
            },
            {
              title: 'JavaScript对象原型链',
              path: '/articles/JavaScript/JavaScript对象原型链'
            }
          ]
        },
        {
          title: 'TypeScript',
          path: '/articles/TypeScript/',
          collapsable: true
        },
        {
          title: 'CSS',
          path: '/articles/CSS/',
          collapsable: true
        },
        {
          title: 'Vue',
          path: '/articles/Vue/',
          collapsable: true,
          children: [{
              title: 'Vue知识点总结',
              path: '/articles/Vue/Vue知识点总结'
            },
            {
              title: 'Vue中的验证登录状态',
              path: '/articles/Vue/Vue中的验证登录状态'
            }
          ]
        },
        {
          title: '小程序',
          path: '/articles/小程序/',
          collapsable: true,
          children: [{
              title: '微信支付',
              path: '/articles/小程序/微信支付'
            }, {
              title: '使用Promise封装小程序wx.request',
              path: '/articles/小程序/使用Promise封装小程序wx.request'
            },
            {
              title: '微信小程序动态加载swiper时不显示的问题（爬坑）',
              path: '/articles/小程序/微信小程序动态加载swiper时不显示的问题（爬坑）'
            },
            {
              title: '微信小程序授权登录弹框组件',
              path: '/articles/小程序/微信小程序授权登录弹框组件'
            },
            {
              title: '解决gif图片只渲染一次的问题',
              path: '/articles/小程序/解决gif图片只渲染一次的问题'
            },
            {
              title: '小程序-实现蒙版弹出窗',
              path: '/articles/小程序/小程序-实现蒙版弹出窗'
            },
            {
              title: '小程序之瀑布流布局',
              path: '/articles/小程序/小程序之瀑布流布局'
            },
            {
              title: '小程序之iPhoneX适配',
              path: '/articles/小程序/小程序之iPhoneX适配'
            },
            {
              title: '小程序中图片点击全屏-可滑动',
              path: '/articles/小程序/小程序中图片点击全屏-可滑动'
            },
            {
              title: '在小程序中自定义弹窗组件',
              path: '/articles/小程序/在小程序中自定义弹窗组件'
            },
            {
              title: '在小程序中使用async&await',
              path: '/articles/小程序/在小程序中使用async&await'
            },
            {
              title: '小程序中使用Less（最优方式）',
              path: '/articles/小程序/小程序中使用Less（最优方式）'
            },
            {
              title: '小程序生成海报图片并保存',
              path: '/articles/小程序/小程序生成海报图片并保存'
            }
          ]
        },
        {
          title: 'Node',
          path: '/articles/Node/',
          collapsable: true,
          children: [{
              title: '初试MongoDB数据库',
              path: '/articles/Node/初试MongoDB数据库'
            },
            {
              title: 'NodeJS安装和使用',
              path: '/articles/Node/NodeJS安装和使用'
            },
            {
              title: 'NodeJs文件系统（fs）与流（stream）',
              path: '/articles/Node/NodeJs文件系统（fs）与流（stream）'
            },
            {
              title: '使用Node.js写一个简单的api接口',
              path: '/articles/Node/使用Node.js写一个简单的api接口'
            },
            {
              title: '使用Express搭建一个简单的服务器',
              path: '/articles/Node/使用Express搭建一个简单的服务器'
            },
            {
              title: '使用Node.js搭建静态服务器',
              path: '/articles/Node/使用Node.js搭建静态服务器'
            },
            {
              title: 'MongoDB学习之Mongoose的使用',
              path: '/articles/Node/MongoDB学习之Mongoose的使用'
            },
            {
              title: 'MongoDB中常用语句',
              path: '/articles/Node/MongoDB中常用语句'
            }
          ]
        },
        {
          title: '前端性能优化',
          path: '/articles/Performance/',
          collapsable: true,
          children: [{
              title: 'JS事件循环之宏任务和微任务',
              path: '/articles/Performance/JS事件循环之宏任务和微任务'
            },
            {
              title: '事件的防抖和节流',
              path: '/articles/Performance/事件的防抖和节流'
            },
            {
              title: '使用Documentfragment优化DOM操作',
              path: '/articles/Performance/使用Documentfragment优化DOM操作'
            },
            {
              title: '首屏优化之懒加载',
              path: '/articles/Performance/首屏优化之懒加载'
            },
            {
              title: '本地储存之Cookie、webStorage、indexedDB',
              path: '/articles/Performance/本地储存之Cookie、webStorage、indexedDB'
            },
            {
              title: 'DOM优化之重绘和回流',
              path: '/articles/Performance/DOM优化之重绘和回流'
            },
            {
              title: 'HTTP之缓存机制解析',
              path: '/articles/Performance/HTTP之缓存机制解析'
            }, {
              title: '微信小程序性能优化',
              path: '/articles/Performance/微信小程序性能优化'
            }
          ]
        },
        {
          title: '正则表达式',
          path: '/articles/Regex/',
          collapsable: true,
          children: []
        }, {
          title: '源码系列',
          path: '/articles/SourceCode/',
          collapsable: true,
          children: []
        }

      ]
    }
  }
}