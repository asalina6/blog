const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    authorId: {
        type: Number,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password lenght is 6 characters']
    }
});

usersSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

usersSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}





const Users = mongoose.model('users', usersSchema);
module.exports = Users;