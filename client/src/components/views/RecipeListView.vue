<template>
    <div class="container">
        <div class="level">
            <div class="level-left">
                <div class="column">
                    <h1 class="title">Recettes</h1>
                    <h2 class="subtitle">Vous avez faim ? Découvrez de superbes recettes :)</h2>
                </div>
            </div>
            <div class="level-right">
                <button class="button is-primary" @click="addRecipeBtnClicked()">
                    <span class="icon is-medium"><i class="fas fa-plus" aria-hidden="true"></i></span>
                    <span>Ajouter une recette</span>
                    </button>
            </div>
        </div>

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
    },
    methods: {
        addRecipeBtnClicked(){
            this.$router.push('/recipe-edition')
        }
    }
}
</script>

<style scoped>
 .container{
     margin-top: 2rem;
 }
</style>
