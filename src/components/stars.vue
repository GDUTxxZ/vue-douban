<template>
  <canvas :width="width" :height="height"></canvas>
</template>

<script>
export default {
  props: ['width', 'height', 'rating'],
  methods: {
    paintStars () {
      console.log('paintStars')
      function star (ctx, x, y, R) {
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
      }
      let height = this.height
      let width = this.width / 5
      let rating = this.rating
      let canvas = this.$el
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = 'rgb(255,183,18)'
      ctx.strokeStyle = 'rgb(255,183,18)'
      for (let i = 0; i < 5; i++) {
        star(ctx, (0.5 + i) * width, height / 2, Math.min(width, height) / 2)
      }
      ctx.clearRect(width * 5, 0, -((10 - rating) / 2 * width), height)
      ctx.globalCompositeOperation = 'destination-over'
      ctx.fillStyle = '#aaa'
      ctx.strokeStyle = '#aaa'
      for (let i = 0; i < 5; i++) {
        star(ctx, (0.5 + i) * width, height / 2, Math.min(width, height) / 2)
      }
    }
  },
  mounted () {
    this.paintStars()
  }
}
</script>