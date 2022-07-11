const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")
const { rol } = require("../middlewares/rol")
const { canPartida }=require("../middlewares/canRIUD")

const {listapartidas, nuevaPartida, partidaId, actPartida, borrarPartida}=require("../controladores/controlador_partidas")

router.get("/", listapartidas)

router.post("/", auth, rol(["registrado", "admin"]), nuevaPartida)

router.get("/:id",rol(["registrado", "admin"]), partidaId)

router.put("/:id", auth, rol(["registrado", "admin"]), canPartida, actPartida)

router.delete("/:id", auth, rol(["registrado", "admin"]),canPartida, borrarPartida)

module.exports = router
