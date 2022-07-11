const m_usuario = require("../modelos/modelo_usuario")
require("dotenv").config()
const fs = require("fs-extra")

module.exports =
{

    subida: (req, res)=>{
        userFoto(req, true)
        res.json({mensaje: "foto subida"})
    },

    borrar: (req, res)=>{
        userFoto(req, false)
        res.json({mensaje: "foto borrada"})
    },

    fotoUser: async (req, res)=>{

        let user = await m_usuario.findById( req.query.id)
        //console.log(user)
        let encontrado = user.foto
        let arch = new RegExp(`${req.query.id}\.*`)

        let path = process.cwd()+`\\archivos\\`

        if(encontrado){
            for(let file of fs.readdirSync(path)){
                let temp = arch.exec(file)
                //console.log("temp ",temp)
                if(temp){
                    //console.log(encontrado)
                    let ressul = `${path}${temp[0]}`
                    //console.log("if temp ", ressul)
                    res.json({ressul})   
                }
            }
        }else{
            let foto = `${path}avatar.jpg`
            //console.log(foto)
            res.json({foto})
        }
    },

    allFotos: (req, res)=>{
        let parent = process.cwd()+"/archivos/"
        let resul = {}
        fs.readdirSync(parent).forEach(file =>{
            //console.log(file)
            let user = file.split(".")[0]
            resul[user]=parent+file 
        })

        res.json({resul})
    }

}

const userFoto = async (req, estado)=>{
    await  m_usuario.findByIdAndUpdate( req.query.id,
        {
            "foto": estado
        }
    )
}