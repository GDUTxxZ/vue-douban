<template>
  <div>
    <banner title="关注影评人"></banner>
    <div class="movie">
      <h1>{{movie.title}}</h1>
      <div class="movie-info">
        <div :style="{background: imgUrl.background}"></div>
        <div>
          <div class="movie-rating">
            <canvas id="star" width="70" height="18"></canvas>{{movie.rating.average}}<span class="movie-rating-people">{{movie.ratings_count}}人评价</span>
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
      <div v-for="item in comment.interests">
        <img :src="comment.interests" alt="">
        <div class="comment-main">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from '../lib/ajax'
import banner from '../components/banner'
export default {
  data () {
    return {
      movie: {},
      isExpand: false,
      comment: {}
    }
  },
  components: {
    banner
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
      return this.movie.summary.slice(0, 70) + '...'
    },
    tags () {
      return [].concat(this.movie.countries, this.movie.genres)
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      console.log('fetchData')
      ajax({
        url: '/fake',
        method: 'GET',
        query: {
          url: 'https://api.douban.com/v2/movie/subject/' + this.$route.params.movieId
        }
      }).then((value) => {
        this.movie = JSON.parse(value)
        console.log(this.movie)
      }, (e) => {
        console.error(e)
      })
      ajax({
        url: '/fake',
        method: 'GET',
        query: {
          url: 'https://m.douban.com/rexxar/api/v2/movie/' + this.$route.params.movieId + '/interests?count=4&order_by=hot&start=0&ck=&for_mobile=1'
        }
      }).then((value) => {
        this.comment = JSON.parse(value)
        console.log(this.movie)
      }, (e) => {
        console.error(e)
      })
    },
    paintStars () {
      console.log('paintStar')
      function star (ctx, x, y, R) {
        let r = R / 2
        ctx.beginPath()
        ctx.moveTo(x, y)
        for (let j = 0; j < 5; j++) {
          ctx.lineTo(x + R * Math.cos((j * 72 + 18) * Math.PI / 180), y - R * Math.sin((j * 72 + 18) * Math.PI / 180))
          ctx.lineTo(x + r * Math.cos((j * 72 + 54) * Math.PI / 180), y - r * Math.sin((j * 72 + 54) * Math.PI / 180))
        }
        ctx.lineTo(x + R * Math.cos(18 * Math.PI / 180), y - R * Math.sin(18 * Math.PI / 180))
        ctx.closePath()
        ctx.fill()
      }
      let rating = this.movie.rating.average
      let canvas = document.getElementById('star')
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = 'rgb(255,183,16)'
      ctx.strokeStyle = 'rgb(255,183,16)'
      for (let i = 0; i < 5; i++) {
        star(ctx, 7 + i * 14, 9, 7)
      }
      ctx.clearRect(70, 0, -((10 - rating) / 10 * 80), 18)
      ctx.globalCompositeOperation = 'destination-over'
      ctx.fillStyle = '#ddd'
      ctx.strokeStyle = '#ddd'
      for (let i = 0; i < 5; i++) {
        star(ctx, 7 + i * 14, 9, 7)
      }
    },
    expand () {
      this.isExpand = true
    }
  },
  updated () {
    this.paintStars()
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
.movie {
  text-align: left;
  margin: 0 18px;
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
  text-align: left;
  margin: 0 18px 30px;
  font-size: 15px;
  color: #494949;
}
.summary p span {
  color: #42bd56;;
  float: right;
}
.participants {
  margin: 0 18px;
  white-space: nowrap;
  overflow-x: auto;
}
.participants li {
  display: inline-block;
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
.tags {
  margin: 15px 18px;
  text-align: left;
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
.comment {
  margin: 0 18px;
}
</style>