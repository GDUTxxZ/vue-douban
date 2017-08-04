<template>
  <div :class="classObj">
    <h1>{{title}}</h1>
    <ul>
      <li v-for="item in propsData[0]">{{item}}</li>
      <li class="line"></li>
      <li v-for="item in propsData[1]">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['title', 'propsData', 'type'],
  computed: {
    classObj () {
      if (this.type === 'doulist') {
        return {
          advise: true
        }
      } else if (this.type === 'interests') {
        return {
          interests: true,
          advise: true
        }
      }
    }
  }
}
</script>

<style>
.advise {
  margin-top: 10px;
  text-align: left;
}
.advise h1 {
  font-size: 15px;
  display: inline;
  font-weight: normal;
  color: #aaa;
}
.interests h1 {
  padding: 0 1.12rem;
  font-size: 1.06rem;
  color: #111;
}
.advise ul {
  white-space: nowrap;
  overflow-x: auto;
  padding: 15px 15px 43px 15px;
}
.advise li {
  text-align: center;
  height: 50px;
  line-height: 50px;
  display: inline-block;
  border: 1px solid #42bd56;
  padding: 0 1.55rem;
  margin: 0 .2rem;
  font-size: .94rem;
  border-radius: .25rem;
  color: #42bd56;
}
.advise li.line {
  display: block;
  height: 10px;
  border: none;
}
.interests li:nth-child(1), .interests li:nth-child(6) {
  color: #42BD56;
  border-color: blue;
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