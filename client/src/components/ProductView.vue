<template>
  <div class="section">
    <div class="container">
      <h1 class="title is-1">Nom du produit</h1>
      <div class="columns">
        <div class="column is-2">
          <img
            src="https://static.openfoodfacts.org/images/products/764/017/247/0015/front_fr.15.400.jpg"
            alt="Product image"
          >
        </div>
        <div class="column">
          <h2 class="title">Caractéristiques du produit :</h2>
          <div class="info-tag quantity">
            <b-taglist attached>
              <b-tag type="is-dark">Quantity</b-tag>
              <b-tag type="is-info">115g</b-tag>
            </b-taglist>
          </div>
          <div class="info-tag brand">
            <b-taglist attached>
              <b-tag type="is-dark">Brand</b-tag>
              <b-tag type="is-info">SMOWL</b-tag>
            </b-taglist>
          </div>
          <div class="info-tag categories">
            <b-taglist>
              <b-tag type="is-dark">Catégories</b-tag>
              <b-tag type="is-info">Snacks</b-tag>
              <b-tag type="is-info">Sweet snacks</b-tag>
            </b-taglist>
          </div>
          <h2 class="title">Ingrédients :</h2>
          <p>Eau de coco* 22%, purs jus de passion* 11% et citron vert* 6%, eau, flocons d'avoine* 8%, lait de coco* 7%, sirop d'érable*, quinoa cuit* 6%, riz complet cuit*, physalis*, graines de lin* 2%, protéine de riz*, arôme naturel de noix de coco, noix de coco* 1%. *Ingrédients Bio.</p>
          <h2 class="title">Informations nutritives :</h2>
          <b-table id="nutrition-table" :data="data" :columns="columns"></b-table>
          <h2 class="title">Utilisé dans les recettes :</h2>
          <p>Remplir de cards</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductView",
  props: ["product"],
  data() {
    return {
      data: [
        {
          nutrition_attribute_name: "Energy",
          for_100: "611 kj (146 kcal)",
          per_serving: "703 kj (168 kcal)"
        },
        {
          nutrition_attribute_name: "Fat",
          for_100: "4.2 g",
          per_serving: "4.83 g"
        },
        {
          nutrition_attribute_name: "Carbohydrate",
          for_100: "21 g",
          per_serving: "24.1 g"
        }
      ],
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
          label: "per serving (115g)"
        }
      ]
    };
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
</style>
