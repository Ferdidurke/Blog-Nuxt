<template>
  <div class="all-posts-page">
    <Header/>
    <div class="buttons-container">
      <div>
        Sort by author
        <md-button class="md-raised md-small" v-on:click="sortByAuthorDesc">
          <arrow-down mdi class="icon-button"/>
        </md-button>
        <md-button class="md-raised" v-on:click="sortByAuthorAsc">
          <arrow-up mdi class="icon-button"/>
        </md-button>
      </div>
      <div>
        Sort by date
        <md-button class="md-raised" v-on:click="sortByDateDesc">
          <arrow-down mdi class="icon-button"/>
        </md-button>
        <md-button class="md-raised" v-on:click="sortByDateAsc">
          <arrow-up mdi class="icon-button"/>
        </md-button>
      </div>
      <div>
        <md-button class="md-raised" v-on:click="previousPage" :disabled="isDisabledPrevPage">
          <arrow-left mdi class="icon-button"/>
        </md-button>
          <div class="page-counter-container">
            <div v-if="getCounter>0">
              {{ currentPage }} / {{ lastPage }}
            </div>
          </div>
        <md-button class="md-raised" v-on:click="nextPage" :disabled="isDisabledNextPage">
          <arrow-right mdi class="icon-button"/>
        </md-button>
      </div>
    </div>
    <div class="new-post-button-container">
      <md-button class="md-raised new-post-button" v-on:click="showPostForm">+</md-button>
    </div>
    <div class="new-post-form-container" :class="{ 'active' : isNewPost }">
       <NewPostForm v-if="isNewPost" v-bind:hidePostForm="showPostForm"/>
    </div>
    <div class="posts-container">
      <Post v-for="post in getPost" :key="post._id"
            v-bind:post="post"
            v-bind:isCurrentPost="false"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import {mapGetters} from 'vuex'


Vue.use(VueMaterial)



export default {
  name: "AllPostsPage",
  data: () => ({
    isNewPost: false
  }),
  async mounted() {
    await this.$store.dispatch('blog/loadPosts')

  },

  computed: {
      ...mapGetters('blog', ['getPosts']),
      ...mapGetters('blog', ['getParams']),
      ...mapGetters('user', ['getUser']),
      getPost () {
        return this.getPosts.posts
      },
      getCounter () {
        return this.getPosts.counter
      },
      getQueryParams () {
        return this.getParams
      },

      isDisabledPrevPage() {
        return this.getParams.skip < this.getParams.limit;
      },
      isDisabledNextPage() {
        return this.getParams.skip >= this.getCounter - this.getParams.limit;
      },
      currentPage () {
        return Math.ceil(this.getParams.skip / 5 + 1)
      },
      lastPage () {
        return Math.ceil(this.getCounter / this.getParams.limit)
      }

  },

  methods: {
    showPostForm () {
      this.isNewPost = !this.isNewPost
    },
    async sortByDateDesc () {
      const params = { ...this.getQueryParams }
      params.sort = { date: 'desc' }
      this.$store.commit('blog/changeQueryParams', params)
      await this.$store.dispatch('blog/loadPosts')
    },
    async sortByDateAsc () {
      const params = { ...this.getQueryParams }
      params.sort = { date: 'asc' }
      this.$store.commit('blog/changeQueryParams', params)
      await this.$store.dispatch('blog/loadPosts')
    },
    async sortByAuthorDesc () {
      const params = { ...this.getQueryParams }
      params.sort = { author: 'asc' }
      this.$store.commit('blog/changeQueryParams', params)
      await this.$store.dispatch('blog/loadPosts')
    },
    async sortByAuthorAsc () {
      const params = { ...this.getQueryParams }
      params.sort = { author: 'desc' }
      this.$store.commit('blog/changeQueryParams', params)
      await this.$store.dispatch('blog/loadPosts')
    },
    async previousPage () {
      const params = { ...this.getQueryParams }
      params.skip -= 5
      this.$store.commit('blog/changeQueryParams', params)
      await this.$store.dispatch('blog/loadPosts')
    },
    async nextPage () {
      const params = { ...this.getQueryParams }
      params.skip += 5
      this.$store.commit('blog/changeQueryParams', params)
      await this.$store.dispatch('blog/loadPosts')
    }
  }
}



</script>





<style lang="scss" scoped>
  .all-posts-page {
    padding-bottom: 40px;
    background: #eeeeee;
    min-height: 100vh;
  }

  .buttons-container {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 3rem;
    background-color: darkgray;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 30%), 0 4px 5px 0 rgb(0 0 0 / 34%), 0 1px 10px 0 rgb(0 0 0 / 32%);

  }
  .buttons-container > div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #eeeeee;
    font-size: 20px;
  }
  .md-button {
    min-width: 10%;
  }
  .icon-button {
    font-size: 24px;
  }

  .new-post-button-container {
    display: flex;
    justify-content: center;
  }
  .new-post-button {
    min-width: 1%;
    width: 80px;
    height: 80px;
    margin-top: 20px;
    border-radius: 60px;
    font-size: 40px;
  }

  .page-counter-container {
    width: 45px;
  }


  .posts-container {
    width: 80%;
    margin: 30px auto;
  }

  @media screen and (max-width: 768px){
    .buttons-container {
      justify-content: center;
      gap:0;
    }

  }

</style>
