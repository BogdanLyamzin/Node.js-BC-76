import {Schema, model} from "mongoose";

const contactShchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["work", "friends", "family", "other"],
        default: "other"
    }
}, {versionKey: false, timestamps: true});

const Contact = model("contact", contactShchema);

export default Contact;