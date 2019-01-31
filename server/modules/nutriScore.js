const COEFS = {"proteins_100g": 3, "sugars_100g": -1, "fat_100g": -1, "salt_100g": -2, "fiber_100g": 3};


module.exports = {
    compute: (nutriments) => {
        if (nutriments.length === 0) {
            return null;
        }
        let nutriscore = 0;

        Object.keys(COEFS).forEach(key => {
            console.log(key + ":" + nutriments[key] * COEFS[key]);
            if (nutriments[key]) {
                nutriscore += nutriments[key] * COEFS[key];
            }
        });
        return nutriscore;
    }
};