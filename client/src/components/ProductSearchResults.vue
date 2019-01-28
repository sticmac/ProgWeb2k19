<template>
    <div class="container">
        <div v-if="loaded && results.length === 0">
            Aucun résultat n'a été trouvé... :-(
        </div>
        <div v-else-if="loaded">
            <SearchResult v-for="result in results" v-bind:key="result.name" v-bind:meal="result"/>
        </div>
        <Loading v-else/>
    </div>
</template>

<script>
import SearchResult from "./SearchResult";
import Loading from "./Loading";
export default {
    props: ["q"],
    data: function() {
        return {
            results: [],
            loaded: false
        }
    },
    mounted() {
        const myHeaders = new Headers();

        const myInit = { method: 'GET',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default' };

        const serverUrl = process.env.VUE_APP_SERVER_URL || "http://localhost:3000";

        const myRequest = new Request(serverUrl + '/products/' + this.q, myInit);
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

    },
    components: {
        SearchResult,
        Loading
    }
}
</script>
