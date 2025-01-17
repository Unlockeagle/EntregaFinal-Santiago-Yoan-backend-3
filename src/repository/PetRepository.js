import GenericRepository from "./GenericRepository.js";

export default class PetRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
    postPets = (pets) => {
        return this.insertMany(pets);
    };
    deleteById = (id) => {
        return this.deleteById(id);
    };
}
