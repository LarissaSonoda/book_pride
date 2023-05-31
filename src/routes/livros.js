var express = require("express");
var router = express.Router();

var livrosController = require("../controllers/livrosController");

router.get("/listar", function (req, res) {
    livrosController.listar(req, res);
});
router.get("/listarEdit", function (req, res) {
    livrosController.listarEdit(req, res);
});

router.get("/menorEdit", function (req, res) {
    livrosController.menorEdit(req, res);
});
router.get("/maiorEdit", function (req, res) {
    livrosController.maiorEdit(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarLivro", function (req, res) {
    livrosController.cadastrarLivro(req, res);
})

router.post("/cadastrarAut", function (req, res) {
    livrosController.cadAut(req, res);
})

router.post("/cadastrarEdit", function (req, res) {
    livrosController.cadEdit(req, res);
})

router.post("/cadastrarRecomend", function (req, res) {
    livrosController.cadRecomend(req, res);
})


module.exports = router;