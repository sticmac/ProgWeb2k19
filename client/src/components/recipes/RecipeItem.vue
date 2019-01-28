<template>
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img :src="this.recipe.image" alt="Placeholder image">
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
        <p class="is-6">{{this.recipe.description}}</p>
    </div>
  </div>
</div>
</template>

<script>
import RecipeItemIcons from './RecipeItemIcons.vue'
export default {
    components : {
        RecipeItemIcons
    },
    props : {
        recipe : null
    }
}
</script>

<style>

</style>
