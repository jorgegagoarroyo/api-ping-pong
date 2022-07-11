require("dotenv").config()
const m_usuario = require("../modelos/modelo_usuario")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const joi = require("joi")

module.exports = {

    ingresar: async (req, res)=>{
        try{
            const {pass, email} = await schema.validateAsync(req.body)
            const usuario = await m_usuario.findOne({email : email})
            if(!usuario){
                error = {code: 404, body:"usuario no encontrados"}
                throw  error
            }
            console.log(usuario)
            console.log(await bcrypt.compareSync(pass, usuario.pass))
            let paso = await bcrypt.compareSync(pass, usuario.pass)
            if (!paso){
                error = {code: 500, body:"contraseña no es correcta"}
                throw error
            }
            const token = jwt.sign({
                    user:usuario.email,
                    id: usuario._id,
                    roles: usuario.roles
                },
                process.env.SECRETO,
                {expiresIn: 60*60*24}
            )
            res.json({
                        mensaje:"bienvenido puedes pasar",
                        token: token
                    })
            
        }catch(err){
            console.log("error login")
            if(err.code && err.body){
                res.status(err.code).json({error: err.body})
            }else{
                res.json(err)
            }
        }

    } 
}

const schema = joi.object({
    pass: joi
        .string()
        .required(),
    email: joi
        .string()
        .email({minDomainSegments: 2, tlds: {allow:["com", "net"]}})
        .required()
})

