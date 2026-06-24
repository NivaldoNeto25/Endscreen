import { useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";
import "./AuthModal.css";

export function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  // Controle de estados para os inputs e modo da tela
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setNome("");
      setEmail("");
      setSenha("");
      setIsLoginMode(true);
    }
  }, [isOpen]);

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) return null;

  // Alterna entre Login e Criar Conta limpando o campo de nome
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setNome("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Conexão com o banco de dados
    if (isLoginMode) {
      const result = await loginUser(email, senha);
      if (result.success) {
        alert(`Bem-vindo, ${result.user.nome}!`);
        onLoginSuccess(result.user);
        onClose();
      } else {
        alert(result.message);
      }
    } else {
      const result = await registerUser(nome, email, senha);
      if (result.success) {
        alert("Conta criada com sucesso");
        onLoginSuccess(result.user);
        onClose();
      } else {
        alert(result.message);
      }
    }
  };

  return (
    // O onClick no overlay fecha o modal se clicar fora dele
    <div className="modal-overlay active" onClick={onClose}>
      {/* O stopPropagation impede que clicar dentro da caixa feche o modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>

        <section className="container-modal">
          <h2 id="auth-title">{isLoginMode ? "Login" : "Criar Conta"}</h2>

          <form id="auth-form" onSubmit={handleSubmit}>
            {/* O campo Nome só aparece se NÃO estiver no modo de login */}
            {!isLoginMode && (
              <div className="form-group">
                <label htmlFor="auth-nome">Seu Nome</label>
                <input
                  type="text"
                  id="auth-nome"
                  placeholder="Como quer ser chamado?"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required={!isLoginMode}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="auth-email">E-mail</label>
              <input
                type="email"
                id="auth-email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="auth-senha">Senha</label>
              <input
                type="password"
                id="auth-senha"
                placeholder="Sua senha secreta"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-submit">
              {isLoginMode ? "Entrar" : "Cadastrar"}
            </button>

            <p className="toggle-text">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMode();
                }}
              >
                {isLoginMode
                  ? "Não tem conta? Registre-se"
                  : "Já tem conta? Faça Login"}
              </a>
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}
