<template>
  <li>
    <div class="title">
      <div class="avatar">
        <img :src="anonymousData.author.avatar">
      </div>
      <div class="info">
        <div><span class="name">{{anonymousData.author.name}}</span>{{anonymousData.activity || '说：'}}</div>
        <div class="time">{{anonymousData.create_time}}</div>
      </div>
    </div>
    <template v-if="anonymousData.card !== null">1</template>
    <template v-else-if="anonymousData.text !== ''">2</template>
    <template v-else>3</template>
  </li>
</template>

<script>
export default {
  props: ['anonymousData']
}
</script>

<style scoped>
li {
  text-align: left;
}
.avatar {
  float: left;
}
.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.info {
  font-size: 17px;
  color: #aaa;
  margin-left: 50px;
}
.name {
  color: #494949;
  font-weight: bold;
  padding-right: 7px;
}
.time {
  font-size: 14px;
  margin-top: 4px;
}
</style>