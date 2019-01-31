
<template>
  <div id="product-home" class="container">
    <SearchBar v-on:search="search($event)"/>
  </div>
</template>

<script>
import SearchBar from "../search/SearchBar"

export default {
  name: "ProductHome",
  components: {
    SearchBar
  },
  methods: {
    search: function(searchArg) {
      const query = searchArg.split(' ').join('+');
      this.$router.push({name: 'results', params: {q: query}});
    }
  }
};

</script>

<style lang="scss">
#product-home {
  padding-top: 20vh;
}
</style>
