import "./Header.css";

export function Header({
  user,
  setUser,
  onOpenLogin,
  onOpenNewGame,
  onOpenLibrary,
}) {
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <header>
      <div className="logo">
        END<span>SCREEN</span>
      </div>
      <nav>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onOpenNewGame();
          }}
        >
          Cadastrar
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onOpenLibrary();
          }}
        >
          Minha Lista
        </a>

        {user ? (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="nav-login"
          >
            Sair ({user.nome})
          </a>
        ) : (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenLogin();
            }}
            className="nav-login"
          >
            Login
          </a>
        )}
      </nav>
    </header>
  );
}
