<template>
  <div class="container">
      <div class="comments-container">
        <Comment v-for="comment in comments" :key="comment._id" v-bind:comment="comment" v-bind:getComments="getComments"/>
      </div>
      <div class="new-comment-form" v-if="isAddNewComment">
        <textarea class="comment-text"
                  v-model="newComment.body"
                  autofocus></textarea>
        <div class="button-container">
          <md-button v-on:click="sendComment">Send</md-button>
        </div>
      </div>
      <div class="button-container">
        <md-button v-if="!isAddNewComment" v-on:click="setNewComment" v-show="$auth.loggedIn">Add comment</md-button>
      </div>
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
    }
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
      this.comments = await this.$axios.$get(`http://localhost:5000/api/blog/comments/${this.postId}`)
    },
    async sendComment () {

      this.$axios.setHeader('Authorization', localStorage.getItem('auth._token.local'))
      await this.$axios.$post(`/api/blog/comments/`, {
        userId: this.currentUserId,
        postId: this.postId,
        author: this.currentAuthor,
        body: this.newComment.body
      }).catch(({ response }) => {
        if (response.status === 401) {
          this.$store.commit('user/logout')
        }
      })
      this.newComment.body = ''
      this.isAddNewComment = false
      this.comments = await this.$axios.$get(`http://localhost:5000/api/blog/comments/${this.postId}`)
    },

  }
}
</script>

<style lang="scss" scoped>

  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .button-container {
    display: flex;
    justify-content: end;
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
