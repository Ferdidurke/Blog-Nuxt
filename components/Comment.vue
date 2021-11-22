<template>
  <div>
    <md-card>
      <div class="delete-button-container">
        <md-button class="md-icon-button"
                   v-on:click="removeComment"
                   v-show="$auth.loggedIn"
                   :disabled="isDisabled"><delete mdi class="comment-icon"/></md-button>
      </div>
      <md-card-header>
        <div class="md-subhead">{{ comment.author }}</div>
        <div class="md-subhead">{{ new Date(comment.date).toLocaleString() }}</div>
      </md-card-header>

      <md-card-content>
        {{ comment.body }}
      </md-card-content>

    </md-card>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import blogApi from "@/services/BlogService";

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
    },
    getComments: Function
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    isDisabled() {
      return this.getUser.userId !== this.comment.userId
    }
  },
  methods: {
    removeComment() {
      blogApi.delete('/api/blog/comments', { data: { _id: this.comment._id }}).then(this.getComments())
    },

  }
}
</script>

<style scoped>
  .md-card {
    width: 90%;
    margin: 10px auto;
    border-radius: 10px;
    cursor: default;
  }
  .md-card-header {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
  }
  .delete-button-container {
    display: flex;
    justify-content: end;
  }
  .md-icon-button {
    height: 40px;
    width: 40px;
  }
  .comment-icon {
    font-size: 20px;
  }

</style>
