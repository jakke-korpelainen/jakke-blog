<template>

  <div>
    <div class="post-actions">
      <router-link :to="{ name: 'archive' }">Back to archive</router-link>
    </div>
    <transition-group name="fade">
      <article key="true" class="post" v-if="post">
        <div class="post-image" v-html="image"></div>

        <header>
          <h1 v-html="heading"></h1>
          <div class="post-meta">
            <span class="post-meta-timestamp" v-html="date"></span>
            <span class="post-meta-tag tag" v-for="tag in post.tags" v-html="tag"></span>
          </div>
        </header>

        <main>
          <vembed v-bind:id="post.slug" v-bind:options="{ emoji: true }" v-html="content"></vembed>
        </main>

        <div class="comments">
          <disqus shortname="jakke" v-bind:identifier="id" v-bind:url="url"></disqus>
        </div>
      </article>    
      <article key="false" class="post" v-else>
        <svg class="loading" height="32" width="32">
          <polygon points="1,16 16,1 16,16" style="fill:transparent;stroke:#000;stroke-width:2;"></polygon>
          <polygon points="16,16, 16,31 31,16" style="fill:transparent;stroke:#000;stroke-width:2;"></polygon>
        </svg>
      </article>
    </transition-group>
  </div>
  
</template>

<script>
import VueDisqus from 'vue-disqus/VueDisqus.vue'
import VEmbed from 'vue-embed'
import Prismic from 'prismic.io'
import moment from 'moment'

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
    },
    date () {
      return this.post ? moment(this.post.firstPublicationDate).format('dddd, DD MMMM YYYY') : null
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

h1 {
  font-size: 72px;
  font-weight: 500;
}

h2 {
  font-size: 36px;
  font-weight: 500;
}

h3 {
  font-size: 22px;
  font-weight: 500;
}

.post-actions {
  text-align: center;
}

.post-meta {
  margin-bottom: 20px;
}

.post-meta-timestamp {
  font-weight: 500;
  font-size: 18px;
  margin-right: 10px;
  color: #333;
}

.comments {
  border-top: 1px solid #eaeaea;
  padding: 20px 0;
  margin-top: 75px;
  margin-bottom: 25px;
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
  -webkit-filter: grayscale(90%);
  filter: grayscale(90%);
  margin-bottom: 2em;
}

</style>
