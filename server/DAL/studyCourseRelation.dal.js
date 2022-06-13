const DatabaseManagement = require("./_baseDalFunctionalities").DatabaseManagement;
const insertFields = require("../Models/insertFields.model").insertFields;
const creationTableFields = require("../Models/creationTableFields.model").creationTableFields;

function studyCourseRelationDAL() {
    const tableName = "scr";
    let dbm = new DatabaseManagement();

    this._crateTable = async () => {

        const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`

        dbm.db.all(sql, async (err, data) => {
            if (err) reject(err);
            else {
                if (!data.length) {
                    const f = await dbm.createTable(tableName, [
                        new creationTableFields("id", "integer", false, true, true, true),
                        new creationTableFields("cId", "integer"),
                        new creationTableFields("spId", "integer"),
                    ]);
                }
            }
        });
    }


    this.getByStudyPlan = async (studyPlanId) => {
        return await dbm.getAllData(tableName, 'spId = ' + studyPlanId);
    }

    this.getByCourse  = async (courseId)=>{
        return await dbm.getAllData(tableName, 'cId = ' + courseId);
    }


    this.add = async (spId, cId) => {
        return await dbm.insertData(tableName,
            [
                new insertFields("cId", cId),
                new insertFields("spId", spId)
            ]);
    }

    this.delete = async (studyPlanId) => {
        return await dbm.deleteByWhereCondition(tableName, 'spId = ' + studyPlanId);
    }


}

module.exports = studyCourseRelationDAL;