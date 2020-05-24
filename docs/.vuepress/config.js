module.exports = {
  title: 'Anson\'s Blog',
  description: '种一棵树最好的时间在十年前，其次是现在。',
  keywords: "若川，lxchuan12。源码、jquery源码、undersco。",
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
        text: '文章',
        link: '/articles/'
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
          title: '小程序',
          path: '/articles/小程序/',
          collapsable: true,
          sidebarDepth: 2,
          children: [{
              title: '目录',
              path: '/articles/小程序/'
            },
            {
              title: '小程序文章test',
              path: '/articles/小程序/小程序test'
            }
          ]
        },
        {
          title: 'Node',
          path: '/articles/node/',
          collapsable: true,
          children: [{
              title: 'node指引',
              path: '/articles/node/'
            },
            {
              title: 'node第一个文章test',
              path: '/articles/node/nodetest'
            }
          ]
        },
        {
          title: 'Vue',
          path: '/articles/vue/',
          collapsable: true,
          children: [{
              title: 'vue指引',
              path: '/articles/vue/'
            },
            {
              title: 'vue第一个文章test',
              path: '/articles/vue/vuetest'
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