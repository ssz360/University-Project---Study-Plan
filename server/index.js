const express = require('express');
const { userApi } = require('./API/user.api');
var cors = require('cors');
const morgan = require('morgan');

const passport = require('passport');
const session = require('express-session');
const { PassportService } = require('./Services/passport.service');

const app = express();
const port = 3000;

const authSrv = new PassportService();

// ******************* initialize Server *************
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


// ******************* initialize Passport *************
authSrv.init();


const init = async () => {


  // ******************* initialize the APIs *************
  await new userApi(app, authSrv).init();



  // *****************************************************


}



init().then(() => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});