<template>
    <div class="container">
        <h1 class="title">Recettes</h1>
        <h2 class="subtitle">Vous avez faim ? Découvrez de superbes recettes :)</h2>
        <div class="columns">
            <div class="column has-text-centered">
                <RecipeList/>
            </div>
        </div>
    </div>
</template>

<script>
import RecipeList from './../recipes/RecipeList.vue'

export default {
    components : {
        RecipeList
    }
}
</script>

<style scoped>
 .container{
     margin-top: 2rem;
 }
</style>
