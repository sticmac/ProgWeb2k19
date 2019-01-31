<template>
    <div class="container">
        <SearchBar v-on:search="routeChange($event)" style="margin-bottom: 2em"/>
        <div v-if="loaded && results.length === 0">
            Aucun résultat n'a été trouvé... :-(
        </div>
        <div v-else-if="loaded">
            <SearchResult v-for="(result, index) in results" v-bind:key="index" v-bind:meal="result"/>
        </div>
        <Loading v-else/>
    </div>
</template>

<script>
import SearchResult from "../search/SearchResult";
import Loading from "../Loading";
import SearchBar from "../search/SearchBar";
import Requester from '../../services/requester'

export default {
    props: ["q"],
    data: function() {
        return {
            results: [],
            loaded: false
        }
    },
    mounted() {
        this.search(this.q);
    },
    methods: {
        routeChange: function(searchArg) {
            const query = searchArg.split(' ').join('+');
            this.$router.push({name: 'results', params: {q: query}});
        },
        search: function(searchArg) {
            this.loaded = false;
            this.results = [];
            
            Requester.getProductsFromArgs(searchArg, (success, products) => {
                this.results = products;
            });
        }
    },
    watch:{
        $route (to, from){
            this.search(to.params.q);
        }
    }, 
    components: {
        SearchResult,
        Loading,
        SearchBar
    }
}
</script>

<style scoped>
 .container{
     margin-top: 2rem;
 }
</style>