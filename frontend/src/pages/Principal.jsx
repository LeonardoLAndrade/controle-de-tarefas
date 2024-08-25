import { useEffect, useState } from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import "./Principal.css";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { DefineUser } from "../redux/usuarioAtualSlice";
import { useNavigate } from "react-router-dom";

const Principal = () => {
  const [usuariosCadastrados, setUsuariosCadastrados] = useState([]);
  const [tarefas, setTarefas] = useState([{}]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { usuarioLogado } = useSelector(
    (rootReducer) => rootReducer.usuarioLogadoReducer
  );

  const usuarioSelecionadoInicial = {
    codigo: "",
    nome: "",
    direito: "",
  };

  const { usuarioEscolhido } = useSelector(
    (rootReducer) => rootReducer.usuarioAtualReducer
  );

  const [usuarioSelecionado, setUsuarioSelecionado] = useState(
    usuarioEscolhido | usuarioSelecionadoInicial
  );

  useEffect(() => {
    fetch("http://localhost:3003/sistema/usuarios")
      .then((response) => response.json())
      .then((data) => {
        setUsuariosCadastrados(data);
      })
      .catch((error) => toast.error("Erro ao buscar usuários."));
  }, []);

  const handleUsuarioChange = async (e) => {
    const codigo = e.currentTarget.value;

    if (codigo !== "") {
      try {
        // Primeiro fetch para obter os detalhes do usuário
        const userResponse = await fetch(
          `http://localhost:3003/sistema/usuarios/${codigo}`
        );
        const userData = await userResponse.json();

        setUsuarioSelecionado((prev) => ({
          ...prev,
          codigo: userData.codigo,
          nome: userData.nome,
          direito: userData.direito,
        }));

        dispatch(
          DefineUser({
            ...usuarioSelecionado, // Preserva as propriedades existentes
            codigo: userData.codigo,
            nome: userData.nome,
            direito: userData.direito,
          })
        );

        // Segundo fetch para obter as tarefas do usuário
        const tarefasResponse = await fetch(
          `http://localhost:3003/sistema/TarefasdoUsuario?cod_usuario=${codigo}`
        );

        if (tarefasResponse.ok) {
          const tarefasData = await tarefasResponse.json();
          setTarefas(tarefasData);

          dispatch(
            DefineUser({
              ...usuarioSelecionado, // Novamente, preserva as propriedades existentes
              codigo: userData.codigo,
              nome: userData.nome,
              direito: userData.direito,
              tarefas: tarefasData, // Adiciona as tarefas ao estado do usuário
            })
          );
        } else {
          setTarefas([]);
        }
      } catch (error) {
        toast.error("Erro ao buscar dados do usuário ou tarefas.");
        setTarefas([]);
      }
    } else {
      // Se "Escolha..." for selecionado
      setUsuarioSelecionado(usuarioSelecionadoInicial);
      dispatch(DefineUser(usuarioSelecionadoInicial));
      setTarefas([]);
    }
  };

  useEffect(() => {
    if (
      usuarioEscolhido?.codigo !== undefined &&
      usuarioEscolhido?.codigo !== ""
    ) {
      fetch(
        `http://localhost:3003/sistema/TarefasdoUsuario?cod_usuario=${usuarioEscolhido?.codigo}`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(
            DefineUser({
              ...usuarioEscolhido, // Novamente, preserva as propriedades existentes
              codigo: usuarioEscolhido.codigo,
              nome: usuarioEscolhido.nome,
              direito: usuarioEscolhido.direito,
              tarefas: data,
            })
          );
        })
        .catch((error) => toast.error("Erro ao atualizar tarefas."));
    }
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (usuarioLogado.direito === "S") {
      navigate("/cadastro");
    } else {
      toast.error("Usuário não possui permissão.");
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (usuarioEscolhido?.codigo) {
      navigate("/novaTarefa");
    } else {
      toast.error("Selecione um usuário.");
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
      <div className="center">
        <h1 className="text-center">Controle de Tarefas</h1>
        <div className="box">
          <form className="row g-2 form" action="/principal">
            <div className="col-md-2">
              <Label htmlFor="codUsuario" text="Cod. Usuário" />
              <select
                id="direito"
                className="form-select"
                value={usuarioEscolhido?.codigo ? usuarioEscolhido?.codigo : ""}
                required
                onChange={handleUsuarioChange}
              >
                <option value="">Escolha...</option>
                {usuariosCadastrados.map((usuario) => (
                  <option key={usuario.codigo} value={usuario.codigo}>
                    {usuario.codigo} - {usuario.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-7 ps-3">
              <Label htmlFor="nomeUsuario" text="Nome" />
              <Input
                type="text"
                id="nomeUsuario"
                value={
                  usuarioEscolhido?.nome
                    ? usuarioEscolhido?.nome
                    : usuarioSelecionado?.nome
                    ? usuarioSelecionado?.nome
                    : ""
                }
                readonly={true}
              />
            </div>
            <div className="col-md-3 ps-3">
              <Label htmlFor="direitoUsuario" text="Direitos" />
              <Input
                type="text"
                id="direitoUsuario"
                value={
                  usuarioEscolhido?.direito
                    ? usuarioEscolhido?.direito === "S"
                      ? "Supervisor"
                      : "Operador"
                    : usuarioSelecionado?.direito
                    ? usuarioSelecionado?.direito === "S"
                      ? "Supervisor"
                      : "Operador"
                    : ""
                }
                readonly={true}
              />
            </div>
          </form>
          <div className="tarefas">
            <div class="row">
              <div class="col-1 bd ps-3">
                <b>ID</b>
              </div>
              <div class="col-8 bd">
                <b>Nome da Tarefa</b>
              </div>
              <div class="col-3 bd">
                <b>Tipo da Tarefa</b>
              </div>
            </div>
            {usuarioEscolhido?.tarefas &&
            usuarioEscolhido?.tarefas.length > 0 ? (
              usuarioEscolhido.tarefas.map((tarefaUsuario) => (
                <div className="row" key={tarefaUsuario?.tarefa?.codigo}>
                  <div className="col-1 bd ps-3 py-1">
                    {tarefaUsuario?.tarefa?.codigo}
                  </div>
                  <div className="col-8 bd py-1">
                    {tarefaUsuario?.tarefa?.nome}
                  </div>
                  <div className="col-3 bd py-1">
                    {tarefaUsuario?.tarefa?.tipo}
                  </div>
                </div>
              ))
            ) : (
              <div className="row">
                <div className="col-12 bd ps-3 py-1">
                  Nenhuma tarefa encontrada.
                </div>
              </div>
            )}
          </div>
          {usuarioLogado?.direito === "S" && (
            <>
              <form className="row g-2 form" onSubmit={handleAddTask}>
                <div></div>
                <div className="buscar pt-1 text-end">
                  <button to="submit" className="btn btn-primary">
                    Adicionar Tarefa
                  </button>
                </div>
              </form>
              <form className="row g-2 form" onSubmit={handleAddUser}>
                <div></div>
                <div className="buscar pt-1 text-end">
                  <button to="submit" className="btn btn-primary">
                    Cadastrar Usuário
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Principal;
