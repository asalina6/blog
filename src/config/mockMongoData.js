const bcrypt = require('bcrypt');
const md5 = require('md5');
const salt = bcrypt.genSaltSync();

const posts = [
    {
        postId: 1,
        title: 'Learning about React',
        slug: 'learning-about-react',
        authorId: 1,
        category: 'React'
    },
    {
        postId: 2,
        title: 'Learning about Node',
        slug: 'learning-about-node',
        authorId: 1,
        category: 'Node'
    },
    {
        postId: 3,
        title: 'Learning about React',
        slug: 'learning-about-react',
        authorId: 1,
        category: 'React'
    },
    {
        postId: 4,
        title: 'Learning about React',
        slug: 'learning-about-react',
        authorId: 1,
        category: 'React'
    },
    {
        postId: 5,
        title: 'Learning about React',
        slug: 'learning-about-react',
        authorId: 1,
        category: 'React'
    },
    {
        postId: 6,
        title: 'Learning about React',
        slug: 'learning-about-react',
        authorId: 1,
        category: 'React'
    },
];
const users = [
    {
        firstName: 'Armando',
        lastName: 'Salinas',
        email: 'armandosalinasiiiarizona@gmail.com',
        password: bcrypt.hashSync('password', salt)
    },
    {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe555@gmail.com',
        password: bcrypt.hashSync('password2', salt)
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe555@gmail.com',
        password: bcrypt.hashSync('password3', salt)
    },
];
const newPost = [{
    id: null,
    title:"",
    authorId:null,
    category:""
}];

module.exports = {
    newPost,
    posts,
    users,
};