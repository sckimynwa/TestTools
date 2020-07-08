"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var graphql_1 = require("graphql");
var mockData = [
    { name: "Book1", pages: 432, id: 1 },
    { name: "Book2", pages: 123, id: 2 },
    { name: "Book3", pages: 332, id: 3 }
];
var BookType = new graphql_1.GraphQLObjectType({
    name: "Book",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        pages: { type: graphql_1.GraphQLInt }
    }); }
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (parent, args) {
                return mockData.find(function (item) {
                    return item.id == args.id;
                });
            }
        }
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery
});
