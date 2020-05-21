require('dotenv').config();

const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const session           = require('express-session');
const flash             = require('connect-flash');
const expressValidator  = require('express-validator');
const expressLayouts    = require('express-ejs-layouts');
const path              = require('path');
const morgan            = require('morgan');
const mongoose          = require('mongoose');
const routes            = require('./app/routes');
const port              = process.env.PORT || 8080;

app.disable('x-powered-by');

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true }
}));

app.use(flash());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator({
  isRegion: options => {
    return options.region.length === 2;
  }
}));

mongoose.connect(process.env.DB_URI);


app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'https://db.madisonsreport.com'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "true");
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token");
//   next();
// });

app.use('/api', routes);

// Resolve all non-api requests to index.html, allow react-router-dom to resolve the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});