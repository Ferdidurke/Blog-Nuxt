<template>
  <div class="login-form-container">
    <form class="login-form" @submit.prevent="loginUser">
      <md-field>
        <label>E-mail</label>
        <md-input type="email"
                  required
                  v-model="email"></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input type="password"
                  required
                  v-model="password"></md-input>
      </md-field>
      <md-button class="md-raised" type="submit">Login</md-button>
    </form>
    <Error v-if="error"
           v-bind:error="error"/>
  </div>
</template>

<script>

export default {

  name: "LoginForm",
  data: () => ({
    email: '',
    password: '',
    error: undefined
  }),

  methods: {
    async loginUser () {
        await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password
            },
          }).then(result => result.data)
          .then(data => this.$store.commit('user/login', { data } ))
          .catch(({ response }) => {
              this.error = response.data.message
          })
    },

  }
}
</script>

<style lang="scss" scoped>
  .login-form-container {
    margin: 6rem auto;
    width: 30%;
    background-color: darkgray;
    border-radius: 10px;
    padding: 20px;
  }
  .md-button {
    display: block;
    margin: 0 auto;
  }
  .error-text {
    color: red;
  }
</style>
