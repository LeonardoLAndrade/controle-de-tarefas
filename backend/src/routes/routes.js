const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/usuariosController.js");

router.post("/cadastro", UsuariosController.Insert);

module.exports = router;
