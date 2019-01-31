import Vue from 'vue'
import VueRouter from 'vue-router'

// Views components
import ProductHome from './../components/Product_Home.vue'
import RecipeSocialNetworkView from './../components/views/RecipeSocialNetworkView.vue'
import RecipeListView from './../components/views/RecipeListView.vue'
import RecipeView from './../components/views/RecipeView.vue'
import ProductSearchResults from './../components/ProductSearchResults.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: ProductHome },
    { path: '/recipes', 
        component: RecipeSocialNetworkView,
        children: [
            { path: '', component: RecipeListView },
            { path: ':id', component: RecipeView },
        ]
    },
    { path: '/results/:q', component: ProductSearchResults, name: 'results', props: true}
  ]
  
const router = new VueRouter({
    mode: "history",
    routes : routes
})

export default router;