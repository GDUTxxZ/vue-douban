<template>
  <div id="app">
    <appHeader></appHeader>
    <keep-alive>
      <router-view class="main-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import appHeader from './components/appHeader'
export default {
  name: 'app',
  components: {
    appHeader
  }
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
.main-view {
  position: relative;
  top: 47px;
  max-width: 650px;
  margin: 0 auto;
}
</style>
