<template>
  <div>
  <Header/>
    <div class="current-post-container">
        <NuxtLink to="/"><md-button class="return-button">Back</md-button></NuxtLink>
        <Post v-bind:post="post"
              v-bind:isCurrentPost="true"/>
    </div>
  </div>
</template>

<script>


export default {
  name: "CurrentPostPage",
  data: () => ({
    post: {}
  }),
  async mounted() {
    this.post = await this.$axios.$get(`/api/blog/posts/${this.$route.params.id}`)
  }
}

</script>

<style scoped>
  .current-post-container {
    height: 100vh;
    display: flex;
    background: #eeeeee;

  }
  .return-button {
    height: 100%;
    background: #aaa9a9;
    opacity: 0.5;
    margin: 0;
  }
  .return-button:hover {
    opacity: 1;
  }


</style>
