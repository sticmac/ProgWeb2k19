<template>
    <div>
        <b-field grouped>
            <b-input
                placeholder="Rechercher un produit ..."
                size="is-large"
                icon="search"
                v-model="searchArg"
                @keyup.enter.native="launchSearch()"
                expanded
            ></b-input>
            <p class="control">
                <a class="button is-link is-large" v-on:click="launchSearch()" :disabled="!this.canLaunchSearch">
                <span>Rechercher</span>
                </a>
            </p>
        </b-field>

    <b-collapse id="filter-section" class="card" :open="false">
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
              <b-field label="Ajouter un allergène">
                <b-field grouped>
                  <b-input
                    placeholder="Allergène..."
                    rounded
                    @keyup.enter.native="onAllergenAdded()"
                    v-model="allergenInput"
                    expanded
                  ></b-input>
                  <p class="control">
                    <button class="button is-primary is-rounded" v-on:click="onAllergenAdded()" :disabled="!allergenInput">
                      <span class="icon is-medium">
                          <i class="fas fa-plus"></i>
                      </span>
                      <span>Ajouter</span>
                    </button>
                  </p>
                </b-field>
              </b-field>
              <div id="allergens">
                <span
                  v-for="(allergen, index) in allergens"
                  v-bind:key="index"
                  class="tag is-info is-medium"
                >
                  {{allergen}}
                  <button
                    class="delete is-small"
                    v-on:click="allergens.splice(index, 1)"
                  ></button>
                </span>
              </div>
            </div>
          </div>
          <b-field label="Prix maximum">
            <div>
              <input
                class="slider is-fullwidth has-output is-primary"
                step="1"
                min="1"
                max="50"
                type="range"
                v-model="priceFilter">
              <output>{{priceFilter}}€</output>
            </div>
          </b-field>
        </div>
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  props: ["baseArg"],
  data: function() {
    return {
      searchArg: this.baseArg ? this.baseArg : "",
      queryParams: {},
      allergens: [],
      priceFilter: 50,
      allergenInput: "",
      canLaunchSearch: false
    };
  },
  mounted() {
    if (this.$route.query.allergens) {
      this.$route.query.allergens.split("+").forEach(allergen => {
        this.allergens.push(allergen);
      });
    }
    this.priceFilter = this.$route.query.price ? +this.$route.query.price : 50;
  },
  watch: {
    allergens() {
      if (this.allergens.length == 0) {
        this.removeQueryParam("allergens");
      } else {
        this.queryParams = {};
        let str = "";
        for (const allergen of this.allergens) {
          str += (str === "" ? "" : "+") + allergen;
        }
        this.addQueryParam("allergens", str);
      }
    },
    searchArg(){
      this.canLaunchSearch = this.searchArg.trim()!=""
    }
  },
  methods: {
    addQueryParam: function(key, value) {
      // console.log("Added query " + key + "=" + value);
      this.queryParams[key] = value;
    },
    removeQueryParam: function(key) {
      delete this.queryParams[key];
    },
    formatQueryParams: function() {
      let str = "";
      for (const key in this.queryParams) {
        str += (str === "" ? "" : "&") + key + "=" + this.queryParams[key];
      }
      return str === "" ? "" : "?" + str;
    },
      setValue: function(value) {
          this.searchArg = value;
      },
      launchSearch(){
          if(this.searchArg!="") {

      this.addQueryParam("price", this.priceFilter);
      this.$emit("search", {
        searchArg: this.searchArg,
        queryParams: this.queryParams
      });
          }
      },
    onAllergenAdded() {
      if (this.allergenInput) {
        this.allergens.push(this.allergenInput);
        this.allergenInput = "";
      }
    }
  },
};
</script>

<style lang="scss">
#allergens > * {
  margin-right: 3px;
}
#filter-section {
  margin: 0 100px;
}
</style>
