require("dotenv").config()
const mongoose = require("mongoose")

const BD_USER = process.env.BD_USER 
const BD_BASE = process.env.BD_BASE 
const BD_PASSWORD = process.env.BD_PASSWORD  

const uri = `mongodb+srv://${BD_USER}:${BD_PASSWORD}@cluster0.h7qef.mongodb.net/${BD_BASE}?retryWrites=true&w=majority`

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection

module.exports = db