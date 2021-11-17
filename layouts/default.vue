<template>
  <div>
    <md-toolbar>
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

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
export default {
  name: "layout"
}
</script>

<style lang="scss" scoped>

.md-toolbar {
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



</style>
