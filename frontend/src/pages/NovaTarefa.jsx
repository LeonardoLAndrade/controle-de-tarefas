import Input from "../components/Input";
import "./NovaTarefa.css";
import Label from "../components/Label";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NovaTarefa = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/principal"); // Substitua "/principal" pela rota da página principal
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title style={{ wordWrap: "break-word" }}>
          Nova Tarefa
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-2 form">
          <div className="col-md-2">
            <Label htmlFor="codTarefa" text="Cod." />
            <Input type="number" id="codTarefa" readonly={true} />
          </div>
          <div className="col-md-10 ps-3">
            <Label htmlFor="nomeTarefa" text="Nome da Tarefa" />
            <Input
              type="text"
              id="nomeTarefa"
              placeholder="Insira o nome da nova tarefa"
            />
          </div>
          <div className="col-md-3">
            <Label htmlFor="direitos" text="Tipo" />
            <select id="direitos" className="form-select" required>
              <option value="">Escolha...</option>
              <option value={1}>Diária</option>
              <option value={2}>Semanal</option>
              <option value={3}>Quinzenal</option>
              <option value={4}>Mensal</option>
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
  );
};

export default NovaTarefa;
