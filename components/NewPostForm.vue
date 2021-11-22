<template>

    <form class="new-post-form" :class="{ 'active': addNewPost }" @submit.prevent="addPost">
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
      <div class="post-form-button-container">
        <md-button class="md-raised" type="submit">Add</md-button>
      </div>
      <p v-if="error"> {{ error }}</p>
    </form>

</template>

<script>

import {mapGetters} from "vuex";
import blogApi from "@/services/BlogService";

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
      blogApi.post('/api/blog/posts', {
        userId: this.currentUser.userId,
        author: `${this.getUser.firstName} ${this.getUser.lastName}`,
        title: this.title,
        body: this.body,
      }).then(this.$store.dispatch('blog/loadPosts'))
        .then(this.addNewPost)
        .catch(({ response }) => {
          this.error = response.data.message
        })
    }
  },
}
</script>

<style scoped>
  .new-post-form {
    transition: 0.5s;
    margin: 6rem auto;
    width: 50%;
    background-color: darkgray;
    border-radius: 10px;
    padding: 20px;
  }
  .post-form-button-container {
    display: flex;
    justify-content: end;
  }

</style>
