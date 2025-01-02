import { Request, Response } from 'express';
import UsuarioRoleService from '../services/usuarioRoleService';

class UsuarioRoleController {
  static async createUsuarioRole(req: Request, res: Response): Promise<Response> {
    try {
      const usuarioRole = await UsuarioRoleService.createUsuarioRole(req.body);
      return res.status(201).json(usuarioRole);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getUsuarioRoles(req: Request, res: Response): Promise<Response> {
    try {
      const usuarioRoles = await UsuarioRoleService.getUsuarioRoles();
      return res.status(200).json(usuarioRoles);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  static async updateUsuarioRole(req: Request, res: Response): Promise<Response> {
    try {
      const usuarioRole = await UsuarioRoleService.updateUsuarioRole(Number(req.params.id), req.body);
      if (usuarioRole) {
        return res.status(200).json(usuarioRole);
      } else {
        return res.status(404).json({ message: 'UsuarioRole não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  static async deleteUsuarioRole(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await UsuarioRoleService.deleteUsuarioRole(Number(req.params.id));
      if (deleted) {
        return res.status(200).json({ message: 'UsuarioRole deletado com sucesso' });
      } else {
        return res.status(404).json({ message: 'UsuarioRole não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default UsuarioRoleController;
