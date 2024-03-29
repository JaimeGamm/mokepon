const sectionSelecionarAtaque = document.getElementById('selecciona-ataque')
const sectionSelecionarReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')

const botonReiniciar = document.getElementById('boton-reiniciar')
const spanMascotaJugador =document.getElementById('mascota-jugador')
const sectionMensajes = document.getElementById('resultador')
const ataquesDelJugador = document.getElementById('ataques-de-jugador')
const ataqueDelEnemigo = document.getElementById('ataques-de-enemigo')
const sectionSelecionarMascota = document.getElementById('selecciona-mascota')
const spanMascotaEnemigo =document.getElementById('mascota-enemigo')
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
const contenedorAtaques = document.getElementById('contenedor-ataques')
const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')
const anchoMaximoMapa = 350

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let botones = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcinesMokepones
let inputHipodoge  
let inputCapipepo  
let inputRatigueya 
let mascostaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra

let indexAtaqueJuagador
let indexAtaqueEnemigo

let victoriasJugador = 0
let victoriasEnemigo = 0

let contadorVidasEnemigo = 3
let contadorVidasJugador =3

let mascostaJugadorObjeto
let alturaBuscada
let anchoMapa = window.innerWidth -  200 
alturaBuscada = anchoMapa * 600 / 1000
mapa.width = anchoMapa
mapa.height = alturaBuscada
let lienzo = mapa.getContext("2d")
let intervalo 
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap-ca51ea18-7ac8-492f-be96-6181d766a99d.png';
if (anchoMapa > anchoMaximoMapa) {
    anchoMapa = anchoMaximoMapa - 20
}

