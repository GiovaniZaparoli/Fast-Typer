$("#btn-frase").click(fraseAleatoria);
$("#btn-frase-id").click(buscaFrase);

function fraseAleatoria() {
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases",trocaFrase).fail(function(){
        $("#erro").toggle();
        setTimeout(function () {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function trocaFrase(data){
    var frase = $(".frase");
    var aleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[aleatorio].texto);
    tamanhoFrase();
    atualizaTempo(data[aleatorio].tempo);
}

function buscaFrase() {
    $("#spinner").toggle();
    var fraseID = $("#frase-id").val();
    var dados = { id: fraseID};
    $.get("http://localhost:3000/frases",dados, trocaFraseEspecifica).fail(function(){
        setTimeout(function () {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function trocaFraseEspecifica(data) {
    var frase = $(".frase");
    frase.text(data.texto);
    tamanhoFrase();
    atualizaTempo(data.tempo)
}
