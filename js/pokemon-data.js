$(document).ready(function () {

    Handlebars.registerHelper("matematika", function (indeks, operator, broj) {
        let tmpPrvi = parseInt(indeks);
        let tmpDrugi = parseInt(broj);

        return {
            "+": tmpPrvi + tmpDrugi,
            "-": tmpPrvi - tmpDrugi,
            "*": tmpPrvi * tmpDrugi,
            "/": tmpPrvi / tmpDrugi,
            "%": tmpPrvi % tmpDrugi,
        }[operator];
    })

    // https://pokeapi.co/api/v2/pokemon-color/yellow/ - za žute pokemone

//    let xhrRequest = new XMLHttpRequest();
//    xhrRequest.open("GET", "https://pokeapi.co/api/v2/pokemon-color/red/", true)

let popisPokemona = [];

    function prikaziPokemone(podaci) {
        //const resp = JSON.parse(xhrRequest.response);
        //console.log("podaci:" + JSON.stringify(podaci));
        //console.log(podaci);
        const sourceHTML = document.getElementById("lista-pokemona").innerHTML;
        const template = Handlebars.compile(sourceHTML); // koristimo funkcionalnost handlebara za popunjavanje tablice
        //const kontekstPodaci = { pokemon: podaci.pokemon_species.slice(0, 20) };
        const kontekstPodaci = { pokemon: podaci };
        const html = template(kontekstPodaci);

        document.getElementById("div-pokemoni").innerHTML = html;
    }

    function popuniPokemone(podaci) {
        //console.log(JSON.stringify(podaci));
        let nasiPokemoni = podaci.pokemon_species.slice(0, 20);
        nasiPokemoni.forEach((pokemon) => {
            //console.log(pokemon.name + " " + pokemon.url);
            dohvatiDetalje(pokemon);
        });
        //console.log(popisPokemona);
    }

    function dohvatiDetalje(pokemon){
        $.ajax({
            url: pokemon.url
          })
            .done(function(podaci) {
                //console.log("pokemon detalji: " + JSON.stringify(podaci));
                const ime = pokemon.name;
                const url = pokemon.url;
                const habi = podaci.habitat.name;
                const grow = podaci.growth_rate.name;
                //console.log("Pokemon: " + ime + ", habitat: " + habi + ", grow rate: " + grow);
                const trenutniPokemon = {
                    name: ime,
                    url: url,
                    habi: habi,
                    grow: grow
                };
                popisPokemona.push(trenutniPokemon);
            });
    }

    function dodajPruge(){
        $('table tbody tr').removeClass('pruge');
        $('table tbody tr:even').addClass('pruge');
    }

    function dodajHeaderBoju(){
        $('table thead tr').css('background-color', 'darkblue');
        $('table thead tr').css('color', 'white');
    }

    function nakon2Sekunde(){
        setTimeout(function(){
            console.log('nakon 2 sekunde');
            let pokemoniSaSlovomP = $('#div-pokemoni > table > tbody > tr > td').filter(function(){
                return this.innerHTML.indexOf('p') == 0;
            });
            pokemoniSaSlovomP.closest('tr').remove();

            //korigiramo pruge
            dodajPruge();

            //ispisujemo broj obrisanih pokemona
            console.log('maknuto je ' + pokemoniSaSlovomP.length + ' pokemona');

            $('<div id="skriveni"></div>')
                .insertAfter($('#div-pokemoni'))
                .text('Skriveno je ' + pokemoniSaSlovomP.length + ' pokemona');


        }, 2000);
    }

    function registrirajMouseEvent(){
        $('table tr').on('mouseenter', event => {
            $(event.currentTarget).css('backgroundColor', 'magenta');
        });
        $('table tr').on('mouseleave', event => {
            $(event.currentTarget).removeAttr('style');
        });
    }


    function nakonRenderiranjaStraniceOdradi(){
        $('[data-bs-toggle="popover"]').popover();
        dodajPruge();
        dodajHeaderBoju();
        nakon2Sekunde();
        registrirajMouseEvent();
    }

    //funkcija koja će se pozvati na loadu stranice
    //xhrRequest.onload = function () {
//        popuniPokemone();
//        nakonRenderiranjaStraniceOdradi();
//    }

//    xhrRequest.send();


    $(window).resize(() => {
        console.log("Width " + window.innerWidth);
        console.log("Height " + $(window).height());
    })

    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon-color/red/",
        timeout: 1000
      })
        .done(function(primljeni_podaci) {
            popuniPokemone(primljeni_podaci);
            //nakonRenderiranjaStraniceOdradi();
        })
        .fail(function() {
            console.log( "greska pri fetchu" );
            $('<div id="error"></div>')
            .insertAfter($('#div-pokemoni'))
            .text('Nije učitano, pokušaj ponovo. Možda je do timeouta!');
        })
        .always(function() {
            console.log("ovo se uvijek izvodi")
        });

        // TODO - ovo treba na drugačiji način - sa ASYNC i AWAIT jer trebamo čekati na podatke
        // BUG - samo zaobilazno privremeno rješenje
        setTimeout(function(){
            prikaziPokemone(popisPokemona);
        }, 2000);
});
