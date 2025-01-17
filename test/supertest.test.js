import supertest from "supertest";
import chai from "chai";
import mongoose from "mongoose";
import Users from "../src/dao/Users.dao.js";
import Pets from "../src/dao/Pets.dao.js";

const requester = supertest("http://localhost:8080");
const expect = chai.expect;

describe("Testing de la Web app Adoptame", () => {
    before(async function () {
        await mongoose.connect(
            "mongodb+srv://santiagoyoan:coderhouse@cluster0.zqask.mongodb.net/adopme?retryWrites=true&w=majority&appName=Cluster0"
        );
        this.usersDao = new Users();
        this.usersDao = new Pets();
    });

    //* para cada it va hacer esto
    beforeEach(async function () {
        await mongoose.connection.collections.users.drop(); //! Elimina solo la db de users
        await mongoose.connection.collections.pets.drop(); //! Elimina solo la db de users
    });

    //#region PETS
    describe("Testing del modulo Pets", () => {
        it("El empoint POST /api/pets debe crear una mascota", async () => {
            const tukeke = {
                name: "Carmelo",
                specie: "Largarto",
                birthDate: "201-05-17",
            };
            const { body } = await requester.post("/api/pets").send(tukeke);
            expect(body.payload).to.have.property("_id");
        });

        it("El empoint GET /api/pets debe retornar un Array de mascotas", async () => {
            const { body } = await requester.get("/api/pets");

            expect(Array.isArray(body.payload)).to.be.true;
        });

        it("El Enpoint POST /api/pets debe crear una mascota con la property adopted: false ", async () => {
            const chiguire = {
                name: "Bobi",
                specie: "nose",
                birthDate: "201-05-17",
            };

            const { statusCode, body } = await requester.post("/api/pets").send(chiguire);

            expect(statusCode).to.equal(200);
            expect(body.payload).to.have.property("adopted").that.equal(false);
        });

        it("Si se desea crear una mascota sin el estado nombre, se espera una respuesta de status '400", async () => {
            const cancerbero = {
                specie: "Can",
                birthDate: "201-10-17",
            };

            const { statusCode } = await requester.post("/api/pets").send(cancerbero);

            expect(statusCode).to.equal(400);
        });
    });

    //#region USERS
    describe("Testing del modulo Users", () => {
        it("El endpoint POST /api/users debe crear un usuario en la DB", async () => {
            const usuario = {
                first_name: "Miguel",
                last_name: "Duran",
                email: "miguel.dural@example.com",
                password: "123456",
            };

            const { statusCode, _body, ok } = await requester.post("/api/users").send(usuario);

            expect(statusCode).to.equal(201);
            expect(_body.payload).to.have.property("_id");
        });
        it("El endpoint POST /api/users debe crear un usuario contenga un array vacio en pets", async () => {
            const usuario = {
                first_name: "kafka",
                last_name: "Hibino",
                email: "kafka.hibino@example.com",
                password: "12341",
            };

            const { _body } = await requester.post("/api/users").send(usuario);

            expect(_body.payload).to.have.property("pets").that.deep.equal([]);
        });

        it("El endpoint GET /api/users debe retornar un array", async () => {
            const { body } = await requester.get("/api/users");

            expect(body).to.have.property("payload");
            expect(Array.isArray(body.payload)).to.be.true;
        });

        it("El endpoint GET /api/users/67717e00412cdef6663931e6 debe recuperar un usuario por su ID", async () => {
            const { _body } = await requester.get("/api/users/67717e00412cdef6663931e6");

            expect(_body).to.have.an("object");
        });
    });

    //#region ADOPTIONS
    describe("Testing del modulo de Adoptions", () => {
        it("El endpoint POST /api/adoptions/:uid/:pid debe crear una nueva adopcion", async () => {
            // creamos el user
            const usuario = {
                first_name: "Miguel",
                last_name: "Duran",
                email: "miguel.dural@example.com",
                password: "123456",
            };

            const newUsuario = await requester.post("/api/users").send(usuario);

            // creamos el pet
            const tukeke = {
                name: "Carmelo",
                specie: "Largarto",
                birthDate: "201-05-17",
            };
            const newPet = await requester.post("/api/pets").send(tukeke);

            // recupero el user y el pet
            const newAdoption = {
                owner: newUsuario._body.payload._id,
                pet: newPet._body.payload._id,
            };

            //Creamos la adoption
            const { statusCode, _body } = await requester
                .post(`/api/adoptions/${newAdoption.owner}/${newAdoption.pet}`)
                .send(newAdoption);

            expect(statusCode).to.equal(200);
            expect(_body.message).to.equal("Pet adopted");
        });

        it("El endPoint GET /api/adoptions debe retornar una lista", async () => {
            const { statusCode, _body } = await requester.get("/api/adoptions");

            expect(statusCode).to.equal(200);
            expect(_body).to.be.an("object");
            expect(_body.payload).to.be.an("array");
        });

        it("El endpoint GET /api/adoptions/:id debe retornar un adoption", async () => {
            // creamos el user
            const usuario = {
                first_name: "Miguel",
                last_name: "Duran",
                email: "miguel.dural@example.com",
                password: "123456",
            };

            const newUsuario = await requester.post("/api/users").send(usuario);

            // creamos el pet
            const tukeke = {
                name: "Carmelo",
                specie: "Largarto",
                birthDate: "201-05-17",
            };
            const newPet = await requester.post("/api/pets").send(tukeke);

            // recupero el user y el pet
            const newAdoption = {
                owner: newUsuario._body.payload._id,
                pet: newPet._body.payload._id,
            };

            //Creamos la adoption
            const newAdop = await requester.post(`/api/adoptions/${newAdoption.owner}/${newAdoption.pet}`).send(newAdoption);

            //obtenemos un id creado
            const res = await requester.get("/api/adoptions");

            //Hacemos el get con el ID existente
            const { statusCode, _body } = await requester.get(`/api/adoptions/${res._body.payload[0]._id}`);

            expect(statusCode).to.equal(200);
            expect(_body.payload).to.have.property("owner");
            expect(_body.payload).to.have.property("pet");
        });
    });
});
