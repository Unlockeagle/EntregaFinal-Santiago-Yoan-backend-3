import { Router } from "express";
import MocksController from "../controllers/mocks.controller.js";


const router = Router()
router.get('/mockingpets', MocksController.getMockingPets)
router.get('/mockingusers', MocksController.getMockingUser)
router.post('/generatedata', MocksController.postMockingData)

export default router


