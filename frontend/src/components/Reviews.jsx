import "./Reviews.css";

export function Reviews() {
  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <h3>Reviews Recentes</h3>
        <span className="more-link">Ver mais</span>
      </div>

      <div id="reviews-list">
        <p className="empty-message">
          Nenhuma review registrada ainda. Jogue algo e conte para nós!
        </p>
      </div>
    </section>
  );
}
