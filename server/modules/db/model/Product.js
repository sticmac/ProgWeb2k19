const AbstractModel = require("./AbstractModel");
// const KEYS = ["id", "name", "image", "description", "price", "time_required", "products"];
const COLLECTION = "france";

class Product extends AbstractModel {

    constructor() {
        super();
    }

    toJson() {
        super.toJson();
    }

    save() {
        super.save();
    }

    udpate(newValues) {
        super.udpate(newValues);
    }

    delete() {
        super.delete();
    }
}

module.exports = {

}