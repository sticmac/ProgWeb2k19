<template>
    <div v-if="recipe" class="container">
        <h1 class="title">{{this.recipe.name}}</h1>
        <h2 class="subtitle">{{this.recipe.description}}</h2>
        <div class="columns">
            <div class="column has-text-centered">
            </div>
        </div>
    </div>
    <div v-else>
        <section class="hero is-primary is-fullheight-with-navbar">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Ohoh !
                </h1>
                <h2 class="subtitle">
                    La recette que tu cherches n'existe pas ou n'existe plus :/
                </h2>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return {
            recipe : null
        }
    },
    created(){
        this.recipe = {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 5,
                    time_required : 20
                };
    }
}
</script>

<style scoped>
 .container{
     margin-top: 2rem;
 }
</style>
