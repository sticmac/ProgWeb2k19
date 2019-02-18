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

    static getScoreById(productId, requestCallback) {
        Fetcher.get('/nutriscore/item/' + productId, (success, data) => {
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

    static postRecipeCommentById(recipeId, author, content, requestCallback) {
        const body = {
            author: author,
            content : content,
            date : Date.now().toString()
        }
        Fetcher.post('/recipes/' + recipeId+"/comment/", body, (success, data) => {
            requestCallback(success, data);
        });
    }

    static getRecipeCommentsById(recipeId, requestCallback) {
        Fetcher.get('/recipes/' + recipeId+"/comments/", (success, data) => {
            requestCallback(success, data);
        });
    }

    static postRegister(email, username, password, requestCallback) {
        const body = {
            email: email,
            name : username,
            password : password
        }
        Fetcher.post('/account/', body, (success, data) => {
            requestCallback(success, data);
        });
    }

    static postLogin(email, password, requestCallback) {
        const body = {
            email: email,
            password : password
        }
        Fetcher.post('/token/', body, (success, data) => {
            requestCallback(success, data);
        });
    }

    static postNewPrice(productId, newPriceAmount, newPriceShop, date, requestCallback) {
        console.log("date", date);
        const body = {
            price: parseFloat(newPriceAmount),
            shop: newPriceShop,
            date: date
        }
        Fetcher.post('/prices/' + productId, body, (success, data) => {
            requestCallback(success, data);
        })
    }

    static postRecipe(name, image, description, price, time_required, products, requestCallback) {
        const body = {
            recipe: {
                name: name,
                image: image,
                description: description,
                price: parseInt(price),
                time_required: parseInt(time_required),
                products: products
            }
        }
        Fetcher.post('/recipes/', body, (success, data) => {
            requestCallback(success, data);
        });
    }
    
    static getPricesForProduct(productId, requestCallback) {
        Fetcher.get('/prices/' + productId, (success, data) => {
            requestCallback(success, data);
        });
    }
}