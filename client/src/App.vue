<template>
  <div id="app">
    <Accueil/>
  </div>
</template>

<script>
import Accueil from './components/Accueil.vue'

export default {
  name: 'app',
  components: {
    Accueil
  }
}
</script>

<style lang="scss">
@import './src/styles/global.scss';
</style>
