const DatabaseManagement = require("./_baseDalFunctionalities").DatabaseManagement;
const insertFields = require("../Models/insertFields.model").insertFields;
const creationTableFields = require("../Models/creationTableFields.model").creationTableFields;
const studyCourseRelationDAL = require("./studyCourseRelation.dal");

function studyPlanDAL() {
    const tableName = "studyPlan";
    let dbm = new DatabaseManagement();

    this._crateTable = async () => {

        const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`

        dbm.db.all(sql, async (err, data) => {
            if (err) reject(err);
            else {
                if (!data.length) {
                    const f = await dbm.createTable(tableName, [
                        new creationTableFields("id", "integer", false, true, true, true),
                        new creationTableFields("minCredit", "integer"),
                        new creationTableFields("maxCredit", "integer"),
                        new creationTableFields("type", "text"),
                        new creationTableFields("userId", "integer")
                    ]);
                }
            }
        });
    }


    this.getOne = async (userId) => {
        const sp = await dbm.getAllData(tableName, 'userId = ' + userId)[0];
        if (sp) {
            const scrDAL = new studyCourseRelationDAL();
            const courses = await scrDAL.get(sp.id);
            sp.courses = courses;
        }
        return sp;
    }

    this.add = async (studyPlan, userId) => {
        return await dbm.insertData(tableName,
            [
                new insertFields("maxCredit", studyPlan.maxCredit),
                new insertFields("minCredit", studyPlan.minCredit),
                new insertFields("type", studyPlan.type),
                new insertFields("userId", userId)
            ]);
    }

    // this.edit = async (studyPlan, spId) => {
    //     return await dbm.updateData(tableName,
    //         [
    //             new insertFields("maxCredit", studyPlan.maxCredit),
    //             new insertFields("minCredit", studyPlan.minCredit),
    //             new insertFields("type", studyPlan.type)
    //         ],
    //         'id = ' + spId
    //     )
    // }

    this.delete = async (spId) => {
        return await dbm.delete(tableName, spId);
    }


}

module.exports = studyPlanDAL;