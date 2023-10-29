
const client = require('../dbconn.js')

const express = require('express')

const app = express.Router()

app.get('/', async (req, res) => {
	const db = client.db("ayushmaan")
	const cursor = db.collection("resources").find({}, {projection: {_id: 0,
		caption: 1, url: 1}})
	const resources = []
	for await (const doc of cursor) {
		resources.push(doc)
	}
	res.status(200)
	res.send(resources)
})

module.exports = app
