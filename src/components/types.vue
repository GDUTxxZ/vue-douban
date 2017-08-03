<template>
  <div class="types">
    <h1>分类浏览</h1>
    <ul>
      <li v-for="item in typesData"><span>{{item}}</span><canvas width="10" height="15" class="arrow-icon"></canvas></li><li v-if="typesData.length % 2 === 1"><span></span><canvas width="10" height="15"> </canvas></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['typesData'],
  mounted () {
    console.log(this.$el)
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

<style>
.types {
  text-align: left;
  text-decoration: none;
}
.types h1 {
  font-size: 1.06rem;
  display: inline;
  font-weight: normal;
  padding: 0 1.12rem;
}
.types ul {
  margin-left: .94rem;
  padding: 1.12rem 0 1.88rem;
  color: #42bd56;
  font-size: .9rem;
  overflow: hidden;
}
.types li {
  box-sizing: border-box;
  border-top: solid 1px #eee;
  border-right: solid 1px #eee;
  padding-right: 1.12rem;
  display: inline-block;
  width: 49%;
  height: 2.64rem;
  line-height: 2.64rem;
  text-align: right;
}
.types li:nth-child(even) {
  padding-left: 1.12rem;
}
.types li:nth-last-child(1), .types li:nth-last-child(2) {
  border-bottom: solid 1px #eee;
}
.types span {
  float: left
}
</style>