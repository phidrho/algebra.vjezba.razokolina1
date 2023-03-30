Handlebars.registerHelper("matematika", function(indeks, operator, broj){
    let tmpPrvi = parseInt(indeks);
    let tmpDrugi = parseInt(broj);

    return {
        "+" : tmpPrvi + tmpDrugi,
        "-" : tmpPrvi - tmpDrugi,
        "*" : tmpPrvi * tmpDrugi,
        "/" : tmpPrvi / tmpDrugi,
        "%" : tmpPrvi % tmpDrugi,
    }[operator];
})

// https://pokeapi.co/api/v2/pokemon-color/yellow/

let xhrRequest = new XMLHttpRequest();
xhrRequest.open("GET", "https://pokeapi.co/api/v2/pokemon-color/yellow/", true)

function popuniPokemone(){
    const resp = JSON.parse(xhrRequest.response);
//    console.log(resp)
    const sourceHTML = document.getElementById("lista-pokemona").innerHTML;
    const template = Handlebars.compile(sourceHTML); // koristimo funkcionalnost handlebara za popunjavanje tablice
    const kontekstPodaci = {pokemon: resp.pokemon_species.slice(0,20)};
    const html = template(kontekstPodaci);

    document.getElementById("div-pokemoni").innerHTML = html;
}

//funkcija koja će se pozvati na loadu stranice
xhrRequest.onload = function(){
    popuniPokemone();
}

xhrRequest.send();
