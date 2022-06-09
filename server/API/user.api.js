const { userBAL } = require("../BAL/user.bal");
const { userDAL } = require("../DAL/user.dal");


function userApi(app, authSrv) {
    const userDal = new userDAL();
    const bal = new userBAL(userDal);
    this.init = async () => {
        await userDal._crateTable();

        this.getUserInfo();
        this.login();
    };

    // this.getUserInfo = () => {
    //     app.get('/api/users', authSrv.isLoggedIn, (request, response) => {
    //         bal.getAllUsers()
    //             .then(result => response.status(result.httpCode).json(result.response))
    //             .catch(() => response.status(500).end());
    //     });
    // };

    this.login = () => {
        app.post('/login', function (req, res, next) {
            authSrv.authenticate(req, res, next);
        });
    }
}

module.exports = { userApi };
