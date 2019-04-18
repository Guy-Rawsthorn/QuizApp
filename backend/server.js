const express = require('express');
const app = express();
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
require('dotenv').config();

const graphQLSchema = require('./graphql/schema/schema');
const graphQlResolvers = require('./graphql/resolvers');

const checkAuth = require('./middleware/check-auth');


// middleware

express.json();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(checkAuth);

app.use('/graphql', graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));


app.use('/hello-world', (req, res, next) => {
    res.status(200).json({
        hello: 'Hello World'
    })
});

// connect to MongoDB
mongoose.connect(`mongodb+srv://guyr:1234@devcluster-xlnsg.mongodb.net/test?retryWrites=true`, {useNewUrlParser: true})
    .then(() => {
        app.listen(3001);
    })
    .catch(err => {
        console.log(err);
    });
