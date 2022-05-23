require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000


// DB Connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', (error) => { console.error(error) });
db.once('open', () => console.log('connected to Database'))


// Middleware 
app.use(express.json())

// Routes 

// 1.Authentication 
const authRouter = require('./routes/auth.route')
app.use('/', authRouter)

// 2.Coach 
const coachRouter = require('./routes/coaches.route')
app.use('/coaches', coachRouter)

// 3.Learner
const learnerRouter = require('./routes/coaches.route')
app.use('/coaches', learnerRouter)

app.listen(port, () => console.log(`Server Started on port ${port}!`))
