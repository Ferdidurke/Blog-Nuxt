export const state = () => ({
  posts: [],
  counter: 0,
  error: undefined,
  queryParams: {
    limit: 5,
    sort: {
      date: 'desc'
    },
    skip: 0
  }
})


export const mutations = {
  fetchPosts(state, payload) {
    state.posts = payload.posts
    state.counter = payload.counter

  },
  changeQueryParams (state, payload) {
    state.queryParams = payload
  },

  giveError (state, payload) {
    state.error = payload
  },
  deletePost(state, payload) {

  },

}


export const actions = {
  loadPosts ({commit, getters}, ) {
    const { getParams } = getters
    this.$axios.$get(`/api/blog/posts`, { params: getParams })
      .then(response => commit('fetchPosts', response))
      .catch(({ response }) => {
        console.log(response)
        const error = response.data.message;
        commit('giveError', { error })
      })
  },

}

export const getters = {
  getPosts: (state) => state,
  getParams: (state) => state.queryParams
}
