<template>
  <div class="new-post-form-container">
    <form class="new-post-form" @submit.prevent="addPost">
      <md-field>
        <label>Title</label>
        <md-input required
                  v-model="title"></md-input>
      </md-field>
      <md-field>
        <label>Body</label>
        <md-textarea
                  required
                  v-model="body"></md-textarea>
      </md-field>
      <md-button class="md-raised" type="submit">Add</md-button>
    </form>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "NewPostForm",
  props: {
    addNewPost: Function,
  },
  data: () => ({
    title: '',
    body: '',
    error: undefined
  }),
  computed: {
    ...mapGetters('user', ['getUser']),
    currentUser() {
      return this.getUser
    }
  },
  methods: {
    addPost () {
      this.$axios.setHeader('Authorization', localStorage.getItem('auth._token.local'))
      this.$axios.post('/api/blog/posts', {
        userId: this.currentUser.userId,
        author: `${this.getUser.firstName} ${this.getUser.lastName}`,
        title: this.title,
        body: this.body,
      }).then(this.$store.dispatch('blog/loadPosts'))
        .then(this.addNewPost)
        .catch(({ response }) => {
          if (response.status === 401) {
            this.$store.commit('user/logout')
          }
        })
    }
  },
}
</script>

<style scoped>
.new-post-form-container {
  margin: 6rem auto;
  width: 50%;
  background-color: darkgray;
  border-radius: 10px;
  padding: 20px;
}


</style>
