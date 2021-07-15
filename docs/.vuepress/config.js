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
    smoothScroll: true,
    lastUpdated: '上次更新',
    nav: [{
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
        items: [{
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
        title: '博客迁移',
        path: '/life-essay/把博客从Hexo迁移至VuePress'
      }, {
        title: '2020年总结与2021年计划',
        path: '/life-essay/2020年总结与2021年计划'
      }, {
        title: 'Chrome常用插件',
        path: '/life-essay/Chrome常用插件'
      }, {
        title: 'VSCode常用插件',
        path: '/life-essay/VSCode常用插件'
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
          title: 'LeetCode',
          path: '/computer-base/LeetCode/两数之和',
          collapsable: true,
          children: [{
            title: '两数之和',
            path: '/computer-base/LeetCode/两数之和'
          }, {
            title: '有效的括号',
            path: '/computer-base/LeetCode/有效的括号'
          }, {
            title: '合并两个有序链表',
            path: '/computer-base/LeetCode/合并两个有序链表'
          }, {
            title: '最大子序和',
            path: '/computer-base/LeetCode/最大子序和'
          }, {
            title: '回文数',
            path: '/computer-base/LeetCode/回文数'
          }, {
            title: '爬楼梯',
            path: '/computer-base/LeetCode/爬楼梯'
          }, {
            title: '合并两个有序数组',
            path: '/computer-base/LeetCode/合并两个有序数组'
          }, {
            title: '对称二叉树',
            path: '/computer-base/LeetCode/对称二叉树'
          }, {
            title: '二叉树的最大深度',
            path: '/computer-base/LeetCode/二叉树的最大深度'
          }, {
            title: '翻转二叉树',
            path: '/computer-base/LeetCode/翻转二叉树'
          }, {
            title: '合并二叉树',
            path: '/computer-base/LeetCode/合并二叉树'
          }, {
            title: '反转链表',
            path: '/computer-base/LeetCode/反转链表'
          }, ]
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
          title: '前端知识体系',
          path: '/articles/KnowledgeSystem/',
          collapsable: true
        }, {
          title: '前端技术分享',
          path: '/articles/Share/',
          collapsable: true,
          children: [{
            title: "Vue专题之Vue进阶",
            path: '/articles/Share/Vue专题之Vue进阶'
          }, {
            title: "Vue专题之Vue基础",
            path: '/articles/Share/Vue专题之Vue基础'
          }, {
            title: "JavaScript专题之异步编程",
            path: "/articles/Share/JavaScript专题之异步编程"
          }, {
            title: 'JavaScript专题之This和定时器',
            path: '/articles/Share/JavaScript专题之This和定时器'
          }]
        }, {
          title: 'CSS',
          path: '/articles/CSS/',
          collapsable: true
        }, {
          title: 'JavaScript',
          path: '/articles/JavaScript/',
          collapsable: true,
          children: [{
              title: 'JS中常见的模块',
              path: '/articles/JavaScript/JS中常见的模块'
            }, {
              title: '一次搞懂-JS事件循环之宏任务和微任务',
              path: '/articles/JavaScript/一次搞懂-JS事件循环之宏任务和微任务'
            }, {
              title: '为什么要用setTimeout模拟setInterval？',
              path: '/articles/JavaScript/为什么要用setTimeout模拟setInterval？'
            }, {
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
          title: 'Vue',
          path: '/articles/Vue/',
          collapsable: true,
          children: [{
              title: "Vue常见问题解析",
              path: '/articles/Vue/Vue常见问题解析'
            }, {
              title: '虚拟DOM之Diff算法',
              path: '/articles/Vue/虚拟DOM之Diff算法'
            }, {
              title: '一次搞懂-Vue之虚拟DOM',
              path: '/articles/Vue/一次搞懂-Vue之虚拟DOM'
            }, {
              title: 'Vuex原理解析',
              path: '/articles/Vue/Vuex原理解析'
            },
            {
              title: 'Vue-Router原理解析',
              path: '/articles/Vue/Vue-Router原理解析'
            }, {
              title: 'Vue知识点总结',
              path: '/articles/Vue/Vue知识点总结'
            }, {
              title: 'Vue中的验证登录状态',
              path: '/articles/Vue/Vue中的验证登录状态'
            }, {
              title: 'Vue3对比Vue2有哪些变化',
              path: '/articles/Vue/Vue3对比Vue2有哪些变化'
            }, {
              title: 'Vue2.x的双向绑定原理及实现',
              path: '/articles/Vue/Vue2.x的双向绑定原理及实现'
            },
          ]
        },
        {
          title: '微信小程序/H5',
          path: '/articles/WeApp/',
          collapsable: true,
          children: [{
              title: '小程序性能优化和异常监控',
              path: '/articles/WeApp/小程序性能优化和异常监控'
            },
            {
              title: '小程序开发相关总结',
              path: '/articles/WeApp/小程序开发相关总结'
            }, {
              title: '公众号网页开发经验总结',
              path: '/articles/WeApp/公众号网页开发经验总结'
            }, {
              title: '从前端的角度来梳理微信支付（小程序、H5、JSAPI）的流程',
              path: '/articles/WeApp/从前端的角度来梳理微信支付（小程序、H5、JSAPI）的流程'
            },
            {
              title: '微信小程序用户授权之最佳实践',
              path: '/articles/WeApp/微信小程序用户授权之最佳实践'
            },
            {
              title: '使用Promise封装小程序wx.request',
              path: '/articles/WeApp/使用Promise封装小程序wx.request'
            },
            {
              title: '微信小程序动态加载swiper时不显示的问题（爬坑）',
              path: '/articles/WeApp/微信小程序动态加载swiper时不显示的问题（爬坑）'
            },
            {
              title: '微信小程序授权登录弹框组件',
              path: '/articles/WeApp/微信小程序授权登录弹框组件'
            },
            {
              title: '解决gif图片只渲染一次的问题',
              path: '/articles/WeApp/解决gif图片只渲染一次的问题'
            },
            {
              title: '小程序-实现蒙版弹出窗',
              path: '/articles/WeApp/小程序-实现蒙版弹出窗'
            },
            {
              title: '小程序之瀑布流布局',
              path: '/articles/WeApp/小程序之瀑布流布局'
            },
            {
              title: '小程序之iPhoneX适配',
              path: '/articles/WeApp/小程序之iPhoneX适配'
            },
            {
              title: '小程序中图片点击全屏-可滑动',
              path: '/articles/WeApp/小程序中图片点击全屏-可滑动'
            },
            {
              title: '在小程序中自定义弹窗组件',
              path: '/articles/WeApp/在小程序中自定义弹窗组件'
            },
            {
              title: '在小程序中使用async&await',
              path: '/articles/WeApp/在小程序中使用async&await'
            },
            {
              title: '小程序中使用Less（最优方式）',
              path: '/articles/WeApp/小程序中使用Less（最优方式）'
            },
            {
              title: '小程序生成海报图片并保存',
              path: '/articles/WeApp/小程序生成海报图片并保存'
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
              title: '浏览器缓存机制',
              path: '/articles/Performance/浏览器缓存机制'
            },
            {
              title: 'DOM优化之重绘和回流',
              path: '/articles/Performance/DOM优化之重绘和回流'
            }, {
              title: '微信小程序性能优化',
              path: '/articles/Performance/微信小程序性能优化'
            }
          ]
        },
        {
          title: '安全',
          path: '/articles/Security/',
          collapsable: true
        },
        {
          title: '源码系列',
          path: '/articles/SourceCode/',
          collapsable: true,
          children: []
        },
        {
          title: '正则表达式',
          path: '/articles/RegExp/',
          collapsable: true,
          children: []
        },

      ]
    }
  }
}
// window.imgBase = 'https://gitee.com/zhangningle/imgs/raw/master/'