const { MongoClient } = require('mongodb')

let connection = null

let urlProd = "mongodb+srv://ram:ramrishi25@cluster0-uvqoo.mongodb.net/test?retryWrites=true&w=majority"
let urlDeve = "mongodb://localhost:27017"

let option = { useNewUrlParser: true, useUnifiedTopology: true }

module.exports.connect = () => new Promise((resolve, reject) => {
    MongoClient.connect(urlDeve, option, function(err, client) {
        if (err) { reject(err); return }
        let db = client.db("bus")
        resolve(db)
        connection = db
    })
})

module.exports.get= () => {
    if(!connection) {
        throw new Error('Call connect first!')
    }

    return connection;
}
