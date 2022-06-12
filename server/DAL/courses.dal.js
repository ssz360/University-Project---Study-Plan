const DatabaseManagement = require("./_baseDalFunctionalities").DatabaseManagement;
const insertFields = require("../Models/insertFields.model").insertFields;
const creationTableFields = require("../Models/creationTableFields.model").creationTableFields;

function courseDAL() {
    const tableName = "course";
    let dbm = new DatabaseManagement();

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
                        new creationTableFields("incompatibleWith", "text"),
                        new creationTableFields("preparatoryWith", "text"),
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
            incompatibleWith: '02LSEOV',
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 12,
        });
        await this.add({
            code: '02LSEOV',
            name: 'Computer architectures',
            incompatibleWith: '02GOLOV',
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 12,
        });
        await this.add({
            code: '01SQJOV',
            name: 'Data Science and Database Technology',
            incompatibleWith: '01SQMOV,01SQLOV',
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 8,
        });
        await this.add({
            code: '01SQMOV',
            name: 'Data Science e Tecnologie per le Basi di Dati',
            incompatibleWith: '01SQJOV,01SQLOV',
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 8,
        });
        await this.add({
            code: '01OTWOV',
            name: 'Computer network technologies and services',
            incompatibleWith: '01SQJOV,01SQMOV',
            preparatoryWith: undefined,
            maxStudents: 3,
            credit: 6,
        });
        await this.add({
            code: '02KPNOV',
            name: 'Tecnologie e servizi di rete',
            incompatibleWith: '01SQJOV,01SQMOV',
            preparatoryWith: undefined,
            maxStudents: 3,
            credit: 6,
        });
        await this.add({
            code: '01TYMOV',
            name: 'Information systems security services',
            incompatibleWith: '01UDUOV',
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 12,
        });
        await this.add({
            code: '01UDUOV',
            name: 'Sicurezza dei sistemi informativi ',
            incompatibleWith: '01TYMOV',
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 12,
        });
        await this.add({
            code: '05BIDOV',
            name: 'Ingegneria del software',
            incompatibleWith: '04GSPOV',
            preparatoryWith: "02GOLOV",
            maxStudents: -1,
            credit: 6,
        });
        await this.add({
            code: '04GSPOV',
            name: 'Software engineering',
            incompatibleWith: '05BIDOV',
            preparatoryWith: "02LSEOV ",
            maxStudents: -1,
            credit: 6,
        });

        await this.add({
            code: '01UDFOV',
            name: 'Applicazioni Web I',
            incompatibleWith: '01TXYOV',
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 6,
        });
        await this.add({
            code: '01TXYOV',
            name: 'Web Applications I',
            incompatibleWith: '01UDFOV',
            preparatoryWith: undefined,
            maxStudents: 3,
            credit: 6,
        });
        await this.add({
            code: '01TXSOV',
            name: 'Web Applications II',
            incompatibleWith: undefined,
            preparatoryWith: '01TXYOV',
            maxStudents: -1,
            credit: 6,
        });
        await this.add({
            code: '02GRSOV',
            name: 'Programmazione di sistema ',
            incompatibleWith: '01NYHOV',
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 6,
        });
        await this.add({
            code: '01NYHOV',
            name: 'System and device programming',
            incompatibleWith: '02GRSOV',
            preparatoryWith: undefined,
            maxStudents: 3,
            credit: 6,
        });
        await this.add({
            code: '01SQOOV',
            name: 'Reti Locali e Data Center',
            incompatibleWith: undefined,
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 6,
        });
        await this.add({
            code: '01TYDOV',
            name: 'Software networking',
            incompatibleWith: undefined,
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 7,
        });
        await this.add({
            code: '03UEWOV',
            name: 'Challenge',
            incompatibleWith: undefined,
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 5,
        });
        await this.add({
            code: '01URROV',
            name: 'Computational intelligence',
            incompatibleWith: undefined,
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 6,
        });
    
        await this.add({
            code: '01OUZPD',
            name: 'Model based software design',
            incompatibleWith: undefined,
            preparatoryWith: undefined,
            maxStudents: -1,
            credit: 4,
        });
        await this.add({
            code: '01URSPD',
            name: 'Internet Video Streaming',
            incompatibleWith: undefined,
            preparatoryWith: undefined,
            maxStudents: 2,
            credit: 6,
        });
    }

    this.getAll = async (userId) => {
        return await dbm.getAllData(tableName);
    }


}

module.exports=  courseDAL;