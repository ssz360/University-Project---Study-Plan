const userDAL = require("../DAL/user.dal");
const { checkEmail } = require("../Services/validations.service");


function userApi(app, authSrv) {
    const dal = new userDAL();
    this.init = async () => {
        await dal._crateTable();

        this.login();
        this.logout();
        this.register();
    };

    this.login = () => {
        app.post('/api/login', function (req, res, next) {
            const { email, password } = req.body;
            let validation = checkEmail(email);
            if (validation) {
                res.status(400);
            }

            authSrv.authenticate(req, res, next);
        });
    }

    this.register = () => {
        app.post('/api/register', async function (req, res, next) {
            const { email, password, name, surname } = req.body;
            let validation = checkEmail(email);
            if (validation) {
                res.status(400);
            }

            const user = {
                email: email,
                name: name,
                surname: surname,
                password: password
            };

            try {
                const checkUser = await dal.getUser(email);
                if (checkUser) {
                    res.status(400).json({ result: false, message: 'This Email is registered already.' });
                    return;
                }
                const result = await dal.add(user);
                if (result) {
                    res.status(201).json({ result: true });
                    return;
                }
            } catch (error) {
                res.status(400).json({ result: false, message: error });
                return;
            }
        });
    }

    this.logout = () => {
        app.post('/api/logout', (req, res) => {
            req.logout(() => {
                res.end();
            });
        });
    }
}

module.exports = userApi;
