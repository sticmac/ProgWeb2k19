import Vue from 'vue'
import VueRouter from 'vue-router'

// Views components
import ProductHome from './../components/Product_Home.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: ProductHome },
  ]
  
const router = new VueRouter({
    mode: "history",
    routes : routes
})

export default router;