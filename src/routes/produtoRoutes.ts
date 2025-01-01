import express from 'express';
import {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto
} from '../controllers/produtoController';

const router = express.Router();

router.post('/', criarProduto);
router.get('/', listarProdutos);
router.get('/:id', buscarProdutoPorId);
router.put('/:id', atualizarProduto);
router.delete('/:id', deletarProduto);

export default router;