class Mokepon{
    constructor(nombre, foto,vida,fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto =foto
        this.vida =vida
        this.ataques =[]
        this.alto = 40
        this.ancho = 40
        this.x = aletorio(0, mapa.width-this.ancho)
        this.y = aletorio(0, mapa.height-this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMascota() {
        lienzo.drawImage(
            this.mapaFoto, 
            this.x, 
            this.y, 
            this.ancho, 
            this.alto
            )

    }
}

let hipodoge = new Mokepon('Hipodoge','./assets/027-sandshrew.png', 3,'./assets/y3s277X.png')
let capipepo = new Mokepon('Capipepo','./assets/231e017da27c5e4c2afecab2c441720a.jpg', 3, './assets/ratigueya-3d52f361-7036-4ff7-bf61-c4b7e49875ff.png')
let ratigueya = new Mokepon('Ratigueya','./assets/9b70c1edf68aabc95a1fda3d7ffafde8.jpg', 3, './assets/LWkctTb.png')

const HIPODOGE_ATAQUES = [
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🗻', id:'boton-tierra'},
    {nombre: '🔥', id:'boton-fuego'}
]
hipodoge.ataques.push(...HIPODOGE_ATAQUES)

const CAPIPEPO_ATAQUES = [
    {nombre: '🗻', id:'boton-tierra'},
    {nombre: '🗻', id:'boton-tierra'},
    {nombre: '🗻', id:'boton-tierra'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'}
]

capipepo.ataques.push(...CAPIPEPO_ATAQUES)



const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🗻', id:'boton-tierra'},
    {nombre: '🔥', id:'boton-fuego'}
]

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


mokepones.push(hipodoge,capipepo,ratigueya)
console.log(mokepones.nombre)
 
function iniciarJuego(){
    
    sectionSelecionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) =>{
        opcinesMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p> ${mokepon.nombre} </p>
        <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>`

    

    contenedorTarjetas.innerHTML += opcinesMokepones
    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    })


    sectionSelecionarReiniciar.style.display = 'none'

    botonMascotaJugador.addEventListener('click',selecionarMascotaJugador)    

    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirAlJuego()
}

function unirAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            if(res.ok){
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId  = respuesta                        
                       
                    })
            }
        })
}

function selecionarMascotaJugador(){
    //sectionSelecionarAtaque.style.display = 'flex'
    
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascostaJugador = inputHipodoge.id       
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascostaJugador = inputCapipepo.id
        console.log(mascostaJugador)
    } else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascostaJugador = inputRatigueya.id
    } else {
        alert('Tiene que selecionar mascota')
        return
    }
    sectionSelecionarMascota.style.display = 'none'
    selecionaarMokepon(mascostaJugador)
    extraerAtaques(mascostaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
}

function selecionaarMokepon(mascostaJugador){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,
    {method: "post",
    headers:{
        "Content-type": "application/json"
    },
    body: JSON.stringify({
        mokepon: mascostaJugador
    })
})
}
function iniciarMapa(){

    mascostaJugadorObjeto = obtenerObjetoMascota()
    intervalo = setInterval(pintarCanvas,50)
    window.addEventListener("keydown", sePresecionoTecla)
    window.addEventListener("keyup", detenerMovimiento)
}

function extraerAtaques2(mascostaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        
        if(mascostaJugador === mokepones[i].nombre){
            console.log(mokepones[i].nombre)
            ataques = mokepones[i].ataques
        }     
    }
    console.log(ataques)
    mostrarAtaques(ataques)
}

function extraerAtaques(mascotaJugador){
    let ataques
    mokepones.forEach((mokepon) => {
        if(mascotaJugador === mokepon.nombre){
            ataques = mokepon.ataques
        }
    })

    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon = `<button id=${ataque.id} class="boton-ataque b-ataque">${ataque.nombre} </button>`
        contenedorAtaques.innerHTML+= ataquesMokepon
    })

    botonFuego = document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')

    botones =  document.querySelectorAll('.b-ataque')


}

function secuenciaAtaque(){
   
    botones.forEach((boton)=>{
        boton.addEventListener('click', (e) =>{
            if(e.target.textContent === '🔥 '){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true 
            }else if(e.target.textContent === '💧 '){
                console.log(ataqueJugador)
                ataqueJugador.push('AGUA')
                boton.style.background = '#112f58'
                boton.disabled = true 
            }else if(e.target.textContent === '🗻 '){
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true 
            }
            if (ataqueJugador.length === 5) {
                //console.log("ataques de jugador en secuencia " + ataqueJugador )
                
                enviarAtaques()
                
            }
        })
        
    })  
    
}    


function enviarAtaques(){
    console.log("enviar ataques "+ ataqueJugador+ " " + jugadorId)
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`,
    {  method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}


function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok){
                res.json()
                    .then(function ( {ataques} ){
                        console.log("enemigoId en ataques "+enemigoId)
                        console.log("ataques del enemigo n "+ataques.length)
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function selecionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function aletorio(min, max){
    return Math.floor(Math.random()* (max - min + 1) + min)
}



function ataqueAletorioEnemigo(){
    let ataqueAletorio = aletorio(0, ataquesMokeponEnemigo.length-1)
    if(ataqueAletorio == 0 || ataqueAletorio == 1){
        ataqueEnemigo.push('FUEGO')
    } else if(ataqueAletorio == 3 || ataqueAletorio == 4){
        ataqueEnemigo.push('AGUA')
    } else{
        ataqueEnemigo.push('TIERRA')
    }
    console.log(ataqueEnemigo)
    //screarMensaje()
    iniciarPelea()
}
function iniciarPelea(){
    if(ataqueJugador.length===5){   
        combate()
    }
}

function crearMensaje(resultado){

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJuagador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

   
    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)
    //revisarVidas()
}

function indexAmbosOponetes(jugador, enemigo){
    indexAtaqueJuagador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate(){
    clearInterval(intervalo)
    let estado = ''
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    for (let index = 0; index < ataqueJugador.length; index++) {
        console.log(ataqueJugador[index] + " "+ ataqueEnemigo[index])
        indexAmbosOponetes(index,index)
        if(ataqueJugador[index] == ataqueEnemigo[index]){
            crearMensaje("EMPATE")
        }else if(ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index]=== "FUEGO"){
            victoriasJugador ++
            indexAmbosOponetes(index,index)
            crearMensaje("GANASTE")
            spanVidasJugador.innerHTML= victoriasJugador
        }else if(ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "AGUA"){
            victoriasJugador ++
            indexAmbosOponetes(index,index)
            crearMensaje("GANASTE")
            spanVidasJugador.innerHTML= victoriasJugador
        }else if(ataqueJugador[index] === "AGUA" && ataqueEnemigo[index]=== "TIERRA"){
            victoriasJugador ++
            indexAmbosOponetes(index,index)
            crearMensaje("GANASTE")
            spanVidasJugador.innerHTML= victoriasJugador
        }else{
            victoriasEnemigo ++
            indexAmbosOponetes(index,index)
            crearMensaje("PEDISTE")
            spanVidasEnemigo.innerHTML= victoriasEnemigo
        }
        
    }
    console.log("va enttra a revisar vidas")
    revisarVidas()
    
}

function revisarVidas(){
    if(victoriasJugador > victoriasEnemigo){
        console.log('¡FELICITACIONES PEDISTE! 😢☹😢')
        crearMensajeFinal('¡FELICITACIONES PEDISTE! 😢☹😢')
        
    }else if(victoriasJugador < victoriasEnemigo){
        console.log('¡FELICITACIONES GANASTE! 🎉🎈🎂')
        crearMensajeFinal('¡FELICITACIONES GANASTE! 🎉🎈🎂')
        
    }else {
        console.log('¡empate! 😢☹😢')
        crearMensajeFinal('¡EMPATE! 🎉🎈🎂')
    }
    
}

function crearMensajeFinal(resultador){
    sectionMensajes.innerHTML = resultador
    sectionSelecionarReiniciar.style.display = 'block'
}

function pintarCanvas(){
    mascostaJugadorObjeto.x = mascostaJugadorObjeto.x + mascostaJugadorObjeto.velocidadX
    mascostaJugadorObjeto.y = mascostaJugadorObjeto.y + mascostaJugadorObjeto.velocidadY
    
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascostaJugadorObjeto.pintarMascota()

    enviarPosicion(mascostaJugadorObjeto.x,mascostaJugadorObjeto.y)
    mokeponesEnemigos.forEach(function(mokepon){
        //console.log("aaaaaaaaaaaa "+mokepon.id)
        mokepon.pintarMascota()
        revisarColision(mokepon)
    })   
}
function enviarPosicion2(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
        method: "post",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            x, 
            y 
        })
    })
    .then(function(res){
        if (res.ok) {
            res.json()
                .then(function({enemigos}){
                    mokeponesEnemigos = enemigos.map(function(enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        console.log("mokepon ataque de enemigo"+ enemigo.ataque)
                        console.log("PRUEBA DE NOMBRE "+ mokeponNombre)
                        if(mokeponNombre === "Hipodoge"){
                            mokeponEnemigo = new Mokepon('Hipodoge','./assets/027-sandshrew.png', 3,'./assets/y3s277X.png', enemigo.id)
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                        } else if(mokeponNombre === "Capipepo"){
                            mokeponEnemigo = new Mokepon('Capipepo','./assets/231e017da27c5e4c2afecab2c441720a.jpg', 3, './assets/ratigueya-3d52f361-7036-4ff7-bf61-c4b7e49875ff.png', enemigo.id)
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                        } else if(mokeponNombre === "Ratigueya"){
                            mokeponEnemigo = new Mokepon('Ratigueya','./assets/9b70c1edf68aabc95a1fda3d7ffafde8.jpg', 3, './assets/LWkctTb.png', enemigo.id)
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                        }
                        
                        return mokeponEnemigo
                        
                    });
                    console.log(enemigos)
                })
        }
    })
}
function enviarPosicion(x, y) {
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })

        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ enemigos }) {
                        console.log(enemigos)
                        mokeponesEnemigos = enemigos.map(function (enemigo){
                            let mokeponEnemigo = null
                            const mokeponNombre = enemigo.mokepon.nombre || ""
                            if (mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon('Hipodoge','./assets/027-sandshrew.png', 3,'./assets/y3s277X.png', enemigo.id)
                            } else if (mokeponNombre === "Capipepo") {
                                mokeponEnemigo = new Mokepon('Capipepo','./assets/231e017da27c5e4c2afecab2c441720a.jpg', 3, './assets/ratigueya-3d52f361-7036-4ff7-bf61-c4b7e49875ff.png', enemigo.id)
                            } else if (mokeponNombre === "Ratigueya"){
                                mokeponEnemigo = new Mokepon('Ratigueya','./assets/9b70c1edf68aabc95a1fda3d7ffafde8.jpg', 3, './assets/LWkctTb.png', enemigo.id)
                            }

                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y

                            return mokeponEnemigo
                        })
                    })
            }
        })
}
function moverDerecha(){
    mascostaJugadorObjeto.velocidadX = 5
    pintarCanvas()
}


