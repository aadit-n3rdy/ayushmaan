
const mongodb = require("mongodb")
const config = require("./config.json")

const uri = `mongodb://${config.db.user}:${config.db.pass}@${config.db.host}/${config.db.db}`
const client = new mongodb.MongoClient(uri)
try {
	client.connect()
	console.log("Connected client")
	client.db("ayushmaan").command({ping: 1})
} catch(err) {
	console.log(err.message)
}
module.exports = client
