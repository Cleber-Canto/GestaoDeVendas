// userController.ts
import { Request, Response, NextFunction } from 'express';
import Usuarios from '../services/userService';

const usuarios = new Usuarios();

export async function getOneUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!id || isNaN(parseInt(id))) {
      res.status(400).send({ message: 'Formato de ID inválido' });
      return;
    }

    const usuario = await usuarios.selectOne({ id: parseInt(id) });

    if (!usuario) {
      res.status(404).send({ message: 'Usuário não encontrado' });
      return;
    }

    res.status(200).json(usuario);
  } catch (error) {
    next(error);
  }
}

export async function listUsuarios(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const __data = await usuarios.selectAll();
    res.status(200).send(__data);
  } catch (error) {
    next(error);
  }
}

export async function createUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { nome, email, senha, roleId } = req.body;

    if (!nome || !email || !senha || !roleId) {
      res.status(400).send({ message: 'Nome, Email, Senha e roleId são obrigatórios' });
      return;
    }

    const __data = await usuarios.create({ nome, email, senha, roleId });
    res.status(201).send(__data);
  } catch (error) {
    next(error);
  }
}

export async function deleteUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: 'ID é obrigatório' });
      return;
    }

    const __data = await usuarios.deleteOne({ id: parseInt(id), nome: '' });
    if (!__data) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }

    res.status(200).send({ deleted: true, row: __data });
  } catch (error) {
    next(error);
  }
}

export async function editUsuario(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: 'ID é obrigatório' });
      return;
    }

    const __data = await usuarios.editOne(req.body, { id: parseInt(id) });
    if (!__data) {
      res.status(404).send({ message: "Usuário não encontrado" });
      return;
    }

    res.status(200).send(__data);
  } catch (error) {
    next(error);
  }
}
