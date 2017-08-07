<template>
  <div>
    <banner :title="['用App打开', '关注影评人']"></banner>
    <div class="main">
      <div class="movie">
        <h1>{{movie.title}}</h1>
        <div class="movie-info">
          <div :style="{background: imgUrl.background}"></div>
          <div>
            <div class="movie-rating">
              <stars id="star" width="70" height="18" :rating="movie.rating.average"></stars>{{movie.rating.average}}<span class="movie-rating-people">{{movie.ratings_count}}人评价</span>
            </div>
            <p>{{movieInfo}}</p>
          </div>
          <a href="https://www.douban.com/doubanapp/app?model=B&copy=1&page=&channel=m_ad_yingren&direct_dl=1">用App查看影人资料</a>
        </div>
      </div>
      <div class="mark-button">
        <button>想看</button>
        <button>看过</button>
      </div>
      <Summary :title="movie.title + '的剧情简介'" :summary="movie.summary"></Summary>
      <div class="participants">
        <h2>影人</h2>
        <ul>
          <li v-for="item in movie.directors">
            <img :src="item.avatars.small">
            <span class="participants-name">{{item.name}}</span>
            <span class="participants-part">导演</span>
          </li><li v-for="item in movie.casts">
            <img :src="item.avatars.small">
            <span class="participants-name">{{item.name}}</span>
            <span class="participants-part">演员</span>
          </li>
        </ul>
      </div>
      <div class="tags">
        <h2>查看更多豆瓣高分电影电视剧</h2>
        <ul>
          <li v-for="item in tags">{{item}}</li>
        </ul>
      </div>
      <comment :title="movie.title" type="movie" :id="$route.params.movieId"></comment>
      <discuss type="movie" :id="$route.params.movieId"></discuss>
      <review :title="movie.title" type="movie" :id="$route.params.movieId"></review>
      <interestsOrDoulist :title="'推荐' + movie.title + '的豆列'" :propsData="doulistData" type="doulist"></interestsOrDoulist>
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
      movie: {},
      isGetMovieInfo: false,
      doulistData: [['正在上映', '想看的电影太多怕忘了', '豆瓣电影【口碑榜】2017-04-27更新', 'ღ♩♪生活有这些期待很有动力♫♬ღ'], ['【中国内地电影票房总排行】', '影视，良心制作大杂烩', '那些超五星的电影', '日常～那些杂七杂八的']]
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
    movieInfo () {
      let movieInfo = [].concat(this.movie.genres, this.movie.directors.map(i => i.name + '(导演)'), this.movie.casts.map(i => i.name), this.movie.year + '(' + this.movie.countries + ')上映')
      return movieInfo.join(' / ')
    },
    imgUrl () {
      return {
        background: 'url(' + this.movie.images.medium + ')'
      }
    },
    tags () {
      return [].concat(this.movie.countries, this.movie.genres)
    },
    loading () {
      return this.isGetMovieInfo
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
          url: 'https://api.douban.com/v2/movie/subject/' + this.$route.params.movieId
        }
      }).then((value) => {
        console.log('get movieInfo')
        this.isGetMovieInfo = true
        this.movie = JSON.parse(value)
        console.log(this.movie)
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
  margin: 35px 0;
}
.movie h1 {
  margin: 30px 0 5px;
  font-size: 24px;
  line-height: 32px;
  font-weight: normal;
}
.movie-info>div:nth-child(1) {
  float: right;
  width: 100px;
  height: 150px;
}
#star {
  position: relative;
  top: 3px;
  margin-right: 10px;
}
.movie-rating {
  font-size: 15px;
  position: relative;
  bottom: 3px;
}
.movie-rating-people {
  color: #aaa;
  padding-left: 10px;
}
.movie-info p {
  font-size: 14px;
  margin: 15px 120px 0 0;
  color: #494949;
}
.movie-info a {
  font-size: 14px;
  display: block;
  padding-top: 10px;
  clear: right;
}
.mark-button button {
  border: 1px solid #ffb712;
  background: none;
  height: 30px;
  line-height: 30px;
  border-radius: 5px;
  width: 45%;
  color: #ffb712;
}
.participants {
  white-space: nowrap;
  overflow-x: auto;
}
.participants li {
  display: inline-block;
  text-align: center;
  padding-right: 10px;
  width: 75px;
}
.participants li>* {
  display: block;
  margin: 5px 0;
}
.participants-part {
  color: #aaa;
}
.participants-name {
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
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