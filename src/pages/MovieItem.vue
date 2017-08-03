<template>
  <div>
    <banner title="关注影评人"></banner>
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
      <div class="summary">
        <h2>{{movie.title}}的剧情简介</h2>
        <p>{{isExpand?movie.summary:shortSummary}}<span v-if="!isExpand" @click="expand">(展开)</span> </p>
      </div>
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
      <div class="comment">
        <h2>{{movie.title}}的短评({{comment.total}})</h2>
        <ul>
          <li v-for="item in comment.interests">
            <img :src="item.user.avatar">
            <div class="comment-main">
              <div class="user">
                {{item.user.name}}<stars class="comment-star" width="70" height="18" :rating="item.rating.value * 2"></stars>
              </div>
              <span class="time">{{item.create_time}}</span>
              <p>{{item.comment}}</p>
              <div class="vote-btn">
                <div class="vote-btn-right"></div>
                <div class="vote-btn-left">
                  <span></span>{{item.vote_count}}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <button>查看全部短评</button>
      </div>
      <div class="discuss">
        <h2>讨论({{discuss.total}})</h2>
        <ul>
          <li v-for="item in discuss.forum_topics">
            <div class="discuss-item-title">{{item.title}}</div>
            <div class="discuss-response-number">{{item.comments_count}}人回应</div>
          </li>
        </ul>
        <button>查看全部讨论</button>
      </div>
      <div class="review">
        <h2>{{movie.title}}的影评({{review.total}})</h2>
        <ul>
          <li v-for="item in review.reviews">
            <h3>{{item.title}}</h3>
            {{item.user.name}}<star class="review-star" width="70" height="18" :rating="item.rating.value * 2"></star>
            <p>{{item.abstract}}</p>
            <span class="review-useful">{{item.useful_count}} 有用</span>
          </li>
        </ul>
        <button>查看全部影评</button>
      </div>
      <div class="doulist">
        <h2>推荐{{movie.title}}的豆列</h2>
        <ul>
          <li>正在上映</li>
          <li>想看的电影太多怕忘了</li>
          <li>豆瓣电影【口碑榜】2017-04-27更新</li>
          <li>ღ♩♪生活有这些期待很有动力♫♬ღ</li>
          <li class="line"></li>
          <li>【中国内地电影票房总排行】</li>
          <li>影视，良心制作大杂烩</li>
          <li>那些超五星的电影</li>
          <li>日常～那些杂七杂八的</li>
        </ul>
      </div>
    </div>
    <doubanApp></doubanApp>
  </div>
</template>

<script>
import ajax from '../lib/ajax'
import banner from '../components/banner'
import stars from '../components/stars'
import doubanApp from '../components/doubanApp'
export default {
  data () {
    return {
      movie: {},
      comment: {},
      discuss: {},
      review: {},
      isGetMovieInfo: false,
      isGetComment: false,
      isGetDiscuss: false,
      isGetReview: false,
      isExpand: false
    }
  },
  components: {
    banner,
    doubanApp,
    stars
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
    shortSummary () {
      return this.movie.summary.slice(0, 75) + '...'
    },
    tags () {
      return [].concat(this.movie.countries, this.movie.genres)
    },
    loading () {
      return this.isGetComment && this.isGetMovieInfo && this.isGetDiscuss && this.isGetReview
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
      ajax({
        url: '/fake',
        method: 'GET',
        query: {
          url: 'https://m.douban.com/rexxar/api/v2/movie/' + this.$route.params.movieId + '/interests',
          count: 4,
          order_by: 'hot',
          start: 0,
          for_mobile: 1
        }
      }).then((value) => {
        console.log('get comment')
        this.isGetComment = true
        this.comment = JSON.parse(value)
        console.log(this.comment)
      }, (e) => {
        console.error(e)
      })
      ajax({
        url: '/fake',
        method: 'GET',
        query: {
          url: 'https://m.douban.com/rexxar/api/v2/movie/' + this.$route.params.movieId + '/forum_topics',
          count: 5,
          start: 0,
          for_mobile: 1
        }
      }).then((value) => {
        console.log('get discuss')
        this.isGetDiscuss = true
        this.discuss = JSON.parse(value)
        console.log(this.discuss)
      }, (e) => {
        console.error(e)
      })
      ajax({
        url: '/fake',
        method: 'GET',
        query: {
          url: 'https://m.douban.com/rexxar/api/v2/movie/' + this.$route.params.movieId + '/reviews',
          count: 5,
          start: 0,
          for_mobile: 1
        }
      }).then((value) => {
        console.log('get review')
        this.isGetReview = true
        this.review = JSON.parse(value)
        console.log(this.review)
      }, (e) => {
        console.error(e)
      })
    },
    expand () {
      this.isExpand = true
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
.mark-button {
  margin: 25px 0;
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
.summary {
  font-size: 15px;
  color: #494949;
}
.summary p span {
  color: #42bd56;;
  float: right;
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
  margin-right: 10px;
}
.comment li {
  clear: left;
  margin-bottom: 30px;
}
.comment img {
  float: left;
  display: block;
  width: 36px;
  border-radius: 18px;
}
.comment-main {
  margin-left: 45px;
  font-size: 15px;
}
.comment-star {
  position: relative;
  top: 3px;
  margin-left: 10px;
}
.comment-main span {
  line-height: 25px;
  font-size: 12px;
  color: #aaa;
}
.comment-main p {
  margin: 3px 0;
  color: #494949;
}
.vote-btn-left {
  color: #ccc;
  font-size: 14px;
  margin: 10px 0;
}
.vote-btn-left span {
  background: url('https://img3.doubanio.com/f/talion/7a0756b3b6e67b59ea88653bc0cfa14f61ff219d/pics/card/ic_like_gray.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  top: 5px;
}
.vote-btn-right {
  float: right;
  background: url('https://img3.doubanio.com/f/talion/be268c0a1adb577c8dfdcfbe48c818af3983ed62/pics/card/more.svg') center;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  position: relative;
  top: 3px;
}
.comment button, .discuss button, .review button {
  display: block;
  text-align: center;
  width: 100%;
  background: none;
  color: #42bd56;
  font-size: 15px;
  margin: 10px 0 30px;
}
.comment button:focus, .discuss button:focus {
  outline: none;
}
.discuss li {
  border-bottom: 1px solid #eeeeee;
  padding: 15px 18px 15px 0;
}
.discuss li:nth-last-child(1) {
  border-bottom: none;
}
.discuss-item-title {
  font-size: 17px;
  color: #494949;
  font-weight: 500;
}
.discuss-response-number {
  margin-top: 5px;
  color: #42bd56;
}
.review {
  color: #494949;
  font-size: 12px;
}
.review li {
  padding: 15px 18px 15px 0;
}
.review h3 {
  font-weight: normal;
  font-size: 17px;
}
.review p {
  color: #aaaaaa;
  padding: 7px 0;
  line-height: 20px;
}
.review-useful {
  color: #aaaaaa;
}
.review-star {
  position: relative;
  top: 4px;
  padding-left: 10px;
}
.doulist {
  margin-top: 10px;
}
.doulist ul {
  white-space: nowrap;
  overflow-x: auto;
  text-align: center;
  padding: 5px 15px 43px 15px;
  font-size: .94rem;
}
.doulist li {
  height: 50px;
  line-height: 50px;
  display: inline-block;
  border: 1px solid #42bd56;
  color: #42bd56;
  padding: 0 1.55rem;
  border-radius: .25rem;
}
.doulist li.line {
  display: block;
  height: 10px;
  border: none;
}
</style>