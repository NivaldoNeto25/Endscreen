import "./Header.css";

export function Header({ onOpenLogin, onOpenNewGame, onOpenLibrary}) {

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
        <a href="#" onClick={(e) => {
          e.preventDefault(); 
          onOpenLibrary();
          }}>
            
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
