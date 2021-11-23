<template>
  <div class="current-post-page">
  <Header/>
    <div class="border-container">
    </div>
    <div class="current-post-container">

        <NuxtLink to="/"><md-button class="return-button"><chevron-double-left mdi/></md-button></NuxtLink>
        <Error v-if="error" v-bind:error="error"/>
        <Post v-bind:post="post"
              v-bind:isCurrentPost="true"
              v-bind:redirectOnDelete="redirectOnDelete"
              v-else/>
    </div>
  </div>
</template>

<script>


export default {
  name: "CurrentPostPage",
  data: () => ({
    post: {},
    error: undefined
  }),
  async mounted() {
    try {
      this.post = await this.$axios.$get(`/api/blog/posts/${this.$route.params.id}`)
    } catch (error) {
      this.error = error
    }

  },
  methods: {
    redirectOnDelete () {
      this.$router.replace('/')
    }
  }
}

</script>

<style lang="scss" scoped>
  .current-post-page {
    background: #eeeeee;
  }
  .current-post-container {
    height: 100vh;
    display: flex;

  }
  .border-container {
    height: 50px;
    background: darkgray;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 30%), 0 4px 5px 0 rgb(0 0 0 / 34%), 0 1px 10px 0 rgb(0 0 0 / 32%);
  }
  .return-button {
    height: 100%;
    font-size: 30px;
    background: none;
    margin: 0;
  }
  .return-button:hover {
    background: #eeeeee;
  }


</style>
