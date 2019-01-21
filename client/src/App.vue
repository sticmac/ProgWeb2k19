<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import "./src/styles/global.scss";
#app {
  height: 100%;
  margin: 0;
}
</style>
