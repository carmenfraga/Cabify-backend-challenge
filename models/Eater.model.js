const { Schema, model } = require("mongoose");

const eaterSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
    },
    {
        timestamps: true,
    }
);

const Eater = model("Eater", eaterSchema);

module.exports = Eater;