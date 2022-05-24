const learnerJoi = require('joi')
const learnerModel = require('../models/learner.model')

const learnerSchema = learnerJoi.object({
    name: learnerJoi.string().min(2).max(50).required(),
    age: learnerJoi.number().min(14).max(100).required(),
    email: learnerJoi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    experience: learnerJoi.string().min(2).max(50).required()
})

// View all Learners 
exports.getAllLearners = async (req, res) => {
    try {
        const learners = await learnerModel.find({})
        res.status(200).json({ success: true, data: learners });
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

// Create Learner 
exports.createLearner = async (req, res) => {
    try {
        let input = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            experience: req.body.experience
        }
        const { error, value } = await learnerSchema.validateAsync(input)

        if (error) {
            res.status(400).json({ success: false, error: error });
        }
        let newLeaner = new learnerModel(input);
        newLeaner = await newLeaner.save()
        res.status(201).json(newLeaner);
    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
}


// Get One Learner 
exports.getOneLeaner = (req, res) => {
    res.json(res.learner)
}
exports.getLearner = async (req, res, next) => {
    let learner
    try {
        learner = await learnerModel.findById(req.params.id)
        if (learner == null) {
            return res.status(404).json({ message: 'can not find leaner' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
    res.learner = learner;
    next()
}

// Update Learner 
exports.updateLearner = async (req, res) => {
    if (req.body.name != null) {
        res.learner.name = req.body.name;
    }
    if (req.body.age != null) {
        res.learner.age = req.body.age;
    }
    if (req.body.email != null) {
        res.learner.email = req.body.email;
    }
    if (req.body.experience != null) {
        res.learner.experience = req.body.experience;
    }
    try {
        const updatedLearner = await res.learner.save()
        res.json({ success: true, data: updatedLearner });
    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
}


// Delete Learner 
exports.deleteLearner = async (req, res) => {
    try {
        await res.learner.remove()
        res.status(200).json({ message: 'Leaner Deleted' })

    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}