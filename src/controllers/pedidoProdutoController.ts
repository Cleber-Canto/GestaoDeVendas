import { Request, Response } from 'express';
import PedidoProdutoService from '../services/pedidoProdutoService';

class PedidoProdutoController {
  static async createPedidoProduto(req: Request, res: Response): Promise<Response> {
    try {
      const pedidoProduto = await PedidoProdutoService.createPedidoProduto(req.body);
      return res.status(201).json(pedidoProduto);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getPedidoProdutos(req: Request, res: Response): Promise<Response> {
    try {
      const pedidoProdutos = await PedidoProdutoService.getPedidoProdutos();
      return res.status(200).json(pedidoProdutos);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  static async updatePedidoProduto(req: Request, res: Response): Promise<Response> {
    try {
      const pedidoProduto = await PedidoProdutoService.updatePedidoProduto(Number(req.params.id), req.body);
      if (pedidoProduto) {
        return res.status(200).json(pedidoProduto);
      } else {
        return res.status(404).json({ message: 'PedidoProduto não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  static async deletePedidoProduto(req: Request, res: Response): Promise<Response> {
    try {
      const deleted = await PedidoProdutoService.deletePedidoProduto(Number(req.params.id));
      if (deleted) {
        return res.status(200).json({ message: 'PedidoProduto deletado com sucesso' });
      } else {
        return res.status(404).json({ message: 'PedidoProduto não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default PedidoProdutoController;
