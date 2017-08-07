<template>
  <div class="review">
    <h2 v-if="type === 'movie'">{{title}}的影评({{review.total}})</h2>
    <h2 v-else-if="type === 'book'">{{title}}的书评({{review.total}})</h2>
    <ul>
      <li v-for="item in review.reviews">
        <h3>{{item.title}}</h3>
        {{item.user.name}}<stars class="review-star" width="70" height="18" :rating="item.rating.value * 2"></stars>
        <p>{{item.abstract}}</p>
        <span class="review-useful">{{item.useful_count}} 有用</span>
      </li>
    </ul>
    <button v-if="type === 'movie'">查看全部影评</button>
    <button v-else-if="type === 'book'">查看全部书评</button>
  </div>
</template>

<script>
import stars from './stars'
import ajax from '../lib/ajax'
export default {
  props: ['title', 'type', 'id'],
  data () {
    return {
      review: {}
    }
  },
  components: {
    stars
  },
  mounted () {
    ajax({
      url: '/fake',
      method: 'GET',
      query: {
        url: 'https://m.douban.com/rexxar/api/v2/' + this.type + '/' + this.id + '/reviews',
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
  }
}
</script>

<style scoped>
h2 {
  margin: 0 0 15px;
  color: #aaa;
  font-size: 15px;
  font-weight: normal;
  text-align: left;
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
.review button {
  display: block;
  text-align: center;
  width: 100%;
  background: none;
  color: #42bd56;
  font-size: 15px;
  margin: 10px 0 30px;
}
.review button:focus {
  outline: none;
}
</style>