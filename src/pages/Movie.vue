<template>
  <div>
    <scroller scrollTitle="影院热映" scrollHref="/movie" :scrollData="movie.movieInTheaters.subjects"></scroller>
    <scroller scrollTitle="免费在线观影" scrollHref="/movie" :scrollData="movie.movieFree.subjects"></scroller>
    <scroller scrollTitle="新片速递" scrollHref="/movie" :scrollData="movie.movieLast.subjects"></scroller>
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