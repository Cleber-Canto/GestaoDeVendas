import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UsuarioRoleService {
  static async createUsuarioRole(data: { usuarioId: number; roleId: number }) {
    try {
      const usuarioRole = await prisma.usuarioRole.create({
        data,
      });
      return usuarioRole;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao criar usuarioRole: ' + error.message);
      }
      throw new Error('Erro desconhecido ao criar usuarioRole');
    }
  }

  static async getUsuarioRoles() {
    try {
      const usuarioRoles = await prisma.usuarioRole.findMany();
      return usuarioRoles;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao buscar usuarioRoles: ' + error.message);
      }
      throw new Error('Erro desconhecido ao buscar usuarioRoles');
    }
  }

  static async updateUsuarioRole(id: number, data: { usuarioId?: number; roleId?: number }) {
    try {
      const usuarioRole = await prisma.usuarioRole.update({
        where: { id },
        data,
      });
      return usuarioRole;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao atualizar usuarioRole: ' + error.message);
      }
      throw new Error('Erro desconhecido ao atualizar usuarioRole');
    }
  }

  static async deleteUsuarioRole(id: number) {
    try {
      const usuarioRole = await prisma.usuarioRole.delete({
        where: { id },
      });
      return usuarioRole ? true : false;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('Erro ao deletar usuarioRole: ' + error.message);
      }
      throw new Error('Erro desconhecido ao deletar usuarioRole');
    }
  }
}

export default UsuarioRoleService;
