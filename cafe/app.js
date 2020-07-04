var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const model = require('./mongodb/mongo.js');
var schema = buildSchema(`
    type Query {
        hello: String
        coffee: [Coffee]
        users: [User]
    }

    type Mutation {
        createCoffee(name: String!, price: Int!): Coffee
        createUser(name: String!): User
    }

    type Coffee {
        id: Int,
        name: String,
        price: Int,
    }

    type User {
        id: Int,
        name: String,
    }
`);

var root = {
    hello: () => 'hello world!',
    users: async() => {
        return await model.User.find();
    },
    coffee: async() => {
       return await model.Coffee.find();
    },
    createUser: async(args, context, info) => {
        const { name } = args;
        const newUser = new model.User({ name: name });
        return await newUser.save();
    },
    createCoffee: async(args, context, info) => {
        const { name, price } = args;
        const newCoffee = new model.Coffee({ name: name, price: price });
        return await newCoffee.save();
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,    
    graphiql: true,
}));

app.get('*', function(req, res){
    res.end('Hello world');
});

app.listen(4000, () => console.log('Now broswe to localhost:4000/graphql'));