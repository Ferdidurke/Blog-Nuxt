<template>
  <div class="post-container">

      <md-card md-with-hover>

        <md-card-header>
          <div class="post-header-container">
            <div class="md-title">
              {{ post.title }}
            </div>
            <div class="delete-button-container">
              <md-button class="md-icon-button"
                         v-on:click="removePost"
                         v-show="$auth.loggedIn"
                          :disabled="isDisabledDeletePost"><delete mdi class="post-icon"
                                                                   :class="{ 'disabled-icon':isDisabledDeletePost }"/></md-button>
            </div>
          </div>
          <div class="post-date-wrapper">
            <div class="md-subhead">{{ post.author }}</div>
            <div class="md-subhead">{{ new Date(post.date).toLocaleString() }}</div>
          </div>
        </md-card-header>
        <NuxtLink style="text-decoration: none;
                          color: inherit;"
                  :to="{ name: 'posts-id', params: { id: post._id }}">
        <md-card-content :class="{ 'current-post-content':isCurrentPost }">
          {{ post.body }}
        </md-card-content>
      </NuxtLink>
        <div class="accordion-opener" v-on:click="openCommentBlock">
            <chevron-double-down class="post-icon"/>
        </div>
      <div class="comments-block" :class="{ extended: isExtendedCommentsBlock }">
        <CommentsContainer v-if="isExtendedCommentsBlock"
                           v-bind:postId="post._id"/>
      </div>
    </md-card>

  </div>
</template>

<script>
import Vue from "vue";
import VueMaterial from 'vue-material'
import { mapGetters } from 'vuex'
import blogApi from '~/services/BlogService'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


Vue.use(VueMaterial)


export default {
  name: "Post",
  props: {
    post: {
      _id: String,
      userId: [String, Number],
      author: String,
      date: [String, Date] ,
      title: [String],
      body: [String],
    },
    isCurrentPost: Boolean,

  },
  data: () => ({
    isExtendedCommentsBlock: false,
  }),

  mounted() {

  },
  computed: {
    ...mapGetters('user', ['getUser']),
    isDisabledDeletePost() {
      return this.getUser.userId !== this.post.userId
    },
  },

  methods: {
    openCommentBlock () {
      this.isExtendedCommentsBlock = !this.isExtendedCommentsBlock
    },
    removePost() {
      blogApi.delete('/api/blog/posts/', { data: { _id: this.post._id }}).then(this.$store.dispatch('blog/loadPosts'))
    },
  }

}

</script>

<style scoped>
  .post-container {
    width: 80%;
    margin: 20px auto;
    border-radius: 10px;
  }
  .md-card {
    border-radius: 10px;
  }

  .post-header-container {
    display: flex;
  }

  .post-date-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .md-title {
    width: 92%;
  }

  .md-card-content {
    max-height: 80px;
    overflow-y: hidden;

  }
  .current-post-content {
    max-height: min-content;
  }

  .delete-button-container {
    width: 8%;
  }

  .post-icon {
    font-size: 24px;
  }

  .disabled-icon {
    color: #eeeeee;
  }

  .md-icon-button {
    margin-top: 0;
    padding: 0;
  }

  .accordion-opener {
    height: 40px;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    border-top: 1px darkgray solid;
    border-bottom: 3px #eeeeee solid;
    border-radius: 0 0 10px 10px;
    transition: 0.7s;
  }
  .accordion-opener:hover {
    transition: 0.7s;
    background: #eeeeee;

  }

  .comments-block {
    max-height: 0;
    transition: max-height 0.9s ease-out;
    display: flex;
  }

  .extended {
    max-height: 600px;
    padding: 10px;
    transition: max-height 0.9s ease-out;
  }

  .new-icon {
    width: 100px;
  }

  @media screen and (max-width: 768px) {
    .delete-button-container {
      width: 20%;
    }

  }



</style>
