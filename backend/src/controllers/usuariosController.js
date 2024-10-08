const Usuarios = require("../models/usuarios.js");
const status = require("http-status");

exports.Insert = (req, res, next) => {
  const { nome, direito, senha } = req.body;

  Usuarios.create({
    nome: nome,
    direito: direito,
    senha: senha,
  })
    .then((usuario) => {
      if (usuario) {
        res.status(status.OK).send(usuario);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};

exports.SearchAll = (req, res, next) => {
  Usuarios.findAll()
    .then((usuarios) => {
      if (usuarios) {
        res.status(status.OK).send(usuarios);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};

exports.SearchOne = (req, res, next) => {
  const codigo = req.params.id;

  Usuarios.findByPk(codigo)
    .then((usuario) => {
      if (usuario) {
        res.status(status.OK).send(usuario);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => next(error));
};

exports.GetNextUserId = (req, res, next) => {
  Usuarios.max("codigo")
    .then((maxId) => {
      console.log("Max ID:", maxId); // Adicione este log
      const nextId = maxId ? maxId + 1 : 1; // Se maxId for nulo, começa do 1
      res.status(status.OK).json({ nextId });
    })
    .catch((error) => next(error));
};
