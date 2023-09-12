export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '作者匿名讨论区',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '作者匿名讨论区，是用于每月征文活动的投票阶段讨论应用，帮助参赛作者在不暴露身份前提对参赛作品进行评论和探讨。' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/base.css',
    'highlight.js/styles/atom-one-dark.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/api',
    { src: '@/plugins/sulo.js', mode: 'client' },
    { src: '@/plugins/markdown-highlight.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    ['@nuxtjs/component-cache', {
      // 缓存组件的最大数量
      max: 10000,
      // 缓存组件的有效期
      maxAge: 1000 * 60 * 10
    }]
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    extractCSS: true,
    publicPath: '/style/'
  },
  env: {
    baseUrl: 'http://127.0.0.6/',
    serverUrl: 'http://127.0.0.6/',
  }
}
