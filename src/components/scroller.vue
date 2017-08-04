<template>
  <div class="scroller">
    <div class="scroller-title">
      <h1>{{scrollTitle}}</h1>
      <router-link :to="scrollHref">更多</router-link>
    </div>
    <ul class="scroller-type-list">
      <li class="scroller-type-item" v-for="index in 8">
        <router-link :to="'/' + scrollerType + '/' + scrollData[index - 1].id">
          <div class="scroller-type-img" :style="{background: imgUrl[index - 1].background}">
            <div></div>
          </div>
          <span>{{scrollData[index - 1].title}}</span>
          <div v-if="scrollData[index - 1].rating.average === 0 || scrollData[index - 1].rating.value === 0" class="scroller-type-rating">
            <span>暂无评分</span>
          </div>
          <div v-else class="scroller-type-rating">
            <stars class="scroller-type-star" width="55" height="15" :rating="scrollData[index - 1].rating.average || scrollData[index - 1].rating.value"></stars>
            <span>{{scrollData[index - 1].rating.average || scrollData[index - 1].rating.value}}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import stars from '../components/stars'
export default {
  props: ['scrollTitle', 'scrollHref', 'scrollData', 'scrollerType'],
  components: {
    stars
  },
  computed: {
    imgUrl () {
      if (this.scrollData[0].cover !== undefined) {
        return this.scrollData.map((item) => {
          return {
            background: 'url(' + item.cover.url + ') center center / cover no-repeat rgb(250, 250, 250)'
          }
        })
      } else {
        return this.scrollData.map((item) => {
          return {
            background: 'url(' + item.images.medium + ') center center / cover no-repeat rgb(250, 250, 250)'
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroller {
  box-sizing: border-box;
  padding: 8px 20px;
}
.scroller-title {
  height: 45px;
  line-height: 45px;
  text-align: left;
}
.scroller-title h1{
  font-size: 1.06rem;
  display: inline;
  font-weight: normal;
}
.scroller-title a {
  float: right;
  font-size: .9rem;
  color: #42bd56;
}
.scroller-type-list {
  overflow-x: auto;
  white-space: nowrap;
}
.scroller-type-item {
  display: inline-block;
  word-wrap: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: .7rem;
  width: 100px;
}
.scroller-type-item a {
  color: #111;
}
.scroller-type-img {
  width: 100%;
  overflow: hidden;
}
.scroller-type-img div {
  margin-top: 142.85714%;
}
.scroller-type-rating {
  font-size: .72rem;
  color: #aaa;
}
.scroller-type-star {
  position: relative;
  top: 2.7px;
}
</style>