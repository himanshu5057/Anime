import express from "express";
const router=express.Router();
// import User from "../models/user.js";
// import { login, register } from "../controllers/user.js";
import {addReview,getReviews} from "../controllers/anime.js";
// import { validLogin, validRegister } from "../validations/validation.js";

router.post("/addReview",  addReview);
router.post("/getReviews",  getReviews);
// router.post("/register",register)
export default router