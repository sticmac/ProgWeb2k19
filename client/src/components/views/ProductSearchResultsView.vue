<template>
    <div class="container">
        <div class="button is-link is-large compare-button" v-on:click="compare()">Comparer</div>
        <div v-if="loaded && results.length === 0">
            Aucun résultat n'a été trouvé... :-(
        </div>
        <div v-else-if="loaded">
            <div class="columns is-multiline">
                <div class="column is-one-third" v-for="(result, index) in paginedResults" :key="currentPageNumber+'_'+index">
                    <SearchResult   v-bind:meal="result"/>                    
                </div>
            </div>
            <b-pagination
                :total="results.length-1"
                :current.sync="currentPageNumber"
                :order="'is-centered'"
                :simple="false"
                :rounded="true"
                :per-page="itemsPerPage">
            </b-pagination>
        </div>
        <Loading v-else/>
  </div>
</template>

<script>
import SearchResult from "../search/SearchResult";
import Loading from "../Loading";
import Requester from "../../services/requester";

export default {
  props: ["q"],
  data: function() {
    return {
      results: [],
      loaded: false,
      currentPageNumber: 1,
      itemsPerPage: 12
    };
  },
  mounted() {
    let str = "";
    for (const key in this.$route.query) {
      str += (str === "" ? "" : "&") + key + "=" + this.$route.query[key];
    }
    this.search(this.q + (str === "" ? "" : "?" + str));
  },
  methods: {
        search: function(searchArg) {
            this.loaded = false;
            this.results = [];

            Requester.getProductsFromArgs(searchArg, (success, products) => {
                this.loaded = true;
                if(success) {
                    this.results = products;
                }
            });
        },
        compare: function() {
            const compArray = this.results.filter(value => !!value.compare);
            if (compArray.length !== 2) {
                this.$toast.open({
                    duration: 5000,
                    message: `Vous pouvez comparer les produits que 2 par 2.`,
                    type: 'is-danger'
                })
            }
            else {
                this.$router.push('/compare/item/' + compArray[0].id + "/item/" + compArray[1].id);
            }
        }
    },
    watch:{
        $route(to) {
        let str = "";
        for (const key in this.$route.query) {
            str += (str === "" ? "" : "&") + key + "=" + this.$route.query[key];
        }
        this.search(to.params.q + (str === "" ? "" : "?" + str));
        }
    },
    components: {
        SearchResult,
        Loading
    },
    computed : {
        paginedResults(){
            console.log(this.results.length);
            var resultForPage = [];
            if(this.results != null){
                const startIndex = this.currentPageNumber * this.itemsPerPage;
                resultForPage = this.results.slice(startIndex, startIndex + this.itemsPerPage);
            }
            return resultForPage;
        }
    }
};
</script>

<style scoped>

    .compare-button{
        margin-bottom: 1rem;
    }

 .container{
     margin-top: 2rem;
 }
</style>