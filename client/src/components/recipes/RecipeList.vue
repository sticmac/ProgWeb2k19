<template>
<div>
    <div class="columns is-multiline">
        <div class="column" v-for="(recipe, index) in recipes" :key="index">
            <RecipeItem  :recipe="recipe"/>
        </div>
    </div>
    
</div>
</template>

<script>
import RecipeItem from './RecipeItem.vue'

export default {
    components : {
        RecipeItem
    },
    data() {
        return {
            recipes : [
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 5,
                    time_required : 20
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50,
                    health_indicator : 20
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 60,
                    time_required : 150,
                    health_indicator : 13
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50,
                    health_indicator : 3
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                },
                 {
                    name : "Ma recette",
                    image : "https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg",
                    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean justo nibh, commodo sit amet vehicula auctor, tincidunt pretium odio.",
                    price : 20,
                    time_required : 50
                }
            ]
        }
    }
}
</script>

<style>

</style>
