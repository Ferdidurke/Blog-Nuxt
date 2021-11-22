<template>
  <div class="register-form-container">
    <form class="register-form" @submit.prevent="registerUser">
      <p>Please, fill all fields correctly!</p>
      <md-field>
        <label>Firstname</label>
        <md-input required
                  v-model="firstName"></md-input>
      </md-field>
      <md-field>
        <label>Lastname</label>
        <md-input required
                  v-model="lastName"></md-input>
      </md-field>
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
      <p v-if="error" class="error-text"> {{ error }} </p>
      <md-button class="md-raised" type="submit">Register</md-button>
    </form>
  </div>
</template>

<script>


export default {
  name: "RegisterForm",
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    error: undefined
  }),
  methods: {
    async registerUser () {
      await this.$axios.post('/api/auth/register', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }).then(this.$router.replace({ path: '/login' }))
      .catch(({ response }) => {
        this.error = response.data.message
      })
    }
  },
}
</script>

<style scoped>
  .register-form-container {
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
  .register-form > p {
    text-align: center;
    font-size: 20px;
  }
  .error-text {
    color: red;
  }

</style>
