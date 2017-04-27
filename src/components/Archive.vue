<template>
  <section class="archive">
    <h1>Blog</h1>

    <transition-group name="fade">
      <div key="true" class="container" v-if="query && query.results && query.results.length">
        <ul class="posts" v-for="item in query.results">
          <li class="post-item">
            <span class="posts-item-timestamp" v-html="getDate(item.firstPublicationDate)"></span>
            <router-link class="post-item-link" :to="{ name: 'post', params: { id: item.id }}">{{item.getText('post.heading')}}</router-link>

            <div class="posts-item-tags">
              <label>tags: </label>
              <span class="tag" v-for="tag in item.tags" v-html="tag"></span>
            </div>
          </li>
        </ul>
      </div>
      <div key="false" class="container" v-else>
        <p>Loading...</p>
      </div>
    </transition-group>
  </section>
</template>

<script>
import Post from '@/components/Post'
import moment from 'moment'
import Prismic from 'prismic.io'

export default {
  name: 'archive',
  components: {
    'post': Post
  },
  data () {
    return {
      api: '//jakke.prismic.io/api',
      query: null
    }
  },
  methods: {
    getDate (date) {
      return moment(date).format('dddd, DD MMMM YYYY HH:mm')
    },
    getPosts () {
      Prismic.Api(this.api, function (err, Api) {
        if (err) {
          console.log('Something went wrong: ', err)
        }
        Api.form('everything')
        .ref(Api.master())
        .query(Prismic.Predicates.at('document.type', 'post')).submit(function (err, response) {
          if (err) {
            console.log('Something went wrong: ', err)
          }
          if (response) {
            this.query = response
          }
        }.bind(this))
      }.bind(this))
    }
  },
  mounted () {
    this.getPosts()
  }
}
</script>

<style scoped>

h1 {
  font-size: 72px;
  text-align: center;
}

.posts {
  padding-left: 0;
  list-style-type: none;
}

.post-item {
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #262630;
}

.post-item:last-of-type {
  border-bottom: 0;
}

.posts-item-timestamp,
.posts-item-tags {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
}

.posts-item-tags {
  margin-top: 30px;
}

.post-item-link {
  font-size: 28px;
}

.tag {
  padding: 4px 7px;
  background: #262630;
  color: white;
}
</style>
