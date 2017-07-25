<template>
  <div>
    <div class="quick-nav">
      <div>
        <router-link to="/">影院热映</router-link>
        <router-link to="/">同城活动</router-link>
      </div>
      <div>
        <router-link to="/">豆瓣时间</router-link>
        <router-link to="/">使用豆瓣APP</router-link>
      </div>
    </div>
    <div class="recommend-list">
      <div v-for="(item, index) in recommendList.recommend_feeds" class="recommend-item">
        <div class="recommend-item-img" :style="{ background: imgUrl[index].background}">
          <div></div>
        </div>
        <h1>{{item.title}}</h1>
        <p>{{item.target.desc}}</p>
        <div class="recommend-item-footer">
          <span class="recommend-item-author">by {{item.target.author.name}}</span>
          <span class="recommend-item-source">{{item.source_cn}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from '../lib/ajax'
export default {
  data () {
    return {
      recommendList: {},
      timePass: 0
    }
  },
  computed: {
    time () {
      return new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * this.timePass).toLocaleDateString().split('/').join('-')
    },
    imgUrl () {
      return this.recommendList.recommend_feeds.map((item) => {
        return {
          background: 'url(' + item.target.cover_url + ') center center / cover no-repeat rgb(250, 250, 250)'
        }
      })
    }
  },
  methods: {
    getRecommentList () {
      ajax({
        url: '/fake',
        method: 'GET',
        query: {
          url: 'https://m.douban.com/rexxar/api/v2/recommend_feed',
          alt: 'json',
          for_mobile: 1,
          next_data: this.time
        }
      }).then((value) => {
        this.recommendList = JSON.parse(value)
        console.log(this.recommendList)
      }, (e) => {
        console.error(e)
      })
    }
  },
  beforeMount () {
    this.getRecommentList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quick-nav {
  margin: 25px 18px 18px;
}
.quick-nav div {
  margin-bottom: 6px;
}
.quick-nav div a {
  height: 44px;
  width: 49%;
  box-sizing: border-box;
  display: inline-block;
  padding: 3px;
  line-height: 38px;
  background-color: #f6f6f6;
  border-radius: 2px;
  color: #494949;
  font-size: 15px;
}
.recommend-item {
  text-align: justify;
  padding: 15px 18px 20px 0;
  margin-left: 18px;
  color: #494949;
  font-size: 12px;
  color: rgb(204, 204, 204);
  border-bottom: 1px solid rgb(240, 240, 240);
}
.recommend-item h1 {
  font-size: 17px;
  color: #494949;
  margin-bottom: 10px;
  font-weight: normal;
}
.recommend-item p {
  margin-bottom: 10px;
}
.recommend-item-img {
  float: right;
  width: 25.6%;
  margin-left: 25px;
}
.recommend-item-img div {
  padding-top: 100%;
}
.recommend-item-footer {
  text-align: right;
}
.recommend-item-footer span:nth-child(1) {
  float: left;
}
</style>
