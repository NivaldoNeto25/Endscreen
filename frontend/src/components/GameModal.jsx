import { useState } from 'react';
import { createGame, getCurrentUser } from '../services/api';
import './AuthModal.css'; 

export function GameModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState('');
  const [rating, setRating] = useState('');
  const [hours, setHours] = useState('');
  const [review, setReview] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  // Conectando ao banco de dados
  const handleSubmit = async (e) => {
    e.preventDefault();

    if( isSaving ) return;
    
    const user = getCurrentUser();
    if (!user) {
      alert("Você precisa fazer login para cadastrar um jogo")
      onClose();
      return;
    }

    setIsSaving(true);

    const gameData = {name, platform, rating, hours, review };

    const result = await createGame(gameData);

    if(result.success) {
      alert("Jogo salvo com sucesso");

      setName('');
      setPlatform('');
      setRating('');
      setHours('');
      setReview('');
      onClose();

      window.location.reload();
    } else {
      alert("Erro ao salvar o jogo. Tente novamente");

      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        
        <section className="container-modal">
          <h2 id="modal-title">Adicionar Jogo</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="game-name">Nome do Jogo</label>
              <input 
                type="text" 
                id="game-name" 
                placeholder="Ex: Resident Evil 4" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="platform">Onde você jogou?</label>
              <select 
                id="platform" 
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                required
              >
                <option value="">Selecione a plataforma</option>
                <option value="pc">PC / Computador</option>
                <optgroup label="PlayStation">
                  <option value="ps5">PlayStation 5</option>
                  <option value="ps4">PlayStation 4</option>
                  <option value="ps3">PlayStation 3</option>
                  <option value="ps2">PlayStation 2</option>
                  <option value="ps1">PlayStation 1 / PSX</option>
                  <option value="ps_portatil">PSP / PS Vita</option>
                </optgroup>
                <optgroup label="Xbox">
                  <option value="xbox_series">Xbox Series X|S</option>
                  <option value="xbox_one">Xbox One</option>
                  <option value="xbox_360">Xbox 360</option>
                  <option value="xbox_original">Xbox Clássico</option>
                </optgroup>
                <optgroup label="Nintendo">
                  <option value="switch">Nintendo Switch</option>
                  <option value="wiiu">Wii U</option>
                  <option value="wii">Wii</option>
                  <option value="gamecube">GameCube</option>
                  <option value="n64">Nintendo 64</option>
                  <option value="snes">Super Nintendo (SNES)</option>
                  <option value="nes">Nintendinho (NES)</option>
                  <option value="ds_3ds">Nintendo DS / 3DS</option>
                  <option value="gameboy">Game Boy / GBA</option>
                </optgroup>
                <optgroup label="Sega">
                  <option value="dreamcast">Dreamcast</option>
                  <option value="saturn">Sega Saturn</option>
                  <option value="mega_drive">Mega Drive / Genesis</option>
                  <option value="master_system">Master System</option>
                </optgroup>
                <optgroup label="Outros">
                  <option value="mobile">Mobile (Android / iOS)</option>
                  <option value="arcade">Arcade / Fliperama</option>
                  <option value="atari">Atari</option>
                  <option value="outro">Outro / Emulador</option>
                </optgroup>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rating">Sua Nota (0 a 10)</label>
              <input 
                type="number" 
                id="rating" 
                min="0" 
                max="10" 
                placeholder="Nota de 0 a 10" 
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="hours">Horas gastas (Opcional)</label>
              <input 
                type="number" 
                id="hours" 
                min="0" 
                placeholder="Quantidade de horas" 
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="review">Análise / Avaliação</label>
              <textarea 
                id="review" 
                rows="4" 
                placeholder="O que achou do jogo?"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>

            <button 
            type="submit" 
            className="btn-submit"
            disabled = {isSaving} 
            style={{ opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'not-allowed' : 'pointer' }}>
              {isSaving ? 'Salvando...' : 'Salvar Jogo'}</button>
          </form>
        </section>
      </div>
    </div>
  );
}