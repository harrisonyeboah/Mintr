import express from "express";
import { registerUser, getUserByEmail, makeVerified } from "../controllers/registerController.js";


const router = express.Router();

router.post("/", registerUser);
router.get("/", getUserByEmail);
router.post("/verify", makeVerified);

export default router;
