<template>
    <div class="container">
        <div v-if="error">
            Une erreur inattendue est survenue, sry :(
        </div>
        <div v-else>
            <b-table :data="data" :columns="columns"></b-table>
        </div>
    </div>
</template>

<script>
    import Requester from "../../services/requester";

    export default {
        props: ["product1Id", "product2Id"],

        data() {
            return {
                error: false,
                columns: [],
                data: []
            }
        },
        methods: {
            compare: function (product1Id, product2Id) {
                Promise.all([
                    new Promise((resolve, reject) =>
                        Requester.getProductById(product1Id, (success, product1) => {
                            if (!success) {
                                reject();
                            }
                            resolve(product1);
                        })),
                    new Promise((resolve, reject) =>
                        Requester.getProductById(product2Id, (success1, product2) => {
                            if (!success1) {
                                reject();
                            }
                            resolve(product2);
                        }))
                ])
                    .then(values => {
                        this.columns = [
                            {
                                field: "title",
                                label: "Titre"
                            },
                            {
                                field: "product1",
                                label: values[0].name,
                                html: true
                            },
                            {
                                field: "product2",
                                label: values[1].name,
                                html: true
                            }
                        ];
                        this.data = [
                            // {
                            //     title: "", product1: "<img src=\"" + values[0].image_url + "\"/>", product2:
                            //         "<img src=\"" + values[1].image_url + "\"/>"
                            // },
                            {
                                title: "Marque",
                                product1: values[0].brands || "-",
                                product2: values[1].brands || "-"
                            },
                            {
                                title: "Quantité",
                                product1: values[0].quantity || "-",
                                product2: values[1].quantity || "-"
                            },
                            {
                                title: "Ingrédients",
                                product1: values[0].ingredients ? values[0].ingredients.join("\n") : "-",
                                product2: values[1].ingredients ? values[1].ingredients.join("\n") : "-"
                            },
                            {
                                title: "Nutriments",
                                product1: values[0].nutriments && values[0].nutriments.length > 0 ?
                                    Object.keys(values[0].nutriments)
                                        .map((value, index) =>
                                            index + " : " + value).join("\n") : "-",
                                product2: values[1].nutriments && values[1].nutriments.length > 0 ?
                                    Object.keys(values[1].nutriments)
                                        .map((value, index) =>
                                            index + " : " + value).join("\n") : "-"
                            }
                        ]
                    })
                    .catch(() => {
                        this.error = true;
                    })

            }
        },
        mounted() {
            this.compare(this.product1Id, this.product2Id)
        },
        watch: {
            // eslint-disable-next-line
            $route(to, from) {
                this.compare(to.params.product1Id, (to.params.product2Id));
            }
        }
    }
</script>


<style>

    .container {
        padding-top: 2rem;
    }

</style>

