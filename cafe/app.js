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
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,    
    graphiql: true,
}));

app.listen(4000, () => console.log('Now broswe to localhost:4000/graphql'));