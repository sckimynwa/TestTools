module.exports = (function() {
    const mongoose = require('mongoose');
    mongoose.connect("mongodb://127.0.0.1:27017/cafe", { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, "connection error"));
    db.once("open", async function() {
        console.log("mongoose connected db");
    });

    const schema = {};
    const model = {};
    const collection = {};

    schema.Coffee = require("./model/coffee")(mongoose);
    schema.User = require("./model/user")(mongoose);

    collection.Coffee = "coffee";
    collection.User = "user";
    
    for(let k in schema) {
        model[k] = mongoose.model(k, schema[k], collection[k]);
    }

    return model;
})();