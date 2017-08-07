<template>
  <div class="summary">
    <h2>{{title}}</h2>
    <p>{{isExpand?summary:shortSummary}}<span v-if="!isExpand" @click="expand">(展开)</span></p>
  </div>
</template>

<script>
export default {
  props: ['title', 'summary'],
  data () {
    return {
      isExpand: false
    }
  },
  computed: {
    shortSummary () {
      return this.summary.slice(0, 75) + '...'
    }
  },
  methods: {
    expand () {
      this.isExpand = true
    }
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
.summary {
  font-size: 15px;
  color: #494949;
  white-space: pre-line;
  line-height: 25px;
}
.summary p span {
  color: #42bd56;;
  float: right;
}
</style>