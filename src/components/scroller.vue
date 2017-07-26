<template>
  <div>
    <div class="scroller-title">
      <h1>{{scrollTitle}}</h1>
      <router-link :to="scrollHref">更多</router-link>
    </div>
    <div class="scroller-movie"></div>
  </div>
</template>

<script>
export default {
  props: ['scrollTitle', 'scrollHref', 'scrollData']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>