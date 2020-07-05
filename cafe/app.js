const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const queryString = require('query-string');

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

app.get('/login/facebook', function(req, res) {

    const stringifiedParams = queryString.stringify({
        client_id: "331044621072978",
        redirect_uri: 'http://localhost:4000/auth/callback',
        scope: ['email', 'user_friends'].join(','), // csv format
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
    });

    res.type('text/html').status(200).send(`
        <!DOCTYPE html>
        <html>
            <body>
            <a href="https://www.facebook.com/v4.0/dialog/oauth
            ?auth_type=rerequest
            &client_id=331044621072978
            &display=popup
            &redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fauth%2Fcallback
            &response_type=code&scope=email%2Cuser_friends">
                Login with Facebook
            </a>
            </body>
        </html>
    `);
});

app.get('/auth/callback', function(req, res) {
    res.send("authentification success");
});

app.get('*', function(req, res){
    res.end('Hello world');
});

app.listen(4000, () => console.log('Now broswe to localhost:4000/graphql'));