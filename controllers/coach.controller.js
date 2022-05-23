const Joi = require('joi')
const coachModel = require("../models/coach.model");

const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    age: Joi.number().min(14).max(100).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    experience: Joi.string().min(2).max(50).required()
});

// View all Coaches 
exports.getAllCoaches = async (req, res) => {
    try {
        const coaches = await coachModel.find({})
        res.status(200).json({ success: true, data: coaches });
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

// Create Coach 
exports.createCoach = async (req, res) => {
    try {
        let input = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            experience: req.body.experience
        }
        const { error, value } = await schema.validateAsync(input)

        if (error) {
            res.status(400).json({ success: false, error: value });
        }
        let newCoach = new coachModel(input);
        newCoach = await newCoach.save()
        res.status(201).json(newCoach);
    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
}

// Get One Coach 
exports.getOneCoach = (req, res) => {
    res.json(res.coach)
}
exports.getCoach = async (req, res, next) => {
    let coach
    try {
        coach = await coachModel.findById(req.params.id)
        if (coach == null) {
            return res.status(404).json({ message: 'can not find coach' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
    res.coach = coach;
    next()
}


// Update Coach 
exports.updateCoach = async (req, res) => {
    if (req.body.name != null) {
        res.coach.name = req.body.name;
    }
    if (req.body.age != null) {
        res.coach.age = req.body.age;
    }
    if (req.body.email != null) {
        res.coach.email = req.body.email;
    }
    if (req.body.experience != null) {
        res.coach.experience = req.body.experience;
    }
    try {
        const updatedCoach = await res.coach.save()
        res.json({ success: true, data: updatedCoach });
    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
}




// Delete Coach 
exports.deleteCoach = async (req, res) => {
    try {
        await res.coach.remove()
        res.status(200).json({ message: 'Coach Deleted' })

    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}