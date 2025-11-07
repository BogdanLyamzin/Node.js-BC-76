import {Schema, model} from "mongoose";

import { handleSaveError, setUpdateSettings } from "../hooks.js";

import {categoryList} from "../../constants/index.js";

const contactShchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 11,
    },
    category: {
        type: String,
        enum: categoryList,
        default: "other"
    },
    photo: {
        type: String,
        default: null,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {versionKey: false, timestamps: true});

contactShchema.index({fullname: "text"});

contactShchema.post("save", handleSaveError);

contactShchema.pre("findOneAndUpdate", setUpdateSettings);

contactShchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactShchema);

export default Contact;