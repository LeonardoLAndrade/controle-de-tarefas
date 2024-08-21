const http = require("http");
const express = require("express");
const status = require("http-status");
const sequelize = require("./src/database/database.js");
const app = express();
const routes = require("./src/routes/routes.js");
const cors = require("cors");

// Importar todos os modelos
const Usuarios = require("./src/models/usuarios.js");
const Tarefas = require("./src/models/tarefas.js");
const UsuarioTarefas = require("./src/models/usuario_tarefas.js");

app.use(express.json());

app.use(cors());

app.use("/sistema", routes);

app.use((req, res, next) => {
  res.status.apply(status.NOT_FOUND).send("Page not found");
});

app.use((req, res, next) => {
  res.status.apply(status.INTERNAL_SERVER_ERROR).json({ error });
});

const syncDatabase = async () => {
  try {
    // Sincronizar a tabela 'usuarios' primeiro
    await Usuarios.sync({ force: false });
    console.log("Tabela 'usuarios' sincronizada.");

    // Sincronizar a tabela 'tarefas' depois
    await Tarefas.sync({ force: false });
    console.log("Tabela 'tarefas' sincronizada.");

    // Sincronizar a tabela 'usuario_tarefas' por último
    await UsuarioTarefas.sync({ force: false });
    console.log("Tabela 'usuario_tarefas' sincronizada.");

    // Iniciar o servidor
    const port = 3003;
    app.set("port", port);
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao sincronizar as tabelas:", error);
  }
};

syncDatabase();
