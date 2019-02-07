class AbstractModel {
    constructor() {
        if (new.target === AbstractModel) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    toJson(){}

    save(){}

    udpate(newValues){}

    delete(){}

}

module.exports = AbstractModel;