import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RoleService {
  static async createRole(data: { nome: string; descricao: string }) {
    try {
      const role = await prisma.role.create({
        data,
      });
      return role;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao criar role: ' + error.message);
      }
      throw new Error('Erro desconhecido ao criar role');
    }
  }

  static async getRoles() {
    try {
      const roles = await prisma.role.findMany();
      return roles;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao buscar roles: ' + error.message);
      }
      throw new Error('Erro desconhecido ao buscar roles');
    }
  }

  static async updateRole(id: number, data: { nome?: string; descricao?: string }) {
    try {
      const role = await prisma.role.update({
        where: { id },
        data,
      });
      return role;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao atualizar role: ' + error.message);
      }
      throw new Error('Erro desconhecido ao atualizar role');
    }
  }

  static async deleteRole(id: number) {
    try {
      const role = await prisma.role.delete({
        where: { id },
      });
      return role ? true : false;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao deletar role: ' + error.message);
      }
      throw new Error('Erro desconhecido ao deletar role');
    }
  }
}

export default RoleService;
