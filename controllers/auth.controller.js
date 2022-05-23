const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (error, hashedPass) => {
        if (error) {
            res.json({ error: error })
        }

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            type: req.body.type,
            password: hashedPass
        })
        user.save().then(user => {
            res.json({ message: 'User Added Successfully!' })
        })
            .catch(error => {
                res.json({ message: 'An Error Occurred!' })
            })
    })

}


const login = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (error, result) {
                    if (error) {
                        res.json({ error: error })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
                        res.status(200).json({ message: 'Login Successfully!', token })
                    } else {
                        res.status(500).json({ message: 'Password does not matched !' })
                    }
                })
            } else {
                res.status(404).json({ message: 'No User Found !' })
            }
        })
}

module.exports = { register, login }