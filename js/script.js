var erro = 0;
function cadastrar() {
    erro = 0;
    var nome = ipt_nome.value;
    var autor = ipt_autor.value;
    var editora = ipt_editora;
    var sinopse = txt_sinopse.value;
    var recomendacao = txt_recomendacao.value;
    var capa = ipt_linkCapa.value;

    if(nome.length < 4 || autor == '' || editora == '' || sinopse == '' || recomendacao == '' || capa == ''){
        alert("Preencha corretamente os campos")
        erro = 1;
    }
    if(erro == 0){
        document.getElementById("tela2").style.display = "block";
        document.getElementById("inicial").style.display = "none";
    }
}

function cadAutor(){
    document.getElementById("main").style.display = "block";
    document.getElementById("formulario").style.display = "none";
}
function voltar() {
    window.location.assign('../home.html');
}