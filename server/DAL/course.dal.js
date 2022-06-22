const DatabaseManagement = require("./_baseDalFunctionalities").DatabaseManagement;
const insertFields = require("../Models/insertFields.model").insertFields;
const creationTableFields = require("../Models/creationTableFields.model").creationTableFields;
const studyCourseRelationDAL = require("../DAL/studyCourseRelation.dal");

function courseDAL() {
    const tableName = "course";
    let dbm = new DatabaseManagement();
    const scrDal = new studyCourseRelationDAL();

    this._crateTable = async () => {

        const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`

        dbm.db.all(sql, async (err, data) => {
            if (err) reject(err);
            else {
                if (!data.length) {
                    const f = await dbm.createTable(tableName, [
                        new creationTableFields("id", "integer", false, true, true, true),
                        new creationTableFields("code", "text"),
                        new creationTableFields("name", "text"),
                        new creationTableFields("credit", "integer"),
                        new creationTableFields("incompatibleCoursesId", "text"),
                        new creationTableFields("preparatoryCoursesId", "text"),
                        new creationTableFields("maxStudents", "integer"),
                    ]);

                    await this.seed();
                }
            }
        });
    }

    this.seed = async () => {


        await this.add({
            code: '02GOLOV',
            name: 'Architetture dei sistemi di elaborazione',
            incompatibleCoursesId: ['02LSEOV'],
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 12,
        });
        await this.add({
            code: '02LSEOV',
            name: 'Computer architectures',
            incompatibleCoursesId: ['02GOLOV'],
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 12,
        });
        await this.add({
            code: '01SQJOV',
            name: 'Data Science and Database Technology',
            incompatibleCoursesId: ['01SQMOV', '01SQLOV'],
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 8,
        });
        await this.add({
            code: '01SQMOV',
            name: 'Data Science e Tecnologie per le Basi di Dati',
            incompatibleCoursesId: ['01SQJOV', '01SQLOV'],
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 8,
        });
        await this.add({
            code: '01SQLOV',
            name: 'Database systems',
            incompatibleCoursesId: ['01SQJOV', '01SQMOV'],
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 8,
        });
        await this.add({
            code: '01OTWOV',
            name: 'Computer network technologies and services',
            incompatibleCoursesId: ['01SQJOV', '01SQMOV'],
            preparatoryCoursesId: undefined,
            maxStudents: 3,
            credit: 6,
        });
        await this.add({
            code: '02KPNOV',
            name: 'Tecnologie e servizi di rete',
            incompatibleCoursesId: ['01SQJOV', '01SQMOV'],
            preparatoryCoursesId: undefined,
            maxStudents: 3,
            credit: 6,
        });
        await this.add({
            code: '01TYMOV',
            name: 'Information systems security services',
            incompatibleCoursesId: ['01UDUOV'],
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 12,
        });
        await this.add({
            code: '01UDUOV',
            name: 'Sicurezza dei sistemi informativi ',
            incompatibleCoursesId: ['01TYMOV'],
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 12,
        });
        await this.add({
            code: '05BIDOV',
            name: 'Ingegneria del software',
            incompatibleCoursesId: ['04GSPOV'],
            preparatoryCoursesId: ["02GOLOV"],
            maxStudents: -1,
            credit: 6,
        });
        await this.add({
            code: '04GSPOV',
            name: 'Software engineering',
            incompatibleCoursesId: ['05BIDOV'],
            preparatoryCoursesId: ["02LSEOV"],
            maxStudents: -1,
            credit: 6,
        });

        await this.add({
            code: '01UDFOV',
            name: 'Applicazioni Web I',
            incompatibleCoursesId: ['01TXYOV'],
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 6,
        });
        await this.add({
            code: '01TXYOV',
            name: 'Web Applications I',
            incompatibleCoursesId: ['01UDFOV'],
            preparatoryCoursesId: undefined,
            maxStudents: 3,
            credit: 6,
        });
        await this.add({
            code: '01TXSOV',
            name: 'Web Applications II',
            incompatibleCoursesId: undefined,
            preparatoryCoursesId: ['01TXYOV'],
            maxStudents: -1,
            credit: 6,
        });
        await this.add({
            code: '02GRSOV',
            name: 'Programmazione di sistema ',
            incompatibleCoursesId: ['01NYHOV'],
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 6,
        });
        await this.add({
            code: '01NYHOV',
            name: 'System and device programming',
            incompatibleCoursesId: ['02GRSOV'],
            preparatoryCoursesId: undefined,
            maxStudents: 3,
            credit: 6,
        });
        await this.add({
            code: '01SQOOV',
            name: 'Reti Locali e Data Center',
            incompatibleCoursesId: undefined,
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 6,
        });
        await this.add({
            code: '01TYDOV',
            name: 'Software networking',
            incompatibleCoursesId: undefined,
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 7,
        });
        await this.add({
            code: '03UEWOV',
            name: 'Challenge',
            incompatibleCoursesId: undefined,
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 5,
        });
        await this.add({
            code: '01URROV',
            name: 'Computational intelligence',
            incompatibleCoursesId: undefined,
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 6,
        });

        await this.add({
            code: '01OUZPD',
            name: 'Model based software design',
            incompatibleCoursesId: undefined,
            preparatoryCoursesId: undefined,
            maxStudents: -1,
            credit: 4,
        });
        await this.add({
            code: '01URSPD',
            name: 'Internet Video Streaming',
            incompatibleCoursesId: undefined,
            preparatoryCoursesId: undefined,
            maxStudents: 2,
            credit: 6,
        });
    }

    this.getAll = async () => {
        const courses = await dbm.getAllData(tableName);

        const result = [];
        for (let el of courses) {

            const course = { ...el };
            course.incompatibleCoursesId = course.incompatibleCoursesId ? course.incompatibleCoursesId.split(',') : [];
            course.preparatoryCoursesId = course.preparatoryCoursesId ? course.preparatoryCoursesId.split(',') : [];

            course.incompatibleCourses = [];
            course.preparatoryCourses = [];

            course.enrolled = (await scrDal.getByCourse(course.id)).length;

            for (let el of course.incompatibleCoursesId) {
                course.incompatibleCourses.push([...courses].find(x => x.code === el));
            }
            for (let el of course.preparatoryCoursesId) {
                course.preparatoryCourses.push(courses.find(x => x.code === el));
            }

            result.push(course);
        }
        return result;
    }

    this.add = async (course) => {
        let db = new DatabaseManagement();

        return await db.insertData(tableName, [
            new insertFields("code", course.code),
            new insertFields("name", course.name),
            new insertFields("credit", course.credit),
            new insertFields("incompatibleCoursesId", course.incompatibleCoursesId?.join(',')),
            new insertFields("preparatoryCoursesId", course.preparatoryCoursesId?.join(',')),
            new insertFields("maxStudents", course.maxStudents),
        ]);
    };

}

module.exports = courseDAL;