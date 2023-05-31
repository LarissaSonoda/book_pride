var livrosModel = require("../models/livrosModel");

// var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA livrosController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    livrosModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function listarEdit(req, res) {
    livrosModel.listarEdit()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function maiorEdit(req, res) {
    livrosModel.maiorEdit()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function menorEdit(req, res) {
    livrosModel.menorEdit()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}
function cadastrarLivro(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var capa = req.body.capaServer;
    var sinopse = req.body.sinopseServer;
    var editora = req.body.editoraServer;
    var recomend = req.body.recomendacaoServer;
    var autor = req.body.autorServer;
    var editora = req.body.editoraServer;

    //var linkFotoAutor = req.body.fotoAutorServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (capa == undefined) {
        res.status(400).send("Sua capa está undefined!");
    } else if (sinopse == undefined) {
        res.status(400).send("Sua sinopse está undefined!");
    } else if (editora == undefined) {
        res.status(400).send("Sua editora está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo livrosModel.js
        livrosModel.cadastrarLivro(nome, capa, sinopse, editora)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
function cadRecomend(req, res){
    var livro = req.body.nomeLivroServer;
    var capa = req.body.capaLivroServer;
    var recomendacao = req.body.recomendacaoServer;
    if(recomendacao == undefined){
        res.status(400).send("Sua recomendação está undefined");
    }else if(livro == undefined){
        res.status(400) .send("O nome do livro está undefined");  
    }else if(capa == undefined){
        res.status(400) .send("a capa está undefined");  
    }else{
        livrosModel.cadRecomendacao(recomendacao, capa, livro)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadAut(req, res) {
    var livro = req.body.nomeLivroServer;
    var link = req.body.fotoAutorServer;
    var autor = req.body.autorServer;
    if (autor == undefined) {
        res.status(400).send("Seu autor está undefined!");
    } else if(livro == undefined){
        res.status(400).send("O livro está undefined");   
    }else if(link == undefined){
        res.status(400).send("O livro está undefined");   
    }else {
        livrosModel.cadAut(autor, link, livro)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function cadEdit(req, res) {
    var editora = req.body.editoraServer;
    if (editora == undefined) {
        res.status(400).send("Sua editora está undefined!");
    } else {
        livrosModel.cadEdit(editora)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrarLivro,
    listar,
    listarEdit,
    maiorEdit,
    menorEdit,
    cadRecomend,
    cadAut,
    cadEdit,
    testar
}