const Sequelize = require("sequelize");
const sequelize = require("../database/database.js");
const Usuarios = require("./usuarios.js");
const Tarefas = require("./tarefas.js");

const UsuarioTarefas = sequelize.define(
  "usuario_tarefas",
  {
    cod_usuario: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: "usuarios", // nome da tabela de referência
        key: "codigo", // chave primária da tabela de referência
      },
    },
    cod_tarefa: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: "tarefas", // nome da tabela de referência
        key: "codigo", // chave primária da tabela de referência
      },
    },
  },
  {
    timestamps: false, // não adicionar os campos createdAt e updatedAt automaticamente
  }
);

UsuarioTarefas.belongsTo(Usuarios, {
  foreignKey: "cod_usuario",
});

UsuarioTarefas.belongsTo(Tarefas, {
  foreignKey: "cod_tarefa",
});

module.exports = UsuarioTarefas;
