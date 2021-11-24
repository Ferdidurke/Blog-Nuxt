<template>
  <div class="user-info" v-if="isGotUserInfo">
    <p class="user-text">{{ currentUser }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserCard",
  props: {
    showUserCard: Function
  },
  async mounted() {
    await this.$blogApi.get('/api/auth/me')
      .then(result => result.data)
      .then(data => { this.$store.commit('user/authorized', { data } )})


  },
  computed: {
    ...mapGetters('user', ['getUser']),
    currentUser() {
      return `${this.getUser.firstName} ${this.getUser.lastName}`
    },
    isGotUserInfo () {
      return (this.currentUser !== 'null null' && this.currentUser !== 'undefined undefined')
    }
  },
}
</script>

<style scoped>
  .user-info {
    height: inherit;
    padding: 0 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: darkgray;
    background: white;
    font-size: 20px;
    transform: skew(340deg);
  }
  .user-text {
    transform: skew(20deg);
  }
  @media screen and (max-width: 768px) {
    .user-info {
      display: none;
    }
  }




</style>
