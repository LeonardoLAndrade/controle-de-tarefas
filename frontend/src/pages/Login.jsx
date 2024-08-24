import Input from "../components/Input";
import "./Login.css";
import Label from "../components/Label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { DefineUserLogado } from "../redux/usuarioLogadoSlice";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    codigo: "",
    senha: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario.codigo && usuario.senha) {
      fetch(`http://localhost:3003/sistema/usuarios/${usuario.codigo}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 404) {
            toast.error("Código de usuário não cadastrado.");
          }
          throw new Error("Erro ao buscar usuarios");
        })
        .then((data) => {
          if (usuario.senha === data.senha) {
            dispatch(
              DefineUserLogado({
                codigo: data.codigo,
                nome: data.nome,
                direito: data.direito,
              })
            );
            toast.success("Usuário logado com sucesso!");
            setTimeout(() => navigate("/principal"), 1500);
          } else {
            toast.error("Senha incorreta.");
          }
        })
        .catch((e) => {
          toast.error("Erro ao fazer login.");
        });
    }
  };
  return (
    <div className="mid">
      <h1 className="text-center">Controle de Tarefas</h1>
      <div className="box">
        <form
          className="row g-2 form"
          action="/principal"
          onSubmit={handleSubmit}
        >
          <div className="col-md-3">
            <Label htmlFor="codUsuario" text="Usuário" />
            <Input
              type="number"
              id="codUsuario"
              name="codigo"
              placeholder="Cod."
              value={usuario.codigo}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <Label htmlFor="senha" text="Senha" />
            <Input
              type="password"
              id="senha"
              name="senha"
              placeholder="Insira a senha"
              value={usuario.senha}
              onChange={handleChange}
            />
          </div>
          <div className="col-9">
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
