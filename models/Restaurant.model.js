const { Schema, model } = require("mongoose");

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            required: [true, 'Name is required']
        },
        address: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

const Restaurant = model("Restaurant", restaurantSchema);

module.exports = Restaurant;
