<template>
  <div class="container">
      <div class="comments-container">
        <Comment v-for="comment in comments"
                 :key="comment._id"
                 v-bind:comment="comment"
                 v-bind:getComments="getComments"/>
      </div>
      <div class="new-comment-form"
           v-if="isAddNewComment">
        <textarea class="comment-text"
                  v-model="newComment.body"
                  autofocus></textarea>
        <div class="button-container">
          <md-button v-on:click="sendComment">Send</md-button>
        </div>
      </div>
      <div class="button-container">
        <md-button v-if="!isAddNewComment"
                   v-on:click="setNewComment"
                   v-show="$auth.loggedIn">Add comment</md-button>
      </div>
      <Error v-if="error" v-bind:error="error"/>
  </div>

</template>

<script>
import {mapGetters} from "vuex";


export default {
  name: "CommentsContainer",
  props: {
    postId: String
  },
  data: () => ({
    comments: [],
    isAddNewComment: false,
    newComment: {
      body: ''
    },
    error: undefined
  }),
  async mounted() {
    await this.getComments()
  },
  computed: {
    ...mapGetters('user', ['getUser']),
    currentUserId() {
      return this.getUser.userId
    },
    currentAuthor() {
      return `${this.getUser.firstName} ${this.getUser.lastName}`
    },

  },
  methods: {
    setNewComment () {
      this.isAddNewComment = true
    },
    async getComments () {
      try {
        this.comments = await this.$axios.$get(`/api/blog/comments/${this.postId}`)
      } catch (error) {
        this.error = error
      }

    },
    async sendComment () {
      try {
        await this.$blogApi.post(`/api/blog/comments/`, {
          userId: this.currentUserId,
          postId: this.postId,
          author: this.currentAuthor,
          body: this.newComment.body
        })
        this.newComment.body = ''
        this.isAddNewComment = false
        this.comments = await this.$axios.$get(`/api/blog/comments/${this.postId}`)
      } catch (error) {
        this.error = error
      }

    },

  }
}
</script>

<style scoped>

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
  }
  .comments-container {
    overflow-y: auto;
  }

  .comment-text {
    width: 90%;
    height: 120px;
    display: block;
    margin: 0 auto;
    opacity: 1;
    resize: none;
    border: darkgray 2px solid;
  }

</style>
