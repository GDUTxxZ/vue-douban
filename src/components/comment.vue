<template>
  <div class="comment">
    <h2>{{title}}的短评({{comment.total}})</h2>
    <ul>
      <li v-for="item in comment.interests">
        <img :src="item.user.avatar">
        <div class="comment-main">
          <div class="user">
            {{item.user.name}}<stars class="comment-star" width="70" height="18" :rating="item.rating.value * 2"></stars>
          </div>
          <span class="time">{{item.create_time}}</span>
          <p>{{item.comment}}</p>
          <div class="vote-btn">
            <div class="vote-btn-right"></div>
            <div class="vote-btn-left">
              <span></span>{{item.vote_count}}
            </div>
          </div>
        </div>
      </li>
    </ul>
    <button>查看全部短评</button>
  </div>
</template>

<script>
import stars from './stars'
import ajax from '../lib/ajax'
export default {
  props: ['title', 'type', 'id'],
  data () {
    return {
      isGetComment: false,
      comment: {}
    }
  },
  components: {
    stars
  },
  mounted () {
    ajax({
      url: '/fake',
      method: 'GET',
      query: {
        url: 'https://m.douban.com/rexxar/api/v2/' + this.type + '/' + this.id + '/interests',
        count: 4,
        order_by: 'hot',
        start: 0,
        for_mobile: 1
      }
    }).then((value) => {
      console.log('get comment')
      this.isGetComment = true
      this.comment = JSON.parse(value)
      console.log(this.comment)
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
.comment li {
  clear: left;
  margin-bottom: 30px;
}
.comment img {
  float: left;
  display: block;
  width: 36px;
  border-radius: 18px;
}
.comment-main {
  margin-left: 45px;
  font-size: 15px;
}
.comment-star {
  position: relative;
  top: 3px;
  margin-left: 10px;
}
.comment-main span {
  line-height: 25px;
  font-size: 12px;
  color: #aaa;
}
.comment-main p {
  margin: 3px 0;
  color: #494949;
}
.vote-btn-left {
  color: #ccc;
  font-size: 14px;
  margin: 10px 0;
}
.vote-btn-left span {
  background: url('https://img3.doubanio.com/f/talion/7a0756b3b6e67b59ea88653bc0cfa14f61ff219d/pics/card/ic_like_gray.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  top: 5px;
}
.vote-btn-right {
  float: right;
  background: url('https://img3.doubanio.com/f/talion/be268c0a1adb577c8dfdcfbe48c818af3983ed62/pics/card/more.svg') center;
  background-repeat: no-repeat;
  width: 20px;
  height: 20px;
  position: relative;
  top: 3px;
}
.comment button {
  display: block;
  text-align: center;
  width: 100%;
  background: none;
  color: #42bd56;
  font-size: 15px;
  margin: 10px 0 30px;
}
.comment button:focus {
  outline: none;
}
</style>