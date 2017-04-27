<template>
  <section class="archive">
    
    <div class="archive-header container">
      <h1>Blog</h1>

      <div class="archive-filters">
        <div class="archive-filters-tag" v-if="tags && tags.length > 0">
          <label>Searching for tags: </label>
          <a href="#" @click.prevent="removeTag(tag)" v-for="tag in tags" class="tag">{{tag}} x</a>
        </div>
      </div>
    </div>

    <transition-group name="fade">
      <div key="true" class="container" v-if="query && query.results && query.results.length">
        <ul class="posts">
          <template v-for="item in query.results">
            <transition name="fade">
              <li class="post-item" >
                <div class="post-item-background" v-html="item.getImage('post.image').asHtml()">                  
                </div>
                <router-link class="post-item-link" :to="{ name: 'post', params: { id: item.id }}">{{item.getText('post.heading')}}</router-link>
                <span class="posts-item-timestamp" v-html="getDate(item.firstPublicationDate)"></span>
                <p class="posts-item-peak" v-html="truncateText(item.getText('post.maincontent'), 300)">

                </p>
                <div class="posts-item-tags">
                  <a href="#" @click.prevent="addTag(tag)" class="tag" v-for="tag in item.tags" v-html="tag"></a>
                </div>
              </li>
            </transition>
          </template>
        </ul>
      </div>
      <div key="false" class="container" v-else>
        <svg class="loading" height="32" width="32">
          <polygon points="1,16 16,1 16,16" style="fill:transparent;stroke:#000;stroke-width:2;"></polygon>
          <polygon points="16,16, 16,31 31,16" style="fill:transparent;stroke:#000;stroke-width:2;"></polygon>
        </svg>
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
      query: null,
      tags: []
    }
  },
  watch: {
    tags () {
      Prismic.Api(this.api, function (err, Api) {
        if (err) {
          throw err
        }
        Api.query([
          Prismic.Predicates.at('document.type', 'post'),
          Prismic.Predicates.any('document.tags', this.tags)
        ]).then(function (content) {
          this.query = content
        }.bind(this))
      }.bind(this))
    }
  },
  methods: {
    addTag (tag) {
      if (tag && this.tags && this.tags.indexOf(tag) === -1) {
        this.tags.push(tag)
      }
    },
    removeTag (tag) {
      if (tag && this.tags && this.tags.indexOf(tag) > -1) {
        this.tags.splice(this.tags.indexOf(tag), 1)
      }
    },
    truncateText (text, limit) {
      if (text.length > limit) {
        for (let i = limit; i > 0; i--) {
          if (text.charAt(i) === ' ' && (text.charAt(i - 1) !== ',' || text.charAt(i - 1) !== '.' || text.charAt(i - 1) !== ';')) {
            return text.substring(0, i) + '...'
          }
        }
      } else {
        return text
      }
    },
    getDate (date) {
      return moment(date).format('dddd, DD MMMM YYYY')
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
  font-weight: 500;
  text-align: center;
}

.archive-filters-tag {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f5f5f5;
}

.posts {
  padding-left: 0;
  list-style-type: none;
}

.post-item {
  position: relative;
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #f5f5f5;
}

.post-item:last-of-type {
  border-bottom: 0;
}

.post-item-background {
  z-index: -1;
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100%;
  max-height: 100%;
  opacity: .4;
  overflow: hidden;
  margin-bottom: 25px;
}

.post-item-background {
  -webkit-filter: grayscale(90%);
  filter: grayscale(90%);
}

.posts-item-timestamp,
.posts-item-tags {
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 10px;
  display: block;
}

.posts-item-peak {
  color: #333;
  font-size: 18px;
}

.posts-item-timestamp {
  color: #333;
}

.posts-item-tags {
  margin-top: 30px;
  margin-bottom: 0;
}

.post-item-link {
  font-size: 38px;
  display: block;
  margin-bottom: 5px;
}

</style>
