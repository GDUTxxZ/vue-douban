<template>
  <div>
    <banner :title="['用App打开', '更多文学好书推荐']"></banner>
    <div class="main">
      <div class="book">
        <h1>{{book.title}}</h1>
        <div class="book-info">
          <div :style="{background: imgUrl.background}"></div>
          <div>
            <div class="book-rating">
              <stars id="star" width="70" height="18" :rating="book.rating.average"></stars>{{book.rating.average}}<span class="book-rating-people">{{book.ratings_count}}人评价</span>
            </div>
            <p>{{bookInfo}}</p>
          </div>
          <div>
            <a href="https://www.douban.com/doubanapp/app?model=B&copy=1&page=&channel=m_ad_yingren&direct_dl=1">电子书/纸质书购买</a>
            <span>当当网 xx元起</span>
          </div>
        </div>
      </div>
      <div class="mark-button">
        <button>想读</button>
        <button>在读</button>
        <button>读过</button>
      </div>
      <Summary :title="book.title + '的内容简介'" :summary="book.summary"></Summary>
      <div class="tags">
        <h2>查看更多豆瓣高分好书</h2>
        <ul>
          <li v-for="item in book.tags">{{item.title}}</li>
        </ul>
      </div>
      <comment :title="book.title" type="book" :id="$route.params.bookId"></comment>
      <discuss type="book" :id="$route.params.bookId"></discuss>
      <review :title="book.title" type="book" :id="$route.params.bookId"></review>
      <interestsOrDoulist :title="'推荐' + book.title + '的豆列'" :propsData="doulistData" type="doulist"></interestsOrDoulist>
    </div>
    <doubanApp></doubanApp>
  </div>
</template>

<script>
import ajax from '../lib/ajax'
import banner from '../components/banner'
import stars from '../components/stars'
import Summary from '../components/summary'
import interestsOrDoulist from '../components/interestsOrDoulist'
import doubanApp from '../components/doubanApp'
import comment from '../components/comment'
import discuss from '../components/discuss'
import review from '../components/review'
export default {
  data () {
    return {
      book: {},
      annotations: {},
      isGetMovieInfo: false,
      isGetAnnotations: false,
      doulistData: [['所有经典书都要看完', '闲着没事读读书', '含英咀华——总有一本适合你', '我的身体有一个游荡的未来'], ['读书即生活', '读书计划', '购书单', '生活中永远保持期待，好书追寻中']]
    }
  },
  components: {
    banner,
    doubanApp,
    stars,
    Summary,
    interestsOrDoulist,
    comment,
    discuss,
    review
  },
  computed: {
    bookInfo () {
      let bookInfo = [].concat(this.book.author, this.book.translator, this.book.publisher, this.book.pages + '页', this.book.binding, this.book.price, this.book.pubdate)
      return bookInfo.join(' / ')
    },
    imgUrl () {
      return {
        background: 'url(' + this.book.images.medium + ')'
      }
    },
    loading () {
      return this.isGetMovieInfo && this.isGetAnnotations
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      ajax({
        url: '/fake',
        method: 'GET',
        query: {
          url: 'https://api.douban.com/v2/book/' + this.$route.params.bookId
        }
      }).then((value) => {
        console.log('get bookInfo')
        this.isGetMovieInfo = true
        this.book = JSON.parse(value)
        console.log(this.book)
      }, (e) => {
        console.error(e)
      })
      ajax({
        url: '/fake',
        method: 'GET',
        query: {
          url: 'https://m.douban.com/rexxar/api/v2/book/' + this.$route.params.bookId + '/annotations',
          count: 5,
          start: 0,
          for_mobile: 1
        }
      }).then((value) => {
        console.log('get annotations')
        this.isGetAnnotations = true
        this.annotations = JSON.parse(value)
        console.log(this.annotations)
      }, (e) => {
        console.error(e)
      })
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 0 0 15px;
  color: #aaa;
  font-size: 15px;
  font-weight: normal;
  text-align: left;
}
.main {
  margin: 0 18px;
  text-align: left;
}
.main>div {
  margin: 30px 0;
}
.book h1 {
  margin: 30px 0 5px;
  font-size: 24px;
  line-height: 32px;
  font-weight: normal;
}
.book-info>div:nth-child(1) {
  float: right;
  width: 100px;
  height: 150px;
  margin-bottom: 15px;
}
#star {
  position: relative;
  top: 3px;
  margin-right: 10px;
}
.book-rating {
  font-size: 15px;
  position: relative;
  bottom: 3px;
}
.book-rating-people {
  color: #aaa;
  padding-left: 10px;
}
.book-info p {
  font-size: 14px;
  margin: 15px 120px 0 0;
  color: #494949;
}
.book-info>div:nth-last-child(1) {
  clear: right;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  padding: 13px 0;
  font-size: 15px;
}
.book-info>div:nth-last-child(1) span {
  font-size: 14px;
  color: #ccc;
  float: right;
}
.mark-button button {
  border: 1px solid #ffb712;
  background: none;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  border-radius: 5px;
  margin-right: 5px;
  width: 31%;
  color: #ffb712;
}
.tags li{
  display: inline-block;
  background: #eee;
  padding: 0 12px;
  border-radius: 28px;
  color: #494949;
  font-size: 15px;
  line-height: 28px;
  margin: 0 10px 10px 0;
}
</style>