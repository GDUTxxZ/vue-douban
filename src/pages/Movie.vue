<template>
  <div>
    <div v-if="movie.movieInTheaters === null">加载中</div>
    <scroller v-else scrollTitle="影院热映" scrollHref="/movie" :scrollData="movie.movieInTheaters.subjects"></scroller>
<!--     <div v-if="movie.movieFree === null">加载中</div>
    <scroller v-else scrollTitle="免费在线观影" scrollHref="/movie" :scrollData="movie.movieFree.subject_collection_items"></scroller>
    <div v-if="movie.movieLast === null">加载中</div>
    <scroller v-else scrollTitle="新片速递" scrollHref="/movie" :scrollData="movie.movieLast.subject_collection_items"></scroller> -->
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>