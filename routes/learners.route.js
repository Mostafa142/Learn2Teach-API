const expressLearner = require('express');
const learnersRouter = expressLearner.Router();
const Learner = require('../models/learner.model');
const learnerController = require('../controllers/learner.controller.js');
// Get All Coaches 
learnersRouter.get('/', learnerController.getAllLearners)

// Get One Coach 
learnersRouter.get('/:id', learnerController.getLearner, learnerController.getOneLeaner)

// Create One Coach
learnersRouter.post('/', learnerController.createLearner)


// Update One Coach 
learnersRouter.put('/:id', learnerController.getLearner, learnerController.updateLearner)

// Delete One coach
learnersRouter.delete('/:id', learnerController.getLearner, learnerController.deleteLearner)




module.exports = learnersRouter;