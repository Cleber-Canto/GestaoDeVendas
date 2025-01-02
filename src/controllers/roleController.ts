import { Request, Response } from 'express';
import RoleService from '../services/roleService';

class RoleController {
  static async createRole(req: Request, res: Response): Promise<Response> {
    try {
      const role = await RoleService.createRole(req.body);
      return res.status(201).json(role);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getRoles(req: Request, res: Response): Promise<Response> {
    try {
      const roles = await RoleService.getRoles();
      return res.status(200).json(roles);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  static async updateRole(req: Request, res: Response): Promise<Response> {
    try {
      const role = await RoleService.updateRole(Number(req.params.id), req.body);
      if (role) {
        return res.status(200).json(role);
      } else {
        return res.status(404).json({ message: 'Role não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  static async deleteRole(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await RoleService.deleteRole(Number(req.params.id));
      if (deleted) {
        return res.status(200).json({ message: 'Role deletado com sucesso' });
      } else {
        return res.status(404).json({ message: 'Role não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default RoleController;
