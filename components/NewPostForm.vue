<template>

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
      <div class="post-form-button-container">
        <md-button class="md-raised" type="submit">Add</md-button>
      </div>
      <Error v-if="error" v-bind:error="error"/>
    </form>

</template>

<script>

import { mapGetters } from "vuex";


export default {
  name: "NewPostForm",
  props: {
    hidePostForm: Function,
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
    async addPost () {
      try {
            await this.$blogApi.post('/api/blog/posts', {
              userId: this.currentUser.userId,
              author: `${ this.getUser.firstName } ${ this.getUser.lastName }`,
              title: this.title,
              body: this.body,
            })
            await this.$store.dispatch('blog/loadPosts')
            this.hidePostForm()
          } catch (error) {
              this.error = error
          }
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
    justify-content: flex-end;
  }

</style>
