let usuarios = [];
let jogos = [];

let nextUsuarioId = 1;
let nextJogoId = 1;

export const usuarioExiste = async (data) => {
  return usuarios.find(u => u.email === data.email) || null;
};

export const criarUsuario = async (data) => {
  const novoUsuario = {
    id: nextUsuarioId++, 
    name: data.nome,
    email: data.email,
    password: data.senha
  };
  
  usuarios.push(novoUsuario);
  return novoUsuario;
};

export const loginUsuario = async (data) => {
  return usuarios.find(u => u.email === data.email && u.password === data.senha) || null;
};

export const adicionarJogo = async (data) => {
  const novoJogo = {
    id: nextJogoId++,
    name: data.name,
    platform: data.platform,
    rating: data.rating,
    hours: data.hours,
    review: data.review || '',
    user_id: parseInt(data.userId), 
    userName: data.userName
  };
  
  jogos.push(novoJogo);
  return novoJogo;
};

export const listarJogosDoUsuario = async (userId) => {
  return jogos.filter(j => String(j.user_id) === String(userId));
};

export const listarTodosJogos = async () => {
  return jogos;
};

export const encontrarJogoPorId = async (jogoId) => {
  return jogos.find(j => String(j.id) === String(jogoId)) || null;
};

export const atualizarJogo = async (jogoId, data) => {
  const jogo = await encontrarJogoPorId(jogoId);

  if (jogo) {
    if (data.name !== undefined) jogo.name = data.name;
    if (data.platform !== undefined) jogo.platform = data.platform;
    if (data.rating !== undefined) jogo.rating = data.rating;
    if (data.hours !== undefined) jogo.hours = data.hours;
    if (data.review !== undefined) jogo.review = data.review;
    
    return true;
  }
  
  return false;
};

export const deletarJogo = async (jogoId) => {
  const index = jogos.findIndex(j => String(j.id) === String(jogoId));

  if (index !== -1) {
    jogos.splice(index, 1);
    return true;
  }
  
  return false;
};