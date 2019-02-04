import Vue from 'vue'
import VueRouter from 'vue-router'

// Views components
import ProductView from './../components/views/ProductView.vue';
import ProductHomeView from './../components/views/ProductHomeView.vue'
import RecipeSocialNetworkView from './../components/views/RecipeSocialNetworkView.vue'
import RecipeListView from './../components/views/RecipeListView.vue'
import RecipeView from './../components/views/RecipeView.vue'
import ProductSearchResultsView from './../components/views/ProductSearchResultsView.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/products' },
    { path: '/products', component: ProductHomeView,
        children: [
            { path: 'search/:q', component: ProductSearchResultsView, name: 'results', props: true }
        ]
    },
    { path: '/item/:productId', component: ProductView, props: true},
    { path: '/recipes', 
        component: RecipeSocialNetworkView,
        children: [
            { path: '', component: RecipeListView },
            { path: ':id', component: RecipeView },
        ]
    }
  ]
  
const router = new VueRouter({
    mode: "history",
    routes : routes
})

export default router;