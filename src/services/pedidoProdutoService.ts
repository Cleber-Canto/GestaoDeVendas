import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PedidoProdutoService {
  static async createPedidoProduto(data: { pedidoId: number; produtoId: number; quantidade: number }) {
    try {
      const pedidoProduto = await prisma.pedidoProduto.upsert({
        where: {
          pedidoId_produtoId: { pedidoId: data.pedidoId, produtoId: data.produtoId }
        },
        create: data,
        update: {
          quantidade: data.quantidade
        }
      });
      return pedidoProduto;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao criar pedidoProduto: ' + error.message);
      }
      throw new Error('Erro desconhecido ao criar pedidoProduto');
    }
  }

  static async getPedidoProdutos() {
    try {
      const pedidoProdutos = await prisma.pedidoProduto.findMany();
      return pedidoProdutos;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao buscar pedidoProdutos: ' + error.message);
      }
      throw new Error('Erro desconhecido ao buscar pedidoProdutos');
    }
  }

  static async updatePedidoProduto(id: number, data: { quantidade: number }) {
    try {
      const pedidoProduto = await prisma.pedidoProduto.update({
        where: { id },
        data,
      });
      return pedidoProduto;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao atualizar pedidoProduto: ' + error.message);
      }
      throw new Error('Erro desconhecido ao atualizar pedidoProduto');
    }
  }

  static async deletePedidoProduto(id: number) {
    try {
      const pedidoProduto = await prisma.pedidoProduto.delete({
        where: { id },
      });
      return pedidoProduto ? true : false;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao deletar pedidoProduto: ' + error.message);
      }
      throw new Error('Erro desconhecido ao deletar pedidoProduto');
    }
  }
}

export default PedidoProdutoService;
