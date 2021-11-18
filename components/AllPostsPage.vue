<template>
  <div class="all-posts-page">
    <div class="buttons-container">
      <div>
        Sort by author
        <md-button class="md-raised" v-on:click="sortByAuthorDesc">
          <arrow-down mdi/>
        </md-button>
        <md-button class="md-raised" v-on:click="sortByAuthorAsc">
          <arrow-up mdi/>
        </md-button>
      </div>
      <div>
        Sort by date
        <md-button class="md-raised" v-on:click="sortByDateDesc">
          <arrow-down mdi/>
        </md-button>
        <md-button class="md-raised" v-on:click="sortByDateAsc">
          <arrow-up mdi/>
        </md-button>
      </div>
      <div>
        <md-button class="md-raised" v-on:click="previousPage" :disabled="isDisabledPrevPage">
          <arrow-left mdi/>
        </md-button>
          <div class="page-counter-container"></div>
        <md-button class="md-raised" v-on:click="nextPage" :disabled="isDisabledNextPage">
          <arrow-right mdi/>
        </md-button>
      </div>
    </div>
    <div class="posts-container">
      <Post v-for="post in posts" :key="post._id" v-bind:post="post"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


Vue.use(VueMaterial)



export default {
  name: "AllPostsPage",
  data: () => ({
    posts: [],
    counter: 0,
    params: {
      limit: 5,
      sort: {
        date: 'asc'
      },
      skip:0
    },
    baseURL: process.env.baseUrl


  }),
  async mounted() {
    console.log(this.baseURL)
    this.posts = await this.$axios.$get(`${this.baseURL}/api/blog/posts`, { params: this.params }).then(res => res.posts)
    this.counter = await this.$axios.$get(`${this.baseURL}/api/blog/posts`, { params: this.params }).then(res => res.counter)
  },

  computed: {
      isDisabledPrevPage() {
        return this.params.skip < 5;
      },
      isDisabledNextPage() {
        return this.params.skip >= 15;
      }
  },

  methods: {
    async sortByDateDesc () {
      this.params.sort = { date: 'desc' }
      this.posts = await this.$axios.$get('http://localhost:5000/api/blog/posts', { params: this.params }).then(res => res.posts)
    },
    async sortByDateAsc () {
      this.params.sort = { date: 'asc' }
      this.posts = await this.$axios.$get('http://localhost:5000/api/blog/posts', { params: this.params }).then(res => res.posts)

    },
    async sortByAuthorDesc () {
      this.params.sort = { author: 'asc' }
      this.posts = await this.$axios.$get('http://localhost:5000/api/blog/posts', { params: this.params }).then(res => res.posts)
    },
    async sortByAuthorAsc () {
      this.params.sort = { author: 'desc' }
      this.posts = await this.$axios.$get('http://localhost:5000/api/blog/posts', { params: this.params }).then(res => res.posts)
    },
    async previousPage () {
      this.params.skip -= 5
      this.posts = await this.$axios.$get('http://localhost:5000/api/blog/posts', { params: this.params }).then(res => res.posts)
    },
    async nextPage () {
      this.params.skip += 5
      this.posts = await this.$axios.$get('http://localhost:5000/api/blog/posts', { params: this.params }).then(res => res.posts)
    }
  }
}



</script>





<style lang="scss" scoped>
  .all-posts-page {

  }



  .buttons-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 3rem;
    background-color: darkgray;
    margin-top: 150px;

  }
  .buttons-container > div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #eeeeee;
    font-size: 20px;
  }




  .page-counter-container {
    background-color: gray;
    width: 40px;
  }



  .posts-container {
    width: 80%;
    margin: 30px auto;
  }

</style>
