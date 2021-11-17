<template>
  <div>
    <md-card md-with-hover>

        <md-card-header>
          <div class="post-header-container">
            <div class="md-title">
              {{ post.title }}
            </div>
            <div class="delete-button-container">
              <md-button class="md-icon-button"><delete mdi/></md-button>
            </div>
          </div>

          <div class="md-subhead">{{ post.author }}</div>
        </md-card-header>

        <md-card-content>
          {{ post.body }}
        </md-card-content>

        <div class="accordion-opener" v-on:click="openCommentBlock">
            <chevron-double-down class="new-icon"/>
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
  methods: {
    openCommentBlock: function () {
      this.isExtendedCommentsBlock = !this.isExtendedCommentsBlock
    }
  }

}

</script>

<style scoped>

  .md-card {
    width: 80%;
    margin: 10px auto;
    border-radius: 10px;
  }

  .post-header-container {
    display: flex;
  }

  .md-title {
    width: 92%;
  }

  .delete-button-container {
    width: 8%;
  }

  .md-icon-button {
    margin-top: 0;
    padding: 0;
  }

  .accordion-opener {
    height: 40px;
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
  }

  .extended {
    height: 200px;
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
