const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: Int,
    name: String
});

export const UserContent = mongoose.model("UserContent", userSchema);