const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    authorId: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true }
});

const Users = mongoose.model('users', usersSchema);
module.exports = Users;