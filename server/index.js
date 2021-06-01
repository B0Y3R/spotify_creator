
const { expressGraphQL } = require('express-graphql');
const express = require('express');

const app = express ();
app.use('/graphql', expressGraphQL(req => ({
    schema,
    graphiql: true,
    pretty: true
})));

app.set('port', 4000);
let http = require('http');
let server = http.createServer(app);
server.listen(port);