import express from "express";
import { registerUser, getUserByEmail } from "../controllers/registerController.js";


const router = express.Router();

router.post("/", registerUser);
router.get("/", getUserByEmail)

export default router;
