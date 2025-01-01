// userService.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface CreateUserInput {
  nome: string;
  email: string;
  senha: string;
  roleId: number;
}

interface EditUserInput {
  nome?: string;
  email?: string;
}

interface LoginInput {
  email: string;
  senha: string;
}

export default class Usuarios {
  async selectAll() {
    return await prisma.usuario.findMany({
      include: {
        roles: true,
      },
    });
  }

  async selectOne({ id, nome }: { id: number; nome?: string }) {
    return await prisma.usuario.findFirst({
      where: {
        id,
        ...(nome && { nome }), // Filtro pelo nome apenas se ele for passado
      },
      include: {
        roles: true,
      },
    });
  }

  async create({ nome, email, senha, roleId }: CreateUserInput) {
    try {
      const existingUser = await prisma.usuario.findUnique({ where: { email } });

      if (existingUser) {
        throw new Error('Email já existe');
      }

      const hashedPassword = await bcrypt.hash(senha, 10);

      return await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: hashedPassword,
          criadoEm: new Date(),
          atualizadoEm: new Date(),
          roles: {
            create: { roleId },
          },
        },
      });
    } catch (error) {
      throw new Error('Erro ao criar usuário');
    }
  }

  async deleteOne({ id, nome }: { id: number; nome: string }) {
    try {
      id = +id;
      const data = await this.selectOne({ id, nome });
      if (!data) return null;

      return await prisma.usuario.delete({
        where: { id },
        select: { id: true, nome: true },
      });
    } catch (error) {
      throw new Error('Erro ao excluir usuário');
    }
  }

  async editOne({ nome, email }: EditUserInput, { id }: { id: number }) {
    try {
      id = +id;
      const dataToUpdate: any = { nome, email };

      return await prisma.usuario.update({
        data: dataToUpdate,
        where: { id },
      });
    } catch (error) {
      throw new Error('Erro ao editar usuário');
    }
  }

  async login({ email, senha }: LoginInput) {
    try {
      const user = await prisma.usuario.findUnique({ where: { email }, include: { roles: true } });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (!isPasswordValid) {
        throw new Error('Senha inválida');
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      return { token };
    } catch (error) {
      throw new Error('Erro no login');
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
      const user = await prisma.usuario.findUnique({ where: { id: decoded.userId }, include: { roles: true } });

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return user;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}
