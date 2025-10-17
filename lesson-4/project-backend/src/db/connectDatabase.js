import mongoose from "mongoose";

const {MONGODB_URL} = process.env;

export const connectDatabase = async()=> {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Successfully connect database");
    }
    catch(error) {
        console.log(`Error connect database ${error.message}`);
        throw error;
    }
};