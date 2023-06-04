var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT L.*, A.linkFoto, A.nomeAutor, E.nomeEditora, R.recomendacao FROM Livro as L 
			INNER JOIN LivroAutor AS LA ON L.idLivro=LA.fkLivro 
            INNER JOIN Autor AS A ON LA.fkAutor=A.idAutor
			INNER JOIN Editora AS E ON E.idEditora=L.fkEditora
            INNER JOIN Recomendacao as R ON L.fkRecomendacao=R.idRecomendacao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function listarEdit() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT count(L.idLivro) AS 'Qtde', E.nomeEditora FROM Livro as L 
			RIGHT JOIN Editora AS E ON L.fkEditora=E.idEditora GROUP BY E.idEditora;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listLivroById(idLivro) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT L.*, E.nomeEditora, A.nomeAutor, R.recomendacao FROM Livro AS L JOIN Editora AS E ON L.fkEditora=E.idEditora 
            JOIN Recomendacao AS R ON L.fkRecomendacao=R.idRecomendacao
			JOIN LivroAutor as LA ON LA.fkLivro=L.idLivro
            JOIN Autor AS A ON LA.fkAutor=A.idAutor AND L.idLivro=${idLivro};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarAuts() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT count(L.idLivro) as qtdeLiv, A.nomeAutor FROM Livro AS L INNER JOIN
	LivroAutor AS LA ON L.idLivro=LA.fkLivro JOIN 
    Autor AS A ON A.idAutor=LA.fkAutor GROUP BY A.idAutor;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function maiorEdit() {
    console.log("ACESSEI O LIVROS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maiorEdit()");
    var instrucao = `
    SELECT max(K.qtde) as QTDE, max(K.nome) as NOME FROM (SELECT count(L.idLivro) AS qtde, E.nomeEditora as nome FROM Livro as L 
			INNER JOIN Editora AS E ON L.fkEditora=E.idEditora GROUP BY E.idEditora) as K;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function menorEdit() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT min(K.qtde) as QTDE, min(K.nome) as NOME FROM (SELECT count(L.idLivro) AS qtde, E.nomeEditora as nome FROM Livro as L 
			RIGHT JOIN Editora AS E ON L.fkEditora=E.idEditora GROUP BY E.idEditora) as K;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadAut(nomeAutor, linkFoto) {
    var instrucao_1 = `
    INSERT INTO Autor (nomeAutor, linkFoto)
    SELECT * FROM (SELECT '${nomeAutor}', '${linkFoto}') AS tmp
    WHERE NOT EXISTS (
        SELECT nomeAutor FROM Autor WHERE nomeAutor = '${nomeAutor}'
    ) LIMIT 1;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucao_1);
    
    
    return database.executar(instrucao_1);
}
function cadLivAut(nomeLivro,nomeAutor){
    var instrucao_2 = `INSERT INTO LivroAutor VALUES ((SELECT idLivro FROM Livro where nome='${nomeLivro}'), (SELECT idAutor FROM Autor WHERE nomeAutor='${nomeAutor}'));`;
    console.log("Executando a instrução SQL: \n" + instrucao_2);
    return database.executar(instrucao_2);
}
function cadEdit(nomeEditora, nomeLivro, capa) {
    var instrucao_2 = `INSERT INTO Editora (nomeEditora)
        SELECT * FROM (SELECT '${nomeEditora}') AS tmp
        WHERE NOT EXISTS (
            SELECT nomeEditora FROM Editora WHERE nomeEditora = '${nomeEditora}'
        ) LIMIT 1;`;
    console.log("Executando a instrução SQL: \n" + instrucao_2);
    
    // var instrucao_3 = `UPDATE Livro SET fkEditora = (SELECT idEditora FROM Editora WHERE nomeEditora='${nomeEditora}') WHERE idLivro=(SELECT idLivro as id FROM (SELECT idLivro FROM Livro WHERE nome='${nomeLivro}' AND linkCapa='${capa}') as LR)`;
    // console.log("Executando a instrução SQL: \n" + instrucao_3);

    return database.executar(instrucao_2); //, database.executar(instrucao_3);
}
function cadRecomendacao(recomendacao, capa, nomeLivro){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", recomendacao);
    var instrucao = `INSERT INTO Recomendacao (recomendacao) VALUES ('${recomendacao}');`;

    var instrucao_2 = `UPDATE Livro SET fkRecomendacao = (SELECT idRecomendacao FROM Recomendacao WHERE recomendacao='${recomendacao}') WHERE idLivro=(SELECT idLivro as id FROM (SELECT idLivro FROM Livro WHERE nome='${nomeLivro}' AND linkCapa='${capa}') as LR)`;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao), database.executar(instrucao_2);
}
function cadastrarLivro(nome, link, Sinopse, nomeEditora) {
    //cadRecomendacao(recomendacao);
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, link, Sinopse, nomeEditora);

    var instrucao = `
        INSERT INTO Livro (idLivro, nome, linkCapa, Sinopse, fkEditora) VALUES (NULL, '${nome}', '${link}', '${Sinopse}', (SELECT idEditora FROM Editora WHERE nomeEditora = '${nomeEditora}'));`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);


    return database.executar(instrucao), cadEdit(nomeEditora, nome, link);
}


module.exports = {
    cadastrarLivro,
    cadRecomendacao,
    maiorEdit,
    menorEdit,
    listLivroById,
    listarAuts,
    cadAut,
    cadLivAut,
    cadEdit,
    listar,
    listarEdit
};