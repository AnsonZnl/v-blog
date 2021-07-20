module.exports = {
  title: '九旬的博客',
  description: '种一棵树最好的时间在十年前，其次是现在。',
  keywords: "前端开发，个人博客，JavaScript、Vue、Node，微信小程序,张宁乐，张宁乐的博客，九旬，WEB前端技术博客",
  head: [
    ['link', {
      rel: 'icon',
      href: '/img/logo.ico'
    }]
  ],
  base: '/',
  erviceWorker: true, // 是否支持PWA
  themeConfig: {
    sidebarDepth: 2,
    lastUpdatedText: '上次更新',
    navbar: [{
        text: 'Home',
        link: '/'
      },
      {
        text: '前端知识',
        link: '/articles/'
      },
      {
        text: '计算机基础',
        link: '/computer-base/'
      },
      {
        text: '生活杂文',
        link: '/life-essay/'
      },
      {
        text: '关于',
        link: '/about/'
      },
      {
        text: 'Github',
        link: 'https://github.com/AnsonZnl'
      },
      {
        text: '社区链接',
        children: [{
            text: '掘金',
            link: 'https://juejin.cn/user/4037062426631288'
          },
          {
            text: 'SegmentFault',
            link: 'https://segmentfault.com/u/ansonznl'
          }
        ]
      }
    ],
    sidebar: {
      "/life-essay/": [{
        text: '博客迁移',
        link: '/docs/life-essay/把博客从Hexo迁移至VuePress.md'
      }, {
        text: '2020年总结与2021年计划',
        link: '/life-essay/2020年总结与2021年计划.md'
      }, {
        text: 'Chrome常用插件',
        link: '/life-essay/Chrome常用插件.md'
      }, {
        text: 'VSCode常用插件',
        link: '/life-essay/VSCode常用插件.md'
      }],
      "/computer-base/": [{
          text: '数据结构',
          link: '/computer-base/数据结构.md'
        },
        {
          text: '算法',
          link: '/computer-base/算法.md'
        },
        {
          text: 'LeetCode',
          link: '/computer-base/LeetCode/两数之和.md',

          children: [{
            text: '两数之和',
            link: '/computer-base/LeetCode/两数之和.md'
          }, {
            text: '有效的括号',
            link: '/computer-base/LeetCode/有效的括号.md'
          }, {
            text: '合并两个有序链表',
            link: '/computer-base/LeetCode/合并两个有序链表.md'
          }, {
            text: '最大子序和',
            link: '/computer-base/LeetCode/最大子序和.md'
          }, {
            text: '回文数',
            link: '/computer-base/LeetCode/回文数.md'
          }, {
            text: '爬楼梯',
            link: '/computer-base/LeetCode/爬楼梯.md'
          }, {
            text: '合并两个有序数组',
            link: '/computer-base/LeetCode/合并两个有序数组.md'
          }, {
            text: '对称二叉树',
            link: '/computer-base/LeetCode/对称二叉树.md'
          }, {
            text: '二叉树的最大深度',
            link: '/computer-base/LeetCode/二叉树的最大深度.md'
          }, {
            text: '翻转二叉树',
            link: '/computer-base/LeetCode/翻转二叉树.md'
          }, {
            text: '合并二叉树',
            link: '/computer-base/LeetCode/合并二叉树.md'
          }, {
            text: '反转链表',
            link: '/computer-base/LeetCode/反转链表.md'
          }, ]
        },
        {
          text: '网络协议',
          link: '/computer-base/网络协议.md'
        },
        {
          text: '设计模式',
          link: '/computer-base/设计模式.md'
        },
        {
          text: 'Git',
          link: '/computer-base/Git.md'
        }
      ],
      "/articles/": [{
          text: '前端知识体系',
          link: '/articles/KnowledgeSystem/',
        }, {
          text: '前端技术分享',
          link: '/articles/Share/',

          children: [{
            text: "Vue专题之Vue进阶",
            link: '/articles/Share/Vue专题之Vue进阶.md'
          }, {
            text: "Vue专题之Vue基础",
            link: '/articles/Share/Vue专题之Vue基础.md'
          }, {
            text: "JavaScript专题之异步编程",
            link: "/articles/Share/JavaScript专题之异步编程.md"
          }, {
            text: 'JavaScript专题之This和定时器',
            link: '/articles/Share/JavaScript专题之This和定时器.md'
          }]
        }, {
          text: 'CSS',
          link: '/articles/CSS/',
        }, {
          text: 'JavaScript',
          link: '/articles/JavaScript/',

          children: [{
              text: 'JS中常见的模块',
              link: '/articles/JavaScript/JS中常见的模块.md'
            }, {
              text: '一次搞懂-JS事件循环之宏任务和微任务',
              link: '/articles/JavaScript/一次搞懂-JS事件循环之宏任务和微任务.md'
            }, {
              text: '为什么要用setTimeout模拟setInterval？',
              link: '/articles/JavaScript/为什么要用setTimeout模拟setInterval？.md'
            }, {
              text: '创建对象的几种方法及优缺点',
              link: '/articles/JavaScript/创建对象的几种方法及优缺点.md'
            },
            {
              text: '关于跨域',
              link: '/articles/JavaScript/关于跨域.md'
            },
            {
              text: '理解JS原型链',
              link: '/articles/JavaScript/理解JS原型链.md'
            },
            {
              text: 'JS浅拷贝与深拷贝',
              link: '/articles/JavaScript/JS浅拷贝与深拷贝.md'
            },
            {
              text: '我对JavaScript中this的一些理解',
              link: '/articles/JavaScript/我对JavaScript中this的一些理解.md'
            },
            {
              text: 'JavaScript的预编译过程分析',
              link: '/articles/JavaScript/JavaScript的预编译过程分析.md'
            },
            {
              text: 'JavaScript对象原型链',
              link: '/articles/JavaScript/JavaScript对象原型链.md'
            }
          ]
        },
        {
          text: 'TypeScript',
          link: '/articles/TypeScript/',
        },
        {
          text: 'Vue',
          link: '/articles/Vue/',

          children: [{
              text: "Vue模板编译原理解析",
              link: '/articles/Vue/Vue模板编译原理解析.md'
            }, {
              text: "nextTick原理",
              link: '/articles/Vue/nextTick原理解析.md'
            }, {
              text: "Vue常见问题解析",
              link: '/articles/Vue/Vue常见问题解析.md'
            }, {
              text: '虚拟DOM之Diff算法',
              link: '/articles/Vue/虚拟DOM之Diff算法.md'
            }, {
              text: '一次搞懂-Vue之虚拟DOM',
              link: '/articles/Vue/一次搞懂-Vue之虚拟DOM.md'
            }, {
              text: 'Vuex原理解析',
              link: '/articles/Vue/Vuex原理解析.md'
            },
            {
              text: 'Vue-Router原理解析',
              link: '/articles/Vue/Vue-Router原理解析.md'
            }, {
              text: 'Vue知识点总结',
              link: '/articles/Vue/Vue知识点总结.md'
            }, {
              text: 'Vue中的验证登录状态',
              link: '/articles/Vue/Vue中的验证登录状态.md'
            }, {
              text: 'Vue3对比Vue2有哪些变化',
              link: '/articles/Vue/Vue3对比Vue2有哪些变化.md'
            }, {
              text: 'Vue2.x的双向绑定原理及实现',
              link: '/articles/Vue/Vue2.x的双向绑定原理及实现.md'
            },
          ]
        },
        {
          text: '微信小程序/H5',
          link: '/articles/WeApp/',

          children: [{
              text: '小程序性能优化和异常监控',
              link: '/articles/WeApp/小程序性能优化和异常监控.md'
            },
            {
              text: '小程序开发相关总结',
              link: '/articles/WeApp/小程序开发相关总结.md'
            }, {
              text: '公众号网页开发经验总结',
              link: '/articles/WeApp/公众号网页开发经验总结.md'
            }, {
              text: '从前端的角度来梳理微信支付（小程序、H5、JSAPI）的流程',
              link: '/articles/WeApp/从前端的角度来梳理微信支付（小程序、H5、JSAPI）的流程.md'
            },
            {
              text: '微信小程序用户授权之最佳实践',
              link: '/articles/WeApp/微信小程序用户授权之最佳实践.md'
            },
            {
              text: '使用Promise封装小程序wx.request',
              link: '/articles/WeApp/使用Promise封装小程序wx.request.md'
            },
            {
              text: '微信小程序动态加载swiper时不显示的问题（爬坑）',
              link: '/articles/WeApp/微信小程序动态加载swiper时不显示的问题（爬坑）.md'
            },
            {
              text: '微信小程序授权登录弹框组件',
              link: '/articles/WeApp/微信小程序授权登录弹框组件.md'
            },
            {
              text: '解决gif图片只渲染一次的问题',
              link: '/articles/WeApp/解决gif图片只渲染一次的问题.md'
            },
            {
              text: '小程序-实现蒙版弹出窗',
              link: '/articles/WeApp/小程序-实现蒙版弹出窗.md'
            },
            {
              text: '小程序之瀑布流布局',
              link: '/articles/WeApp/小程序之瀑布流布局.md'
            },
            {
              text: '小程序之iPhoneX适配',
              link: '/articles/WeApp/小程序之iPhoneX适配.md'
            },
            {
              text: '小程序中图片点击全屏-可滑动',
              link: '/articles/WeApp/小程序中图片点击全屏-可滑动.md'
            },
            {
              text: '在小程序中自定义弹窗组件',
              link: '/articles/WeApp/在小程序中自定义弹窗组件.md'
            },
            {
              text: '在小程序中使用async&await',
              link: '/articles/WeApp/在小程序中使用async&await.md'
            },
            {
              text: '小程序中使用Less（最优方式）',
              link: '/articles/WeApp/小程序中使用Less（最优方式）.md'
            },
            {
              text: '小程序生成海报图片并保存',
              link: '/articles/WeApp/小程序生成海报图片并保存.md'
            }
          ]
        },
        {
          text: 'Node',
          link: '/articles/Node/',

          children: [{
              text: '初试MongoDB数据库',
              link: '/articles/Node/初试MongoDB数据库.md'
            },
            {
              text: 'NodeJS安装和使用',
              link: '/articles/Node/NodeJS安装和使用.md'
            },
            {
              text: 'NodeJs文件系统（fs）与流（stream）',
              link: '/articles/Node/NodeJs文件系统（fs）与流（stream）.md'
            },
            {
              text: '使用Node.js写一个简单的api接口',
              link: '/articles/Node/使用Node.js写一个简单的api接口.md'
            },
            {
              text: '使用Express搭建一个简单的服务器',
              link: '/articles/Node/使用Express搭建一个简单的服务器.md'
            },
            {
              text: '使用Node.js搭建静态服务器',
              link: '/articles/Node/使用Node.js搭建静态服务器.md'
            },
            {
              text: 'MongoDB学习之Mongoose的使用',
              link: '/articles/Node/MongoDB学习之Mongoose的使用.md'
            },
            {
              text: 'MongoDB中常用语句',
              link: '/articles/Node/MongoDB中常用语句.md'
            }
          ]
        },
        {
          text: '前端性能优化',
          link: '/articles/Performance/',

          children: [{
              text: 'JS事件循环之宏任务和微任务',
              link: '/articles/Performance/JS事件循环之宏任务和微任务.md'
            },
            {
              text: '事件的防抖和节流',
              link: '/articles/Performance/事件的防抖和节流.md'
            },
            {
              text: '使用Documentfragment优化DOM操作',
              link: '/articles/Performance/使用Documentfragment优化DOM操作.md'
            },
            {
              text: '首屏优化之懒加载',
              link: '/articles/Performance/首屏优化之懒加载.md'
            },
            {
              text: '浏览器缓存机制',
              link: '/articles/Performance/浏览器缓存机制.md'
            },
            {
              text: 'DOM优化之重绘和回流',
              link: '/articles/Performance/DOM优化之重绘和回流.md'
            }, {
              text: '微信小程序性能优化',
              link: '/articles/Performance/微信小程序性能优化.md'
            }
          ]
        },
        {
          text: '安全',
          link: '/articles/Security/',
        },
        {
          text: '源码系列',
          link: '/articles/SourceCode/',

          children: []
        },
        {
          text: '正则表达式',
          link: '/articles/RegExp/',

          children: []
        },

      ]
    }
  }
}
// window.imgBase = 'https://gitee.com/zhangningle/imgs/raw/master/'