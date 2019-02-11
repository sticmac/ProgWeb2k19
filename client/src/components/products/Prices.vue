<template>
    <div>
        <h3 class="title">Prix</h3>
        <div class="columns">
            <div class="column has-text-grey-darker is-size-5">{{data[0].price | euroFilter}}</div>
            <div class="column is-size-5">{{data[0].shop}}</div>
        </div>
        <b-collapse class="card">
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
</template>

<script>

export default {
    filters: {
        euroFilter: function(value) {
            return value.toFixed(2) + "€";
        }
    },
    data() {
        return {
            data: [
                {price: 3.5, shop: "Neto"},
                {price: 25, shop: "Auchan"},
                {price: 17, shop: "Lidl"}
            ],
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

