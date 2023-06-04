function ver(){
    var paginas = ipt_qtdPag.value;
    var dias = ipt_qtdDias.value;

    var resultadoMinutos = paginas*1.7;
    var resultadoDias = (resultadoMinutos/dias).toFixed();

    var i = document.getElementById("main");
    var resultado = document.getElementById("result");
    var result = document.getElementById("resposta");
    i.style.display="none";
    
    resultado.style.display="block";
    result.innerHTML = `<h2>Você terá que ler cerca de <b>${resultadoDias} minutos por dia</b> para concluir o livro na sua meta</h2>`
}