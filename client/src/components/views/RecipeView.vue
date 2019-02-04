<template>
<div>
    <!-- Recipe view -->
    <div v-if="recipe">
        <section class="hero is-dark" :style="recipeHeaderStyle">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-size-2">
                    {{this.recipe.name}}
                    </h1>
                    <h2 class="subtitle is-size-3">
                        <RecipeItemIcons :recipe="recipe" :size="'big'"/>
                    </h2>
                </div>
            </div>
        </section>
        <div  class="container">
            <div class="columns">
                <div class="column">
                    <h1 class="title is-size-3">Description</h1>
                    <p class="is-size-5">{{this.recipe.description}}</p>
                </div>
                <div class="column">
                    <h1 class="title is-size-3">Ingédients</h1>
                    <p class="is-size-5">{{this.recipe.description}}</p>
                </div>
            </div>
            <h2 class="title is-size-4">Commentaires</h2>
            <CommentSection/>
        </div>
    </div>
    <b-loading :active.sync="isLoading" :can-cancel="true"></b-loading>

    <!-- Error or recipe not found -->
    <div v-if="!isLoading && !recipe">
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
</div>
    
</template>

<script>
import CommentSection from '../CommentSection.vue'
import RecipeItemIcons from '../recipes/RecipeItemIcons.vue'
import Requester from '../../services/requester'

export default {
    components :{
        RecipeItemIcons,
        CommentSection
    },
    data(){
        return {
            recipe : null,
            isLoading : true
        }
    },
    beforeCreate(){
        const recipeId = this.$route.params.recipeId;
        Requester.getRecipeById(recipeId, (success, recipe) => {
            this.isLoading = false;
            if(success) {
                this.recipe = recipe;
                return;
            }else{
                this.recipe =  {
                    id : 0,
                    name : "Ma recette",
                    image : "https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 5,
                    time_required : 20
                };
            }
        });
    },
    computed : {
        recipeHeaderStyle() {
            return {
                background: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('+this.recipe.image+') no-repeat center center fixed',
                webkitBackgroundSize: "cover",
                mozBackgroundSize: "cover",
                oBackgroundSize: "cover",
                backgroundSize: "cover"
            };
        }
    }
}
</script>

<style scoped>
 .container{
     margin-top: 2rem;
 }
</style>

