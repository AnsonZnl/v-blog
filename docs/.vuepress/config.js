module.exports = {
  title: 'Anson\'s Blog',
  description: '种一棵树最好的时间在十年前，其次是现在。',
  keywords: "前端开发，个人博客，JavaScript、Vue、Node，微信小程序，",
  head: [
    ['link', {
      rel: 'icon',
      href: '/img/logo.ico'
    }]
  ],
  themeConfig: {
    nav: [{
        text: 'Home',
        link: '/'
      },
      {
        text: '博文',
        link: '/articles/'
      },
      {
        text: '笔记',
        link: '/notes/'
      },
      {
        text: '思考',
        link: '/thinks/'
      },
      {
        text: '关于',
        link: '/about/'
      },
      {
        text: '掘金',
        link: 'https://juejin.im/user/5a2ff11451882559e225a140'
      },
      {
        text: 'Github',
        link: 'https://github.com/AnsonZnl'
      },
    ],
    sidebar: {
      "/articles/": [{
          title: 'JavaScript',
          path: '/articles/JavaScript/',
          collapsable: true,
          sidebarDepth: 2,
          children: [{
              title: '目录',
              path: '/articles/JavaScript/'
            },
            {
              title: 'JS创建对象的几种方法及优缺点',
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
              title: '深浅拷贝',
              path: '/articles/JavaScript/深浅拷贝'
            },
            {
              title: '双向数据绑定的原理',
              path: '/articles/JavaScript/双向数据绑定的原理'
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
            },
            {
              title: 'JavaScript中基本数据类型和引用数据类型的区别',
              path: '/articles/JavaScript/JavaScript中基本数据类型和引用数据类型的区别'
            }
          ]
        },
        {
          title: 'Vue',
          path: '/articles/Vue/',
          collapsable: true,
          children: [{
              title: 'Vue目录',
              path: '/articles/Vue/'
            },
            {
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
              title: '目录',
              path: '/articles/小程序/'
            },
            {
              title: '清除小程序button的默认样式',
              path: '/articles/小程序/清除小程序button的默认样式'
            },
            {
              title: '使用Promise封装小程序wx.request',
              path: '/articles/小程序/使用Promise封装小程序wx.request'
            },
            {
              title: '微信小程序动态加载swiper时不显示的问题（爬坑）',
              path: '/articles/小程序/微信小程序动态加载swiper时不显示的问题（爬坑）'
            },
            {
              title: '微信小程序授权登录弹框 组件',
              path: '/articles/小程序/微信小程序授权登录弹框 组件'
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
              title: '在小程序中调用API',
              path: '/articles/小程序/在小程序中调用API'
            },
            {
              title: '在小程序中自定义弹窗组件',
              path: '/articles/小程序/在小程序中自定义弹窗组件'
            },
            {
              title: '在小程序中使用async&await',
              path: '/articles/小程序/在小程序中使用async&await'
            }
          ]
        },
        {
          title: 'Node',
          path: '/articles/Node/',
          collapsable: true,
          children: [{
              title: 'Node目录',
              path: '/articles/Node/'
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
              title: 'CommonJS模块化开发',
              path: '/articles/Node/CommonJS模块化开发'
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
        }
      ],
      "/about/": [
        ['', '关于我'],
        ['2019', '2019年度总结'],
        ['2018', '2018年度总结'],
      ]
    }
  }
}