function moverAbajo(){
    mascostaJugadorObjeto.velocidadY = 5
    pintarCanvas()
}


function moverArriba(){
    mascostaJugadorObjeto.velocidadY = -5
    pintarCanvas()
}


function moverIzquierda(){
    mascostaJugadorObjeto.velocidadX = -5
    pintarCanvas()
}

function detenerMovimiento(){
    mascostaJugadorObjeto.velocidadX = 0
    mascostaJugadorObjeto.velocidadY = 0
}

function sePresecionoTecla(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
        break    
        case 'ArrowDown':
            moverAbajo()
        break 
        case 'ArrowLeft':
            moverIzquierda()
        break 
        case 'ArrowRight':
            moverDerecha()
        break 
        default:
        break
    }

}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascostaJugador === mokepones[i].nombre){
            return mokepones[i]
        }     
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascostaJugadorObjeto.y
    const abajoMascota = mascostaJugadorObjeto.y + mascostaJugadorObjeto.alto
    const derechaMascota = mascostaJugadorObjeto.x + mascostaJugadorObjeto.ancho
    const izquierdaMascota = mascostaJugadorObjeto.x

    if (abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo) {
        return
        
    }
    
    
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    console.log("enemigo id "+ enemigoId)
    sectionSelecionarAtaque.style.display= 'flex'
    sectionVerMapa.style.display = 'none'
    selecionarMascotaEnemigo(enemigo)
    //alert("hay una colision" + enemigo.nombre)
}

function reiniciarJuego(){
    location.reload()
}
window.addEventListener('load', iniciarJuego)