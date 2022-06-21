const userDAL = require("../DAL/user.dal");
const { checkEmail } = require("../Services/validations.service");


function userApi(app, authSrv) {
    const dal = new userDAL();
    this.init = async () => {
        await dal._crateTable();

        this.login();
        this.logout();
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

    this.logout = () => {
        app.post('/api/logout', (req, res) => {
            req.logout(() => {
                res.end();
            });
        });
    }
}

module.exports = userApi;
