import { usersService } from "../services/index.js";

const getAllUsers = async (req, res) => {
    const users = await usersService.getAll();

    res.send({ status: "success", payload: users });
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) return res.status(404).send({ status: "error", error: "User not found" });
        res.status(200).send({ status: "success", payload: user });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) return res.status(404).send({ status: "error", error: "User not found" });
        const result = await usersService.update(userId, updateBody);
        res.status(201).send({ status: "success", message: "User updated" });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const result = await usersService.deleteById(userId)
        res.status(201).send({ status: "success", message: "User deleted" });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
};
const createUser = async (req, res) => {
    const newUser = req.body;
    if (!newUser) return res.status(401).send({ status: "error", error: "Body not found" });
    const user = await usersService.create(newUser);
    res.status(201).send({ status: "success", message: "User created", payload: user });
};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    createUser,
};
