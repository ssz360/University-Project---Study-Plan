const passport = require('passport');
const LocalStrategy = require('passport-local');
const { userDAL } = require("../DAL/user.dal");

function PassportService() {
    const dal = new userDAL();

    this.init = () => {


        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async function verify(username, password, cb) {
            const user = await dal.getUser(username, password)
            if (!user)
                return cb(null, false, 'Incorrect username or password.');

            return cb(null, user);
        }));

        passport.serializeUser(function (user, cb) {
            delete user.password;
            cb(null, user);
        });

        passport.deserializeUser(function (user, cb) {
            return cb(null, user);
        });

    }

    this.authenticate = (req,res,next) => {
        return passport.authenticate('local', (err, user, info) => {
            if (err)
                return next(err);
            if (!user) {
                // display wrong login messages
                return res.status(401).send(info);
            }
            // success, perform the login
            req.login(user, (err) => {
                if (err)
                    return next(err);
                // req.user contains the authenticated user, we send all the user info back
                return res.status(201).json(req.user);
            });
        })(req,res,next);
    }

    this.isLoggedIn = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.status(401).json({ error: 'Not authorized' });
    }

}

module.exports = { PassportService };