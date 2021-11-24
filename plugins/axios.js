export default function ({ $axios, app }, inject) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  const blogApi = $axios.create()

  blogApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth._token.local');
      if (token) {
        config.headers.authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );


  blogApi.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      app.store.commit('user/logout')
    }
  })
  inject('blogApi', blogApi)
}
