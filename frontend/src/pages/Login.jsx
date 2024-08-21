import Input from "../components/Input";
import "./Login.css";
import Label from "../components/Label";

const Login = () => {
  return (
    <div className="mid">
      <h1 className="text-center">Controle de Tarefas</h1>
      <div className="box">
        <form className="row g-2 form" action="/principal">
          <div className="col-md-3">
            <Label htmlFor="codUsuario" text="Usuário" />
            <Input type="number" id="codUsuario" placeholder="Cod." />
          </div>
          <div className="col-md-6">
            <Label htmlFor="senha" text="Senha" />
            <Input type="password" id="senha" placeholder="Insira a senha" />
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
