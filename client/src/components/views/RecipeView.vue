<template>
    <div v-if="recipe">
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
    }
}
</script>

<style>

</style>
