const courseBAL = require("../BAL/course.bal");
const courseDAL = require("../DAL/course.dal");


function courseApi(app, authSrv) {
    const dal = new courseDAL();
    const bal = new courseBAL(dal);
    this.init = async () => {
        await dal._crateTable();

        this.getAll();
    };

    this.getAll = () => {
        app.get('/api/courses', async (req, res, next) => {
             bal.getAll().then((result) => {
                res.status(result.httpCode).json(result.response);
            })
            .catch((err) => {
                res.status(500).json(err);
            });;
        });
    }
}

module.exports = courseApi;
