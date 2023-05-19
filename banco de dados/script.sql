CREATE DATABASE bookPride;
USE bookPride;


CREATE TABLE Editora(
	idEditora int primary key auto_increment,
    nomeEditora varchar(45)
);

CREATE TABLE Autor(
	idAutor int primary key auto_increment,
    nomeAutor varchar(60)
);

CREATE TABLE Recomendacao(
	idRecomendacao int primary key auto_increment,
    recomendacao varchar(400)
);
CREATE TABLE Livro(
	idLivro int Primary key auto_increment,
    nome varchar(45),
    linkCapa varchar(200),
    Sinopse varchar(400),
    fkEditora int,
    fkRecomendacao int,
    FOREIGN KEY (fkEditora) REFERENCES Editora(idEditora),
    FOREIGN KEY (fkRecomendacao) REFERENCES Recomendacao(idRecomendacao)
);
CREATE TABLE LivroAutor(
	fkLivro int, 
    fkAutor int,
    FOREIGN KEY (fkLivro) REFERENCES Livro(idLivro),
    FOREIGN KEY (fkAutor) REFERENCES Autor(idAutor)
);
CREATE TABLE Comentario(
	idComentario int primary key auto_increment,
    comentario
);

