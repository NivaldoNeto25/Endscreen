import "./Header.css";

export function Header({ onOpenLogin, onOpenNewGame }) {
  const handleNewGame = () => {
    alert("Modal de novo jogo");
  };

  const handleLibrary = () => {
    alert("Modal da biblioteca");
  };

  return (
    <header>
      <div className="logo">
        END<span>SCREEN</span>
      </div>
      <nav>
        <a href="#" onClick={(e) => {
          e.preventDefault(); 
          onOpenNewGame();
          }}>
            
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
