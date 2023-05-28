CREATE DATABASE bookPride;
USE bookPride;

CREATE TABLE Editora(
	idEditora int primary key auto_increment,
    nomeEditora varchar(45) NOT NULL
);

CREATE TABLE Autor(
	idAutor int primary key auto_increment,
    nomeAutor varchar(60) NOT NULL,
    linkFoto varchar(200)
);

CREATE TABLE Recomendacao(
	idRecomendacao int primary key auto_increment,
    recomendacao varchar(400) NOT NULL
);
CREATE TABLE Livro (
    idLivro INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    linkCapa VARCHAR(200) NOT NULL,
    Sinopse VARCHAR(400) NOT NULL,
    fkEditora INT,
    fkRecomendacao INT,
    FOREIGN KEY (fkEditora)
        REFERENCES Editora (idEditora),
    FOREIGN KEY (fkRecomendacao)
        REFERENCES Recomendacao (idRecomendacao)
);
CREATE TABLE LivroAutor(
	fkLivro int NOT NULL, 
    fkAutor int NOT NULL,
    FOREIGN KEY (fkLivro) REFERENCES Livro(idLivro),
    FOREIGN KEY (fkAutor) REFERENCES Autor(idAutor)
);
/*CREATE TABLE Comentario(
	idComentario int primary key auto_increment,
    comentario varchar(400)
);*/

