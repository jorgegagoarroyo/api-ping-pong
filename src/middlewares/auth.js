require("dotenv").config()
const m_usuario = require("../modelos/modelo_usuario")
const jwt = require("jsonwebtoken")

module.exports = {

    auth: async(req, res, next)=>{
        try{
            let token = req.headers.authorization.split(" ")[1]
            //console.log(token)
            let datos = await jwt.verify(token, process.env.SECRETO)
            //console.log(datos)
             
            if(await m_usuario.findOne({email: datos.user})){
                req.query.roles = datos.roles
                req.query.id = datos.id
                //console.log(req.query.id)
                next()
            }else{
                let error = {code: 404, body: " usuario no encontrado"}
                throw error
            }
        }catch(err){
            console.log("error en auth")
            if(err.body){
                res.status(err.code).json({error: err.body})
            }else{
                res.json({err})
            }
            
        }
    }
}
