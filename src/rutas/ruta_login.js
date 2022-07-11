const express = require("express")
const router = express.Router()
const { ingresar }= require("../controladores/controlador_login")

router.get("/", ingresar)

module.exports = router