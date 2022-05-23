const mongooseUser = require('mongoose');
const Schema = mongooseUser.Schema;
const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String

    },
    phone: {
        type: String

    },
    password: {
        type: String

    },
    type: {
        type: String

    }
}, { timestamps: true })

module.exports = mongooseUser.model('User', userSchema)