<template>
  <div class="container">
    <h1 class="title">Ajouter une nouvelle recette</h1>
    <b-field label="Nom de la recette" custom-class="is-medium">
      <b-input v-model="name" placeholder="Tapez le nom de la recette..." required></b-input>
    </b-field>
    <b-field label="URL de l'image de la recette" custom-class="is-medium">
      <b-input v-model="image" type="url" placeholder="Insérez l'URL de l'image" required></b-input>
    </b-field>
    <b-field label="Description" custom-class="is-medium">
      <b-input v-model="description" type="textarea" placeholder="Tapez la description de la recette..." required></b-input>
    </b-field>
    <b-field label="Prix (en €)" custom-class="is-medium">
      <b-input v-model="price" placeholder="Prix de la recette ..." type="number" required></b-input>
    </b-field>
    <b-field label="Temps de préparation (en minutes)" custom-class="is-medium">
      <b-input v-model="time_required" placeholder="Temps de préparation ..." type="number" required></b-input>
    </b-field>
    <button class="button is-primary is-large" v-bind:class="{'is-loading': isLoading}" :disabled="!canCreateRecipe" @click="createRecipeBtnClick()">
        Enregistrer la recette
    </button>
  </div>
</template>

<script>
import Requester from '../../services/requester';

export default {
    data() {
        return {
            name: "",
            image: "",
            description: "",
            price: "",
            time_required: "",
            products: [],
            isLoading: false
        }
    },
    methods: {
        createRecipeBtnClick() {
            this.isLoading = true;
            Requester.postRecipe(this.name, this.image, this.description, this.price, this.time_required, this.products, (success) => {
                this.isLoading = false;
                if (success) {
                    this.$router.push('/recipes');
                    this.successSnackbar();
                } else {
                    this.warningSnackbar();
                }
            });
        },
        successSnackbar() {
            this.$snackbar.open(`Recette ajoutée avec succès`);
        },
        warningSnackbar() {
            this.$snackbar.open({
                message: 'Un problème est survenue, veuillez réessayer plus tard',
                type: 'is-warning',
                position: 'is-top',
                actionText: 'Retry',
                indefinite: true,
                onAction: () => {
                    this.createRecipeBtnClick();
                }
            })
        },
    },
    computed: {
        canCreateRecipe() {
            return this.name && this.image && this.description && this.price && this.time_required;
        }
    }
};
</script>

<style>
</style>
