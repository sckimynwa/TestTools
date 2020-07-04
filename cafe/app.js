var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const session = {id: '1001', expires: 20000};

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
        stars: Int,
    }

    type User {
        id: Int,
        name: String,
    }
`);

var root = {
    hello: () => 'hello world!',
    users: () => {
        return [
            { id: 1, name: "Jake" },
            { id: 2, name: "Park" },
            { id: 3, name: "Selena" }
        ]
    },
    coffee: () => {
        return [
            { id: 1, name: "Americano", price: 2500 },
        ]
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,    
    graphiql: true,
    context: session,
}));

app.listen(4000, () => console.log('Now broswe to localhost:4000/graphql'));