"use strict";
var express = require('express');
var graphqlHTTP = require('express-graphql').graphqlHTTP;
var schema = require('./schema/schema');
var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(3000, function () {
    console.log('Listening on port 3000');
});
