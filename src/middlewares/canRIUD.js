const m_partida = require("../modelos/modelo_partido")
const m_usuario = require("../modelos/modelo_usuario")

module.exports = {

    canRIUD: (req, res, next)=>{
        let datos = req.query.data
        //console.log(datos.id)
        if(datos.roles.includes("admin")){
            console.log("es admin")
            next()
        }else if(datos.id === req.params.id){
            console.log("no es admin")
            console.log("pero es su id")
            next()
        }else{
            res.json({you:"_shall_not_pass"})
        }
    },

    canPartida: async (req, res, next)=>{
        let datos = req.query.data
        console.log(datos)
        let partida = await m_partida.findById(req.params.id)
        if(datos.roles.includes("admin")){
            console.log("es admin")
            next()
        }else if(datos.id === partida.jugador1 || datos.id === partida.jugador2){
            console.log("no es admin")
            console.log("pero es eres un jugador")
            next()
        }else{
            console.log("redirecion ")
            res.redirect(`/api/partidas/${req.params.id}`)
        }
    }
}