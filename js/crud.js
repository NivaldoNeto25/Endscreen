// crud.js
const API_URL = 'http://127.0.0.1:5000';

// ==========================================
// SESSÃO DO USUÁRIO (Continua no LocalStorage para não deslogar no F5)
// ==========================================
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null; 

function getCurrentUser() {
    return currentUser;
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
}

function syncRequest(method, endpoint, body = null) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, `${API_URL}${endpoint}`, false); 
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    try {
        xhr.send(body ? JSON.stringify(body) : null);
        return JSON.parse(xhr.responseText);
    } catch (e) {
        console.error("Erro de conexão com o servidor Python:", e);
        return null;
    }
}

function loginUser(email, password) {
    const data = syncRequest('POST', '/login', { email: email, senha: password });
    
    if (data && data.success) {
        currentUser = data.user; 
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return data || { success: false, message: "Erro ao conectar com o servidor." };
}

function registerUser(name, email, password) {
    const data = syncRequest('POST', '/registrar', { nome: name, email: email, senha: password });
    
    if (data && data.success) {
        currentUser = data.user; 
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    return data || { success: false, message: "Erro ao conectar com o servidor." };
}

function createGame(gameData) {
    const user = getCurrentUser();
    if (!user) return;
    
    const payload = { ...gameData, userId: user.id, userName: user.nome };
    syncRequest('POST', '/jogos', payload);
}

function updateGame(id, gameData) {
    syncRequest('PUT', `/jogos/${id}`, gameData);
}

function deleteGameData(id) {
    syncRequest('DELETE', `/jogos/${id}`);
}

function getUserGames() {
    const user = getCurrentUser();
    if (!user) return [];
    
    const games = syncRequest('GET', `/jogos/usuario/${user.id}`);
    return games || [];
}

function getAllReviews() {
    const allGames = syncRequest('GET', '/jogos');
    if (!allGames) return [];
    
    return allGames.filter(game => game.review && game.review.trim() !== "").reverse();
}

function getGameById(id) {
    const games = getUserGames();
    return games.find(game => game.id === id);
}