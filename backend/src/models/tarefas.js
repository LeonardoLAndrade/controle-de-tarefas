const Sequelize = require("sequelize");
const sequelize = require("../database/database.js");

const Tarefas = sequelize.define(
  "tarefas",
  {
    codigo: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING(30),
      validate: {
        len: [3, 30],
      },
    },
    tipo: {
      allowNull: false,
      type: Sequelize.CHAR(1),
      validate: {
        isIn: {
          args: [["D", "S", "Q", "M"]],
          msg: "O campo 'direito' deve ser 'D' (Diária), 'S' (Semanal), 'Q' (Quinzenal) ou 'M' (Mensal).",
        },
      },
    },
  },
  {
    timestamps: false, // não adicionar os campos createdAt e updatedAt automaticamente
  }
);

module.exports = Tarefas;
