<template>
  <div class="discuss">
    <h2>讨论({{discuss.total}})</h2>
    <ul>
      <li v-for="item in discuss.forum_topics">
        <div class="discuss-item-title">{{item.title}}</div>
        <div class="discuss-response-number">{{item.comments_count}}人回应</div>
      </li>
    </ul>
    <button>查看全部讨论</button>
  </div>
</template>

<script>
import ajax from '../lib/ajax'
export default {
  props: ['type', 'id'],
  data () {
    return {
      isGetDiscuss: false,
      discuss: {}
    }
  },
  mounted () {
    ajax({
      url: '/fake',
      method: 'GET',
      query: {
        url: 'https://m.douban.com/rexxar/api/v2/' + this.type + '/' + this.id + '/forum_topics',
        count: 5,
        start: 0,
        for_mobile: 1
      }
    }).then((value) => {
      console.log('get discuss')
      this.isGetDiscuss = true
      this.discuss = JSON.parse(value)
      console.log(this.discuss)
    }, (e) => {
      console.error(e)
    })
  }
}
</script>

<style scoped>
h2 {
  margin: 0 0 15px;
  color: #aaa;
  font-size: 15px;
  font-weight: normal;
  text-align: left;
}
.discuss li {
  border-bottom: 1px solid #eeeeee;
  padding: 15px 18px 15px 0;
}
.discuss li:nth-last-child(1) {
  border-bottom: none;
}
.discuss-item-title {
  font-size: 17px;
  color: #494949;
  font-weight: 500;
}
.discuss-response-number {
  margin-top: 5px;
  color: #42bd56;
}
.discuss button {
  display: block;
  text-align: center;
  width: 100%;
  background: none;
  color: #42bd56;
  font-size: 15px;
  margin: 10px 0 30px;
}
.discuss button:focus {
  outline: none;
}
</style>