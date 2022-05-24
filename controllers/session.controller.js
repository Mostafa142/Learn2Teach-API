const sessionJoi = require('joi')
const sessionModel = require('../models/session.model')

const sessionsSchema = sessionJoi.object({
    serialNumber: sessionJoi.number().min(14).max(100).required(),
    coachUsername: sessionJoi.string().min(2).max(50).required(),
    LearnerUsername: sessionJoi.string().min(2).max(50).required(),
    coachEmail: sessionJoi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    learnerEmail: sessionJoi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    experience: sessionJoi.string().min(2).max(50).required()
})

// View all Sessions 
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await sessionModel.find({})
        res.status(200).json({ success: true, data: sessions });
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}


// Create Sessions 
exports.createSession = async (req, res) => {
    try {
        let input = {
            serialNumber: req.body.serialNumber,
            coachUsername: req.body.coachUsername,
            LearnerUsername: req.body.LearnerUsername,
            coachEmail: req.body.coachEmail,
            learnerEmail: req.body.learnerEmail,
            experience: req.body.experience
        }
        const { error, value } = await sessionSchema.validateAsync(input)

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