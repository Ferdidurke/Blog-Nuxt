export const state = () => ( localStorage.VuexStorage ? JSON.parse(localStorage.getItem('VuexStorage')) : {
                                                                                                    userId: null,
                                                                                                    firstName: null,
                                                                                                    lastName: null

})

export const mutations = {
      login(state, payload) {
        console.log(payload)
        state.userId = payload.data.userId
        state.firstName = payload.data.firstName
        state.lastName = payload.data.lastName
        localStorage.setItem('VuexStorage', JSON.stringify({ userId: state.userId, firstName: state.firstName, lastName: state.lastName }))
      },
      logout(state) {
        state.userId = null
        state.firstName = null
        state.lastName = null
        this.$auth.logout()
        localStorage.removeItem('VuexStorage')

      },
}

export const getters = {
    getUser: (state) => state

}



