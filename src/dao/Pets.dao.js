import petModel from "./models/Pet.js";

export default class Pet {
    get = (params) => {
        return petModel.find(params);
    };

    getBy = (params) => {
        return petModel.findOne(params);
    };

    save = (doc) => {
        return petModel.create(doc);
    };

    update = (id, doc) => {
        return petModel.findByIdAndUpdate(id, { $set: doc });
    };

    deleteById = (id) => {
        return petModel.findByIdAndDelete(id);
    };
    insertMany = (pets) => {
        const petsMocks = petModel.insertMany(pets);
        return petsMocks;
    };
}
