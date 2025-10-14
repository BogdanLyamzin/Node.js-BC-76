import {Schema, model} from "mongoose";

const contactShchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    }
});

const Contact = model("contact", contactShchema);

export default Contact;