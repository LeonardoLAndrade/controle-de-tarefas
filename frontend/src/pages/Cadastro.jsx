import Input from "../components/Input";
import "./Cadastro.css";
import Label from "../components/Label";
import { useState } from "react";
import { toast } from "react-toastify";

const Cadastro = () => {
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    direito: "",
    senha: "",
  });

  const handleChange = (e) => {
    console.log("handleChange");
    const { name, value } = e.target;
    setNovoUsuario({ ...novoUsuario, [name]: value });
  };

  const handleSelectChange = (e) => {
    const value = e.currentTarget.value;
    setNovoUsuario((prev) => ({ ...prev, direito: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(novoUsuario.nome, novoUsuario.direito, novoUsuario.senha);
    if (novoUsuario.nome && novoUsuario.direito && novoUsuario.senha) {
      fetch("http://localhost:3003/sistema/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to add event");
        })
        .then((data) => {
          setNovoUsuario({
            nome: "",
            direito: "",
            senha: "",
          });
          toast.success("Evento adicionado com sucesso!");
        })
        .catch((error) => {
          toast.error("Erro ao adicionar evento.");
        });
    }
  };

  return (
    <div className="mid">
      <h1 className="text-center">Cadastro de Usuários</h1>
      <div className="box">
        <form
          className="row g-2 form"
          action="/novaTarefa"
          onSubmit={handleSubmit}
        >
          <div className="col-md-3">
            <Label htmlFor="codUsuario" text="Cod. Usuário" />
            <Input type="number" id="codUsuario" readonly={true} />
          </div>
          <div className="col-md-9">
            <Label htmlFor="nome" text="Nome do Novo Usuário" />
            <Input
              type="text"
              id="nome"
              name="nome"
              value={novoUsuario.nome}
              placeholder="Insira o nome do novo usuário"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <Label htmlFor="direito" text="Direitos" />
            <select
              id="direito"
              className="form-select"
              required
              onChange={handleSelectChange}
              value={novoUsuario.direito}
            >
              <option value="">Escolha...</option>
              <option value="O">Operador</option>
              <option value="S">Supervisor</option>
            </select>
          </div>
          <div className="col-md-3">
            <Label htmlFor="senha" text="Senha" />
            <Input
              type="password"
              id="senha"
              placeholder="Insira a senha"
              onChange={handleChange}
              name="senha"
              value={novoUsuario.senha}
            />
          </div>
          <div className="col-md-6"></div>
          <div className="col-9">
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </div>
          <div className="col-md-3"></div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
