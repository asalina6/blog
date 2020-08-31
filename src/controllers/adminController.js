const dotenv = require('dotenv');
const path = require('path');
const mockData = require('../config/mockMongoData');
dotenv.config({ path: path.resolve(__dirname, '../credentials.env') });


function adminController() {

    async function get_database(req, res) {
        try {
            res.json(mockData);
        } catch (err) {
            console.log(err);
        }
    }

    return ({
        get_database
    })
}


module.exports = adminController;