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
        <a class="button is-link is-large" :disabled="searchArg.length === 0">
          <span>Rechercher</span>
        </a>
      </p>
    </b-field>
    {{this.items}}

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
export default {
  name: "ProductHome",
  data: function() {
    return {
      searchArg: "",
      items: []
    };
  },
  methods: {
    fetchItems(){
      console.log("fetching items");
      fetch('https://food-search-polytech-api.herokuapp.com/products/milk')
                        .then(stream => stream.json())
                        .then(data => this.items= data)
                        .catch(error => console.error(error))
    }
  },
  created(){
    console.log("created");
    this.fetchItems();
  }
};
</script>

<style lang="scss">
#product-home {
  padding-top: 20vh;
}
</style>
