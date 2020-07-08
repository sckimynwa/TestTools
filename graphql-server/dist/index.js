"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_graphql_1 = require("express-graphql");
var schema_1 = require("./schema/schema");
var app = express_1.default();
mongoose_1.default.connect("mongodb://localhost:27017/graphql-server");
mongoose_1.default.connection.once("open", function () {
    console.log("connected to database");
});
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema_1.schema,
    graphiql: true
}));
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log("Listening on port 3000");
});
