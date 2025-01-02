import express from 'express';
import RoleController from '../controllers/roleController';

const router = express.Router();

// Definir rotas de Role
router.post('/', RoleController.createRole);
router.get('/', RoleController.getRoles);
router.put('/:id', RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

export default router;
