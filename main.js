const inicio = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25];
let lista = [...inicio];
let tope = 20;
let par_1 = 99;
let par_2 = 99;
let comparando = false;
let vueltas = 0;
let pares = 0;
const chime = new Audio("http://sonidosmp3gratis.com/sounds/rightchime1.mp3");
const click = new Audio("http://sonidosmp3gratis.com/sounds/Computer_Mouse_Click_01_Sound_Effect_Mp3_339.mp3");
const clap = new Audio("http://sonidosmp3gratis.com/sounds/clapping.mp3");
const final = new Audio ("http://sonidosmp3gratis.com/sounds/applause-applause-applause.mp3");
let listaIndices = [] ;

function mezclar(){
    let a = 0;
    let b = 0;
    for(let i = 0; i < 1000; i++){
        a = Math.floor(Math.random() * tope);
        b = Math.floor(Math.random() * tope);
        [lista[a], lista[b]] = [lista[b], lista[a]];
    }
}

function iniciar(){
    let lineaNueva = "";
    let linea = "";
    for(i = 0; i < tope; i++){
        lineaNueva = lineaHome.replace("--imagen--", "./img/pilotín.png");
        linea += lineaNueva;
        document.querySelector("#tabla").innerHTML = linea;
    }
    let tabla = document.querySelectorAll(".imagen"); 
    for(i = 0; i < tope; i++){
        tabla[i].id = "img_" + i;
    }
}

function comparar(){
    if (lista[par_1] != lista[par_2]){
        vueltas++;
        setTimeout(revertir, 1500);
    } else {
        pares++;
        listaIndices.push(par_1);
        listaIndices.push(par_2);
        par_1 = 99;
        par_2 = 99;
        comparando = false;
        // clap.pause();
        clap.currentTime = 0;
        clap.play();
        if(pares >= tope / 2){
            final.play();
            comparando = true;
        }
    }
    document.querySelector("#vueltas").textContent = "VUELTAS: " + vueltas;
    document.querySelector("#pares").textContent = "PARES: " + pares;
    document.querySelector("#puntos").textContent = "PUNTAJE: " + parseInt((pares*100)/vueltas);
}

function revertir(){
    document.querySelector("#img_" + par_1).src = "./img/pilotín.png";
    document.querySelector("#img_" + par_2).src = "./img/pilotín.png";
    par_1 = 99;
    par_2 = 99;
    comparando = false;
}

function verImagen(){
    let salir = false
    if (!comparando){

        indice = this.id.substring(4,6);
        for(i = 0; i < listaIndices.length; i++){
            if(listaIndices[i] == indice){
                salir = true;
            }    
        }
        if(!salir){
            chime.pause();
            chime.currentTime = 0
            chime.play();
            if(par_1 != 99 && indice != par_1){
                par_2 = indice;
                comparando = true;
                comparar();
            } else {
                par_1 = indice
            }
            document.getElementById(this.id).src = `./img/B${lista[indice]}.png`;
        }
    }
}

function verBoton(){
    click.play();
    switch (this.id){
        case "start":

            break
        case "easy":
            if(tope > 4){
                tope -= 4;
            }
            break
        case "hard":
            if(tope < 44){
                tope += 4;
            }
            break
    }
    lista = [...inicio];
    iniciar();
    mezclar();
    cargarBotones();
    resize();
    par_1 = 99;
    par_2 = 99;
    comparando = false;
    vueltas = 0;
    pares = 0;
    listaIndices = [];
    document.querySelector("#vueltas").textContent = "VUELTAS: 0";
    document.querySelector("#pares").textContent = "PARES: 0";
    document.querySelector("#puntos").textContent = "PUNTAJE: 0";
}

// window.onresize = function(){
    // resize();
// }

function resize(){
    let bombon = document.querySelectorAll(".bombon");
    let tabla = document.querySelector("#tabla");
    if(window.innerWidth < 450){
        for (i = 0; i < bombon.length; i++){
            bombon[i].style.width = "50px";
            bombon[i].style.height = "50px";
        }
        tabla.style.width = tope * 425 / 28 + "px";
    } else {
        for (i = 0; i < bombon.length; i++){
            bombon[i].style.width = "100px";
            bombon[i].style.height = "100px";
        }
        tabla.style.width = tope * 770 /28 + "px";
    }
}

function cargarBotones(){
    let imagenes = document.querySelectorAll(".imagen");
    for(let i = 0; i < tope; i++){
        imagenes[i].addEventListener("click", verImagen);
    }
}

const lineaHome = document.querySelector("#tabla").innerHTML;
iniciar();
mezclar();
cargarBotones();
resize();

let botones = document.querySelectorAll(".btn");

for(i = 0; i < botones.length; i++){
    botones[i].addEventListener("click", verBoton);
}