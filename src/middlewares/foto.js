const multer = require("multer")
const fs = require("fs-extra")
const jwt = require("jsonwebtoken")
const m_usuario = require("../modelos/modelo_usuario")
require("dotenv").config()

const data = async (req)=>{
    //console.log("req",req)
    const token = req.headers.authorization.split(" ")[1]
    const datos = await jwt.verify(token, process.env.SECRETO)
    //console.log("return datos")
    return datos
}

const storage =  multer.diskStorage({
    destination: ( req, file, cb)=>{
        cb(null, "archivos/")
    },
    filename: async (req, file, cb)=>{
        let datos = await data(req)
        //console.log("name user "+datos)
        cb(null, datos.id+"."+file.originalname.split(".")[1])
    }
})

const subir = multer({storage: storage})


module.exports = {

     upload: subir.single('fotos'),

     borrarFoto: async (req, res, next)=>{ 
        let datos = await data(req)
        let user = await m_usuario.findById(datos.id)
        if(user.foto){
            let arch = new RegExp(`${req.query.id}\.*`)
            let path = process.cwd()+"\\archivos\\"
            for(let file of fs.readdirSync(path)){
                let temp = arch.exec(file)
                if(temp){
                    //console.log(`ruta foto ${path}${temp}`)
                    fs.removeSync(`${path}${temp}`)
                }
            }  
        }
        //console.log("fs-extra borrado")
        next()
     }

}

