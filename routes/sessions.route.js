const expressSession = require('express');
const sessionRouter = expressSession.Router();
const session = require('../models/session.model');
const sessionController = require('../controllers/session.controller');
// Get All Coaches 
sessionRouter.get('/', sessionController.getAllSessions)

// Get One Coach 
sessionRouter.get('/:id', sessionController.getSession, sessionController.getOneSession)

// Create One Coach
sessionRouter.post('/', sessionController.createSession)


// Update One Coach 
sessionRouter.put('/:id', sessionController.getSession, sessionController.updateSession)

// Delete One coach
sessionRouter.delete('/:id', sessionController.getSession, sessionController.deleteSession)




module.exports = sessionRouter;