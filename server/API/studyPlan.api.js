const studyPlanBAL = require("../BAL/studyPlan.bal");
const courseDAL = require("../DAL/course.dal");
const studyCourseRelationDAL = require("../DAL/studyCourseRelation.dal");
const studyPlanDAL = require("../DAL/studyPlan.dal");


function studyPlanApi(app, authSrv) {
    const dal = new studyPlanDAL();
    const scrDal = new studyCourseRelationDAL();
    const courseDal = new courseDAL();
    const bal = new studyPlanBAL(dal, scrDal, courseDal);
    this.init = async () => {
        await dal._crateTable();
        await scrDal._crateTable();

        this.getUserStudyPlan();
        this.AddNewPlan();
        this.DeleteUserStudyPlan();
        this.editPlansCourse();
    };


    this.AddNewPlan = () => {
        app.post('/api/studyplan', authSrv.isLoggedIn, async (req, res, next) => {

            bal.addStudyPlan(req.body.type, req.user.id).then((result) => {
                res.status(result.httpCode).json(result.response);
            })
                .catch((err) => {
                    res.status(500).json(err);
                });;
        });
    }


    this.getUserStudyPlan = () => {
        app.get('/api/studyplan', authSrv.isLoggedIn, async (req, res, next) => {
            bal.getUserStudyPlan(req.user.id).then((result) => {
                res.status(result.httpCode).json(result.response);
            })
                .catch((err) => {
                    res.status(500).json(err);
                });;
        });
    }

    this.DeleteUserStudyPlan = () => {
        app.delete('/api/studyplan', authSrv.isLoggedIn, async (req, res, next) => {

            bal.DeleteStudyPlane(req.user.id).then((result) => {
                res.status(result.httpCode).json(result.response);
            })
                .catch((err) => {
                    res.status(500).json(err);
                });
        });
    }

    this.editPlansCourse = () => {
        app.put('/api/studyplan/:planId/courses', authSrv.isLoggedIn, async (req, res, next) => {


            const planId = req.params.planId;
            const courses = req.body;

            bal.EditPlanCourses(req.user.id, courses, planId).then((result) => {
                res.status(result.httpCode).json(result.response);
            })
                .catch((err) => {
                    res.status(500).json(err);
                });
        });
    }
}

module.exports = studyPlanApi;
