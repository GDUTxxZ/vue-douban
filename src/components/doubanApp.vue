<template>
  <div class="app">
    <div class="logo">
      <img src="https://img3.doubanio.com/f/talion/7837f29dd7deab9416274ae374a59bc17b5f33c6/pics/card/douban-app-logo.png" alt="">
      <div>
        <span>豆瓣</span>
        <span>我们的精神部落</span>
      </div>
    </div>
    <a href="https://www.douban.com/doubanapp/card/log?category=movie_home&cid=&action=click_download&ref=http%3A//www.douban.com/doubanapp/app%3Fchannel%3Dcard_movie_home%26direct_dl%3D1">免费下载Android客户端</a>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.app a {
  color: #42bd56;
}
.app {
  margin: 30px 0 65px;
}
.logo {
  margin-bottom: 10px;
}
.logo>* {
  display: inline-block;
  text-align: left;
  font-size: 14px;
}
.logo img {
  width: 48px;
}
.logo span:nth-child(1) {
  font-size: 24px;
}
.logo span:nth-child(1):after {
  content: '';
  display: block;
}
</style>