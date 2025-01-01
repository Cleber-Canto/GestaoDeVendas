import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ClienteService {
  async createCliente(data: { nome: string; email: string }) {
    return await prisma.cliente.create({
      data,
    });
  }

  async getClientes() {
    return await prisma.cliente.findMany();
  }

  async getClienteById(id: number) {
    return await prisma.cliente.findUnique({
      where: { id },
    });
  }

  async updateCliente(id: number, data: { nome: string; email: string }) {
    return await prisma.cliente.update({
      where: { id },
      data,
    });
  }

  async deleteCliente(id: number) {
    return await prisma.cliente.delete({
      where: { id },
    });
  }
}

export default new ClienteService();
