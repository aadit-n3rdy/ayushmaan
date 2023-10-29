//const user = require('./controller/user.js')
const api = require('./api.js')

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors())
console.log("Using cors")
app.use(express.json())
console.log("Using json")
app.use(express.urlencoded({extended: true}))
console.log("Using URL Encoding")
app.use(cookieParser())
console.log("Using cookie parser")

app.use('/api', api)
console.log("Mounted API")

app.use('/', express.static('static'))

app.listen(8000)
