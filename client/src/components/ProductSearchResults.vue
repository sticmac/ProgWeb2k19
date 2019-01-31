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
import SearchResult from "./SearchResult";
import Loading from "./Loading";
import SearchBar from "./SearchBar";
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
            const myHeaders = new Headers();

            const myInit = { method: 'GET',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default' };

            const serverUrl = process.env.VUE_APP_SERVER_URL || "http://localhost:3000";

            const myRequest = new Request(serverUrl + '/products/' + searchArg, myInit);
            fetch(myRequest)
            .then(
                (response) => {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then((data) => {
                        data.forEach(element => {
                            this.results.push(element);
                        });

                        this.loaded = true; //loading is finished
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
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
