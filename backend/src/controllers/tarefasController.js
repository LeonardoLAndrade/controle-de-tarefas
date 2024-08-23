const Tarefas = require("../models/tarefas.js");
const status = require("http-status");

exports.Insert = (req, res, next) => {
  const { nome, tipo } = req.body;

  Tarefas.create({
    nome: nome,
    tipo: tipo,
  })
    .then((tarefa) => {
      if (tarefa) {
        res.status(status.OK).send(tarefa);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};

exports.SearchAll = (req, res, next) => {
  Tarefas.findAll()
    .then((tarefas) => {
      if (tarefas) {
        res.status(status.OK).send(tarefas);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};

exports.SearchOne = (req, res, next) => {
  const codigo = req.params.id;

  Tarefas.findByPk(codigo)
    .then((tarefa) => {
      if (tarefa) {
        res.status(status.OK).send(tarefa);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};

exports.GetNextTaskId = (req, res, next) => {
  Tarefas.max("codigo")
    .then((maxId) => {
      console.log("Max ID:", maxId); // Adicione este log
      const nextId = maxId ? maxId + 1 : 1; // Se maxId for nulo, começa do 1
      res.status(status.OK).json({ nextId });
    })
    .catch((error) => next(error));
};
