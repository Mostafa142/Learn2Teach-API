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
app.use('/api/', authRouter)

// 2.Coach 
const CoachRouter = require('./routes/coaches.route')
app.use('/api/coaches', CoachRouter)

// 3.Learner
const learnerRouter = require('./routes/learners.route')
app.use('/api/learners', learnerRouter)

// 4.Experiences 
const experiencesRouter = require('./routes/experiences.route')
app.use('/api/experiences', experiencesRouter);

// 5.Sessions 
const sessionRouter = require('./routes/sessions.route')
app.use('/api/experiences', sessionRouter);



app.listen(port, () => console.log(`Server Started on port ${port}!`))
