
<template>
  <div id="product-home" class="container">
    <b-field grouped>
      <b-input
        placeholder="Rechercher un produit ..."
        size="is-large"
        icon="search"
        v-model="searchArg"
        expanded
      ></b-input>
      <p class="control">
        <a class="button is-link is-large" v-on:click="results" :disabled="searchArg.length === 0">
          <span>Rechercher</span>
        </a>
      </p>
    </b-field>
    <b-collapse class="card" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header">
        <p class="card-header-title">Ajouter des préférences</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'angle-down' : 'angle-up'"></b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column">
              <div class="field">
                <b-checkbox>Basic</b-checkbox>
              </div>
              <div class="field">
                <b-checkbox>Basic</b-checkbox>
              </div>
              <div class="field">
                <b-checkbox>Basic</b-checkbox>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <b-switch>Default</b-switch>
              </div>
              <div class="field">
                <b-switch>Default</b-switch>
              </div>
              <div class="field">
                <b-switch>Default</b-switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import ProductSearchResults from "./ProductSearchResults"
export default {
  name: "ProductHome",
  data: function() {
    return {
      searchArg: "",
    };
  },
  components: {
    ProductSearchResults
  },
  methods: {
    results: function() {
      this.$router.push({path: 'results', query: {q: this.searchArg}});
    }
  }
};

</script>

<style lang="scss">
#product-home {
  padding-top: 20vh;
}
</style>
