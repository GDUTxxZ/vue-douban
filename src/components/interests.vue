<template>
  <div class="interests">
    <h1>{{title}}</h1>
    <ul>
      <li v-for="item in interestsData[0]">{{item}}</li>
      <li class="line"></li>
      <li v-for="item in interestsData[1]">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['title', 'interestsData']
}
</script>

<style>
.interests {
  margin-top: 10px;
  text-align: left;
}
.interests h1 {
  font-size: 1.06rem;
  display: inline;
  font-weight: normal;
  padding: 0 1.12rem;
}
.interests ul {
  white-space: nowrap;
  overflow-x: auto;
  text-align: center;
  padding: 15px 15px 43px 15px;
}
.interests li {
  height: 50px;
  line-height: 50px;
  display: inline-block;
  border: 1px solid;
  padding: 0 1.55rem;
  margin: 0 .2rem;
  border-radius: .25rem;
}
.interests li.line {
  display: block;
  height: 10px;
  border: none;
}
.interests li:nth-child(1), .interests li:nth-child(6) {
  color: #42BD56;
  border-color: #42BD56;
}
.interests li:nth-child(2), .interests li:nth-child(8) {
  color: #FFC46C;
  border-color: #FFC46C;
}
.interests li:nth-child(3) {
  color: #CC3344;
  border-color: #CC3344;
}
.interests li:nth-child(4), .interests li:nth-child(9) {
  color: #4F9DED;
  border-color: #4F9DED;
}
.interests li:nth-child(7) {
  color: #FF4055;
  border-color: #FF4055;
}
</style>