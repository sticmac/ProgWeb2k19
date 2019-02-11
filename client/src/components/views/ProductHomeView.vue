
<template>
  <div id="product-home" class="container">
    <SearchBar ref="bar" v-on:search="search($event)" v-bind:class="searchClass"/>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBar from "../search/SearchBar"

export default {
  name: "ProductHome",
  data: function() {
    return {
      searchClass: "center"
    }
  },
  mounted() {
    if (this.$route.name === "results") { //if we display results on load
      this.searchClass = "top";
      const route = this.$route.path.split('/');
      this.$refs.bar.setValue(route[route.length - 1].split('+').join(' '));
    }
  },
  components: {
    SearchBar
  },
  methods: {
    search: function(searchArg) {
      const query = searchArg.split(' ').join('+');
      this.$router.push({name: 'results', params: {q: query}});
      this.searchClass = "top";
    }
  }
};

</script>

<style lang="scss">
.center {
  padding-top: 20vh;
}
.top {
  padding-top: 2rem;
}
</style>
