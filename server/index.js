// require('sqreen');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth')

const port = process.env.PORT || 8080;
const environment = process.env.NODE_ENV || 'development'
console.log("Node Env:", environment)

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


const allowedOrigin = process.env.NODE_ENV === 'production' ?
    'https://db.mad.com' : 'http://localhost:3000';

const corsOptions = {
    origin: allowedOrigin,
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
//     res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }
//     next();
// });

app.use(isAuth);

app.use('/graphql',
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: environment !== 'production' 
    }))

// Resolve all non-api requests to index.html, allow react-router-dom to resolve the route in the client
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './', 'public', 'index.html'));
// });

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

mongoose.connect(process.env.DB_URI).then(() => {
  app.listen(port);
}).catch(err => {
  console.log("\nMongo Connection Failed.\n\n", err);
});
