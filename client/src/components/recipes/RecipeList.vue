<template>
<div>
    <div v-if="!isLoading && recipes.length > 0" class="columns is-multiline">
        <div class="column" v-for="(recipe, index) in recipes" :key="index">
            <RecipeItem  :recipe="recipe"/>
        </div>
    </div>
    <b-loading v-if="isLoading" :active.sync="isLoading"></b-loading>

    <div v-elseif="recipes.length <= 0"  class="columns is-multiline">
        <div class="column">
            <Divider/>
            <p>Aucune recettes trouvées :(</p>
        </div>
    </div>  
</div>


</template>

<script>
import Divider from '../Divider.vue'
import Requester from '../../services/requester'
import RecipeItem from './RecipeItem.vue'

export default {
    components : {
        Divider,
        RecipeItem
    },
    data() {
        return {
            isLoading : true,
            recipes : []

            // [
            //      {
            //         id : 0,
            //         name : "Ma recette",
            //         image : "https://foodrevolution.org/wp-content/uploads/2018/04/blog-featured-diabetes-20180406-1330.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 5,
            //         time_required : 20
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50,
            //         health_indicator : 20
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 60,
            //         time_required : 150,
            //         health_indicator : 13
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50,
            //         health_indicator : 3
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     },
            //      {
            //         name : "Ma recette",
            //         image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
            //         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
            //         price : 20,
            //         time_required : 50
            //     }
            // ]
        }
    },
    created(){
        Requester.getRecipes((success, recipes) => {
            this.isLoading = false;
            if(success) {
                this.recipes = recipes;
                return;
            }
            this.recipes = [];
        });
    }
}
</script>

<style>

</style>
