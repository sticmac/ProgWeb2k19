<template>
    <div class="columns is-multiline">
        <div class="column is-half" v-for="(product, index) in products" :key="index">
            <div class="box is-marginless">
                <article class="media">
                    <div class="media-left">
                    <figure class="image is-64x64">
                        <img :src="product.image" alt="Image">
                    </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                            <strong>{{product.name}}</strong>
                            <br>
                            {{product.quantity}}
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        products : Array
    }
}
</script>

<style>

</style>
