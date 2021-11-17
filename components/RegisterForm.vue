<template>
  <div class="register-form-container">
    <form class="register-form" @submit.prevent="registerUser">
      <p>Please, fill all fields correctly!</p>
      <md-field>
        <label>Firstname</label>
        <md-input required></md-input>
      </md-field>
      <md-field>
        <label>Lastname</label>
        <md-input required></md-input>
      </md-field>
      <md-field>
        <label>E-mail</label>
        <md-input type="email" required></md-input>
      </md-field>
      <md-field>
        <label>Password</label>
        <md-input type="password" required></md-input>
      </md-field>
      <md-button class="md-raised" type="submit">Register</md-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm"
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

</style>
