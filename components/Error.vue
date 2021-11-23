<template>
  <md-snackbar :md-active="true" class="error-container">
    {{ error }}
  </md-snackbar>
</template>

<script>
export default {
  name: "Error",
  props: {
    error: Error
  },

}
</script>

<style scoped>
  .error-container {
    width: 50%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
    font-size: 26px;
    background: red;
    color: white;
  }
</style>
