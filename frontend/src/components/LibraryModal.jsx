import './LibraryModal.css';
import './AuthModal.css'; 

export function LibraryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  
  const jogosTemporarios = [
    // Descomente o bloco abaixo para ver um card renderizado na tela:
    /*
    {
      id: 1,
      name: "The Legend of Zelda: BoTW",
      platform: "switch",
      rating: "10",
      hours: "120",
      review: "Obra prima inesquecível!"
    }
    */
  ];

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>

        <section id="biblioteca">
          <div className="games-section-header">
            <h2>Meus Jogos Salvos</h2>
          </div>

          <div className="games-grid" id="jogos-lista">
            {jogosTemporarios.length === 0 ? (
              <p className="empty-message">Nenhum jogo registrado na sua biblioteca.</p>
            ) : (
              jogosTemporarios.map((jogo) => (
                <div className="game-card" key={jogo.id}>
                  <h3>{jogo.name}</h3>
                  <p><strong>Plataforma:</strong> {jogo.platform}</p>
                  <p><strong>Nota:</strong> {jogo.rating}</p>
                  <p><strong>Horas jogadas:</strong> {jogo.hours}</p>
                  <p><strong>Review:</strong> {jogo.review}</p>
                  <div className="card-actions">
                    <button className="btn-edit">Editar</button>
                    <button className="btn-delete">Excluir</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}