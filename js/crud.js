const API_URL = "http://127.0.0.1:5000";

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

function getCurrentUser() {
  return currentUser;
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem("currentUser");
}

async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, senha: password }),
    });
    const data = await response.json();

    if (data.success) {
      currentUser = data.user;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    return data;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return { success: false, message: "Erro ao conectar com o servidor." };
  }
}

async function registerUser(name, email, password) {
  try {
    const response = await fetch(`${API_URL}/registrar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: name, email: email, senha: password }),
    });
    const data = await response.json();

    if (data.success) {
      currentUser = data.user;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    return data;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return { success: false, message: "Erro ao conectar com o servidor." };
  }
}

async function createGame(gameData) {
  const user = getCurrentUser();
  if (!user) return;

  const payload = { ...gameData, userId: user.id, userName: user.nome };
  try {
    await fetch(`${API_URL}/jogos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Erro ao salvar:", error);
  }
}

async function updateGame(id, gameData) {
  try {
    await fetch(`${API_URL}/jogos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameData),
    });
  } catch (error) {
    console.error("Erro ao atualizar:", error);
  }
}

async function deleteGameData(id) {
  try {
    await fetch(`${API_URL}/jogos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Erro ao deletar:", error);
  }
}

async function getUserGames() {
  const user = getCurrentUser();
  if (!user) return [];

  try {
    const response = await fetch(`${API_URL}/jogos/usuario/${user.id}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    return [];
  }
}

async function getAllReviews() {
  try {
    const response = await fetch(`${API_URL}/jogos`);
    const allGames = await response.json();
    return allGames
      .filter((game) => game.review && game.review.trim() !== "")
      .reverse();
  } catch (error) {
    console.error("Erro ao buscar reviews:", error);
    return [];
  }
}

async function getGameById(id) {
  const games = await getUserGames();
  return games.find((game) => game.id === id);
}
