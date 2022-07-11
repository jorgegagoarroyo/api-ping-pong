const express = require("express")
const router = express.Router()
const { auth } = require('../middlewares/auth')
const { rol } = require('../middlewares/rol')
const { canRIUD } = require("../middlewares/canRIUD")
const { upload, borrarFoto } = require("../middlewares/foto")
const { subida, borrar, fotoUser, allFotos } = require("../controladores/controlador_fotos")

router.get("/",auth, rol(["registrado","admin"]), fotoUser)

router.get("/all", auth, rol(["registrado","admin"]), allFotos)

router.post("/",auth, rol(["registrado","admin"]), borrarFoto, upload, subida )

router.delete("/",auth, rol(["registrado","admin"]), borrarFoto, borrar )


module.exports = router