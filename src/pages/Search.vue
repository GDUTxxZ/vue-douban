<template>
  <div id="search">
    <div class="search-header">
      <span @click.stop.prevent="closeHandle">关闭</span>
      <input type="search">
    </div>
    <ul class="search-category">
      <li><router-link to="/movie"><span>电影</span><span>影院热播</span></router-link></li>
      <li><router-link to="/tv"><span>电视</span><span>正在热播</span></router-link></li>
      <li><router-link to="/book"><span>图书</span><span>畅销排行</span></router-link></li>
      <li><router-link to="/location"><span>同城</span><span>周末活动</span></router-link></li>
      <li><router-link to="/group"><span>小组</span><span>志趣相投</span></router-link></li>
      <li><router-link to="/music"><span>音乐</span><span>新碟榜</span></router-link></li>
      <li><router-link to="/"><span>阅读</span><span>电子书</span></router-link></li>
      <li><router-link to="/"><span>游戏</span><span>虚拟世界</span></router-link></li>
      <li><router-link to="/"><span>应用</span><span>玩手机</span></router-link></li>
      <li><router-link to="/"><span>东西</span><span>心爱之物</span></router-link></li>
      <li><router-link to="/"><span>FM</span><span>红星歌单</span></router-link></li>
      <li><router-link to="/"><span>市集</span><span>购买原创</span></router-link></li>
    </ul>
    <div class="search-app">
      <div>
        <router-link to="/">注册账号</router-link>
        <router-link to="/">登录豆瓣</router-link>
      </div>
      <div>
        <router-link to="/">使用桌面版</router-link>
        <router-link to="/">使用豆瓣APP</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeHandle () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#search {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: white;
  z-index: 1000;
}
.search-header {
  width: 100%;
  height: 62px;
  line-height: 62px;
  border-bottom: 1px solid #f3f3f3;
}
.search-header span {
  color: #42bd56;
  font-size: 16px;
  margin-right: 10px;
}
.search-header input {
  background: url('../assets/search_icon.png') no-repeat center #f3f3f3;
  background-size: 17px;
  width: 75%;
  padding-left: 7px; 
  height: 31px;
}
.search-header input:focus {
  background-image: none;
}
.search-category {
  margin-top: 25px;
}
.search-category li {
  display: inline-block;
  width: 32%;
  margin-bottom: 25px;
}
.search-category li span {
  display: block;
}
.search-category li span:nth-child(1) {
  font-size: 24px;
  font-weight: 400;
}
.search-category li span:nth-child(2) {
  color: #999;
  font-size: 12px;
  letter-spacing: 1px;
}
.search-category li:nth-child(1) span:nth-child(1) {
  color: rgb(35, 132, 232);
}
.search-category li:nth-child(2) span:nth-child(1) {
  color: rgb(122, 106, 219);
}
.search-category li:nth-child(3) span:nth-child(1) {
  color: rgb(159, 120, 96);
}
.search-category li:nth-child(4) span:nth-child(1) {
  color: rgb(230, 70, 126);
}
.search-category li:nth-child(5) span:nth-child(1) {
  color: rgb(42, 184, 204);
}
.search-category li:nth-child(6) span:nth-child(1) {
  color: rgb(244, 143, 46);
}
.search-category li:nth-child(7) span:nth-child(1) {
  color: rgb(159, 120, 96);
}
.search-category li:nth-child(8) span:nth-child(1) {
  color: rgb(87, 116, 197);
}
.search-category li:nth-child(9) span:nth-child(1) {
  color: rgb(89, 108, 221);
}
.search-category li:nth-child(10) span:nth-child(1) {
  color: rgb(225, 100, 77);
}
.search-category li:nth-child(11) span:nth-child(1) {
  color: rgb(64, 207, 169);
}
.search-category li:nth-child(12) span:nth-child(1) {
  color: rgb(66, 189, 86);
}
.search-app {
  border-top: 1px solid #e3e3e3;
}
.search-app div {
  border-bottom:  1px solid #e3e3e3;
}
.search-app div a:nth-child(1) {
  border-right:  1px solid #e3e3e3;
}
.search-app div a {
  display: inline-block;
  width: 49%;
  margin-top: 13px;
  margin-bottom: 13px;
  font-size: 15px;
  color: #42bd56;
}
</style>