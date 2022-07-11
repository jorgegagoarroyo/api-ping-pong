const mongoose = require("mongoose")
const Schema = mongoose.Schema 

const esquemaUsuario = new Schema({
    nombre :{ type: String, required:true},
    email: { type: String, required:true},
    nick : { type: String, required:true},
    roles : {type:Array, default:"registrado"},
    pass: String,
    partidos : {type:Number, default:0},
    puntos_totales : {type:Number, default:0},
    partidos_ganados : {type:Number, default:0},
    puntos_rank : {type:Number, default:0},
    foto : {type: Boolean, default: false},

})

var m_usuario_ping_pong = mongoose.model("usuarios_ping_pong", esquemaUsuario)












async function crearAdmin(){
    let admin = new m_usuario_ping_pong({
        nombre :"admin",
        email: "admin@gmail.com",
        nick : "admin",
        roles : ["admin","registrados"],
        partidos : 0,
        puntos_totales : 0,
        partidos_ganados : 0,
        puntos_rank : 0,
        foto : false
    })
    await bcrypt.hash("admin", 10, (err, hash)=>{
        if(err){
            throw ` error en el password ${err}`
        }else{
            admin.pass = hash
            admin.save()
            console.log( "admin creado")
        }
    })
}
// const bcrypt = require("bcrypt")
// crearAdmin()



module.exports = m_usuario_ping_pong