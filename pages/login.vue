<template>
  <div class="login-form-container">
    <form class="login-form" @submit.prevent="loginUser">
      <md-field>
        <label>E-mail</label>
        <md-input type="email" required></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input type="password" required></md-input>
      </md-field>
      <md-button class="md-raised" type="submit">Login</md-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "login.vue"
}
</script>

<style scoped>
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

</style>
