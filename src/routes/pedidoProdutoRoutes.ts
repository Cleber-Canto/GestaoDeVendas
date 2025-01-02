import express from 'express';
import PedidoProdutoController from '../controllers/pedidoProdutoController';

const router = express.Router();

// Definir rotas de PedidoProduto
router.post('/', PedidoProdutoController.createPedidoProduto);
router.get('/', PedidoProdutoController.getPedidoProdutos);
router.put('/:id', PedidoProdutoController.updatePedidoProduto);
router.delete('/:id', PedidoProdutoController.deletePedidoProduto);

export default router;
