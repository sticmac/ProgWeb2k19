<template>
    <div class="container">
        <SearchResult v-for="result in results" v-bind:key="result.name" v-bind:meal="result"/>
    </div>
</template>

<script>
import SearchResult from "./SearchResult";
export default {
    props: ["search"],
    data: function() {
        return {
            results: [
                {
                    name: "Spaghetti",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit ante ac mattis sagittis. Suspendisse malesuada varius ipsum in tristique. Vestibulum feugiat quis turpis eget consectetur. Ut condimentum et nulla ut congue. Nullam est orci, gravida quis blandit elementum, maximus ut nisi. Nullam mollis malesuada est, non pretium justo. Sed blandit a sapien et porta. Nulla sit amet sem id turpis commodo gravida. Nunc tincidunt tincidunt consectetur. Vestibulum congue arcu sapien, et fermentum turpis porttitor vel. Nunc venenatis nunc consectetur odio auctor iaculis. Integer eu metus fringilla, molestie orci a, hendrerit augue. Vivamus ac nunc venenatis, fermentum elit in, lobortis nibh. In accumsan faucibus ullamcorper. Etiam dui dolor, volutpat non nibh vitae, luctus scelerisque ipsum. Etiam posuere nisi enim, sit amet feugiat orci accumsan imperdiet. Sed eu mauris eu purus scelerisque volutpat vel a ipsum. Ut non pellentesque sapien, luctus dictum mauris. Phasellus leo arcu, interdum eget sapien quis, egestas sagittis dui. Maecenas eleifend eget lorem vel venenatis. Quisque quis elit in orci tincidunt pharetra. Donec id sem justo. Vivamus tristique lectus sit amet dictum scelerisque. Nulla eu odio ullamcorper, efficitur leo ac, bibendum tellus. In rutrum luctus tempor. Curabitur libero ex, molestie sit amet sollicitudin eu, congue in dui. Nullam convallis lacus a ligula tincidunt, in sollicitudin magna finibus.",
                    thumbUrl: "http://www.recipris.com/wp-content/uploads/2013/01/spaghetti-with-creamy-marinara.jpg"
                },
                {
                    name: "Spaghetti again",
                    description: "consectetur adipiscing elit. Donec hendrerit ante ac mattis sagittis. Suspendisse malesuada varius ipsum in tristique. Vestibulum feugiat quis turpis eget consectetur. Ut condimentum et nulla ut congue. Nullam est orci, gravida quis blandit elementum, maximus ut nisi. Nullam mollis malesuada est, non pretium justo. Sed blandit a sapien et porta. Nulla sit amet sem id turpis commodo gravida. Nunc tincidunt tincidunt consectetur. Vestibulum congue arcu sapien, et fermentum turpis porttitor vel. Nunc venenatis nunc consectetur odio auctor iaculis. Integer eu metus fringilla, molestie orci a, hendrerit augue. Vivamus ac nunc venenatis, fermentum elit in, lobortis nibh. In accumsan faucibus ullamcorper. Etiam dui dolor, volutpat non nibh vitae, luctus scelerisque ipsum. Etiam posuere nisi enim, sit amet feugiat orci accumsan imperdiet. Sed eu mauris eu purus scelerisque volutpat vel a ipsum. Ut non pellentesque sapien, luctus dictum mauris. Phasellus leo arcu, interdum eget sapien quis, egestas sagittis dui. Maecenas eleifend eget lorem vel venenatis. Quisque quis elit in orci tincidunt pharetra. Donec id sem justo. Vivamus tristique lectus sit amet dictum scelerisque. Nulla eu odio ullamcorper, efficitur leo ac, bibendum tellus. In rutrum luctus tempor. Curabitur libero ex, molestie sit amet sollicitudin eu, congue in dui. Nullam convallis lacus a ligula tincidunt, in sollicitudin magna finibus.",
                    thumbUrl: "http://www.recipris.com/wp-content/uploads/2013/01/spaghetti-with-creamy-marinara.jpg"
                }

            ]
        }
    },
    components: {
        SearchResult
    }
}
</script>
