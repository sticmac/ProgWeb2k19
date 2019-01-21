import Vue from 'vue'
import VueRouter from 'vue-router'

// Views components
import ProductHome from './../components/Product_Home.vue'
import ProductView from './../components/ProductView.vue';
import ProductSearchResults from './../components/ProductSearchResults.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: ProductHome },
    { path: '/item/:productId', component: ProductView, props: true},
    { path: '/results', component: ProductSearchResults, props: true}
  ]
  
const router = new VueRouter({
    mode: "history",
    routes : routes
})

export default router;