const express = require("express");
const router = express.Router();
const UsuariosController = require("../controllers/usuariosController.js");
const TarefasController = require("../controllers/tarefasController.js");
const UsuarioTarefasController = require("../controllers/usuarioTarefasController.js");

router.get("/usuarios/", UsuariosController.SearchAll);
router.get("/usuarios/nextId", UsuariosController.GetNextUserId);
router.get("/usuarios/:id", UsuariosController.SearchOne);
router.post("/cadastro", UsuariosController.Insert);

router.get("/tarefas/", TarefasController.SearchAll);
router.get("/tarefas/nextId", TarefasController.GetNextTaskId);
router.get("/tarefas/:id", TarefasController.SearchOne);
router.post("/novaTarefa", TarefasController.Insert);

router.get("/TarefasDoUsuario", UsuarioTarefasController.SearchAllTarefas);
router.post("/novaTarefaUsuario", UsuarioTarefasController.Insert);

module.exports = router;
