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

    function popuniPokemone(podaci) {
        //const resp = JSON.parse(xhrRequest.response);
        //console.log("podaci:" + JSON.stringify(podaci));
        const sourceHTML = document.getElementById("lista-pokemona").innerHTML;
        const template = Handlebars.compile(sourceHTML); // koristimo funkcionalnost handlebara za popunjavanje tablice
        const kontekstPodaci = { pokemon: podaci.pokemon_species.slice(0, 20) };
        const html = template(kontekstPodaci);

        document.getElementById("div-pokemoni").innerHTML = html;

        $('[data-bs-toggle="popover"]').popover();
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
        timeout: 100
      })
        .done(function(primljeni_podaci) {
            popuniPokemone(primljeni_podaci);
            nakonRenderiranjaStraniceOdradi();
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
});
