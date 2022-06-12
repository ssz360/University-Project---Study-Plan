const  userDAL  = require("../DAL/user.dal");


function userApi(app, authSrv) {
    const dal = new userDAL();
    this.init = async () => {
        await dal._crateTable();

        this.login();
        this.logout();
    };

    this.login = () => {
        app.post('/api/login', function (req, res, next) {
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

module.exports =  userApi ;
