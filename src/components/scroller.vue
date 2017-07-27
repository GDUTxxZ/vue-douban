<template>
  <div class="scroller">
    <div class="scroller-title">
      <h1>{{scrollTitle}}</h1>
      <router-link :to="scrollHref">更多</router-link>
    </div>
    <ul class="scroller-movie-list">
      <li class="scroller-movie-item" v-for="index in 8">
        <img :src="scrollData[index - 1].images.medium" alt="" class="scroller-movie-img">
        <span class="scroller-movie-name">{{scrollData[index - 1].title}}</span>
        <div class="scroller-movie-rating">
          <canvas class="scroller-movie-star" width="55" height="15"></canvas>
          <span>{{scrollData[index - 1].rating.average}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['scrollTitle', 'scrollHref', 'scrollData']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scroller {
  box-sizing: border-box;
  padding: 0 20px;
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
.scroller-movie-list {
  overflow-x: auto;
  white-space: nowrap;
}
.scroller-movie-item {
  display: inline-block;
  margin-left: 1.12rem;
  width: 100px;
}
.scroller-movie-img {
  display: block;
}
.scroller-movie-name {
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>