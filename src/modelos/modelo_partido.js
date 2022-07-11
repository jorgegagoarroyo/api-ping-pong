const mongoose = require("mongoose")
const Schema = mongoose.Schema

var esquemaPartida = new Schema({
    fecha: {type: Date, default: Date.now()} ,
    jugador1 : {type :String, required:true},
    jugador2 : {type :String, required: true},
    puntosj1 : {type :Number, default:0},
    puntosj2 : {type :Number, default:0},
    eventos : {type :String, default:""}
})

var m_partida_ping_pong = mongoose.model("partidas_ping_pong",esquemaPartida)

module.exports = m_partida_ping_pong