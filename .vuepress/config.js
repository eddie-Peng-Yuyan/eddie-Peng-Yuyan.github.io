module.exports = {
  title: '你在教我做事啊',
  description: '记录一些容易忘记的东西',
  dest: 'public',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '框架组件',
        link: '/blogs/SomeOfTheProblems/index.md',
      },
      {
        text: '问题解决',
        items: [
          {
            text: 'vuepress-reco',
            link: '/docs/theme-reco/',
          },
        ],
      },
      {
        text: '时间线',
        link: '/timeline/',
      },
    ],
    sidebar: {
      '/docs/theme-reco/': ['wuhu', 'theme', 'plugin', 'api'],
    },
    type: 'blog',
    blogConfig: {
      category: {
        location: 2,
        text: 'Category',
      },
      tag: {
        location: 3,
        text: 'Tag',
      },
    },
    friendLink: [
      // {
      //   title: '午后南杂',
      //   desc: 'Enjoy when you can, and endure when you must.',
      //   email: '1156743527@qq.com',
      //   link: 'https://www.recoluan.com',
      // },
      // {
      //   title: 'vuepress-theme-reco',
      //   desc: 'A simple and beautiful vuepress Blog & Doc theme.',
      //   avatar:
      //     'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
      //   link: 'https://vuepress-theme-reco.recoluan.com',
      // },
    ],
    logo: '/logo.png',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: 'Eddie',
    authorAvatar: '/avatar.png',
    record: 'xxxx',
    startYear: '2017',
  },
  markdown: {
    lineNumbers: true,
  },
}
