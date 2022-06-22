const sqlite3 = require("sqlite3").verbose();

var path = require("path");
// const database = new sqlite3.Database(dbPath);

function getDataBase() {
  const dbPath = path.join(__dirname, "..", "STORAGE", "database.db");
  if (global._database) return global._database;
  else {
    global._database = new sqlite3.Database(dbPath);
    // global._database.run( 'PRAGMA journal_mode = WAL;' );
    global._database.configure("busyTimeout", 10000);
    return global._database;
  }
}


function DatabaseManagement() {
  this.db = getDataBase();

  this.createTable = (tableName, creationTableFieldsArray) => {
    return new Promise((resolve, reject) => {
      try {
        let fieldsStr = "";

        for (let i = 0; i < creationTableFieldsArray.length; i++) {
          let el = creationTableFieldsArray[i];
          fieldsStr +=
            el.fieldName +
            " " +
            el.fieldType +
            " " +
            (!el.canBeNull ? " NOT NULL " : "") +
            (el.isUnique ? " UNIQUE " : "") +
            (el.isPrimaryKey ? " PRIMARY KEY " : "") +
            (el.isAutoIncrement ? " AUTOINCREMENT " : "") +
            ",";
        }

        fieldsStr = fieldsStr.slice(0, fieldsStr.lastIndexOf(","));

        const sql = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      ${fieldsStr}
      )`;

        this.db.run(sql, function (err) {
          if (err) reject(err);
          else resolve(this);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.insertData = (tableName, insertFieldsArray) => {
    return new Promise((resolve, reject) => {
      try {
        let fieldsName = "";
        let fieldsPlaceholder = "";
        let fieldsValues = [];

        for (let i = 0; i < insertFieldsArray.length; i++) {
          let el = insertFieldsArray[i];
          fieldsName += el.fieldName + ",";
          fieldsPlaceholder += "?,";
          fieldsValues.push(el.value);
        }

        fieldsName = fieldsName.slice(0, fieldsName.lastIndexOf(","));
        fieldsPlaceholder = fieldsPlaceholder.slice(0, fieldsPlaceholder.lastIndexOf(","));

        let sql = `INSERT INTO ${tableName} (${fieldsName}) VALUES (${fieldsPlaceholder})`;

        return this.db.run(sql, fieldsValues, function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.updateData = (tableName, insertFieldsArray, whereCondition) => {
    return new Promise((resolve, reject) => {
      try {
        let newNames = "";
        let fieldsValues = [];

        for (let i = 0; i < insertFieldsArray.length; i++) {
          let el = insertFieldsArray[i];
          newNames += el.fieldName + " = ?, ";
          fieldsValues.push(el.value);
        }

        newNames = newNames.slice(0, newNames.lastIndexOf(","));

        let sql = `UPDATE ${tableName} SET ${newNames} ${whereCondition ? " WHERE " + whereCondition : ""
          } `;

        return this.db.run(sql, fieldsValues, function (err) {
          if (err) reject(err);
          else resolve(this);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.delete = (tableName, id) => {
    return new Promise((resolve, reject) => {
      try {
        this.db.run(
          `DELETE FROM ${tableName} WHERE id = ?`,
          [id],
          function (err) {
            if (err) reject(err);
            else resolve(this);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  this.deleteByWhereCondition = (tableName, whereCondition) => {
    return new Promise((resolve, reject) => {
      try {
        const sql = `DELETE FROM ${tableName} WHERE ${whereCondition}`;
        this.db.run(sql, function (err) {
          if (err) reject(err);
          else resolve(this);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  this.getAllData = (tableName, whereCondition) => {
    return new Promise((resolve, reject) => {
      try {
        let sql = `SELECT * FROM ${tableName} ${whereCondition ? " WHERE " + whereCondition : ""
          } `;

        this.db.all(sql, (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      } catch (error) {
        reject(error);
      }
    });
  };
}

exports.DatabaseManagement = DatabaseManagement;
