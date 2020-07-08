"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var graphql_1 = require("graphql");
var book_1 = require("./book");
var author_1 = require("./author");
var BookType = new graphql_1.GraphQLObjectType({
    name: "Book",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        pages: { type: graphql_1.GraphQLInt },
        author: {
            type: AuthorType,
            resolve: function (parent, args) {
                return author_1.authorModel.findById(parent.authorID);
            }
        }
    }); }
});
var AuthorType = new graphql_1.GraphQLObjectType({
    name: "Author",
    fields: function () { return ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        age: { type: graphql_1.GraphQLInt },
        book: {
            type: new graphql_1.GraphQLList(BookType),
            resolve: function (parent, args) {
                return book_1.bookModel.find({ authorID: parent.id });
            }
        }
    }); }
});
var RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (parent, args) {
                return book_1.bookModel.findById(args.id);
            }
        },
        books: {
            type: new graphql_1.GraphQLList(BookType),
            resolve: function (parent, args) {
                return book_1.bookModel.find({});
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve: function (parent, args) {
                return author_1.authorModel.findById(args.id);
            }
        },
        authors: {
            type: new graphql_1.GraphQLList(AuthorType),
            resolve: function (parent, args) {
                return author_1.authorModel.find({});
            }
        }
    }
});
var Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                age: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) }
            },
            resolve: function (parent, args) {
                var author = new author_1.authorModel({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                pages: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                authorID: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            resolve: function (parent, args) {
                var book = new book_1.bookModel({
                    name: args.name,
                    pages: args.pages,
                    authorID: args.authorID
                });
                return book.save();
            }
        }
    }
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
