const mongooseExperience = require('mongoose')
const experiencesSchema = mongooseExperience.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    type: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50

    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
},
    { timestamps: true }
)
module.exports = mongooseExperience.model('Experience', experiencesSchema)