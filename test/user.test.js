import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js";
// import assert from "assert";
import chai from "chai";

const expect = chai.expect;

describe("Testeamos el DAO de los usuarios", function () {
    //* El before debe ser asyncrono  y estar dentro del describe
    before(async function () {
        await mongoose.connect(
            "mongodb+srv://santiagoyoan:coderhouse@cluster0.zqask.mongodb.net/adopme?retryWrites=true&w=majority&appName=Cluster0"
        );
        this.usersDao = new Users();
    });

    //* para cada it va hacer esto
    beforeEach(async function () {
        await mongoose.connection.collections.users.drop(); //! Elimina solo la db de users
    });

    it("El get de usuarios debe retornar un Array", async function () {
        const result = await this.usersDao.get();

        expect(Array.isArray(result)).to.be.true;
        // assert.strictEqual(Array.isArray(result), true);
    });

    it("El Dao debe crear un usuario en la DB", async function () {
        let user = {
            first_name: "kafka",
            last_name: "Hibino",
            password: "12341",
            email: "kafka.hibino@example.com",
        };

        const result = await this.usersDao.save(user);

        expect(result).to.have.property("_id")
        // assert.ok(result._id);
    });

    it("Validamos que el usuario contenga un array vacio en pets", async function () {
        let user = {
            first_name: "kafka",
            last_name: "Hibino",
            password: "12341",
            email: "kafka.hibino@example.com",
        };

        const result = await this.usersDao.save(user);

        expect(result.pets).to.deep.equal([])
        // assert.deepStrictEqual(result.pets, []);
    });
    it("Validamos que el usuario contenga una password del tipo string", async function () {
        let user = {
            first_name: "kafka",
            last_name: "Hibino",
            password: "12341",
            email: "kafka.hibino@example.com",
        };

        const result = await this.usersDao.save(user);

        expect(result.password).to.have.an("string")
        // assert.strictEqual(typeof result.password, "string");
    });
    it("El dao puede obtener un usuario por su email", async function () {
        let user = {
            first_name: "kafka",
            last_name: "Hibino",
            password: "12341",
            email: "kafka.hibino@example.com",
        };

        await this.usersDao.save(user);
        const result = await this.usersDao.getBy({ email: user.email });

        expect(result).to.have.an("object")
        //assert.strictEqual(typeof result, "object");
    });

    after(async function () {
        // Opcionalmente, se puede limpiar la base de datos después de las pruebas
        // await mongoose.connection.db.dropDatabase(); //! este elimina toda la DB
        await mongoose.disconnect();
    });
});
