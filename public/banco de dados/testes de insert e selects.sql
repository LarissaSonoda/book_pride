use bookPride;

-- INSERIR A EDITORA CASO NÃO EXISTA
INSERT INTO Editora (nomeEditora)
SELECT * FROM (SELECT 'Arqueiro') AS tmp
WHERE NOT EXISTS (
    SELECT nomeEditora FROM Editora WHERE nomeEditora = 'Arqueiro'
) LIMIT 1;

SELECT * FROM Editora;
SELECT * FROM Livro;
DELETE FROM Livro WHERE idLivro=6;
SELECT * FROM LivroAutor;
DELETE FROM LivroAutor WHERE fkLivro=3 AND fkAutor=2;
SELECT * FROM Autor;
SELECT * FROM Recomendacao;

INSERT INTO Autor (nomeAutor)
SELECT * FROM (SELECT 'Elayne Baeta') AS tmp
WHERE NOT EXISTS (
    SELECT nomeAutor FROM Autor WHERE nomeAutor = 'Elayne Baeta'
) LIMIT 1;

INSERT INTO Livro (nome, linkCapa, Sinopse, fkEditora) VALUES ('oxe, baby', 'https://m.media-amazon.com/images/I/41-Yxk7ihKL.jpg', 'Novo livro de poemas de elayne baeta', 
(SELECT idEditora FROM Editora WHERE nomeEditora = 'Galera'));

SELECT * FROM Livro;
INSERT INTO Recomendacao VALUES (null, 'Conectadas é simplesmente um livro incrível com o cenário perfeito: O Centro de São Paulo');
SELECT * FROM recomendacao;
UPDATE Livro SET fkEditora=6 WHERE idLivro=11;
SELECT L.*, A.linkFoto, A.nomeAutor, E.nomeEditora, R.recomendacao FROM Livro as L 
			INNER JOIN LivroAutor AS LA ON L.idLivro=LA.fkLivro 
            INNER JOIN Autor AS A ON LA.fkAutor=A.idAutor
			INNER JOIN Editora AS E ON E.idEditora=L.fkEditora
            INNER JOIN Recomendacao as R ON L.fkRecomendacao=R.idRecomendacao;

SELECT * FROM Livro;
INSERT INTO Editora VALUES (null, 'Abril');
SELECT count(L.idLivro) AS Editora, E.nomeEditora, E.idEditora FROM Livro as L 
			INNER JOIN Editora AS E ON L.fkEditora=E.idEditora GROUP BY E.idEditora;
            
-- descobrir a editora com mais livros vendidos
SELECT max(B.qtde), n.nomeEditora FROM (SELECT M.idLivro ,count(L.idLivro) AS qtde FROM Livro as L INNER JOIN Livro as M ON M.idLivro=L.idLivro GROUP BY M.fkEditora)
 as B JOIN Editora ON ;
            

SELECT count(K.T) AS Todas ,max(K.qtde) as QTDE, K.nome as NOME FROM (SELECT count(L.idLivro) AS T ,count(L.idLivro) AS qtde, E.nomeEditora as nome FROM Livro as L 
			RIGHT OUTER JOIN Editora AS E ON L.fkEditora=E.idEditora GROUP BY E.idEditora) as K WHERE K.nome=(SELECT B.nomeEditora as editora FROM Editora AS B 
            WHERE (SELECT max(K.T) AS ble FROM Livro as Y LIMIT 1) = K.QTDE) GROUP BY K.nome LIMIT 1;
            
-- EDITORA COM MENOS LIVROS
SELECT min(K.qtde) as QTDE, min(K.nome) as NOME FROM (SELECT count(L.idLivro) AS qtde, E.nomeEditora as nome FROM Livro as L 
			INNER JOIN Editora AS E ON L.fkEditora=E.idEditora GROUP BY E.idEditora) as K;
            
SELECT max(M.Qtde), M.fk AS 'MaisFamosa' FROM (SELECT count(L.idLivro) AS 'Qtde' , E.nomeEditora as 'nome', L.fkEditora as 'fk' FROM Livro as L 
			INNER JOIN Editora AS E ON L.fkEditora=E.idEditora GROUP BY E.idEditora) as M GROUP BY M.fk LIMIT 1;

SELECT min(M.Qtde), EM.nomeEditora AS 'MaisFamosa' FROM (SELECT count(L.idLivro) AS 'Qtde' , E.nomeEditora as 'nome', L.fkEditora as 'idEdit' FROM Livro as L 
			RIGHT JOIN Editora AS E ON L.fkEditora=E.idEditora GROUP BY E.idEditora) as M RIGHT JOIN Editora AS EM ON M.idEdit=EM.idEditora GROUP BY EM.idEditora;