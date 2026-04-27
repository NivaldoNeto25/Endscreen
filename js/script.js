let currentEditId = null;

const formElement = document.querySelector("#cadastro form");
const cardsContainer = document.querySelector(".games-grid");

let isLoginMode = true;
const authForm = document.getElementById("auth-form");
const authToggle = document.getElementById("auth-toggle");
const groupNome = document.getElementById("group-nome");
const authTitle = document.getElementById("auth-title");
const authBtn = document.getElementById("auth-btn");

authToggle.addEventListener("click", () => {
  isLoginMode = !isLoginMode;
  if (isLoginMode) {
    groupNome.style.display = "none";
    authTitle.innerText = "Login";
    authBtn.innerText = "Entrar";
    authToggle.innerText = "Não tem conta? Registre-se";
    document.getElementById("auth-nome").removeAttribute("required");
  } else {
    groupNome.style.display = "block";
    authTitle.innerText = "Criar Conta";
    authBtn.innerText = "Cadastrar";
    authToggle.innerText = "Já tem conta? Faça Login";
    document.getElementById("auth-nome").setAttribute("required", "true");
  }
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("auth-email").value;
  const senha = document.getElementById("auth-senha").value;
  const nome = document.getElementById("auth-nome").value;

  if (isLoginMode) {
    const result = loginUser(email, senha);
    if (result.success) {
      alert(`Bem-vindo de volta, ${result.user.nome}!`);
      closeModal("modal-login");
      refreshUI();
    } else {
      alert(result.message);
    }
  } else {
    const result = registerUser(nome, email, senha);
    if (result.success) {
      alert("Conta criada com sucesso!");
      closeModal("modal-login");
      refreshUI();
    } else {
      alert(result.message);
    }
  }
  authForm.reset();
});

function updateHeader() {
  const navLogin = document.querySelector(".nav-login");
  const user = getCurrentUser();

  if (user) {
    navLogin.innerText = `Sair (${user.nome})`;
    navLogin.onclick = () => {
      logoutUser();
      refreshUI();
      alert("Você saiu da sua conta.");
    };
  } else {
    navLogin.innerText = "Login";
    navLogin.onclick = () => openModal("modal-login");
  }
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const gameData = {
    name: document.getElementById("game-name").value,
    platform: document.getElementById("platform").value,
    rating: document.getElementById("rating").value,
    hours: document.getElementById("hours").value,
    review: document.getElementById("review").value,
  };

  if (currentEditId !== null) {
    updateGame(currentEditId, gameData);
    currentEditId = null;
  } else {
    createGame(gameData);
  }

  formElement.reset();
  closeModal("modal-cadastro");
  refreshUI();
});

function renderGames() {
  cardsContainer.innerHTML = "";
  const user = getCurrentUser();

  if (!user) {
    cardsContainer.innerHTML =
      '<p class="empty-message">Faça login para ver sua biblioteca.</p>';
    return;
  }

  const submitButton = formElement.querySelector('button[type="submit"]');
  submitButton.innerText =
    currentEditId !== null ? "Salvar Alterações" : "Salvar Jogo";

  const userGames = getUserGames();

  if (userGames.length === 0) {
    cardsContainer.innerHTML =
      '<p class="empty-message">Nenhum jogo registrado na sua biblioteca.</p>';
    return;
  }

  userGames.forEach(function (game) {
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.innerHTML = `
            <h3>${game.name}</h3>
            <p><strong>Plataforma:</strong> ${game.platform}</p>
            <p><strong>Nota:</strong> ${game.rating}</p>
            <p><strong>Horas jogadas:</strong> ${game.hours}</p>
            <p><strong>Review:</strong> ${game.review}</p>
            <div class="card-actions">
                <button class="btn-edit" onclick="prepareEditGame(${game.id})">Editar</button>
                <button class="btn-delete" onclick="handleDeleteGame(${game.id})">Excluir</button>
            </div>
        `;
    cardsContainer.appendChild(card);
  });
}

