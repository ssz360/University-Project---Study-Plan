const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { userDAL } = require("../DAL/user.dal");

function PassportService() {
    const dal = new userDAL();

    this.init = () => {


        passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (username, password, cb) => {
            const user = await dal.getUser(username)

            if (!user)
                return cb(null, false, { message: 'Incorrect username or password.' });

            const result = await this.checkPassword(password, user.password, user.salt);

            if (!result)
                return cb(null, false, { message: 'Incorrect username or password.' });

            return cb(null, { email: user.email, name: user.name });

        }));

        passport.serializeUser(function (user, cb) {
            delete user.password;
            cb(null, user);
        });

        passport.deserializeUser(function (user, cb) {
            return cb(null, user);
        });

    }

    this.checkPassword = (password, userPassword, salt) => {
        return new Promise((resolve, reject) => {
            crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
                if (err) reject(err);
                if (!crypto.timingSafeEqual(Buffer.from(userPassword, 'hex'), hashedPassword))
                    resolve(false);
                else resolve(true);
            });
        })

    }

    this.authenticate = (req,res,next) => {
        return passport.authenticate('local', (err, user, info) => {
            if (err)
                return next(err);
            if (!user) {
                return res.status(401).send(info);
            }
            req.login(user, (err) => {
                if (err)
                    return next(err);
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