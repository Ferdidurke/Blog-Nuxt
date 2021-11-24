<template>
  <div>
    <md-toolbar v-if="$auth.loggedIn" class="authorized-toolbar">
      <UserCard/>
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
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

export default {
  name: "layout",
  methods: {
    logout() {
      this.$store.commit('user/logout')
    },
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
