<template>
    <div>
      <Comment v-for="comment in comments" :key="comment._id" v-bind:comment="comment"/>
    </div>
</template>

<script>
export default {
  name: "CommentsContainer",
  props: {
    postId: String
  },
  data: () => ({
    comments: [],
  }),
  async mounted() {
    this.comments = await this.$axios.$get(`http://localhost:5000/api/blog/comments/${this.postId}`)
  }
}
</script>

<style scoped>

</style>
