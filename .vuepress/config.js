module.exports = {
  title: '学会了就是自己的',
  description: '',
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
        icon: 'reco-home',
      },
      {
        text: '笔记',
        icon: 'reco-date',
        items:[
          {
            text: 'Vue3',
            link: '/blogs/frontNotes/Vue3/',
          },{
            text: 'Ts',
            link: '/blogs/frontNotes/Ts/',
          },
        ]
      },{
        text: '时间线',
        link: '/timeline/',
        icon: 'reco-date',
      },
      {
        text: '网站',
        icon: 'reco-message',
        items: [
          {
            text: 'vuepress-reco',
            link: '/docs/theme-reco/',
          },
        ],
      },
    ],
    sidebar: { // 侧边栏
      '/blogs/frontNotes/': ['Vue3', 'Ts'],
    },
    type: 'blog',
    // blogConfig: {
    //   category: {
    //     location: 2,
    //     text: 'Category',
    //   },
    //   tag: {
    //     location: 3,
    //     text: 'Tag',
    //   },
    // },
    logo: '/logo.png',
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: 'Last Updated',
    author: 'Eddie',
    authorAvatar: '/avatar.png',
    record: 'xxxx',
    startYear: '2022',
  },
  markdown: {
    lineNumbers: true,
  },
}
