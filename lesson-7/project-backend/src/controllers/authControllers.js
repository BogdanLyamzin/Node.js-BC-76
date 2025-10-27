import bcypt from "bcrypt";

import createHttpError from "http-errors";

import User from "../db/models/User.js";

export const registerUserController = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw createHttpError(400, "Email already in use");
    }

    const hashPassword = await bcypt.hash(password, 10);
    
    const newUser = await User.create({...req.body, password: hashPassword});
    res.status(201).json(newUser);
};