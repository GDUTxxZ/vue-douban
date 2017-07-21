<template>
  <div id="app-header">
    <router-link class="header-home-btn" to="/">豆瓣</router-link>
    <ul class="header-nav-btn">
      <li><router-link to="/movie">电影</router-link></li>
      <li><router-link to="/book">图书</router-link></li>
      <li><router-link to="/status">广播</router-link></li>
      <li><router-link to="/group">小组</router-link></li>
      <li><router-link to="/search"><img class="header-search-btn" src="../assets/search_btn.png"></router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 47px;
  line-height: 47px;
  border-bottom: 1px solid #f3f3f3;
  text-align: right;
  vertical-align: middle;
  z-index: 999;
}
.header-home-btn {
  float: left;
  margin-left: 18px;
  color: #00b600;
  font-size: 23px;
  font-weight: bold;
}
.header-nav-btn li {
  display: inline-block;
  margin-right: 14px;
  font-size: 15px;
}
.header-search-btn {
  position: relative;
  top: 5px;
  width: 24px;
  height: 18px;
}
.header-nav-btn li:nth-child(1) a {
  color: rgb(35, 132, 232);
}
.header-nav-btn li:nth-child(2) a {
  color: rgb(159, 120, 96);
}
.header-nav-btn li:nth-child(3) a {
  color: rgb(228, 168, 19);
}
.header-nav-btn li:nth-child(4) a {
  color: rgb(42, 184, 204);
}
</style>