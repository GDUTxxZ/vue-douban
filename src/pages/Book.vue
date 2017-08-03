<template>
  <div>
    <div v-if="book.bookNonfiction === null || book.bookFiction === null || book.bookMarket === null">加载中</div>
    <div v-else>
      <scroller scrollTitle="最受关注图书|虚构类" scrollHref="/book" :scrollData="book.bookFiction.subject_collection_items"></scroller>
      <scroller scrollTitle="最受关注图书|非虚构类" scrollHref="/book" :scrollData="book.bookNonfiction.subject_collection_items"></scroller>
      <div class="market-book">
        <div class="market-title">
          <h1>豆瓣书店</h1>
          <router-link to="/book">更多</router-link>
        </div>
        <div class="promo-book">
          <div class="market-book-img" :style="{background: promoBookImg.background}">
            <div></div>
          </div>
          <div class="promo-book-header">
            {{book.bookMarket.header.title}}
            <span>￥{{book.bookMarket.header.price}}</span>
          </div>
          <p class="promo-book-info">
            {{book.bookMarket.header.info}}
          </p>
        </div>
        <ul class="market-book-list">
          <li class="market-book-item" v-for="index in 8">
            <router-link :to="'/book/' + book.bookMarket.subject_collection_items[index - 1].id">
              <div class="market-book-img" :style="{background: imgUrl[index - 1].background}">
                <div></div>
              </div>
              <span>{{book.bookMarket.subject_collection_items[index - 1].title}}</span>
              <div class="market-book-price">
                <span>￥{{book.bookMarket.subject_collection_items[index - 1].price}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <interests title="发现好图书" :interestsData="interestsData"></interests>
    <types :typesData="typesData"></types>
    <doubanApp></doubanApp>
  </div>
</template>

<script>
import scroller from '../components/scroller'
import doubanApp from '../components/doubanApp'
import interests from '../components/interests'
import types from '../components/types'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      interestsData: [['小波看书', '村上春树周边', '我凭名字认定了你', '不可饶恕的女人们'], ['爱欲书', '他们还写侦探小说', '人生识字始忧患', '诗歌书店']],
      typesData: ['小说', '爱情', '历史', '外国文学', '青春', '励志', '随笔', '传记', '推理', '旅行', '奇幻', '经营']
    }
  },
  components: {
    scroller,
    doubanApp,
    interests,
    types
  },
  computed: {
    ...mapState(['book']),
    promoBookImg () {
      return {
        background: 'url(./pic?url=' + this.book.bookMarket.header.cover.url + ') center center / cover no-repeat rgb(250, 250, 250)'
      }
    },
    imgUrl () {
      return this.book.bookMarket.subject_collection_items.map((item) => {
        return {
          background: 'url(./pic?url=' + item.cover.url + ') center center / cover no-repeat rgb(250, 250, 250)'
        }
      })
    }
  },
  beforeMount () {
    if (this.book.bookNonfiction === null) {
      this.$store.dispatch('getBookNonfiction')
    }
    if (this.book.bookFiction === null) {
      this.$store.dispatch('getBookFiction')
    }
    if (this.book.bookMarket === null) {
      this.$store.dispatch('getBookMarket')
    }
    console.log(this.book)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.market-book {
  box-sizing: border-box;
  padding: 8px 20px;
}
.market-title {
  height: 45px;
  line-height: 45px;
  text-align: left;
}
.market-title h1{
  font-size: 1.06rem;
  display: inline;
  font-weight: normal;
}
.market-title a {
  float: right;
  font-size: .9rem;
  color: #42bd56;
}
.promo-book {
  text-align: left;
}
.promo-book .market-book-img {
  float: left;
  width: 100px;
  margin-right: 20px;
}
.promo-book-header {
  font-size: 19px;
  color: #494949;
  padding-bottom: 10px;
}
.promo-book-header span {
  float: right;
  color: #E76648;
  font-size: 16px;
}
.promo-book-info {
  font-size: 13px;
}
.market-book-list {
  overflow-x: auto;
  white-space: nowrap;
  clear: left;
  padding-top: 15px;
}
.market-book-item {
  display: inline-block;
  word-wrap: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 1.12rem;
  width: 100px;
  font-size: .94rem;
  line-height: 25px;
}
.market-book-item a {
  color: #111;
}
.market-book-img {
  width: 100%;
  overflow: hidden;
  margin-bottom: 10px;
}
.market-book-img div {
  margin-top: 142.85714%;
}
.market-book-price {
  font-size: .72rem;
}
.market-book-price, .promo-book-info {
  color: #aaa;
}
</style>