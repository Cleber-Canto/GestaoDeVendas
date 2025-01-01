import express from 'express';
import ClienteController from '../controllers/clienteController';

const router = express.Router();

router.post('/', ClienteController.createCliente);
router.get('/', ClienteController.getClientes);
router.get('/:id', ClienteController.getClienteById);
router.put('/:id', ClienteController.updateCliente);
router.delete('/:id', ClienteController.deleteCliente);

export default router;
