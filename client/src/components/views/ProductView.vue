<template>
  <div v-if="productExists" class="section">
    <div class="container">
      <h1 class="title is-1">{{this.capitalizeFirstLetter(this.product.name)}}</h1>
      <div class="columns">
        <div class="column is-2">
          <img :src="this.product.image_url" alt="Product image">
        </div>
        <div class="column">
          <h2 class="title">Caractéristiques du produit :</h2>
          <div class="info-tag quantity">
            <b-taglist attached>
              <b-tag type="is-dark">Quantity</b-tag>
              <b-tag type="is-info">{{this.product.quantity}}</b-tag>
            </b-taglist>
          </div>
          <div class="info-tag brand">
            <b-taglist attached>
              <b-tag type="is-dark">Brand</b-tag>
              <b-tag type="is-info">{{this.product.brands ? this.product.brands : "Non spécifié"}}</b-tag>
            </b-taglist>
          </div>
          <div v-if="categories.length > 0" class="info-tag categories">
            <b-taglist>
              <b-tag type="is-dark">Catégories</b-tag>
              <b-tag v-for="(category, index) in categories" v-bind:key="index" type="is-info">{{category}}</b-tag>
            </b-taglist>
          </div>
          <h2 class="title">Ingrédients :</h2>
          <p id="ingredients"></p>
          <h2 class="title">Informations nutritives :</h2>
          <b-table
            v-if="nutritionDataAvailable"
            id="nutrition-table"
            :data="data"
            :columns="columns"
          ></b-table>
          <p v-if="!nutritionDataAvailable">Les informations nutritives ne sont pas définies.</p>
          <h2 class="title">Utilisé dans les recettes :</h2>
          <p>Remplir de cards</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <section class="hero is-primary is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Ohoh !</h1>
          <h2 class="subtitle">Le produit que tu cherches n'existe pas ou n'existe plus :/</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Requester from "../../services/requester";
export default {
  name: "ProductView",
  props: ["productId"],
  data() {
    return {
      product: {},
      productExists: true,
      nutritionDataAvailable: true,
      data: [],
      categories: [],
      columns: [
        {
          field: "nutrition_attribute_name",
          label: "Name"
        },
        {
          field: "for_100",
          label: "for 100 g / 100 ml"
        },
        {
          field: "per_serving",
          label: "per serving "
        }
      ]
    };
  },
  mounted() {
    Requester.getProductById(this.productId, (success, data) => {
      if (success) {
        this.product = data;
        if (this.product.serving_size) {
          this.columns.find(field => field.field === "per_serving").label +=
            "(" + this.product.serving_size + ")";
        } else {
          this.columns.splice(2, 1);
        }
        if (this.product.nutriments && Object.keys(this.product.nutriments).length > 1) {
          this.parseNutriments(this.product.nutriments);
        } else {
          this.nutritionDataAvailable = false;
        }
        if (this.product.categories_hierarchy) {
          this.categories = this.parseCategories(
            this.product.categories_hierarchy
          );
        }
        document.getElementById("ingredients").innerHTML = this.product
          .ingredients
          ? this.product.ingredients
          : "No ingredients specified.";
      } else {
        this.productExists = false;
      }
    });
  },
  methods: {
    capitalizeFirstLetter(str) {
      str += "";
      str = str.replace("-", " ");
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    parseNutriments(nutriments) {
      for (const key in nutriments) {
        const value = nutriments[key];
        const nutriment_name = key.split("_")[0];
        if (nutriment_name.match(/.*(group|score).*/)) {
          continue;
        }
        const field = key.split("_")[1] ? key.split("_")[1] : "";
        if (
          !this.data.find(
            nutriment =>
              nutriment.nutrition_attribute_name ===
              this.capitalizeFirstLetter(nutriment_name)
          )
        ) {
          this.data.push({
            nutrition_attribute_name: this.capitalizeFirstLetter(nutriment_name)
          });
        }
        const element = this.data.find(
          nutriment =>
            nutriment.nutrition_attribute_name ===
            this.capitalizeFirstLetter(nutriment_name)
        );
        switch (field) {
          case "value":
            element.for_100 = element.for_100
              ? parseFloat(value).toFixed(2) + " " + element.for_100
              : parseFloat(value).toFixed(2);
            break;
          case "serving":
            if (!this.columns.find(field => field.field === "per_serving"))
              break;
            element.per_serving = element.per_serving
              ? parseFloat(value).toFixed(2) + " " + element.per_serving
              : parseFloat(value).toFixed(2);
            break;
          case "unit":
            element.for_100 = element.for_100
              ? element.for_100 + " " + value
              : value;
            if (!this.columns.find(field => field.field === "per_serving"))
              break;
            element.per_serving = element.per_serving
              ? element.per_serving + " " + value
              : value;
            break;
        }
      }
      this.data.sort(function(a, b) {
        if (a.nutrition_attribute_name < b.nutrition_attribute_name) {
          return -1;
        }
        if (a.nutrition_attribute_name > b.nutrition_attribute_name) {
          return 1;
        }
        return 0;
      });
    },
    parseCategories(categories) {
      return categories.map(category => {
        const v = category.split(":")[1];
        v.replace(/-/g, " ");
        return this.capitalizeFirstLetter(v);
      });
    }
  }
};
</script>

<style lang="scss">
.info-tag {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

#nutrition-table {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.allergen {
  font-weight: bold;
}
</style>
