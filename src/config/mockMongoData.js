
const md5 = require('md5');
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
        authorId: 1,
        firstName: 'Armando',
        lastName: 'Salinas',
        email: 'armandosalinasiiiarizona@gmail.com',
        passwordHash: md5('password')
    },
    {
        authorId: 2,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe555@gmail.com',
        passwordHash: md5('password2')
    },
    {
        authorId: 3,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe555@gmail.com',
        passwordHash: md5('password3')
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