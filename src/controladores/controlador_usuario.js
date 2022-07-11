const modelo_usuario = require("../modelos/modelo_usuario")
const bcrypt = require("bcrypt")
const joi = require("joi")

module.exports = {

    listaUsuarios : async (req, res)=>{
        try{
            let lista = await modelo_usuario.find()
            res.json({datos: lista})
        }catch(error){
            res.json({mensaje: "error en lista_usurios"})
        }
    },

    nuevoUsuario : async (req, res)=>{
        try{
            const nuevo = joi.object({
                nombre: joi
                    .string()
                    .required(),
                email: joi
                    .string()
                    .email({minDomainSegments: 2, tlds: {allow:["com", "net"]}})
                    .required(),
                nick : joi
                    .string()
                    .required(),
                pass:joi
                    .string()
                    .required()
               
            })
            await nuevo.validateAsync(req.body)
            let usuario = new modelo_usuario({
                "nombre": req.body.nombre,
                "email": req.body.email,
                "nick" : req.body.nick,
                //"foto" : req.body.foto,
            })
                if(await modelo_usuario.findOne({email:req.body.email})){
                    throw " ya existe ese email"
                }
                await bcrypt.hash(req.body.pass, 10, (err, hash)=>{
                    if(err){
                        throw ` error en el password ${err}`
                    }else{
                        usuario.pass = hash
                        usuario.save()
                        res.json({mensaje: "usuario creado"})
                    }
                })   
        }catch(error){
            res.json({mensaje: "error en creacion de usuario"+ error})
        }
    },

    usuarioId :async (req, res)=>{
        let id = req.params.id
        try{
            let usuario = await modelo_usuario.findById(id)
            res.json(usuario)
        }catch(error){
            res.json({mensaje: "error en usuarioID: "+error})
        }
    }, 

    actUsuario: async (req, res)=>{
        let id = req.params.id
        
        try{
            const act = joi.object({
            foto:joi
                .string()
                .pattern(new RegExp('[\.jpg|\.png]$'))
            })
            let usuario = await modelo_usuario.findByIdAndUpdate(id, {
                "nombre" : req.body.nombre,
                //"email": req.body.email,
                "nick" : req.body.nick,
                "partidos" : req.body.partidos,
                "puntos_totales" : req.body.puntos_Totales,
                "partidos_ganados" : req.body.partidos_ganados,
                "puntos_rank" : req.body.puntos_rank,
                "foto" : req.body.foto
            },
            {new:true})
            res.json({datos: usuario})
        }catch(error){
            res.json({mensaje: "error al actualizar usuario id: "+id+ "error: "+error })
        }
    },

    borrarUsuario: async (req, res)=>{
        let id = req.params.id
        try{
            await modelo_usuario.findByIdAndDelete(id)
            res.json({mensaje: "usuario borrado"})
        }catch(error){
            res.json({mensaje: "error en borrarUsuario: "+ error })
        }
    }

}

