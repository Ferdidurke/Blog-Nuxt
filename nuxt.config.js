
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:5000'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BlogNuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Comforter+Brush&display=swap'}

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-material-design-icons', mode: 'client' },
    { src: '~/plugins/axios'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    ['nuxt-vue-material', {
      theme: 'default-dark',
      components: ['MdDrawer', 'MdRadio', 'MdMenu', 'MdContent', 'MdList', 'MdButton', 'MdToolbar',]
    }],
    'nuxt-material-design-icons',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      scss: {
        implementation: require('sass')
      }
    }
  },

  axios: {
    baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  },

  auth: {
    redirect: {
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          logout: false,
          user: false
        }
      }
    }
  }
}
