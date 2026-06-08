<<<<<<< HEAD
import { PrismaClient } from "@prisma/client";
=======
import { PrismaClient } from '@prisma/client';
>>>>>>> b516d9f6835ca2180f46e6ff08299276768d2e5c

const prisma = new PrismaClient();

export const usuarioExiste = async (data) => {
  return await prisma.usuario.findUnique({
<<<<<<< HEAD
    where: { email: data.email },
=======
    where: { email: data.email }
>>>>>>> b516d9f6835ca2180f46e6ff08299276768d2e5c
  });
};

export const criarUsuario = async (data) => {
<<<<<<< HEAD
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
=======
  return await prisma.usuario.create({
    data: {
      name: data.nome,
      email: data.email,
      password: data.senha
    }
  });
};

export const loginUsuario = async (data) => {
  return await prisma.usuario.findFirst({
    where: { 
      email: data.email,
      password: data.senha 
    }
  });
>>>>>>> b516d9f6835ca2180f46e6ff08299276768d2e5c
};

export const adicionarJogo = async (data) => {
  return await prisma.jogo.create({
    data: {
<<<<<<< HEAD
      nome: data.name,
      plataforma: data.platform,
      nota: data.rating,
      horas: data.hours,
      review: data.review || "",
      usuarioId: parseInt(data.userId),
    },
=======
      name: data.name,
      platform: data.platform,
      rating: data.rating,
      hours: data.hours,
      review: data.review || '',
      user_id: parseInt(data.userId), 
      userName: data.userName
    }
>>>>>>> b516d9f6835ca2180f46e6ff08299276768d2e5c
  });
};

export const listarJogosDoUsuario = async (userId) => {
<<<<<<< HEAD
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
=======
  return await prisma.jogo.findMany({
    where: { user_id: parseInt(userId) }
  });
};

export const listarTodosJogos = async () => {
  return await prisma.jogo.findMany();
};

export const encontrarJogoPorId = async (jogoId) => {
  return await prisma.jogo.findUnique({
    where: { id: parseInt(jogoId) }
  });
>>>>>>> b516d9f6835ca2180f46e6ff08299276768d2e5c
};

export const atualizarJogo = async (jogoId, data) => {
  try {
    await prisma.jogo.update({
      where: { id: parseInt(jogoId) },
      data: {
<<<<<<< HEAD
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
=======
        name: data.name,
        platform: data.platform,
        rating: data.rating,
        hours: data.hours,
        review: data.review
      }
    });
    return true;
  } catch (error) {
    return false; 
>>>>>>> b516d9f6835ca2180f46e6ff08299276768d2e5c
  }
};

export const deletarJogo = async (jogoId) => {
  try {
    await prisma.jogo.delete({
<<<<<<< HEAD
      where: { id: parseInt(jogoId) },
=======
      where: { id: parseInt(jogoId) }
>>>>>>> b516d9f6835ca2180f46e6ff08299276768d2e5c
    });
    return true;
  } catch (error) {
    return false;
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> b516d9f6835ca2180f46e6ff08299276768d2e5c
