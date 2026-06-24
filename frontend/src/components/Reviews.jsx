import { useState, useEffect } from "react";
import { getAllReviews } from "../services/api";
import "./Reviews.css";

export function Reviews() {
  const [reviews, setReviews] = useState([]);

  // executa toda vez que recarregar a página
  useEffect(() => {
    async function fetchReviews() {
      const data = await getAllReviews();
      // mostra as 5 últimas reviews
      setReviews(data.slice(0, 5));
    }
    
    fetchReviews();
  }, []);

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h3>Reviews Recentes</h3>
        <span className="more-link">Ver mais</span>
      </div>

      <div id="reviews-list">
        {reviews.length === 0 ? (
          <p className="empty-message">
            Nenhuma review registrada ainda. Jogue algo e conte para nós!
          </p>
        ) : (
          reviews.map((game) => {
            const starCount = Math.round(game.rating / 2);
            const starsHTML = "★".repeat(starCount);

            return (
              <div className="review-item" key={game.id}>
                <div className="review-poster-placeholder">🎮</div>
                <div className="review-content">
                  <div className="review-title-row">
                    <span className="review-game-title">{game.name}</span>
                  </div>
                  <div className="review-meta">
                    <span className="review-author-avatar"></span>
                    <span className="review-author-name">
                      {game.userName || "Usuário Desconhecido"}
                    </span>
                    <span className="review-stars">{starsHTML}</span>
                  </div>
                  <p className="review-text">"{game.review}"</p>
                  <div className="review-likes">
                    <span>❤️</span> 0 curtidas
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}