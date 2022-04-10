require('dotenv').config({ path: './.env' });
const express = require('express');
const path = require('path');
require('./connect/mongoose');
const cors = require('cors');
const morgan = require('morgan')


const app = express()
app.use(express.json())
app.use(cors())
app.use('/public', express.static(process.env.root + "/public"));
app.use(morgan('tiny'));

const userRoutes = require('./routes/user')
const courseRoutes = require('./routes/course')

app.use('/api', userRoutes)
app.use('/api', courseRoutes)


const port = process.env.PORT || 5000
app.listen(port, '0.0.0.0', () => {
    console.log('Server is up on port ' + port)
})