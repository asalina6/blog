const util = require('util');
const mysql = require('mysql');

//factory function to make the database connection
function makeDb(config) {
    const connection = mysql.createConnection(config);

    return {
        query(sql, args) {
            return util.promisify(connection.query).call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        },
        rollback() {
            return util.promisify(connection.rollback).call(connection);
        }
    };
}

module.exports = makeDb;