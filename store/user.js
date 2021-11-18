export const state = () => ({
    user: {
      userId: null,
      isAuthenticated: false,
      firstName: null,
      lastName: null
    },
})

export const mutations = {
      login(state, payload) {
        console.log(payload)
        state.user.userId = payload.data.userId
        state.user.firstName = payload.data.firstName
        state.user.lastName = payload.data.lastName
      },
      logout(state) {
        state.user.userId = null
        state.user.firstName = null
        state.user.lastName = null

      },
}

export const getters = {
    getUser: (state) => state.user.firstName
}



