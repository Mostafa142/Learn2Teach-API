const expressExperience = require('express');
const experienceRouter = expressExperience.Router();
const Experience = require('../models/experience.model');
const experienceController = require('../controllers/experience.controller')

// Get All Experiences 
experienceRouter.get('/', experienceController.getAllExperiences)


// Get One Experience 
experienceRouter.get('/:id', experienceController.getExperience, experienceController.getOneExperience)

// Create One Experience
experienceRouter.post('/', experienceController.createExperience)

// Update One Experience 
experienceRouter.put('/:id', experienceController.getExperience, experienceController.updateExperience)

// Delete One Experience
experienceRouter.delete('/:id', experienceController.getExperience, experienceController.deleteExperience)



module.exports = experienceRouter;