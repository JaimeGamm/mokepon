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

let contadorVidasEnemigo = 3
let contadorVidasJugador =3

class Mokepon{
    constructor(nombre, foto,vida){
        this.nombre = nombre
        this.foto =foto
        this.vida =vida
        this.ataques =[]
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
    sectionSelecionarAtaque.style.display = 'flex'
    sectionSelecionarMascota.style.display = 'none'

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
            }else if(e.target.textContent === '💧 '){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
            }else if(e.target.textContent === '🗻 '){
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
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
    crearMensaje()
}

function crearMensaje(){

    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    let notificacion = document.createElement('p')

    sectionMensajes.innerHTML = combate()
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

   
    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueEnemigo)

    revisarVidas()
}

function combate(){
    let estado = ''
    let spanVidasJugador = document.getElementById('vidas-jugador')
    let spanVidasEnemigo = document.getElementById('vidas-enemigo')

    if(ataqueJugador == ataqueEnemigo){
        estado = 'GANASTE'
        contadorVidasEnemigo--
        spanVidasEnemigo.innerHTML = contadorVidasEnemigo
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA'){
        estado = 'GANASTE'
        contadorVidasEnemigo--
        spanVidasEnemigo.innerHTML = contadorVidasEnemigo

    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO'){
        estado = 'GANASTE'
        contadorVidasEnemigo--
        spanVidasEnemigo.innerHTML = contadorVidasEnemigo

    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
        estado = 'GANASTE'
        contadorVidasEnemigo--
        spanVidasEnemigo.innerHTML = contadorVidasEnemigo

    } else{
        estado = 'PEDISTE'
        contadorVidasJugador--
        spanVidasJugador.innerHTML = contadorVidasJugador
    }

    
    return estado
}

function revisarVidas(){
    if(contadorVidasJugador==0){
        crearMensajeFinal('¡FELICITACIONES PEDISTE! 😢☹😢')
    }else if(contadorVidasEnemigo==0){
        crearMensajeFinal('¡FELICITACIONES GANASTE! 🎉🎈🎂')
    }else {

    }
    
}

function crearMensajeFinal(resultador){
    sectionMensajes.innerHTML = resultador
    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true  
    sectionSelecionarReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}
window.addEventListener('load', iniciarJuego)