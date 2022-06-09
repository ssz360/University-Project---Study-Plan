const { userBAL } = require("../BAL/user.bal");
const { userDAL } = require("../DAL/user.dal");


function userApi(app) {
    const userDal = new userDAL();
    const bal = new userBAL(userDal);
    this.init = async () => {
        await userDal._crateTable();

        this.getUserInfo();
    };

    this.getUserInfo = () => {
        app.get('/api/users', (request, response) => {
            bal.getAllUsers()
                .then(result => response.status(result.httpCode).json(result.response))
                .catch(() => response.status(500).end());
        });
        // app.get('/api/users', isLoggedIn, (request, response) => {
        //     bal.getAllUsers()
        //         .then(result => response.status(result.httpCode).json(result.response))
        //         .catch(() => response.status(500).end());
        // });

    };
}

module.exports = { userApi };
