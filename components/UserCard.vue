<template>
  <div class="user-info">
    {{ currentUser }}
  </div>
</template>

<script>
import blogApi from "@/services/BlogService";
import { mapGetters } from "vuex";

export default {
  name: "UserCard",
  props: {
    showUserCard: Function
  },
  async mounted() {
    this.$blogApi.get('/api/auth/me')
      .then(result => result.data)
      .then(data => { this.$store.commit('user/authorized', { data } )})
      .then(this.showUserCard())

  },
  computed: {
    ...mapGetters('user', ['getUser']),
    currentUser() {
      return `${this.getUser.firstName} ${this.getUser.lastName}`
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
    -webkit-clip-path: polygon(20px 0%, 100% 0%, 100% 100%, 0% 100%);
    -moz-clip-path: polygon(20px 0%, 100% 0%, 80% 100%, 0% 100%);
    clip-path: polygon(20px 0%, 100% 0%, 490px 100%, 0% 100%);

  }
</style>
