<template>
  <section>
    <b-tabs size="is-medium" class="block" v-model="selected">
      <b-tab-item label="Produits" icon="shopping-basket"></b-tab-item>
      <b-tab-item label="Recettes" icon="list-ul"></b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      selected: 0
    };
  },
  watch: {
    selected(value) {
      if (value === 0) {
          this.$router.push('home')
      } else if (value === 1) {
          this.$router.push('recipes')
      }
    }
  }
};
</script>