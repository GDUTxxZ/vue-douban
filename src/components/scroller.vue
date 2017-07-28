<template>
  <div class="scroller">
    <div class="scroller-title">
      <h1>{{scrollTitle}}</h1>
      <router-link :to="scrollHref">更多</router-link>
    </div>
    <ul class="scroller-movie-list">
      <li class="scroller-movie-item" v-for="index in 8">
        <div class="scroller-movie-img" :style="{backgroundImages: imgUrl[index].background}">
          <div></div>
        </div>
        <span>{{scrollData[index - 1].title}}</span>
        <div v-if="scrollData[index - 1].rating.average === 0" class="scroller-movie-rating">
          <span>暂无评分</span>
        </div>
        <div v-else class="scroller-movie-rating">
          <canvas class="scroller-movie-star" width="55" height="15"></canvas>
          <span>{{scrollData[index - 1].rating.average}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['scrollTitle', 'scrollHref', 'scrollData'],
  computed: {
    imgUrl () {
      return this.scrollData.map((item) => {
        return {
          background: 'url(' + item.images.medium + ') cover center'
        }
      })
    }
  },
  methods: {
    paintStars () {
      console.log('paintStars')
      function star (ctx, x, y, R, clearWidth) {
        let r = R * 4 / 7
        ctx.beginPath()
        ctx.moveTo(x, y)
        for (let j = 0; j < 5; j++) {
          ctx.lineTo(x + R * Math.cos((j * 72 + 18) * Math.PI / 180), y - R * Math.sin((j * 72 + 18) * Math.PI / 180))
          ctx.lineTo(x + r * Math.cos((j * 72 + 54) * Math.PI / 180), y - r * Math.sin((j * 72 + 54) * Math.PI / 180))
        }
        ctx.lineTo(x + R * Math.cos(18 * Math.PI / 180), y - R * Math.sin(18 * Math.PI / 180))
        ctx.closePath()
        ctx.fill()
        ctx.clearRect(54.5, 2.5, -(clearWidth), 10)
        ctx.globalCompositeOperation = 'destination-over'
      }
      for (let canvasId = 0, i = 0; canvasId < 8; canvasId++) {
        if (this.scrollData[canvasId].rating.average === 0) {
          continue
        }
        var canvas = document.getElementsByClassName('scroller-movie-star')[i++]
        var ctx = canvas.getContext('2d')
        ctx.fillStyle = 'rgb(255,172,45)'
        ctx.strokeStyle = 'rgb(255,172,45)'
        for (let i = 0; i < 5; i++) {
          star(ctx, 5.5 + i * 11, 7.5, 5, (10 - this.scrollData[canvasId].rating.average) / 10 * 54)
        }
      }
    }
  },
  updated () {
    console.log(this)
  },
  mounted () {
    this.paintStars()
  }
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
  word-wrap: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 1.12rem;
  width: 100px;
}
.scroller-movie-img {
  width: 100%;
  overflow: hidden;
}
.scroller-movie-img div {
  margin-top: 142.85714%;
}
.scroller-movie-rating {
  font-size: .72rem;
  color: #aaa;
}
.scroller-movie-star {
  position: relative;
  top: 2.7px;
}
</style>