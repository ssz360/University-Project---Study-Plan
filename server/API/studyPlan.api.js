const studyPlanBAL = require("../BAL/studyPlan.bal");
const studyCourseRelationDAL = require("../DAL/studyCourseRelation.dal");
const studyPlanDAL = require("../DAL/studyPlan.dal");


function studyPlanApi(app, authSrv) {
    const dal = new studyPlanDAL();
    const scrDal = new studyCourseRelationDAL();
    const bal = new studyPlanBAL(dal);
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

            bal.addStudyPlan(req.body.type, req.session.passport.user.id).then((result) => {
                res.status(result.httpCode).json(result.response);
            })
                .catch((err) => {
                    res.status(500).json(err);
                });;
        });
    }


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

    this.DeleteUserStudyPlan = () => {
        app.delete('/api/studyplan', authSrv.isLoggedIn, async (req, res, next) => {
           
            const studyPlan = await dal.getOne(req.session.passport.user.id);
            await scrDal.delete(studyPlan.id);

            bal.DeleteStudyPlane(req.session.passport.user.id).then((result) => {
                res.status(result.httpCode).json(result.response);
            })
                .catch((err) => {
                    res.status(500).json(err);
                });;
        });
    }

    this.editPlansCourse = () => {
        app.put('/api/studyplan/:planId/courses', authSrv.isLoggedIn, async (req, res, next) => {
            try {
                const studyPlan = await dal.getOne(req.session.passport.user.id);
                const planId = req.params.planId;
                const courses = req.body;

                if (studyPlan.id != planId) {
                    req.status(400).json({ hasError: true, message: 'bad request' });
                    return;
                }

                await scrDal.delete(studyPlan.id);

                for (let courseId of courses) {
                    await scrDal.add(studyPlan.id, courseId);
                }
                res.status(200).json();

            } catch (error) {
                res.status(500).json(err);
            }
        });
    }
}

module.exports = studyPlanApi;
