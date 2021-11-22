import axios from "axios"

const blogApi = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:5000',
  headers: {
    'Authorization' : localStorage.getItem('auth._token.local')
  }
})

blogApi.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    this.$store.commit('user/logout')
  }
});
export default blogApi
