<template>
    <div class="notification">
        <div class="level">
            <div class="level-left title is-4">Prix</div>
            <div class="level-right">
                <button class="level-item button is-primary" v-on:click="toggleNewPriceForm()">Ajouter un prix</button>
            </div>
        </div>
        <b-collapse :open="displayForm">
            <section class="form-section">
                <b-field label="Prix (€)">
                    <b-input type="number" placeholder="0,00" v-model="newPriceAmount" />
                </b-field>
                <b-field label="Magasin">
                    <b-input v-model="newPriceShop" />
                </b-field>
                <p class="control">
                    <button class="button is-primary" v-on:click="sendNewPrice()">Envoyer</button>
                </p>
            </section>
        </b-collapse>
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
            newPriceAmount: 0,
            newPriceShop: "",
            displayForm: false,
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
        this.getPrices();
    },
    methods: {
        getPrices() {
            this.data = Requester.getPricesForProduct(this.productId, (success, prices) => {
                this.loaded = true;
                if(success) {
                    this.data = prices;
                }
            });
        },
        formattedPrices() {
            const res = [];
            for (let d of this.data) {
                res.push({price: this.$options.filters.euroFilter(d.price), shop: d.shop});
            }
            return res;
        },
        sendNewPrice() {
            Requester.postNewPrice(this.productId, this.newPriceAmount, this.newPriceShop, () => {
                this.newPriceAmount = 0;
                this.newPriceShop = "";
                this.loaded = false;
                this.getPrices();
            });
        },
        toggleNewPriceForm() {
            this.displayForm = !this.displayForm;
        }
    }
}
</script>

<style>
.form-section {
    padding: 0 1.5rem 3rem 1.5rem;
}
</style>

