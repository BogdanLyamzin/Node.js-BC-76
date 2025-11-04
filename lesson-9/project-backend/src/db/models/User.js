import {Schema, model} from "mongoose";

import { handleSaveError, setUpdateSettings } from "../hooks.js";

import { emailRegexp } from "../../constants/index.js";

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        match: emailRegexp,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    verify: {
        type: Boolean,
        default: false,
        required: true,
    }
}, {versionKey: false, timestamps: true});

userSchema.pre("save", function(next) {
    if(!this.username) {
        this.username = this.email;
    }
    next();
});

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = model("user", userSchema);

export default User;