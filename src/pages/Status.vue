<template>
  <div>
    <banner :title="['打开App，回复广播']"></banner>
    <div class="login">
      <div class="login-avatar">
        <div>
        </div>
        <div>
          登录发广播
        </div>
      </div>
      <div class="icon-group">
        <div>
          <img src="https://img3.doubanio.com/f/talion/d9ba3fa414721588284167944c70664e685993b1/pics/card/ic_status_pen.svg">
        </div>
        <div>
          <img src="https://img3.doubanio.com/f/talion/68ab505eac3e7551815c06a5e03a26a6373bb46c/pics/card/ic_status_camera.svg">
        </div>
      </div>
    </div>
    <div class="main">
      <ul>
        <anonymousItem v-for="(item, index) in anonymous.items" :key="index" :anonymousData="item.status.reshared_status || item.status"></anonymousItem>
      </ul>
    </div>
  </div>
</template>

<script>
import ajax from '../lib/ajax'
import banner from '../components/banner'
import anonymousItem from '../components/anonymousItem'
export default {
  data () {
    return {
      isGetAnonymous: false,
      anonymous: {}
    }
  },
  components: {
    banner,
    anonymousItem
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      ajax({
        url: '/fake',
        method: 'GET',
        query: {
          url: 'https://m.douban.com/rexxar/api/v2/status/anonymous_timeline',
          for_mobile: 1
        }
      }).then((value) => {
        this.isGetAnonymous = true
        this.anonymous = JSON.parse(value)
        console.log(this.anonymous)
      }, (e) => {
        console.error(e)
      })
    }
  },
  beforeMount () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  border-bottom: 1px #eee solid;
  text-align: right;
  padding: 10px 18px;
}
.login-avatar>div:nth-child(1) {
  height: 40px;
  width: 40px;
  background: url('https://img1.doubanio.com/icon/user_normal.jpg');
  background-size: 100% 100%;
  border-radius: 50%;
  float: left;
}
.login-avatar>div:nth-child(2) {
  height: 40px;
  line-height: 40px;
  float: left;
  padding-left: 10px;
  color: #aaa;
}
.icon-group div {
  height: 40px;
  margin-left: 10px;
  display: inline-block;
}
.icon-group img {
  width: 24px;
  height: 24px;
  position: relative;
  top: 7px;
}
.main {
  margin: 20px 18px;
}
</style>