
const expressCoach = require('express');
const router = expressCoach.Router();
const Coach = require('../models/coach.model');
const coachController = require('../controllers/coach.controller.js');
// Get All Coaches 
router.get('/', coachController.getAllCoaches)

// Get One Coach 
router.get('/:id', coachController.getCoach, coachController.getOneCoach)

// Create One Coach
router.post('/', coachController.createCoach)


// Update One Coach 
router.put('/:id', coachController.getCoach, coachController.updateCoach)

// Delete One coach
router.delete('/:id', coachController.getCoach, coachController.deleteCoach)




module.exports = router;