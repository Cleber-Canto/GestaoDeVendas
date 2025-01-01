import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PedidoService {
  // Função para criar um pedido
  static async createPedido(data: { clienteId: number; produtos: { produtoId: number; quantidade: number }[] }) {
    try {
      // Verificar se o cliente existe
      const cliente = await prisma.cliente.findUnique({ where: { id: data.clienteId } });
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }

      // Criar o pedido
      const pedido = await prisma.pedido.create({
        data: {
          clienteId: data.clienteId,
          produtos: {
            create: data.produtos.map(produto => ({
              produtoId: produto.produtoId,
              quantidade: produto.quantidade,
            })),
          },
        },
        include: { produtos: true }, // Inclui os produtos associados
      });

      return pedido;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao criar pedido: ' + error.message);
      }
      throw new Error('Erro desconhecido ao criar pedido');
    }
  }

  // Função para listar todos os pedidos
  static async getPedidos() {
    try {
      return await prisma.pedido.findMany({
        include: { produtos: true }, // Inclui os produtos associados ao pedido
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao buscar pedidos: ' + error.message);
      }
      throw new Error('Erro desconhecido ao buscar pedidos');
    }
  }

  // Função para obter um pedido pelo ID
  static async getPedidoById(id: number) {
    try {
      const pedido = await prisma.pedido.findUnique({
        where: { id },
        include: { produtos: true }, // Inclui os produtos associados ao pedido
      });

      if (!pedido) {
        throw new Error('Pedido não encontrado');
      }

      return pedido;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao buscar pedido por ID: ' + error.message);
      }
      throw new Error('Erro desconhecido ao buscar pedido por ID');
    }
  }

  // Função para atualizar um pedido
  static async updatePedido(
    id: number,
    data: { clienteId?: number; produtos?: { produtoId: number; quantidade: number }[] }
  ) {
    try {
      // Verificar se o pedido existe
      const pedidoExistente = await prisma.pedido.findUnique({
        where: { id },
      });

      if (!pedidoExistente) {
        throw new Error('Pedido não encontrado');
      }

      // Atualizar o cliente associado ao pedido (se necessário)
      if (data.clienteId) {
        await prisma.pedido.update({
          where: { id },
          data: { clienteId: data.clienteId },
        });
      }

      // Atualizar os produtos associados ao pedido (se necessário)
      if (data.produtos) {
        for (const produto of data.produtos) {
          await prisma.pedidoProduto.upsert({
            where: { pedidoId_produtoId: { pedidoId: id, produtoId: produto.produtoId } },
            create: { pedidoId: id, produtoId: produto.produtoId, quantidade: produto.quantidade },
            update: { quantidade: produto.quantidade },
          });
        }
      }

      // Retornar o pedido atualizado
      return await prisma.pedido.findUnique({
        where: { id },
        include: { produtos: true }, // Inclui os produtos atualizados
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao atualizar pedido: ' + error.message);
      }
      throw new Error('Erro desconhecido ao atualizar pedido');
    }
  }

  // Função para deletar um pedido e seus produtos associados
  static async deletePedido(id: number) {
    try {
      // Verificar se o pedido existe
      const pedidoExistente = await prisma.pedido.findUnique({
        where: { id },
      });

      if (!pedidoExistente) {
        throw new Error('Pedido não encontrado');
      }

      // Deletar os produtos associados ao pedido
      await prisma.pedidoProduto.deleteMany({
        where: { pedidoId: id },
      });

      // Deletar o pedido
      const pedidoDeletado = await prisma.pedido.delete({
        where: { id },
      });

      // Retornar o pedido deletado
      return pedidoDeletado;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao deletar pedido: ' + error.message);
      }
      throw new Error('Erro desconhecido ao deletar pedido');
    }
  }
}

export default PedidoService;
