import mongoose from "mongoose";
import Contact from "./models/Contact.js";

const {MONGODB_URL} = process.env;

export const connectDatabase = async()=> {
    try {
        await mongoose.connect(MONGODB_URL);
        await Contact.syncIndexes();
        console.log("Successfully connect database");
    }
    catch(error) {
        console.log(`Error connect database ${error.message}`);
        throw error;
    }
};