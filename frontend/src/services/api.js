const API_URL = "http://127.0.0.1:5000";

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function getToken() {
  return localStorage.getItem("token");
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
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
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
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
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return { success: false, message: "Erro ao conectar com o servidor." };
  }
}

async function createGame(gameData) {
  const user = getCurrentUser();
  const token = getToken();

  if (!user || !token) throw new Error("Usuário não logado");

  const payload = { ...gameData, userId: user.id, userName: user.nome };
  try {
    const response = await fetch(`${API_URL}/jogos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Falha ao salvar no banco de dados.");

    return await response.json();
  } catch (error) {
    console.error("Erro ao salvar:", error);
    throw error;
  }
}

async function updateGame(id, gameData) {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/jogos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(gameData),
    });

    if (!response.ok) throw new Error("Falha ao atualizar.");
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    throw error;
  }
}

async function deleteGameData(id) {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/jogos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) throw new Error("Falha ao deletar.");
  } catch (error) {
    console.error("Erro ao deletar:", error);
    throw error;
  }
}

async function getUserGames() {
  const user = getCurrentUser();
  if (!user) return [];

  try {
    const response = await fetch(`${API_URL}/jogos/usuario/${user.id}`);
    if (!response.ok) throw new Error("Falha ao buscar jogos.");
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar jogos:", error);
    return [];
  }
}

async function getAllReviews() {
  try {
    const response = await fetch(`${API_URL}/jogos`);
    if (!response.ok) throw new Error("Falha ao buscar reviews.");
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

export {
  getCurrentUser,
  getAllReviews,
  getGameById,
  getToken,
  getUserGames,
  loginUser,
  logoutUser,
  registerUser,
  createGame,
  updateGame,
  deleteGameData,
};
