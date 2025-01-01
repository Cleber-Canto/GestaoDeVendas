import express from 'express';
import PedidoController from '../controllers/pedidoController';

const router = express.Router();

router.post('/', PedidoController.createPedido);
router.get('/', PedidoController.getPedidos);
router.get('/:id', PedidoController.getPedidoById); // Nova rota
router.put('/:id', PedidoController.updatePedido);
router.delete('/:id', PedidoController.deletePedido);

export default router;

