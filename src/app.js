import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import manejadorError from "./middleware/error.js";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect(
    "mongodb+srv://santiagoyoan:coderhouse@cluster0.zqask.mongodb.net/adopme?retryWrites=true&w=majority&appName=Cluster0"
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Docs-Api-Adoption 🐱',
            description: 'Api super avanzada para la adopcion de mascotas ',
            version: '0.0.1'
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

const openapiSpecification = swaggerJSDoc(swaggerOptions)
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(openapiSpecification))
app.use(manejadorError);


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
