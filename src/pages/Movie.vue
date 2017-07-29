<template>
  <div>
    <div v-if="movie.movieInTheaters === null && movie.movieFree === null && movie.movieLast === null">加载中</div>
    <div v-else>
      <scroller scrollTitle="影院热映" scrollHref="/movie" :scrollData="movie.movieInTheaters.subjects"></scroller>
      <scroller scrollTitle="免费在线观影" scrollHref="/movie" :scrollData="movie.movieFree.subject_collection_items"></scroller>
      <scroller scrollTitle="新片速递" scrollHref="/movie" :scrollData="movie.movieLast.subject_collection_items"></scroller>
    </div>
    <div class="movie-interests">
      <h1>发现好电影</h1>
      <ul>
        <li>同时入选IMDB250和豆瓣电影250的电影</li>
        <li>带你进入不正常的世界</li>
        <li>用电【影】来祭奠逝去的岁月</li>
        <li>女孩们的故事【电影】</li>
        <li class="line"></li>
        <li>科幻是未来的钥匙——科幻启示录【科幻题材】</li>
        <li>美国生活面面观</li>
        <li>2015终极期待</li>
        <li>经典韩国电影——收集100部</li>
      </ul>
    </div>
    <div class="movie-types">
      <h1>分类浏览</h1>
      <ul>
        <li><span>经典</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>冷门佳片</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>豆瓣高分</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>动作</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>喜剧</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>爱情</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>悬疑</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>恐怖</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>科幻</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>治愈</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>文艺</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>成长</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>动画</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>华语</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>欧美</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>韩国</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span>日本</span><canvas width="10" height="15" class="arrow-icon"></canvas></li>
        <li><span></span><canvas width="10" height="15"></canvas></li>
      </ul>
    </div>
    <div class="app">
      <div class="logo">
        <img src="https://img3.doubanio.com/f/talion/7837f29dd7deab9416274ae374a59bc17b5f33c6/pics/card/douban-app-logo.png" alt="">
        <div>
          <span>豆瓣</span>
          <span>我们的精神部落</span>
        </div>
      </div>
      <a href="https://www.douban.com/doubanapp/card/log?category=movie_home&cid=&action=click_download&ref=http%3A//www.douban.com/doubanapp/app%3Fchannel%3Dcard_movie_home%26direct_dl%3D1">免费下载Android客户端</a>
    </div>
  </div>
</template>

<script>
import scroller from '../components/scroller'
import { mapState } from 'vuex'
export default {
  components: {
    scroller
  },
  computed: mapState([
    'movie'
  ]),
  beforeMount () {
    if (this.movie.movieInTheaters === null) {
      this.$store.dispatch('getMovieInTheaters')
    }
    if (this.movie.movieFree === null) {
      this.$store.dispatch('getMovieFree')
    }
    if (this.movie.movieLast === null) {
      this.$store.dispatch('getMovieLast')
    }
    console.log(this.movie)
  },
  mounted () {
    console.log('paintIcon')
    var canvas = this.$el.getElementsByClassName('arrow-icon')
    for (var i = 0; i < 17; i++) {
      var ctx = canvas[i].getContext('2d')
      ctx.strokeStyle = '#ddd'
      ctx.lineCap = 'square'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(0, 2)
      ctx.lineTo(8, 8)
      ctx.lineTo(0, 15)
      ctx.stroke()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-interests {
  margin-top: 10px;
  text-align: left;
}
.movie-interests h1 {
  font-size: 1.06rem;
  display: inline;
  font-weight: normal;
  padding: 0 1.12rem;
}
.movie-interests ul {
  white-space: nowrap;
  overflow-x: auto;
  text-align: center;
  padding: 15px 15px 43px 15px;
}
.movie-interests li {
  height: 50px;
  line-height: 50px;
  display: inline-block;
  border: 1px solid;
  padding: 0 1.55rem;
  border-radius: .25rem;
}
.movie-interests li.line {
  display: block;
  height: 10px;
  border: none;
}
.movie-interests li:nth-child(1), .movie-interests li:nth-child(6) {
  color: #42BD56;
  border-color: #42BD56;
}
.movie-interests li:nth-child(2), .movie-interests li:nth-child(8) {
  color: #FFC46C;
  border-color: #FFC46C;
}
.movie-interests li:nth-child(3) {
  color: #CC3344;
  border-color: #CC3344;
}
.movie-interests li:nth-child(4), .movie-interests li:nth-child(9) {
  color: #4F9DED;
  border-color: #4F9DED;
}
.movie-interests li:nth-child(7) {
  color: #FF4055;
  border-color: #FF4055;
}
.movie-types {
  text-align: left;
  text-decoration: none;
}
.movie-types h1 {
  font-size: 1.06rem;
  display: inline;
  font-weight: normal;
  padding: 0 1.12rem;
}
.movie-types ul {
  margin-left: .94rem;
  padding: 1.12rem 0 1.88rem;
  color: #42bd56;
  font-size: .9rem;
  overflow: hidden;
}
.movie-types li {
  border-top: solid 1px #eee;
  border-right: solid 1px #eee;
  padding-right: 1.12rem;
  display: inline-block;
  width: 44%;
  height: 2.64rem;
  line-height: 2.64rem;
  text-align: right;
}
.movie-types li:nth-last-child(1), .movie-types li:nth-last-child(2) {
  border-bottom: solid 1px #eee;
}
.movie-types span {
  float: left
}
.app a {
  color: #42bd56;
}
.app {
  margin: 30px 0 65px;
}
.logo {
  margin-bottom: 10px;
}
.logo>* {
  display: inline-block;
  text-align: left;
  font-size: 14px;
}
.logo img {
  width: 48px;
}
.logo span:nth-child(1) {
  font-size: 24px;
}
.logo span:nth-child(1):after {
  content: '';
  display: block;
}
</style>