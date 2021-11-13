import express from "express";
const router=express.Router();
// import User from "../models/user.js";
import { login, register } from "../controllers/user.js";
// import { validLogin, validRegister } from "../validations/validation.js";

router.post("/login",  login)
router.post("/register",register)
export default router