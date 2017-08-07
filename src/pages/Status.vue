<template>
  <div>
    <banner :title="['打开App，回复广播']"></banner>
    <div class="login">
      <div class="login-avatar">
        <div>
          <img src="https://img1.doubanio.com/icon/user_normal.jpg">
        </div>
        <div>
          登录发广播
        </div>
      </div>
      <div class="icon-group">
        <img src="https://img3.doubanio.com/f/talion/d9ba3fa414721588284167944c70664e685993b1/pics/card/ic_status_pen.svg">
        <img src="https://img3.doubanio.com/f/talion/68ab505eac3e7551815c06a5e03a26a6373bb46c/pics/card/ic_status_camera.svg">
      </div>
    </div>
  </div>
</template>

<script>
// import ajax from '../lib/ajax'
import banner from '../components/banner'
export default {
  components: {
    banner
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  border-bottom: 1px #ccc solid;
  text-align: right;
}
.login-avatar {
  float: left;
  height: 40px;
  line-height: 40px;
}
.login-avatar>* {
  display: inline-block;
}
.login-avatar img {
  height: 100%;
  border-radius: 50%;
}
</style>