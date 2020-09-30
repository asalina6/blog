const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const debug = require('debug')('server:connectDB');
const chalk = require('chalk');

dotenv.config({ path: path.normalize(path.join(__dirname, '../', '../', 'credentials.env')) });
const url = process.env.MDB_URL;

async function connectDB() {
    try {
        const client = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }); //eslint-disable-line
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        debug(chalk.green('Connecting to the database...'));
        return db;
    } catch (err) {
        debug(err);
    }
}

module.exports = connectDB;