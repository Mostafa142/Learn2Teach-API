const mongooseLearner = require('mongoose')
const learnersSchema = mongooseLearner.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    age: {
        type: Number,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50

    },
    experience: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },

},
    { timestamps: true }
)
module.exports = mongooseLearner.model('Learner', learnersSchema)

