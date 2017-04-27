<template>
  <div>
    <div class="post-actions">
      <a href="#/">Back to archive</a>
    </div>

    <article class="post" v-if="post">
      <div class="post-image" v-html="image"></div>
      <h2 v-html="heading"></h2>
      <vembed v-bind:id="post.slug" v-bind:options="{ emoji: true }" v-html="content"></vembed>

      <div class="comments">
        <disqus shortname="jakke" v-bind:identifier="id" v-bind:url="url"></disqus>
      </div>
    </article>
  </div>
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus.vue'
import VEmbed from 'vue-embed'
import Prismic from 'prismic.io'

export default {
  name: 'post',
  data () {
    return {
      post: null
    }
  },
  components: {
    'vembed': VEmbed,
    'disqus': VueDisqus
  },
  props: [
    'id'
  ],
  watch: {
    id () {
      this.getPost()
    }
  },
  computed: {
    gists () {
      return this.post ? this.post.getGroup('post.gists').value : null
    },
    image () {
      return this.post ? this.post.getImage('post.image').asHtml() : null
    },
    content () {
      return this.post ? this.post.getStructuredText('post.maincontent').asHtml() : null
    },
    heading () {
      return this.post ? this.post.getText('post.heading') : null
    },
    url () {
      return location.href // this.$route.fullPath
    }
  },
  methods: {
    getPost () {
      if (this.id) {
        Prismic.Api('//jakke.prismic.io/api', function (err, Api) {
          if (err) {
            throw err
          }
          Api.getByID(this.id).then(function (pageContent) {
            this.post = pageContent
          }.bind(this))
        }.bind(this))
      }
    }
  },
  mounted () {
    this.getPost(this.id)
  }
}
</script>

<style scoped>

h2 {
  font-size: 36px;
}

.post-actions {
  text-align: center;
}

.comments {
  border-top: 1px solid #eaeaea;
  padding: 10px;
  margin: 10px;
}

@media (max-width: 375px) {
  .post {
    width: 100%;
    margin: 10px
  }

  img {
    height: auto;
  }
}

@media (min-width: 768px) {
  .post {
    width: 768px;
    margin: 10px auto;
  }
}

@media (min-width: 1024px) {
  .post {
    width: 1024px;
    margin: 20px auto;
  }
}

.post-image {
  margin-bottom: 2em;
}

</style>
