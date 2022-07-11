const express = require("express")
const router = express.Router()
const {listaUsuarios, nuevoUsuario, usuarioId, actUsuario, borrarUsuario} = require("../controladores/controlador_usuario")
const { auth }= require("../middlewares/auth")
const { rol }=require("../middlewares/rol")
const { canRIUD }=require("../middlewares/canRIUD")
const { upload, par } = require("../middlewares/foto")

router.get("/",auth, rol(["admin","registrado"]), listaUsuarios)//<-- solo auth y roles para test

router.post("/", nuevoUsuario)

router.get("/:id", auth, rol(["admin","registrado"]), canRIUD, usuarioId)

router.put("/:id", auth, rol(["admin","registrado"]), canRIUD, upload, actUsuario)

router.delete("/:id",auth, rol(["admin","registrado"]), canRIUD, borrarUsuario)

module.exports = router