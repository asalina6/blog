const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogpostsSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    authorId: { type: Number, required: true },
    category: { type: String, required: true },
    dateCreated: { type: Date, required: true, default: Date.now()},
    user: {type: Schema.Types.ObjectId, required: true, ref: 'Users'}
});

const Blogposts = mongoose.model('blogposts', blogpostsSchema);
module.exports = Blogposts;