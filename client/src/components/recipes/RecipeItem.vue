<template>
<div class="card hvr-underline-from-center" @click="recipeClicked()" style="width: 100%">
  <div class="card-image">
    <figure class="image is-4by3">
      <img v-if="recipeImageUrl" :src="recipeImageUrl" alt="Image de la recette" @error="imageLoadError">
      <img v-else src="https://bulma.io/images/placeholders/640x480.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
        <div class="media-left">
            <p class="title is-4">{{this.recipe.name}}</p>
            <p class="subtitle is-6">@johnsmith</p>
        </div>
        <div class="media-right">
            <RecipeItemIcons :recipe="recipe"/>
        </div>
    </div>

    <div class="content">
        <br>
        <p class="is-6">{{this.recipe.description.length > 50 ? this.recipe.description.slice(0,50) + "..." : this.recipe.description}}</p>
    </div>
  </div>
</div>
</template>

<script>
import RecipeItemIcons from './RecipeItemIcons.vue'
export default {
    data() {
        return {
            recipeImageUrl: "",
        }
    },
    components : {
        RecipeItemIcons
    },
    props : {
        recipe : null
    },
    methods : {
        recipeClicked(){
            this.$router.push('/recipes/'+this.recipe._id);
        },
        imageLoadError() {
            this.recipeImageUrl = "https://bulma.io/images/placeholders/640x480.png";
        }
    },
    created() {
        this.recipeImageUrl = this.recipe.image;
    },
}
</script>

<style scoped>
    .card:hover {
        cursor: pointer
    }
</style>
