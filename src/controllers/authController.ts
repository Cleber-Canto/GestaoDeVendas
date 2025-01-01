import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Add this line to import the 'jsonwebtoken' library

const prisma = new PrismaClient();

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      res.status(400).json({ message: 'Credenciais inválidas' });
      return;
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      res.status(400).json({ message: 'Credenciais inválidas' });
      return;
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se o email já está em uso
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email já está em uso' });
      return;
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash },
    });

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    next(error);
  }
}

export async function getLoggedUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.user ?? {};

    const usuario = await prisma.usuario.findUnique({ where: { id } });

    if (!usuario) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
}
