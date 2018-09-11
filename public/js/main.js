var tempoInicial = $("#tempo-digitacao").text();
var campoDigitacao = $("#campo-digitacao");

$(document).ready(function(){
    tamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#btn-reiniciar").click(reiniciaJogo);
});

function tamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campoDigitacao.on("input", function() {
        var conteudo = campoDigitacao.val();
        var quantidadePalavras = conteudo.split(/\S+/).length - 1;
        var quantidadeCaracteres = conteudo.length;
        $("#contador-palavras").text(quantidadePalavras);
        $("#contador-caracteres").text(quantidadeCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campoDigitacao.one("focus", function() {
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            if(tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campoDigitacao.attr("disabled", true);
    campoDigitacao.toggleClass("game-over");
    inserePlacar();
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campoDigitacao.on("input", function(){
        var digitado = campoDigitacao.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campoDigitacao.addClass("campo-correto");
            campoDigitacao.removeClass("campo-errado");
        } else {
            campoDigitacao.addClass("campo-errado");
            campoDigitacao.removeClass("campo-correto");
        }
    });
}

function reiniciaJogo() {
    campoDigitacao.attr("disabled", false);
    campoDigitacao.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campoDigitacao.toggleClass("game-over");
    campoDigitacao.removeClass("campo-correto");
    campoDigitacao.removeClass("campo-errado");
}
