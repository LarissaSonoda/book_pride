use bookPride;

-- INSERIR A EDITORA CASO NÃO EXISTA
INSERT INTO Editora (nomeEditora)
SELECT * FROM (SELECT 'Galera') AS tmp
WHERE NOT EXISTS (
    SELECT nomeEditora FROM Editora WHERE nomeEditora = 'Galera'
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
UPDATE Livro SET fkRecomendacao=4 WHERE idLivro=1;
SELECT L.*, A.linkFoto, A.nomeAutor, E.nomeEditora, R.recomendacao FROM Livro as L 
			INNER JOIN LivroAutor AS LA ON L.idLivro=LA.fkLivro 
            INNER JOIN Autor AS A ON LA.fkAutor=A.idAutor
			INNER JOIN Editora AS E ON E.idEditora=L.fkEditora
            INNER JOIN Recomendacao as R ON L.fkRecomendacao=R.idRecomendacao;

