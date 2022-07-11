require("dotenv").config()
const express = require("express")
const app = express()
const db = require("./src/database")
const usuarios = require("./src/rutas/ruta_usuarios")
const partida = require("./src/rutas/ruta_partidas")
const login = require("./src/rutas/ruta_login")
const foto = require("./src/rutas/ruta_foto")
const morgan = require("morgan")

db.on("error", (error)=>{console.log("error al conectar base de datos "+error)})
db.on("connected", ()=>{console.log("conectado a la base de datos ")})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(morgan("tiny"))

app.use("/api/usuarios", usuarios)
app.use("/api/partidas", partida)
app.use("/api/login", login)
app.use("/api/foto", foto)

app.get("/", (req, res)=>{
    res.send("estamos en la raiz")
})


const PORT = process.env.PORT
app.listen(PORT, ()=>{console.log("estamos en el puerto: "+PORT)})