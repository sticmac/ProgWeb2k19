<template>
    <div class="container">
        <SearchResult v-for="result in results" v-bind:key="result.name" v-bind:meal="result"/>
    </div>
</template>

<script>
import SearchResult from "./SearchResult";
export default {
    props: ["q"],
    data: function() {
        return {
            results: []
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
        SearchResult
    }
}
</script>
