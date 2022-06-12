const studyPlanBAL = require("../BAL/studyPlan.bal");
const studyPlanDAL = require("../DAL/studyPlan.dal");


function studyPlanApi(app, authSrv) {
    const dal = new studyPlanDAL();
    const bal = new studyPlanBAL(dal);
    this.init = async () => {
        await dal._crateTable();

        this.getUserStudyPlan();
    };

    this.getUserStudyPlan = () => {
        app.get('/api/studyplan', authSrv.isLoggedIn, async (req, res, next) => {
             bal.getUserStudyPlan(req.session.passport.user.id).then((result) => {
                res.status(result.httpCode).json(result.response);
            })
            .catch((err) => {
                res.status(500).json(err);
            });;
        });
    }
}

module.exports = studyPlanApi;
