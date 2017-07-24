<template>
  <div>
    <div class="quick-nav">
      <div>
        <router-link to="/">影院热映</router-link>
        <router-link to="/">同城活动</router-link>
      </div>
      <div>
        <router-link to="/">豆瓣时间</router-link>
        <router-link to="/">使用豆瓣APP</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quick-nav {
  margin: 25px 18px;
}
.quick-nav div {
  margin-bottom: 3px;
}
.quick-nav div a {
  height: 44px;
  width: 49%;
  box-sizing: border-box;
  display: inline-block;
  padding: 3px;
  line-height: 38px;
  background-color: #f6f6f6;
  border-radius: 2px;
  color: #494949;
  font-size: 15px;
}
</style>
