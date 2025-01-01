import { Request, Response } from 'express';
import PedidoService from '../services/pedidoService';

class PedidoController {
  static async createPedido(req: Request, res: Response) {
    try {
      const pedido = await PedidoService.createPedido(req.body);
      res.status(201).json(pedido);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getPedidos(req: Request, res: Response) {
    try {
      const pedidos = await PedidoService.getPedidos();
      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getPedidoById(req: Request, res: Response) {
    try {
      const pedido = await PedidoService.getPedidoById(Number(req.params.id));
      res.status(200).json(pedido);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  static async updatePedido(req: Request, res: Response) {
    try {
      const pedidoId = Number(req.params.id);
      const pedido = await PedidoService.updatePedido(pedidoId, req.body);

      if (pedido) {
        res.status(200).json(pedido);
      } else {
        res.status(404).json({ message: 'Pedido não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async deletePedido(req: Request, res: Response) {
    try {
      const pedidoId = Number(req.params.id);
      const pedidoDeletado = await PedidoService.deletePedido(pedidoId);

      if (pedidoDeletado) {
        res.status(200).json({
          message: 'Pedido e seus produtos deletados com sucesso',
          pedidoId: pedidoDeletado.id,
        });
      } else {
        res.status(404).json({ message: 'Pedido não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default PedidoController;
