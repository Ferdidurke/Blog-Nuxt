<template>
  <div>
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
                          :disabled="isDisabledDeletePost"><delete mdi class="post-icon"/></md-button>
            </div>
          </div>
          <div class="post-date-wrapper">
            <div class="md-subhead">{{ post.author }}</div>
            <div class="md-subhead">{{ new Date(post.date).toLocaleString() }}</div>
          </div>
        </md-card-header>

        <md-card-content>
          {{ post.body }}
        </md-card-content>

        <div class="accordion-opener" v-on:click="openCommentBlock">
            <chevron-double-down class="post-icon"/>
        </div>
      <div class="comments-block" :class="{extended: isExtendedCommentsBlock}">
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
    }

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
      this.$axios.setHeader('Authorization', localStorage.getItem('auth._token.local'))
      this.$axios.delete('/api/blog/posts/', { data: { _id: this.post._id }}).
      catch(({ response }) => {
        if (response.status === 401) {
          this.$store.commit('user/logout')
        }
      })
      this.$store.dispatch('blog/loadPosts')
    },

  }

}

</script>

<style scoped>

  .md-card {
    width: 80%;
    margin: 20px auto;
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

  .delete-button-container {
    width: 8%;
  }

  .post-icon {
    font-size: 24px;
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
    border-top: 1px solid;
    border-bottom: 3px #eeeeee solid;
    border-radius: 0 0 10px 10px;
    transition: 0.7s;
  }
  .accordion-opener:hover {
    transition: 0.7s;
    background: #eeeeee;

  }

  .comments-block {
    height: 0;
    transition: 0.4s;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .extended {
    height: 300px;
    max-height: 600px;
    padding: 10px;
    transition: 0.5s;
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
