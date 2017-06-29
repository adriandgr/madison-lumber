require('dotenv').config();

const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const session           = require('express-session');
const flash             = require('connect-flash');
const expressValidator  = require('express-validator');
const expressLayouts    = require('express-ejs-layouts');
const morgan            = require('morgan');
const mongoose          = require('mongoose');
const routes            = require('./app/routes');
const port              = process.env.PORT || 8080;

app.disable('x-powered-by');

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 }
}));

app.use(flash());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

mongoose.connect(process.env.DB_URI);

app.use('/', routes);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});