<template>
<section>
    <nav class="navbar is-fixed-top">
      <!-- <a class="navbar-item">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, & modern CSS framework based on Flexbox" width="112" height="28">
      </a> -->

  <div class="navbar-item has-dropdown is-active">
    <div class="tabs is-large">
      <ul>
        <li @click="select(0)" :class="{ 'is-active' : this.selected === 0}">
          <a>
            <span class="icon is-medium"><i class="fas fa-shopping-basket" aria-hidden="true"></i></span>
            <span>Produits</span>
          </a>
        </li>
        <li @click="select(1)" :class="{ 'is-active' : this.selected === 1}">
          <a>
            <span class="icon is-medium"><i class="fas fa-list-ul" aria-hidden="true"></i></span>
            <span>Recettes</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
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
  methods: {
    select(value) {
      this.selected = value;
      if (value === 0) {
          this.$router.push('/products')
      } else if (value === 1) {
          this.$router.push('/recipes')
      }
    }
  }
};
</script>