const express = require("express")
const jugadores = []

const app = express()
class Jugador{
    constructor(id){
        this.id =id
    }
}
app.get("/unirse",(req,res)=>{
    const id = `${Math.random()}`
    const jugador = new Jugador(id)
    jugadores.push(jugador)
    res.setHeader("Access-Control-Allow-Origin","*")
    res.send(id)
})
app.listen(8000, ()=>{
    console.log("mi primer serrvidor con node js")
})