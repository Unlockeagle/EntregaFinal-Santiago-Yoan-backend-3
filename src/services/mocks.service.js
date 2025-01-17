import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";
import { usersService } from "../services/index.js"
import { petsService } from "../services/index.js";

class MocksServices {
    //  generar mascotas (sin owner y con adopted en “false”) de acuerdo a un parámetro numérico.
    static async generatePets(petsQuantity) {
        const pets = [];

        for (let i = 0; i < petsQuantity; i++) {
            pets.push({
                name: faker.person.firstName(),
                specie: faker.animal.type(),
                adopted: false,
                // brithday: faker.date.past(),
                image: "http://via.placeholder.com/150",
            });
        }
        return await pets;
    }

    static async genetareUsers(usersQuantity) {
        const users = [];
        const roles = ["user", "admin"];

        for (let i = 0; i < usersQuantity; i++) {
            let first_name = faker.person.firstName();
            let last_name = faker.person.lastName();
            let email = faker.internet.exampleEmail({ firstName: first_name });

            users.push({
                _id: faker.database.mongodbObjectId(),
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: await createHash("coder123"),
                role: faker.helpers.arrayElement(roles),
                pets: [],
            });
        }
        return await users;
    }

    static async generateData(usersQuantity, petsQuantity) {
        const userMocks = await this.genetareUsers(usersQuantity);
        const petsMocks = await this.generatePets(petsQuantity);

        // const user = await userModel.insertMany(userMocks);
        const user = await usersService.insertMany(userMocks)
        const pets = await petsService.insertMany(petsMocks)
        // await user.save();
        // await pets.save();

        return await (user, pets)
    }
}

export default MocksServices;
