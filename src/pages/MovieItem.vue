<template>
  <div>
    {{$route.params.movieId}}
  </div>
</template>

<script>
import ajax from '../lib/ajax'
export default {
  data () {
    return {
      movie: {}
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>