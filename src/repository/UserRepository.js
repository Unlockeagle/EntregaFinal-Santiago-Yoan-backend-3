import GenericRepository from "./GenericRepository.js";

export default class UserRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }

    getUserByEmail = (email) => {
        return this.getBy({ email });
    };
    getUserById = (id) => {
        return this.getBy({ _id: id });
    };
    postUsers = (users) => {
        return this.insertMany(users);
    };
    deleteById = (id) => {
        return this.deleteById(id);
    };
}
