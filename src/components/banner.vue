<template>
  <div class="banner">
    <div class="banner-bg">
      <div></div>
    </div>
    <div class="banner-warp">
      <div class="promo-title">
        <span v-for="item in title">{{item}}</span>
      </div>
      <div class="button-group">
        <button>极速下载</button>
        <button>打开</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  text-align: left;
  font-size: 14px;
  color: #2CA532;
  position: relative; /* 用于给banner-warp定高度 */
}
.banner-bg {
  background-image: url('https://img3.doubanio.com/f/talion/fbcb08987a36258354c6037211d94286bef9716c/pics/card/promotion_bg.jpg');
  background-position: top left;
  background-size: auto 100%;
}
.banner-bg div {
  padding-top: 22%;
}
.banner-warp {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 15px;
  display: flex; /* 弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 交叉线中点对齐 */
}
.promo-title span {
  display: block;
  line-height: 25px;
}
.button-group {
  font-size: 13px;
}
.button-group button {
  border-radius: 3px;
  padding: 5px 13px;
  text-align: center;
  margin-left: 5px;
}
.button-group button:nth-child(1) {
  color: #fff;
  border: 1px solid #42bd56;
  background: #42bd56;
}
.button-group button:nth-child(2) {
  color: #42bd56;
  border: 1px solid #42bd56;
  background: none;
}
</style>
