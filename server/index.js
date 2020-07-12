require('sqreen');

const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth')

const port = process.env.PORT || 8080;
const app = express();

app.disable('x-powered-by');
// app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

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
      graphiql: true
    }))

mongoose.connect(process.env.DB_URI).then(() => {
  app.listen(port);
}).catch(err => {
  console.log(err);
});
