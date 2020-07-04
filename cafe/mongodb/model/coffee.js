const mongoose = require("mongoose");

const coffeeSchema = mongoose.Schema({
    id: Int,
    name: String,
    price: Int,
});

export const CoffeeContent = mongoose.model("CoffeeContent", coffeeSchema);
