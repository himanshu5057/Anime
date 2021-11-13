import express from "express";
import userModel from "../model/user.js";
import { genSalt, hash, compare } from "bcrypt";
let saltRounds = 10;
const register = async (req, res) => {
  try {
    console.log(req.body);
    let ifExists = await userModel.findOne({ email: req.body.email });
    // console.log(res);
    if (ifExists) {
      return res.json({
        result: false,
        message: "User already exists",
      });
    }
    const salt = await genSalt(10);
    let password = await hash(req.body.password, salt);
    console.log("pwd : " + password);
    let createUser = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: password,
    });

    if (createUser) {
      return res.json({
        id: createUser._id,
        username:username,
        result: true,
        message: "User registered successfully",
      });
    } else {
      return res.json({
        result: false,
        message: "User not save in database",
      });
    }
  } catch (error) {
    res.json({ result: false, message: "Invalid request" });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    let userDetails = await userModel.findOne({ email: req.body.email });
    const comparePassword = async (p1, p2) => {
      let isMatched = await compare(p1, p2);
      console.log(isMatched);
      if (isMatched) {
        return res.json({
          result: true,
          id: userDetails._id,
          username: userDetails.username,
          email: userDetails.email,
        });
      } else {
        return res.json({
          result: false,
          message: "Wrong password",
        });
      }
    };
    // console.log(isMatched);
    if (!userDetails) {
      return res.json({
        result: false,
        message: "User not found or entered wrong email",
      });
    }
    await comparePassword(req.body.password, userDetails.password);
  } catch (error) {
    console.log(error);
  }
};

export { register, login };
