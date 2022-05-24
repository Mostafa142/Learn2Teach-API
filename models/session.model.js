const mongooseSession = require('mongoose');
const Schema = mongooseSession.Schema;
const sessionSchema = new Schema({
    serialNumber: {
        type: String
    },
    coachUsername: {
        type: String

    },
    coachEmail: {
        type: String

    },
    LearnerUsername: {
        type: String

    },
    learnerEmail: {
        type: String

    },
    experience: {
        type: String

    }

}, { timestamps: true })

module.exports = mongooseSession.model('User', sessionSchema)