// https://pokeapi.co/api/v2/pokemon-color/yellow/

let xhrRequest = new XMLHttpRequest();
xhrRequest.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow/", true)

function popuniPokemone(){
    const resp = JSON.parse(xhrRequest.response);

    console.log(resp)
}

//funkcija koja će se pozvati na loadu stranice
xhrRequest.onload = function(){
    popuniPokemone();
}

xhrRequest.send();
