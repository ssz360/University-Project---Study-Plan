const DatabaseManagement = require("./_baseDalFunctionalities").DatabaseManagement;
const insertFields = require("../Models/insertFields.model").insertFields;
const creationTableFields = require("../Models/creationTableFields.model").creationTableFields;
const crypto = require('crypto');
const courseBAL = require("../BAL/course.bal");
const studyPlanBAL = require("../BAL/studyPlan.bal");
const courseDAL = require("./course.dal");
const studyCourseRelationDAL = require("./studyCourseRelation.dal");
const studyPlanDAL = require("./studyPlan.dal");

function userDAL() {
    const tableName = "user";
    let dbm = new DatabaseManagement();

    this._crateTable = async () => {

        const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`

        dbm.db.all(sql, async (err, data) => {
            if (err) reject(err);
            else {
                if (!data.length) {
                    const f = await dbm.createTable(tableName, [
                        new creationTableFields("id", "integer", false, true, true, true),
                        new creationTableFields("name", "text"),
                        new creationTableFields("surname", "text"),
                        new creationTableFields("email", "text"),
                        new creationTableFields("password", "text"),
                        new creationTableFields("salt", "text"),
                    ]);

                    await this.seed();
                }
            }
        });
    }

    this.seed = async () => {

        const user1 = {
            email: 'user1@gmail.com',
            name: 'john',
            surname: 'snow',
            password: 'testpassword',

        };

        const user2 = {
            email: 'user2@gmail.com',
            name: 'jack',
            surname: 'snow',
            password: 'testpassword',

        };
        const user3 = {
            email: 'user3@gmail.com',
            name: 'john',
            surname: 'smith',
            password: 'testpassword',

        };
        const user4 = {
            email: 'user4@gmail.com',
            name: 'emily',
            surname: 'snow',
            password: 'testpassword',

        };
        const user5 = {
            email: 'user5@gmail.com',
            name: 'jenifer',
            surname: 'snow',
            password: 'testpassword',

        };

        user1.id = await this.add(user1);
        user2.id = await this.add(user2);
        user3.id = await this.add(user3);
        user4.id = await this.add(user4);
        user5.id = await this.add(user5);



        const studyplanDal = new studyPlanDAL();
        const courseDal = new courseDAL();
        const scrDal = new studyCourseRelationDAL();

        const studyPlanBal = new studyPlanBAL(studyplanDal, scrDal, courseDal);
        const courseBal = new courseBAL(courseDal);


        const u2stId = await (await studyPlanBal.addStudyPlan('fullTime', user2.id)).response.id;
        const u3stId = await (await studyPlanBal.addStudyPlan('partTime', user3.id)).response.id;
        const u4stId = await (await studyPlanBal.addStudyPlan('fullTime', user4.id)).response.id;
        const u5stId = await (await studyPlanBal.addStudyPlan('partTime', user5.id)).response.id;


        const allCourses = await (await courseBal.getAll()).response;

        let user2Courses = [];
        let user3Courses = [];
        let user4Courses = [];
        let user5Courses = [];

        const tecnologie = allCourses.find(x => x.code === '02KPNOV').id;
        const wa1 = allCourses.find(x => x.code === '01TXYOV').id;
        const wa2 = allCourses.find(x => x.code === '01TXSOV').id;
        const system = allCourses.find(x => x.code === '01NYHOV').id;
        const network = allCourses.find(x => x.code === '01TYDOV').id;
        const architectures = allCourses.find(x => x.code === '02LSEOV').id;
        const software = allCourses.find(x => x.code === '04GSPOV').id;
        const challenge = allCourses.find(x => x.code === '03UEWOV').id;
        const internet = allCourses.find(x => x.code === '01URSPD').id;
        const model = allCourses.find(x => x.code === '01OUZPD').id;
        const computational = allCourses.find(x => x.code === '01URROV').id;

        user2Courses.push(tecnologie);
        user2Courses.push(wa1);
        user2Courses.push(wa2);
        user2Courses.push(system);
        user2Courses.push(architectures);
        user2Courses.push(software);
        user2Courses.push(challenge);
        user2Courses.push(network);
        user2Courses.push(internet);
        user2Courses.push(model);
        user2Courses.push(computational);


        user3Courses.push(tecnologie);
        user3Courses.push(wa1);
        user3Courses.push(wa2);
        user3Courses.push(system);
        user3Courses.push(architectures);


        user4Courses.push(tecnologie);
        user4Courses.push(wa1);
        user4Courses.push(wa2);
        user4Courses.push(system);
        user4Courses.push(architectures);
        user4Courses.push(software);
        user4Courses.push(challenge);
        user4Courses.push(network);
        user4Courses.push(internet);
        user4Courses.push(model);
        user4Courses.push(computational);


        user5Courses.push(architectures);
        user5Courses.push(software);
        user5Courses.push(challenge);
        user5Courses.push(network);
        user5Courses.push(model);


        await studyPlanBal.EditPlanCourses(user2.id, user2Courses, u2stId);
        await studyPlanBal.EditPlanCourses(user3.id, user3Courses, u3stId);
        await studyPlanBal.EditPlanCourses(user4.id, user4Courses, u4stId);
        await studyPlanBal.EditPlanCourses(user5.id, user5Courses, u5stId);
    }

    this.add = async (user) => {
        let db = new DatabaseManagement();

        const salt = crypto.randomBytes(32).toString('hex');
        const hashedPassword = await getHashedPassword(user.password, salt);

        return await db.insertData(tableName, [
            new insertFields("email", user.email),
            new insertFields("name", user.name),
            new insertFields("surname", user.surname),
            new insertFields("password", hashedPassword),
            new insertFields("salt", salt),
        ]);
    };

    this.getUser = async (email) => {
        // let dbm = new DatabaseManagement();

        const result = await new Promise((resolve, reject) => {
            try {
                let sql = `SELECT * FROM ${tableName} where email = ?;`;

                dbm.db.get(sql, [email], (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
            } catch (error) {
                reject(error);
            }
        });

        return result;
    };

    function getHashedPassword(password, salt) {
        return new Promise((resolve, reject) => {
            crypto.scrypt(password, salt, 32, async (err, hashedPassword) => {
                if (!err) {
                    resolve(hashedPassword.toString('hex'));
                } else {
                    reject(err);
                }
            });


        });
    }
}

module.exports = userDAL;