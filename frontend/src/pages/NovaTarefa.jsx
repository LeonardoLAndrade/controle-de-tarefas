import Input from "../components/Input";
import "./NovaTarefa.css";
import Label from "../components/Label";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const NovaTarefa = () => {
  const navigate = useNavigate();
  const [nextTaskId, setNextTaskId] = useState(null);
  const [novaTarefa, setNovaTarefa] = useState({
    nome: "",
    tipo: "",
  });

  const { usuarioLogado } = useSelector(
    (rootReducer) => rootReducer.usuarioLogadoReducer
  );

  const { usuarioEscolhido } = useSelector(
    (rootReducer) => rootReducer.usuarioAtualReducer
  );

  useEffect(() => {
    fetch("http://localhost:3003/sistema/tarefas/nextId")
      .then((response) => response.json())
      .then((data) => {
        setNextTaskId(data.nextId);
      })
      .catch((error) => toast.error("Erro ao buscar o próximo ID de tarefa."));
  }, [novaTarefa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaTarefa({ ...novaTarefa, [name]: value });
  };

  const handleSelectChange = (e) => {
    const value = e.currentTarget.value;
    setNovaTarefa((prev) => ({ ...prev, tipo: value }));
  };

  const handleClose = () => {
    navigate("/principal");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (novaTarefa.nome && novaTarefa.tipo) {
      fetch("http://localhost:3003/sistema/novaTarefa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaTarefa),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .catch((error) => {
          toast.error("Erro ao cadastrar tarefa.");
        });

      const usuarioTarefa = {
        cod_usuario: usuarioEscolhido.codigo,
        cod_tarefa: nextTaskId,
      };
      fetch("http://localhost:3003/sistema/novaTarefaUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioTarefa),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setNovaTarefa({
            nome: "",
            tipo: "",
          });
          toast.success("Tarefa registrada com sucesso para o usuário.");
        })
        .catch((error) => {
          toast.error("Erro ao registrar tarefa para o usuário.");
        });
    }
  };

  return (
    <>
      {usuarioLogado && (
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
          <Modal show={true} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title style={{ wordWrap: "break-word" }}>
                Nova Tarefa
              </Modal.Title>
              <span
                style={{
                  fontSize: "2.3rem",
                  marginTop: "-3rem",
                  marginRight: "-0.5rem",
                  fontWeight: "400",
                  color: "#b1b1b1",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              >
                x
              </span>
            </Modal.Header>
            <Modal.Body>
              <form className="row g-2 form" onSubmit={handleSubmit}>
                <div className="col-md-2">
                  <Label htmlFor="codTarefa" text="Cod." />
                  <Input
                    type="number"
                    id="codTarefa"
                    value={nextTaskId || ""}
                    readonly={true}
                  />
                </div>
                <div className="col-md-10 ps-3">
                  <Label htmlFor="nomeTarefa" text="Nome da Tarefa" />
                  <Input
                    type="text"
                    name="nome"
                    value={novaTarefa.nome}
                    onChange={handleChange}
                    id="nomeTarefa"
                    placeholder="Insira o nome da nova tarefa"
                  />
                </div>
                <div className="col-md-3">
                  <Label htmlFor="tipo" text="Tipo" />
                  <select
                    id="tipo"
                    name="tipo"
                    value={novaTarefa.tipo}
                    className="form-select"
                    onChange={handleSelectChange}
                    required
                  >
                    <option value="">Escolha...</option>
                    <option value="D">Diária</option>
                    <option value="S">Semanal</option>
                    <option value="Q">Quinzenal</option>
                    <option value="M">Mensal</option>
                  </select>
                </div>
                <div className="col-md-9"></div>
                <div className="col-9 py-3">
                  <button to="submit" className="btn btn-primary">
                    Adicionar
                  </button>
                </div>
                <div className="col-md-3"></div>
              </form>
            </Modal.Body>
          </Modal>
        </>
      )}
      {!usuarioLogado && navigate("/login")}
    </>
  );
};

export default NovaTarefa;
