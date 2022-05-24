
const expressCoach = require('express');
const coachRouter = expressCoach.Router();
const Coach = require('../models/coach.model');
const coachController = require('../controllers/coach.controller.js');
// Get All Coaches 
coachRouter.get('/', coachController.getAllCoaches)

// Get One Coach 
coachRouter.get('/:id', coachController.getCoach, coachController.getOneCoach)

// Create One Coach
coachRouter.post('/', coachController.createCoach)


// Update One Coach 
coachRouter.put('/:id', coachController.getCoach, coachController.updateCoach)

// Delete One coach
coachRouter.delete('/:id', coachController.getCoach, coachController.deleteCoach)




module.exports = coachRouter;