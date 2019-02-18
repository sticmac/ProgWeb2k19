<template>
  <div class="container">
    <h1 class="title is-1">Ajouter une nouvelle recette</h1>
    <b-field label="Nom de la recette" custom-class="is-medium">
      <b-input v-model="name" placeholder="Tapez le nom de la recette..." maxlength="25" required></b-input>
    </b-field>
    <b-field label="URL de l'image de la recette" custom-class="is-medium">
      <b-input v-model="image" type="url" placeholder="Insérez l'URL de l'image" maxlength="300" required></b-input>
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
    <h2 class="title is-2">Ajouter des ingrédients</h2>
    <div class="columns">
        <div class="column card">
            <b-field label="Nom">
                <b-input v-model="ingredientName" placeholder="Nom de l'ingrédient..." rounded></b-input>
            </b-field>
            <b-field label="URL Image (facultatif)">
                <b-input v-model="ingredientImageUrl" type="url" placeholder="Insérez l'URL de l'image" rounded></b-input>
            </b-field>
            <b-field label="Quantité">
                <b-input v-model="ingredientQuantity" placeholder="Quantité..." rounded></b-input>
            </b-field>
            <b-tooltip label="Les champs Nom et Quantité doivent être remplis" position="is-bottom" class="is-pulled-right" :active="!canAddIngredient">
                <button class="button is-primary is-rounded" @click="addIngredient()" :disabled="!canAddIngredient">
                    <span class="icon is-medium">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span>Ajouter ingrédient</span>
                </button>
            </b-tooltip>
        </div>
        <div class="column">
            <h3 class="title is-3">Liste ingrédients : </h3>
            <span
                v-for="(ingredient, index) in ingredients"
                v-bind:key="index"
                class="tag is-info is-medium ingredient">
                {{ingredient.name}} - {{ingredient.quantity}}
                <button
                class="delete is-small"
                v-on:click="ingredients.splice(index, 1)"
                ></button>
            </span>
        </div>
    </div>
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
            ingredients: [],
            isLoading: false,
            ingredientName: "",
            ingredientImageUrl: "",
            ingredientQuantity: ""
        }
    },
    methods: {
        createRecipeBtnClick() {
            this.isLoading = true;
            Requester.postRecipe(this.name, this.image, this.description, this.price, this.time_required, this.ingredients, (success) => {
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
        addIngredient() {
            this.ingredients.push({name: this.ingredientName, image: this.ingredientImageUrl, quantity: this.ingredientQuantity});
            this.ingredientName = "";
            this.ingredientQuantity = "";
            this.ingredientImageUrl = "";
        }
    },
    computed: {
        canCreateRecipe() {
            return this.name && this.image && this.description && this.price && this.time_required;
        },
        canAddIngredient() {
            return this.ingredientName && this.ingredientQuantity;
        }
    }
};
</script>

<style>
.ingredient {
    margin: 3px;
}
</style>
