import Vue from 'vue'
import VueRouter from 'vue-router'
import Authentification from './authentification.js'

// Views components
import ProductView from './../components/views/ProductView.vue';
import ProductHomeView from './../components/views/ProductHomeView.vue'
import RecipeSocialNetworkView from './../components/views/RecipeSocialNetworkView.vue'
import RecipeListView from './../components/views/RecipeListView.vue'
import RecipeView from './../components/views/RecipeView.vue'
import ErrorView from './../components/views/ErrorView.vue'
import AddRecipeView from './../components/views/AddRecipeView.vue'
import ProductSearchResultsView from './../components/views/ProductSearchResultsView.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/products' },
    { path: '/products', component: ProductHomeView, 
        children: [
            { path: 'search/:q', component: ProductSearchResultsView, name: 'results', props: true }
        ],
        meta: { requiresAuth: false }
    },
    { path: '/item/:productId', component: ProductView, props: true},
    { path: '/recipes/', 
        component: RecipeSocialNetworkView,
        children: [
            { path: '', component: RecipeListView },
            { path: ':recipeId', component: RecipeView },
        ]
    },
    { path: '/recipe-edition', component: AddRecipeView, meta: { requiresAuth: true } },
    { path: '*', redirect: '/404' },
    { path: '/404', component: ErrorView}
  ]
  
const router = new VueRouter({
    mode: "history",
    routes : routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!Authentification.loggedIn()) {
            Authentification.promptLogin();

            next({
                path: from.fullPath,
                query: { redirect: to.fullPath }
            })
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
})

export default router;