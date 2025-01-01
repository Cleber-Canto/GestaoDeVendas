import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function criarProdutoService(nome: string, preco: number, estoque: number) {
  return await prisma.produto.create({
    data: { nome, preco, estoque }
  });
}

export async function listarProdutosService() {
  return await prisma.produto.findMany();
}

export async function buscarProdutoPorIdService(id: number) {
  return await prisma.produto.findUnique({
    where: { id },
  });
}

export async function atualizarProdutoService(id: number, nome: string, preco: number, estoque: number) {
  return await prisma.produto.update({
    where: { id },
    data: { nome, preco, estoque }
  });
}

export async function deletarProdutoService(id: number) {
  return await prisma.produto.delete({
    where: { id }
  });
}
