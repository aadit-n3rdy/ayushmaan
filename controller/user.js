
const client = require('../dbconn.js')

const express = require('express')
const password = require('password-hash-and-salt')
const crypto = require('crypto')
let ObjectId = require('mongodb').ObjectId

const app = express.Router()
app.post('/signup', async (req, res) => {
	password(req.body.pass).hash((err, hash) => {
		if (err) {
			res.statusCode = 500
			res.send("")
		}
		const user = { uname: req.body.uname, passHash: hash, 
			phno: req.body.phno, email: req.body.email, type: req.body.type}
		try {
			client.db("ayushmaan").collection("users").insertOne(user);
			res.statusCode = 200
			console.log("Done")
			res.send("")
		} catch (err) {
			console.log(err)
			res.statusCode = 500
			res.send("")
		}
	})
})

app.get('/read', async (req, res) => {
	try {
		const cur = client.db("ayushmaan").collection("users").find({})
		const result = {status: 200, result: []}
		for await (let doc of cur) {
			console.log(doc)
			result.result.push(doc)
		}
		res.setHeader("content-type", "application/json")
		res.send(result)
	} catch (err) {
		res.statusCode = 500
		res.send({status:500, msg: err.message})
	}
})

app.post('/login', async (req, res) => {
	const user = {email: req.body.email, pass: req.body.pass}
	try {
		const q = await client.db("ayushmaan").collection("users").findOne({
			email: user.email
		})
		password(user.pass).verifyAgainst(q.passHash, async function(err, verif) {
			if (err) {
				res.statusCode = 500
				res.send("")
			} else if (!verif) {
				res.statusCode = 401
				res.send("")
				console.log("Invalid")
			} else {
				const token = (await crypto.randomBytes(48)).toString('hex')
				const update = {
					$push: {
						tokens: token
					}
				}
				const filter = {_id: q._id}
				client.db("ayushmaan").collection("users").updateOne(
					filter,
					update).catch(err => {
						console.log(err)
				})
				res.cookie('uuid', q._id)
				res.cookie('token', token)
				res.statusCode = 200
				res.send("")
				console.log("Success")
			}
		})
	} catch(err) {
		res.statusCode = 500
		res.send("")
	}
})

app.get('/profile', async (req, res) => {
	const users = client.db("ayushmaan").collection("users")
	if (req.cookies.uuid == undefined || req.cookies.token == undefined) {
		res.status(401)
		res.send({})
		return;
	}
	const q = (await users.findOne({_id: new ObjectId(req.cookies.uuid)}))
	if (req.cookies.token in q.tokens) {
		delete q.tokens
		delete q.passHash
		res.status(200)
		res.send(q)
	} else {
		res.status(401)
		res.send({})
		return;
	}
})

app.get('/tags', async (req, res) => {
	const users = client.db("ayushmaan").collection("users")
	const q = (await users.findOne({_id: new ObjectId(req.cookies.uuid)}))
	if (req.cookies.token in q.tokens) {
		console.log()
	}

})

app.put('/tags', async (req, res) => {
	const users = client.db("ayushmaan").collection("users")
	const q = (await users.findOne({_id: new ObjectId(req.cookies.uuid)}))
	if (req.cookies.token in q.tokens) {
		console.log()
	}

})


console.log("App ready")

module.exports = app
