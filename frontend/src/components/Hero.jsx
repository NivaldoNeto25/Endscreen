import { useState, useEffect } from "react";
import "./Hero.css";

const heroBackgrounds = [
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/pragmata.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/eldenring.jpeg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/sekiro.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/tlou.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/cyberpunk.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/bf1.png')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/destiny2.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/minecraft.png')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/overwatch.png')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/rdr2.png')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/skyrim.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/spiderman2.jpeg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('/img/thewitcher.jpg')",
];

export function Hero({ onOpenNewGame }) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(
        (prevIndex) => (prevIndex + 1) % heroBackgrounds.length,
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {heroBackgrounds.map((bg, index) => (
        <div
          key={index}
          className={`hero-bg-layer ${index === currentBgIndex ? "active" : ""}`}
          style={{ backgroundImage: bg }}
        />
      ))}

      <div className="hero-content">
        <h1>A última tela do seu jogo.</h1>
        <p>Documente sua jornada, da primeira fase aos créditos finais.</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onOpenNewGame();
          }}
          className="btn-cta"
        >
          Registrar Jogo
        </a>
      </div>

      <div className="hero-trending">
        <h3>Jogos populares do momento</h3>
        <div className="hero-posters">
          <div className="poster-box" data-name="Counter Strike">
            <img
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1vce.jpg"
              alt="Counter Strike"
            />
            <div className="poster-overlay">
              <span>👁️ 3.4M</span>
              <span>❤️ 1.2M</span>
            </div>
          </div>

          <div className="poster-box" data-name="Tower Tale">
            <img
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1rnu.jpg"
              alt="Tower Tale"
            />
            <div className="poster-overlay">
              <span>👁️ 2.1M</span>
              <span>❤️ 980K</span>
            </div>
          </div>

          <div className="poster-box" data-name="Red Dead Redemption 2">
            <img
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg"
              alt="Capa RDR2"
            />
            <div className="poster-overlay">
              <span>👁️ 5.8M</span>
              <span>❤️ 3.1M</span>
            </div>
          </div>

          <div className="poster-box" data-name="The Legend of Zelda: BoTW">
            <img
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.jpg"
              alt="Capa Zelda"
            />
            <div className="poster-overlay">
              <span>👁️ 4.2M</span>
              <span>❤️ 2.5M</span>
            </div>
          </div>

          <div className="poster-box" data-name="Elden Ring">
            <img
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg"
              alt="Capa Elden Ring"
            />
            <div className="poster-overlay">
              <span>👁️ 6.1M</span>
              <span>❤️ 4.0M</span>
            </div>
          </div>

          <div className="poster-box" data-name="Vivid Tale">
            <img
              src="https://images.igdb.com/igdb/image/upload/t_cover_big/co642w.jpg"
              alt="Vivid Tale"
            />
            <div className="poster-overlay">
              <span>👁️ 1.8M</span>
              <span>❤️ 850K</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
