export const state = () => ({
                             userId: null,
                             firstName: '',
                             lastName: '',
                             email: null,
                             token: null,
})

export const actions = {
  logoutUser ({commit}) {
    commit('logout')
  },
}



export const mutations = {
      login(state, payload) {
        state.token = payload.data.token
      },
      authorized (state, payload) {
        state.userId = payload.data.id
        state.firstName = payload.data.firstName
        state.lastName = payload.data.lastName
        state.email = payload.data.email
      },
      logout(state) {
        state.userId = null
        state.firstName = null
        state.lastName = null
        state.email = null
        this.$auth.logout()

      },
}

export const getters = {
    getUser: (state) => state

}



