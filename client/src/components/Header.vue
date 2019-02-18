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

      <div class="navbar-end">
        <div class="navbar-item" v-if="!loggedIn">
          <div class="buttons">
            <a class="button is-primary" @click="loginBtnClicked()">
              <strong>Se connecter</strong>
            </a>
          </div>
        </div>
        <div class="navbar-item" v-else> 
          <div class="level">
            <!-- <figure class="image is-24x24">
              <img class="is-rounded" src="https://bulma.io/images/placeholders/24x24.png">
            </figure> -->
            <p v-if="username" style="margin: 0 2.5rem 0 0;">{{username}}</p>
            <a class="button is-primary is-danger is-outlined" @click="disconnectBtnClicked()">
              <strong>Se déconnecter</strong>
            </a>
          </div>
          
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
      selected: 0,
      loggedIn : false,
      username : ""
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
    },
    loginBtnClicked(){
      this.$authentification.promptLoginWithCallback((success, data) => {
          this.loggedIn = this.$authentification.loggedIn();
          this.username = this.$authentification.username;
      });
    },
    disconnectBtnClicked(){
      this.$authentification.disconnect(() => {
        this.$router.go();
      });
    }
  },
  created(){
    this.loggedIn = this.$authentification.loggedIn();
    this.username = this.$authentification.username;
  }
};
</script>