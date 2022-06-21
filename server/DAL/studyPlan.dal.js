const courseBAL = require("../BAL/course.bal");
const courseDAL = require("./course.dal");

const DatabaseManagement = require("./_baseDalFunctionalities").DatabaseManagement;
const insertFields = require("../Models/insertFields.model").insertFields;
const creationTableFields = require("../Models/creationTableFields.model").creationTableFields;

function studyPlanDAL() {
    const tableName = "studyPlan";
    let dbm = new DatabaseManagement();
    let coursesBal = new courseBAL(new courseDAL());

    this._crateTable = async () => {

        const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`

        dbm.db.all(sql, async (err, data) => {
            if (err) reject(err);
            else {
                if (!data.length) {
                    const f = await dbm.createTable(tableName, [
                        new creationTableFields("id", "integer", false, true, true, true),
                        new creationTableFields("minCredits", "integer"),
                        new creationTableFields("maxCredits", "integer"),
                        new creationTableFields("type", "text"),
                        new creationTableFields("userId", "integer")
                    ]);
                }
            }
        });
    }


    this.getOne = (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const sp = (await dbm.getAllData(tableName, 'userId = ' + userId))[0];
                if (sp) {
                    const courses = await coursesBal.getAll();
                    sp.courses = [];

                    const sql = 'select * from course join scr on course.id = scr.cid where spId = ?';
                    dbm.db.all(sql, [sp.id], (err, data) => {
                        if (err) reject(err);
                        for (let el of data) {
                            let course = courses.response.find(x => x.code === el.code);
                            if (course) {
                                sp.courses.push(course);
                            }
                        }
                        resolve(sp);
                    })
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    this.add = async (studyPlan, userId) => {
        return await dbm.insertData(tableName,
            [
                new insertFields("maxCredits", studyPlan.maxCredits),
                new insertFields("minCredits", studyPlan.minCredits),
                new insertFields("type", studyPlan.type),
                new insertFields("userId", userId)
            ]);
    }

    this.delete = async (userId) => {
        return await dbm.deleteByWhereCondition(tableName, 'userId = ' + userId);
    }

}

module.exports = studyPlanDAL;