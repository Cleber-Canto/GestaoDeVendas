import express from 'express';
import UsuarioRoleController from '../controllers/usuarioRoleController';

const router = express.Router();

// Definir rotas de UsuarioRole
router.post('/', UsuarioRoleController.createUsuarioRole);
router.get('/', UsuarioRoleController.getUsuarioRoles);
router.put('/:id', UsuarioRoleController.updateUsuarioRole);
router.delete('/:id', UsuarioRoleController.deleteUsuarioRole);

export default router;
