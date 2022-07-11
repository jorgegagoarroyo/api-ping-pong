const { date } = require("joi")
const m_partidas = require("../modelos/modelo_partido")
const m_usuario = require("../modelos/modelo_usuario")

module.exports = {

    listapartidas : async (req, res)=>{
        try{
            let lista = await m_partidas.find()
            res.json({datos: lista})
        }catch(error){
            res.json({mensaje: "error en lista_usurios"})
        }
    },

    nuevaPartida : async (req, res)=>{
        let partida = new m_partidas({
            jugador1 : req.body.jugador1,
            jugador2 : req.body.jugador2,
            // puntosj1 : 0,//req.body.puntos1,
            // puntosj2 : 0,//req.body.puntos2, 
            // eventos : "",//req.body.eventos
        })
        try{
            await partida.save()
            res.json({mensaje: "partida creada", partida})
        }catch(error){
            res.json({mensaje: "error en creacion de partida"+ error})
        }
    },

    partidaId :async (req, res)=>{
        let id = req.params.id
        try{
            let partida = await m_partidas.findById(id)
            let jugador = await m_usuario.findById(partida.jugador1)
            partida.jugador1 = jugador.nick

            //console.log(jugador1)
            //console.log(partida.jugador2)

            jugador = await m_usuario.findById(partida.jugador2)
            partida.jugador2 = jugador.nick

            res.json(partida)
        }catch(error){
            res.json({mensaje: "error en partidaID: "+error})
        }
    }, 

    actPartida: async (req, res)=>{
        let id = req.params.id
        try{
            let partida = await m_partidas.findByIdAndUpdate(id, {
                // fecha: req.body.fecha,
                // jugador1 : req.body.jugador1,
                // jugador2 : req.body.jugador2,
                // puntosj1 : req.body.puntos1,
                // puntosj2 : req.body.puntos2,
                // eventos : req.body.evento
                //fecha: req.body.fecha,
                //jugador1 : req.body.jugador1,
                //jugador2 : req.body.jugador2,
                puntosj1 : req.body.puntos1,
                puntosj2 : req.body.puntos2, 
                eventos : req.body.eventos
                
            },
            {new:true})
            res.json({datos: partida})
        }catch(error){
            res.json({mensaje: "error al actualizar partida id: "+id+ "error: "+error })
        }
    },

    borrarPartida: async (req, res)=>{
        let id = req.params.id
        try{
            await m_partidas.findByIdAndDelete(id)
            res.json({mensaje: "partida borrado"})
        }catch(error){
            res.json({mensaje: "error en borrarPartida: "+ error })
        }
    },

    finPartida : async (req,res)=>{//<-- por cambiar datos segun jugador

        try{
            let usuario = await modelo_usuario.findByIdAndUpdate(id, {
                "partidos" : usuario.partidos + 1,
                "puntos_totales" : usuario.partidos_ganados * 3,
                "partidos_ganados" : req.body.partidos_ganados,
                //"puntos_rank" : req.body.puntos_rank,
            },
            {new:true})
            res.json({datos: usuario})
        }catch(error){
            res.json({mensaje: "error al actualizar usuario id: "+id+ "error: "+error })
        }
    }
    

}