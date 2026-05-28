import express from "express";
import path from "path";
import { fileURLToPath } from "url";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PASTA_PROJETO = path.join(__dirname, "../..");

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

  return res.json({
    success: true,
    user: { id: novo_usuario.id, nome: novo_usuario.name },
  });
});

routes.post("/login", async (req, res) => {
  const data = req.body;

  const usuario = await loginUsuario(data);

  if (usuario) {
    return res.json({
      success: true,
      user: { id: usuario.id, nome: usuario.name },
    });
  }

  return res.json({ success: false, message: "E-mail ou senha incorretos." });
});

routes.post("/jogos", async (req, res) => {
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

routes.put("/jogos/:jogo_id", async (req, res) => {
  const jogoId = req.params.jogo_id;
  const data = req.body;

  const sucesso = await atualizarJogo(jogoId, data);

  if (sucesso) {
    return res.json({ success: true, message: "Jogo atualizado!" });
  }

  return res.json({ success: false, message: "Jogo não encontrado." });
});

routes.delete("/jogos/:jogo_id", async (req, res) => {
  const jogoId = req.params.jogo_id;

  const sucesso = await deletarJogo(jogoId);

  if (sucesso) {
    return res.json({ success: true, message: "Jogo deletado!" });
  }

  return res.json({ success: false, message: "Jogo não encontrado." });
});

export default routes;
