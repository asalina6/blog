const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogpostsSchema = new Schema({

    postId: { type: Number, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    authorId: { type: Number, required: true },
    category: { type: String, required: true },
    dateCreated: { type: Date, required: true, default: Date.now()}
});

const Blogposts = mongoose.model('blogposts', blogpostsSchema);
module.exports = Blogposts;