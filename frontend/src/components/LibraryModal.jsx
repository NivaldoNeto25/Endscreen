import { useState, useEffect } from "react";
import { getUserGames, deleteGameData, getCurrentUser } from "../services/api";
import "./LibraryModal.css";
import "./AuthModal.css";

export function LibraryModal({ isOpen, onClose, onEditGame, onDeleteSuccess }) {
  const [jogos, setJogos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // roda quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      carregarJogos();
    }
  }, [isOpen]);

  async function carregarJogos() {
    setIsLoading(true);
    const user = getCurrentUser();

    if (user) {
      const data = await getUserGames();
      setJogos(data);
    } else {
      setJogos([]);
    }

    setIsLoading(false);
  }

  async function handleDelete(id) {
    // Pede confirmação antes de apagar
    if (window.confirm("Tem certeza que deseja excluir este jogo?")) {
      await deleteGameData(id);
      // Carrega a lista novamente
      carregarJogos();
      if (onDeleteSuccess) onDeleteSuccess();
    }
  }

  function handleEdit(jogo) {
    onEditGame(jogo);
  }

  if (!isOpen) return null;

  const user = getCurrentUser();

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div
        className="modal-content modal-large"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>

        <section id="biblioteca">
          <div className="games-section-header">
            <h2>Meus Jogos Salvos</h2>
          </div>

          {!user ? (
            <p className="empty-message" style={{ textAlign: "center" }}>
              Faça login para ver sua biblioteca.
            </p>
          ) : isLoading ? (
            <p className="empty-message" style={{ textAlign: "center" }}>
              Carregando jogos...
            </p>
          ) : (
            <div className="games-grid" id="jogos-lista">
              {jogos.length === 0 ? (
                <p className="empty-message">
                  Nenhum jogo registrado na sua biblioteca.
                </p>
              ) : (
                jogos.map((jogo) => (
                  <div className="game-card" key={jogo.id}>
                    <h3>{jogo.name}</h3>
                    <p>
                      <strong>Plataforma:</strong> {jogo.platform}
                    </p>
                    <p>
                      <strong>Nota:</strong> {jogo.rating}
                    </p>
                    <p>
                      <strong>Horas jogadas:</strong> {jogo.hours}
                    </p>
                    <p>
                      <strong>Review:</strong> {jogo.review}
                    </p>
                    <div className="card-actions">
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(jogo)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(jogo.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
