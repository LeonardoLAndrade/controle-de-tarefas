const UsuarioTarefas = require("../models/usuario_tarefas.js");
const Tarefas = require("../models/tarefas");
const status = require("http-status");

exports.Insert = (req, res, next) => {
  const { cod_usuario, cod_tarefa } = req.body;

  UsuarioTarefas.create({
    cod_usuario: cod_usuario,
    cod_tarefa: cod_tarefa,
  })
    .then((usuarioTarefa) => {
      if (usuarioTarefa) {
        res.status(status.OK).send(usuarioTarefa);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};

exports.SearchAllTarefas = (req, res, next) => {
  const { cod_usuario } = req.query;

  UsuarioTarefas.findAll({
    where: {
      cod_usuario: cod_usuario,
    },
    include: [Tarefas], // Inclui as informações da tarefa associada (relacionamento definido)
  })
    .then((tarefas) => {
      if (tarefas.length > 0) {
        res.status(status.OK).send(tarefas);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};

exports.SearchOne = (req, res, next) => {
  const { cod_usuario, cod_tarefa } = req.query;

  UsuarioTarefas.findOne({
    where: {
      cod_usuario: cod_usuario,
      cod_tarefa: cod_tarefa,
    },
  })
    .then((usuarioTarefas) => {
      if (usuarioTarefas) {
        res.status(status.OK).send(usuarioTarefas);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};
