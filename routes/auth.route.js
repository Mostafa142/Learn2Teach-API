const expressCoach = require('express');
const router = expressCoach.Router();

const AuthController = require('../controllers/auth.controller')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)


module.exports = router