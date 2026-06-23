import "./Header.css";

export function Header({ onOpenLogin }) {
  const handleNewGame = () => {
    alert("Modal de novo jogo");
  };

  const handleLibrary = () => {
    alert("Modal da biblioteca");
  };

  const handleLogin = () => {
    alert("Modal de login");
  };

  return (
    <header>
      <div className="logo">
        END<span>SCREEN</span>
      </div>
      <nav>
        <a href="#" onClick={handleNewGame}>
          Cadastrar
        </a>
        <a href="#" onClick={handleLibrary}>
          Minha Lista
        </a>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onOpenLogin();
        }}
        className="nav-login">
          Login
        </a>
      </nav>
    </header>
  );
}
