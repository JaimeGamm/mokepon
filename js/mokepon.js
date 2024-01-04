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

let mokepones = []
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

let lienzo = mapa.getContext("2d")

class Mokepon{
    constructor(nombre, foto,vida){
        this.nombre = nombre
        this.foto =foto
        this.vida =vida
        this.ataques =[]
        this.x = 20
        this.y = 30
        this.alto = 80
        this.ancho = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
    }
}

let hipodoge = new Mokepon('Hipodoge','./assets/027-sandshrew.png', 3)
let capipepo = new Mokepon('Capipepo','./assets/231e017da27c5e4c2afecab2c441720a.jpg', 3)
let ratigueya = new Mokepon('Ratigueya','./assets/9b70c1edf68aabc95a1fda3d7ffafde8.jpg', 3)

hipodoge.ataques.push(
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🗻', id:'boton-tierra'},
    {nombre: '🔥', id:'boton-fuego'}
)

capipepo.ataques.push(
    {nombre: '🗻', id:'boton-tierra'},
    {nombre: '🗻', id:'boton-tierra'},
    {nombre: '🗻', id:'boton-tierra'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🔥', id:'boton-fuego'}
)

ratigueya.ataques.push(
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '🔥', id:'boton-fuego'},
    {nombre: '💧', id:'boton-agua'},
    {nombre: '🗻', id:'boton-tierra'},
    {nombre: '🔥', id:'boton-fuego'}
)
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
}


function selecionarMascotaJugador(){
    //sectionSelecionarAtaque.style.display = 'flex'
    sectionSelecionarMascota.style.display = 'none'
    sectionVerMapa.style.display = 'flex'
  


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
    }
   
    extraerAtaques(mascostaJugador)
    selecionarMascotaEnemigo()
}

function extraerAtaques(mascostaJugador){
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
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true 
            }else if(e.target.textContent === '🗻 '){
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true 
            }
            ataqueAletorioEnemigo()
        })
        
    })
    
}    

function selecionarMascotaEnemigo(){
    let mascotaAletorio = aletorio(0, mokepones.length-1)   
    spanMascotaEnemigo.innerHTML = mokepones[mascotaAletorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAletorio].ataques
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
    let estado = ''
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')
    for (let index = 0; index < ataqueJugador.length; index++) {
        console.log(ataqueJugador[index] + " "+ ataqueEnemigo[index])
        if(ataqueJugador[index] == ataqueEnemigo[index]){
            indexAmbosOponetes(index,index)
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
    revisarVidas()
    return estado
}

function revisarVidas(){
    if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal('¡FELICITACIONES PEDISTE! 😢☹😢')
    }else if(victoriasJugador < victoriasEnemigo){
        crearMensajeFinal('¡FELICITACIONES GANASTE! 🎉🎈🎂')
    }else {
        crearMensajeFinal('¡EMPATE! 🎉🎈🎂')
    }
    
}

function crearMensajeFinal(resultador){
    sectionMensajes.innerHTML = resultador
    sectionSelecionarReiniciar.style.display = 'block'
}

function pintarPersonaje(){
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        capipepo.mapaFoto, 
        capipepo.x, 
        capipepo.y, 
        capipepo.ancho, 
        capipepo.alto
        )
   
}

function moverCapipepo(){
    capipepo.x = capipepo.x + 5
    pintarPersonaje()
    capipepo.y = capipepo.y + 5
}

function reiniciarJuego(){
    location.reload()
}
window.addEventListener('load', iniciarJuego)