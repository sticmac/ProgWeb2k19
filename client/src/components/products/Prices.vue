<template>
    <div>
        <h3 class="title">Prix</h3>

        <div v-if="!loaded">
            <Loading />
        </div>
        <div v-else-if="loaded && data && data.length">
            <div class="columns">
                <div class="column has-text-grey-darker is-size-5">{{data[0].price | euroFilter}}</div>
                <div class="column is-size-5">{{data[0].shop}}</div>
            </div>
            <b-collapse class="card" :open="false">
                <div slot="trigger" slot-scope="props" class="card-header">
                    <p class="card-header-title">
                        Autres prix…
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'angle-down' : 'angle-up'">
                        </b-icon>
                    </a>
                </div>
                <div class="card-content">
                    <b-table :data="formattedPrices()" :columns="columns" :striped="true"></b-table>
                </div>
            </b-collapse>
        </div>
        <div v-else class="content has-text-grey has-text-centered">
            <p>
                <b-icon
                    pack="fas"
                    icon="frown"
                    size="is-large">
                </b-icon>
            </p>
            <p>Aucun prix pour ce produit</p>
        </div>
    </div>
</template>

<script>
import Requester from '../../services/requester'
import Loading from '../Loading'

export default {
    props: ["productId"],
    components: {
        Loading
    },
    filters: {
        euroFilter: function(value) {
            return value.toFixed(2) + "€";
        }
    },
    data() {
        return {
            loaded: false,
            data: [],
            columns: [
                {
                    field: 'price',
                    label: 'Prix',
                },
                {
                    field: 'shop',
                    label: 'Magasin',
                },
            ]
        }
    },
    mounted() {
        this.data = Requester.getPricesForProduct(this.id, (success, prices) => {
            this.loaded = true;
            if(success) {
                this.data = prices;
            }
        });
    },
    methods: {
        formattedPrices() {
            const res = [];
            for (let d of this.data) {
                res.push({price: this.$options.filters.euroFilter(d.price), shop: d.shop});
            }
            return res;
        }
    }
}
</script>

