const Sequelize = require("sequelize");
const sequelize = require("../database/database.js");

const Usuarios = sequelize.define(
  "usuarios",
  {
    codigo: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING(50),
      validate: {
        len: [5, 50],
      },
    },
    direito: {
      allowNull: false,
      type: Sequelize.CHAR(1),
      validate: {
        isIn: {
          args: [["O", "S"]],
          msg: "O campo 'direito' deve ser 'O' (Operador) ou 'S' (Supervisor).",
        },
      },
    },
    senha: {
      allowNull: false,
      type: Sequelize.CHAR(12),
      validate: {
        len: {
          args: [12, 12], // O primeiro e o segundo valores são iguais para garantir que sejam exatamente 12 caracteres
          msg: "A senha deve ter 12 caracteres.",
        },
      },
    },
  },
  {
    timestamps: false, // não adicionar os campos createdAt e updatedAt automaticamente
  }
);

module.exports = Usuarios;
