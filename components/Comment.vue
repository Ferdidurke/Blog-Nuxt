<template>
  <div>
    <md-card md-with-hover>

      <md-card-header>
        <div class="md-subhead">{{ comment.author }}</div>
      </md-card-header>

      <md-card-content>
        {{ comment.body }}
      </md-card-content>

      <md-card-actions>

      </md-card-actions>

    </md-card>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {
      _id: String,
      author: String,
      body: String,
      date: [String, Date],
      postId: String,
      userId: String
    }
  }
}
</script>

<style scoped>
  .md-card {
    width: 90%;
    margin: 0 auto;
  }
</style>
