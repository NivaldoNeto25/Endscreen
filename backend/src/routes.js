import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

import {
  adicionarJogo,
  atualizarJogo,
  criarUsuario,
  deletarJogo,
  listarJogosDoUsuario,
  listarTodosJogos,
  loginUsuario,
  usuarioExiste,
} from "./db.js";

const routes = express.Router();
const SEGREDO = "qwertyuiopasdfghjklçzxcvbnm1234567890";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PASTA_PROJETO = path.join(__dirname, "../..");

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Token não informado. Faça login." });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, SEGREDO);
    req.usuario = payload;
    next();
  } catch (erro) {
    return res
      .status(401)
      .json({ success: false, message: "Token inválido ou expirado." });
  }
}

routes.get("/", (req, res) => {
  res.sendFile(path.join(PASTA_PROJETO, "index.html"));
});

routes.post("/registrar", async (req, res) => {
  const data = req.body;
  const existing_user = await usuarioExiste(data);

  if (existing_user) {
    return res.json({ success: false, message: "Este e-mail já está em uso!" });
  }

  const novo_usuario = await criarUsuario(data);

  const token = jwt.sign(
    { id: novo_usuario.id, nome: novo_usuario.name },
    SEGREDO,
    { expiresIn: "1h" },
  );

  return res.json({
    success: true,
    user: { id: novo_usuario.id, nome: novo_usuario.name },
    token: token,
  });
});

routes.post("/login", async (req, res) => {
  const data = req.body;
  const usuario = await loginUsuario(data);

  if (usuario) {
    const token = jwt.sign({ id: usuario.id, nome: usuario.name }, SEGREDO, {
      expiresIn: "1h",
    });

    return res.json({
      success: true,
      user: { id: usuario.id, nome: usuario.name },
      token: token,
    });
  }

  return res.json({ success: false, message: "E-mail ou senha incorretos." });
});

routes.post("/jogos", verificarToken, async (req, res) => {
  const data = req.body;
  await adicionarJogo(data);
  return res.json({ success: true, message: "Jogo salvo!" });
});

routes.get("/jogos/usuario/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  const jogos = await listarJogosDoUsuario(userId);
  return res.json(jogos);
});

routes.get("/jogos", async (req, res) => {
  const jogos = await listarTodosJogos();
  return res.json(jogos);
});

routes.put("/jogos/:jogo_id", verificarToken, async (req, res) => {
  const jogoId = req.params.jogo_id;
  const data = req.body;
  const sucesso = await atualizarJogo(jogoId, data);

  if (sucesso) {
    return res.json({ success: true, message: "Jogo atualizado!" });
  }
  return res.json({ success: false, message: "Jogo não encontrado." });
});

routes.delete("/jogos/:jogo_id", verificarToken, async (req, res) => {
  const jogoId = req.params.jogo_id;
  const sucesso = await deletarJogo(jogoId);

  if (sucesso) {
    return res.json({ success: true, message: "Jogo deletado!" });
  }
  return res.json({ success: false, message: "Jogo não encontrado." });
});

export default routes;
