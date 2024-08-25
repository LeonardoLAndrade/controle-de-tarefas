import Input from "../components/Input";
import "./Cadastro.css";
import Label from "../components/Label";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [nextUserId, setNextUserId] = useState(null);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    direito: "",
    senha: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3003/sistema/usuarios/nextId")
      .then((response) => response.json())
      .then((data) => {
        setNextUserId(data.nextId);
      })
      .catch((error) => toast.error("Erro ao buscar o próximo ID de usuário."));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario({ ...novoUsuario, [name]: value });
  };

  const handleSelectChange = (e) => {
    const value = e.currentTarget.value;
    setNovoUsuario((prev) => ({ ...prev, direito: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novoUsuario.nome && novoUsuario.direito && novoUsuario.senha) {
      if (novoUsuario.senha.length === 12) {
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
          })
          .then((data) => {
            setNovoUsuario({
              nome: "",
              direito: "",
              senha: "",
            });
            setNextUserId(nextUserId + 1); // Atualiza o próximo ID
            toast.success("Usuário cadastrado com sucesso!");
          })
          .catch((error) => {
            toast.error("Erro ao cadastrar usuário.");
          });
      } else {
        toast.error(
          `A senha deve possuir 12 caracteres. Atual: ${novoUsuario.senha.length}`
        );
      }
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className="mid">
        <h1 className="text-center">Cadastro de Usuários</h1>
        <div className="box">
          <form className="mb-3" onSubmit={() => navigate("/principal")}>
            <div className="col-2">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: "0rem 0.7rem ",
                  backgroundColor: "#0d6efd80",
                  borderColor: "#0d6efd80",
                }}
              >
                <span style={{ fontSize: "1.6rem" }}>&crarr;</span>
              </button>
            </div>
          </form>
          <form className="row g-2 form" onSubmit={handleSubmit}>
            <div className="col-md-3">
              <Label htmlFor="codUsuario" text="Cod. Usuário" />
              <Input
                type="number"
                id="codUsuario"
                value={nextUserId || ""}
                readonly={true}
              />
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
              <button type="submit" className="btn btn-primary mt-2">
                Cadastrar
              </button>
            </div>
            <div className="col-3"></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cadastro;
