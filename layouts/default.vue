<template>
  <div>
    <md-toolbar v-if="$auth.loggedIn" class="authorized-toolbar">
      <div class="user-info">
        {{ currentUser }}
      </div>
      <NuxtLink to="/login" v-on:click.native="logout">Logout</NuxtLink>
    </md-toolbar>
    <md-toolbar v-else>
        <NuxtLink to="/">Blog</NuxtLink>
        <NuxtLink to="/register">Register</NuxtLink>
        <NuxtLink to="/login">Login</NuxtLink>
    </md-toolbar>
    <Nuxt/>
  </div>
</template>

<script>
import Vue from 'vue'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import { mapGetters } from 'vuex'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
export default {
  name: "layout",
  computed: {
    ...mapGetters('user', ['getUser']),
    currentUser() {
      return `${this.getUser.firstName} ${this.getUser.lastName}`
    }
  },
  methods: {
    logout() {
      this.$store.commit('user/logout')
    }
  }
}
</script>

<style lang="scss" scoped>

  .md-toolbar {
      height: 65px;
      display: flex;
      justify-content: center;
      gap: 5rem;
      background-color: darkgray;
  }

  .md-toolbar > a {
    display: block;
    text-decoration: none;
    color: white;
    font-size: 20px;
  }

  .authorized-toolbar {
    justify-content: flex-end;
    padding-right: 40px;
  }
  .user-info {
    height: inherit;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: darkgray;
    background: white;
    font-size: 20px;
    -webkit-clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%);
    -moz-clip-path: polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%);
    clip-path: polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%);

  }
  @media screen and (max-width: 768px) {
    .md-toolbar {
      flex-wrap: wrap;
      gap: 1rem;
    }
    .authorized-toolbar {
      justify-content: center;
      padding-right: 0;
    }

  }



</style>
