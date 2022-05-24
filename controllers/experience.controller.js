const experienceJoi = require('joi')
const experienceModel = require("../models/experience.model");

const experienceSchema = experienceJoi.object({
    name: experienceJoi.string().min(2).max(50).required(),
    type: experienceJoi.string().min(2).max(50).required(),
    description: experienceJoi.string().min(2).max(1000).required()
});

// View all Experiences 
exports.getAllExperiences = async (req, res) => {
    try {
        const experiences = await experienceModel.find({})
        res.status(200).json({ success: true, data: experiences });
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

// Create Experience 
exports.createExperience = async (req, res) => {
    try {
        let input = {
            name: req.body.name,
            type: req.body.type,
            description: req.body.description
        }
        const { error, value } = await experienceSchema.validateAsync(input)

        if (error) {
            res.status(400).json({ success: false, error: error });
        }
        let newExperience = new experienceModel(input);
        newExperience = await newExperience.save()
        res.status(201).json(newExperience);
    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
}

// Get One Experience 
exports.getOneExperience = (req, res) => {
    res.json(res.experience)
}
exports.getExperience = async (req, res, next) => {
    let experience
    try {
        experience = await experienceModel.findById(req.params.id)
        if (experience == null) {
            return res.status(404).json({ message: 'can not find Experience' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error })
    }
    res.experience = experience;
    next()
}


// Update Experience 
exports.updateExperience = async (req, res) => {
    if (req.body.name != null) {
        res.experience.name = req.body.name;
    }
    if (req.body.type != null) {
        res.experience.type = req.body.type;
    }
    if (req.body.description != null) {
        res.experience.description = req.body.description;
    }

    try {
        const updatedExperience = await res.experience.save()
        res.json({ success: true, data: updatedExperience });
    } catch (error) {
        res.status(400).json({ success: false, error: error })
    }
}




// Delete Experience 
exports.deleteExperience = async (req, res) => {
    try {
        await res.experience.remove()
        res.status(200).json({ message: 'Experience Deleted' })

    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}