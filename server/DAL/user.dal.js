const DatabaseManagement =
    require("./_baseDalFunctionalities").DatabaseManagement;
const insertFields = require("../Models/insertFields.model").insertFields;
const creationTableFields =
    require("../Models/creationTableFields.model").creationTableFields;
var path = require("path");
function userDAL() {
    const tableName = "user";

    this._crateTable = async () => {
        let db = new DatabaseManagement();

        const sql = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`

        db.db.all(sql, async (err, data) => {
            if (err) reject(err);
            else {
                if (!data.length) {
                    const f = await db.createTable(tableName, [
                        new creationTableFields("id", "integer", false, true, true, true),
                        new creationTableFields("name", "text"),
                        new creationTableFields("surname", "text"),
                        new creationTableFields("email", "text"),
                        new creationTableFields("password", "text"),
                    ]);

                    await this.seed();
                }
            }
        });
    }

    this.seed = async () => {

        const ddd = await this.add({
            username: 'user1@ezwh.com',
            name: 'john',
            surname: 'snow',
            password: 'testpassword',
            type: 'customer'
        });
    }

    this.add = async (user) => {
        let db = new DatabaseManagement();

        return await db.insertData(tableName, [
            new insertFields("email", user.username),
            new insertFields("name", user.name),
            new insertFields("surname", user.surname),
            new insertFields("password", user.password),
        ]);
    };

    this.getAllUsers = async () => {
        let db = new DatabaseManagement();


        const users = await db.getAllData(tableName);

        if (!users) return null;

        return users;
    };
}

exports.userDAL = userDAL;