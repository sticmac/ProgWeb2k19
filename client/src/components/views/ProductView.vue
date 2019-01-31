<template>
  <div v-if="this.productId" class="section">
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
              <b-tag type="is-info">{{this.product.brands}}</b-tag>
            </b-taglist>
          </div>
          <div class="info-tag categories">
            <b-taglist>
              <b-tag type="is-dark">Catégories</b-tag>
              <b-tag type="is-info">TODO</b-tag>
            </b-taglist>
          </div>
          <h2 class="title">Ingrédients :</h2>
          <p id="ingredients"></p>
          <h2 class="title">Informations nutritives :</h2>
          <b-table id="nutrition-table" :data="data" :columns="columns"></b-table>
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
export default {
  name: "ProductView",
  props: ["productId"],
  data() {
    return {
      product: {},
      data: [],
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
    fetch("http://localhost:3000/products/item/" + this.productId)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.product = data;
        this.product.serving_size
          ? (this.columns.find(field => field.field === "per_serving").label +=
              "(" + this.product.serving_size + ")")
          : "";
        if (this.product.nutriments) {
          this.parseNutriments(this.product.nutriments);
        }
        document.getElementById("ingredients").innerHTML = this.product
          .ingredients
          ? this.product.ingredients
          : "No ingredients specified.";
      })
      .catch(error => console.error(error));
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
            element.per_serving = element.per_serving
              ? parseFloat(value).toFixed(2) + " " + element.per_serving
              : parseFloat(value).toFixed(2);
            break;
          case "unit":
            element.for_100 = element.for_100
              ? element.for_100 + " " + value
              : value;
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
