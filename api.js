
const express = require('express')
const user = require('./controller/user.js')
const resource = require('./controller/resource.js')

const app = express.Router()

app.use('/user', user)
app.use('/resource', resource)

module.exports = app

