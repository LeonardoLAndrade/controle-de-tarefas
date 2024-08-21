import Input from "../components/Input";
import Label from "../components/Label";
import "./Principal.css";

const Principal = () => {
  return (
    <div className="center">
      <h1 className="text-center">Controle de Tarefas</h1>
      <div className="box">
        <form className="row g-2 form" action="/principal">
          <div className="col-md-2">
            <Label htmlFor="codUsuario" text="Cod. Usuário" />
            <select id="direitos" className="form-select" required>
              <option value="">Escolha...</option>
              <option value={1}>01 - Lucas Felipe Lima Andrade</option>
              <option value={2}>Supervisor</option>
            </select>
          </div>
          <div className="col-md-10 ps-3">
            <Label htmlFor="nomeUsuario" text="Nome" />
            <Input type="text" id="nomeUsuario" readonly={true} />
          </div>
          <div className="buscar pt-1">
            <button to="submit" className="btn btn-primary">
              Buscar
            </button>
          </div>
          <div></div>
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
          <div class="row">
            <div class="col-1 bd ps-3 py-1">1</div>
            <div class="col-8 bd py-1">2 of 3 (wider)</div>
            <div class="col-3 bd py-1">3 of 3</div>
          </div>
          <div class="row">
            <div class="col-1 bd ps-3 py-1">2</div>
            <div class="col-8 bd py-1">2 of 3 (wider)</div>
            <div class="col-3 bd py-1">3 of 3</div>
          </div>
          <div class="row">
            <div class="col-1 bd ps-3 py-1">3</div>
            <div class="col-8 bd py-1">2 of 3 (wider)</div>
            <div class="col-3 bd py-1">3 of 3</div>
          </div>
          <div class="row">
            <div class="col-1 bd ps-3 py-1">4</div>
            <div class="col-8 bd py-1">2 of 3 (wider)</div>
            <div class="col-3 bd py-1">3 of 3</div>
          </div>
          <div class="row">
            <div class="col-1 bd ps-3 py-1">4</div>
            <div class="col-8 bd py-1">2 of 3 (wider)</div>
            <div class="col-3 bd py-1">3 of 3</div>
          </div>
        </div>
        <form className="row g-2 form" action="/novaTarefa">
          <div></div>
          <div className="buscar pt-1 text-end">
            <button to="submit" className="btn btn-primary">
              Adicionar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Principal;
