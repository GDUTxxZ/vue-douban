<template>
  <div>
    <div v-if="movie.movieInTheaters === null || movie.movieFree === null || movie.movieLast === null">加载中</div>
    <div v-else>
      <scroller scrollTitle="影院热映" scrollHref="/movie" :scrollData="movie.movieInTheaters.subjects"></scroller>
      <scroller scrollTitle="免费在线观影" scrollHref="/movie" :scrollData="movie.movieFree.subject_collection_items"></scroller>
      <scroller scrollTitle="新片速递" scrollHref="/movie" :scrollData="movie.movieLast.subject_collection_items"></scroller>
    </div>
    <interests title="发现好电影" :interestsData="interestsData"></interests>
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
      interestsData: [['同时入选IMDB250和豆瓣电影250的电影', '带你进入不正常的世界', '用电【影】来祭奠逝去的岁月', '女孩们的故事【电影】'], ['科幻是未来的钥匙——科幻启示录【科幻题材】', '美国生活面面观', '2015终极期待', '经典韩国电影——收集100部']],
      typesData: ['经典', '冷门佳片', '豆瓣高分', '动作', '喜剧', '爱情', '悬疑', '恐怖', '科幻', '治愈', '文艺', '成长', '动画', '华语', '欧美', '韩国', '日本']
    }
  },
  components: {
    scroller,
    doubanApp,
    interests,
    types
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>