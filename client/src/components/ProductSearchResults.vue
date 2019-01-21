<template>
    <div class="container">
        <SearchResult v-for="result in results" v-bind:key="result.name" v-bind:meal="result"/>
    </div>
</template>

<script>
import SearchResult from "./SearchResult";
export default {
    props: ["results"],
    data: function() {
    },
    components: {
        SearchResult
    }
}
</script>
