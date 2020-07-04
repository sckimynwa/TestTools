export const initMongo = () => {
    const mongoose = require('mongoose');
    mongoose.connect("mongodb://localhost:27017/cafe");

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error"));
    db.once("open", async function() {
        console.log("mongoose connected db");
    });

    const schema = {};
    const model = {};

    schema.Coffee = require("./model/coffee")(mongoose);
    schema.User = require("./model/user")(mongoose);
    
    for(let k in schema) {
        model[k] = mongoose.model(k, schema[k])
    }

    return model;
}