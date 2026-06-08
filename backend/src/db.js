import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const usuarioExiste = async (data) => {
  return await prisma.usuario.findUnique({
    where: { email: data.email },
  });
};

export const criarUsuario = async (data) => {
  return await prisma.usuario.create({
    data: {
      name: data.nome,
      email: data.email,
      password: data.senha,
    },
  });
};

export const loginUsuario = async (data) => {
  return await prisma.usuario.findFirst({
    where: {
      email: data.email,
      password: data.senha,
    },
  });
};

export const adicionarJogo = async (data) => {
  return await prisma.jogo.create({
    data: {
      name: data.name,
      platform: data.platform,
      rating: data.rating,
      hours: data.hours,
      review: data.review || "",
      user_id: parseInt(data.userId),
      userName: data.userName,
    },
  });
};

export const listarJogosDoUsuario = async (userId) => {
  return await prisma.jogo.findMany({
    where: { user_id: parseInt(userId) },
  });
};

export const listarTodosJogos = async () => {
  return await prisma.jogo.findMany();
};

export const encontrarJogoPorId = async (jogoId) => {
  return await prisma.jogo.findUnique({
    where: { id: parseInt(jogoId) },
  });
};

export const atualizarJogo = async (jogoId, data) => {
  try {
    await prisma.jogo.update({
      where: { id: parseInt(jogoId) },
      data: {
        name: data.name,
        platform: data.platform,
        rating: data.rating,
        hours: data.hours,
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