window.handleDeleteGame = function (gameId) {
  deleteGameData(gameId);
  refreshUI();
};

window.prepareEditGame = function (gameId) {
  const gameToEdit = getGameById(gameId);
  if (gameToEdit) {
    currentEditId = gameId;
    document.getElementById("modal-title").innerText = "Editar Jogo";
    document.getElementById("game-name").value = gameToEdit.name;
    document.getElementById("platform").value = gameToEdit.platform;
    document.getElementById("rating").value = gameToEdit.rating;
    document.getElementById("hours").value = gameToEdit.hours;
    document.getElementById("review").value = gameToEdit.review;

    closeModal("modal-biblioteca");
    openModal("modal-cadastro");
    refreshUI();
  }
};

function renderReviews() {
  const reviewsContainer = document.getElementById("reviews-list");
  if (!reviewsContainer) return;

  reviewsContainer.innerHTML = "";

  const todasReviews = getAllReviews();
  if (todasReviews.length === 0) {
    reviewsContainer.innerHTML =
      '<p class="empty-message">Nenhuma review registrada ainda. Jogue algo e conte para nós!</p>';
    return;
  }

  const ultimasReviews = todasReviews.slice(0, 5);

  ultimasReviews.forEach((game) => {
    const starCount = Math.round(game.rating / 2);
    const starsHTML = "★".repeat(starCount);

    const reviewEl = document.createElement("div");
    reviewEl.classList.add("review-item");
    reviewEl.innerHTML = `
            <div class="review-poster-placeholder">🎮</div>
            <div class="review-content">
                <div class="review-title-row">
                    <span class="review-game-title">${game.name}</span>
                </div>
                <div class="review-meta">
                    <span class="review-author-avatar"></span>
                    <span class="review-author-name">${game.userName || "Usuário Desconhecido"}</span>
                    <span class="review-stars">${starsHTML}</span>
                </div>
                <p class="review-text">"${game.review}"</p>
                <div class="review-likes"><span>❤️</span> 0 curtidas</div>
            </div>
        `;
    reviewsContainer.appendChild(reviewEl);
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-content").scrollTop = 0;
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

function openNewGameForm() {
  if (!getCurrentUser()) {
    openModal("modal-login");
    return;
  }
  currentEditId = null;
  formElement.reset();
  document.getElementById("modal-title").innerText = "Adicionar Jogo";
  formElement.querySelector('button[type="submit"]').innerText = "Salvar Jogo";
  openModal("modal-cadastro");
}

function refreshUI() {
  updateHeader();
  renderGames();
  renderReviews();
}

refreshUI();

const heroBackgrounds = [
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/pragmata.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/eldenring.jpeg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/sekiro.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/tlou.jpg')",

  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/cyberpunk.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/bf1.png')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/destiny2.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/minecraft.png')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/overwatch.png')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/rdr2.png')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/skyrim.jpg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/spiderman2.jpeg')",
  "linear-gradient(to bottom, rgba(18, 18, 18, 0.4), #121212), url('img/background/thewitcher.jpg')",
];

let currentBgIndex = 0;
const heroSection = document.querySelector(".hero");

let currentLayer = document.createElement("div");
currentLayer.className = "hero-bg-layer active";
currentLayer.style.backgroundImage = heroBackgrounds[0];
heroSection.insertBefore(currentLayer, heroSection.firstChild);

function changeHeroBackground() {
  currentBgIndex = (currentBgIndex + 1) % heroBackgrounds.length;

  const newLayer = document.createElement("div");
  newLayer.className = "hero-bg-layer";
  newLayer.style.backgroundImage = heroBackgrounds[currentBgIndex];

  currentLayer.insertAdjacentElement("afterend", newLayer);

  newLayer.offsetHeight;

  newLayer.classList.add("active");

  setTimeout(() => {
    if (currentLayer && currentLayer.parentNode) {
      currentLayer.remove();
    }
    currentLayer = newLayer;
  }, 2000);
}

setInterval(changeHeroBackground, 8000);
