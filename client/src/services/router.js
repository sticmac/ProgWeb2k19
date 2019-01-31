import Vue from 'vue'
import VueRouter from 'vue-router'

// Views components
import ProductHomeView from './../components/views/ProductHomeView.vue'
import RecipeSocialNetworkView from './../components/views/RecipeSocialNetworkView.vue'
import RecipeListView from './../components/views/RecipeListView.vue'
import RecipeView from './../components/views/RecipeView.vue'
import ProductSearchResultsView from './../components/views/ProductSearchResultsView.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: ProductHomeView },
    { path: '/recipes', 
        component: RecipeSocialNetworkView,
        children: [
            { path: '', component: RecipeListView },
            { path: ':id', component: RecipeView },
        ]
    },
    { path: '/results/:q', component: ProductSearchResultsView, name: 'results', props: true}
  ]
  
const router = new VueRouter({
    mode: "history",
    routes : routes
})

export default router;