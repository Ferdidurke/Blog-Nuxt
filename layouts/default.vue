<template>
  <div>
    <md-toolbar v-if="$auth.loggedIn" class="logged-toolbar">
      <div class="user-info">
        {{ currentUser }}
      </div>
      <NuxtLink to="/login" v-on:click.native="logout">Logout</NuxtLink>
    </md-toolbar>
    <md-toolbar v-else>
        <NuxtLink to="/blog">Blog</NuxtLink>
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
      height: 50px;
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

  .logged-toolbar {
    justify-content: flex-end;
    padding-right: 40px;
  }
  .user-info {
    height: inherit;
    color: white;
    font-size: 20px;
    background: #eeeeee;

  }
  @media screen and (max-width: 768px) {
    .md-toolbar {
      flex-wrap: wrap;
      gap: 1rem;
    }
    .logged-toolbar {
      justify-content: center;
      padding-right: 0;
    }

  }



</style>
