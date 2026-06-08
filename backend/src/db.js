import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usuarioExiste = async (data) => {
  return await prisma.usuario.findUnique({
    where: { email: data.email },
  });
};

export const criarUsuario = async (data) => {
  const usuario = await prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    },
  });
  return { id: usuario.id, name: usuario.nome, email: usuario.email };
};

export const loginUsuario = async (data) => {
  const usuario = await prisma.usuario.findFirst({
    where: {
      email: data.email,
      senha: data.senha,
    },
  });

  if (usuario) {
    return { id: usuario.id, name: usuario.nome, email: usuario.email };
  }
  return null;
};

export const adicionarJogo = async (data) => {
  return await prisma.jogo.create({
    data: {
      nome: data.name,
      plataforma: data.platform,
      nota: data.rating,
      horas: data.hours,
      review: data.review || "",
      usuarioId: parseInt(data.userId),
    },
  });
};

export const listarJogosDoUsuario = async (userId) => {
  const jogos = await prisma.jogo.findMany({
    where: { usuarioId: parseInt(userId) },
  });

  return jogos.map((jogo) => ({
    id: jogo.id,
    name: jogo.nome,
    platform: jogo.plataforma,
    rating: jogo.nota,
    hours: jogo.horas,
    review: jogo.review,
    userId: jogo.usuarioId,
  }));
};

export const listarTodosJogos = async () => {
  const jogos = await prisma.jogo.findMany({
    include: { usuario: true },
  });

  return jogos.map((jogo) => ({
    id: jogo.id,
    name: jogo.nome,
    platform: jogo.plataforma,
    rating: jogo.nota,
    hours: jogo.horas,
    review: jogo.review,
    userId: jogo.usuarioId,
    userName: jogo.usuario ? jogo.usuario.nome : "Usuário Desconhecido",
  }));
};

export const atualizarJogo = async (jogoId, data) => {
  try {
    await prisma.jogo.update({
      where: { id: parseInt(jogoId) },
      data: {
        nome: data.name,
        plataforma: data.platform,
        nota: data.rating,
        horas: data.hours,
        review: data.review,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const deletarJogo = async (jogoId) => {
  try {
    await prisma.jogo.delete({
      where: { id: parseInt(jogoId) },
    });
    return true;
  } catch (error) {
    return false;
  }
};
