const DatabaseManagement = require("./_baseDalFunctionalities").DatabaseManagement;
const insertFields = require("../Models/insertFields.model").insertFields;
const creationTableFields = require("../Models/creationTableFields.model").creationTableFields;
const path = require("path");
const crypto = require('crypto');

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
                        new creationTableFields("salt", "text"),
                    ]);

                    await this.seed();
                }
            }
        });
    }

    this.seed = async () => {

        const user = {
            email: 'user@gmail.com',
            name: 'john',
            surname: 'snow',

        };

        const pass = 'testpassword';
        user.salt = crypto.randomBytes(32).toString('hex');

        crypto.scrypt(pass, user.salt, 32, async (err, hashedPassword) => {
            if (!err) {
                user.password = hashedPassword.toString('hex');
                await this.add(user);
            }
        });
    }

    this.add = async (user) => {
        let db = new DatabaseManagement();

        return await db.insertData(tableName, [
            new insertFields("email", user.email),
            new insertFields("name", user.name),
            new insertFields("surname", user.surname),
            new insertFields("password", user.password),
            new insertFields("salt", user.salt),
        ]);
    };

    this.getUser = async (email) => {
        let dbm = new DatabaseManagement();

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
}

exports.userDAL = userDAL;