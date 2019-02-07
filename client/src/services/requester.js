import Fetcher from './fetcher'

export default class Requester {
    static getProducts(requestCallback){
        Fetcher.get('/products/', (success, data) => {
            requestCallback(success, data);
        });
    }

    static getProductsFromArgs(searchArgs, requestCallback){
        Fetcher.get('/products/'+searchArgs, (success, data) => {
            requestCallback(success, data);
        });
    }

    static getProductById(productId, requestCallback) {
        Fetcher.get('/products/item/' + productId, (success, data) => {
            requestCallback(success, data);
        });
    }

    static getRecipes(requestCallback){
        Fetcher.get('/recipes/', (success, data) => {
            requestCallback(success, data);
        });
    }

    static getRecipeById(recipeId, requestCallback) {
        Fetcher.get('/recipes/item/' + recipeId, (success, data) => {
            requestCallback(success, data);
        });
    }
}