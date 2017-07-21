<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
* { /* 清空样式 */
  margin: 0;
  padding: 0;
  text-decoration: none;
  border: none;
}
body { /* 默认样式 */
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
