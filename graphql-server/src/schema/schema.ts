import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema
} from "graphql";

var mockData = [
  { name: "Book1", pages: 432, id: 1 },
  { name: "Book2", pages: 123, id: 2 },
  { name: "Book3", pages: 332, id: 3 }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    pages: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return mockData.find(item => {
          return item.id == args.id;
        });
      }
    }
  }
});

export const schema = new GraphQLSchema({
  query: RootQuery
});
