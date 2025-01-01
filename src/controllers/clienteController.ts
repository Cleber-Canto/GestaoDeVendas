import { Request, Response } from 'express';
import ClienteService from '../services/clienteService'; // Supondo que você tenha um serviço para lógica de negócio

class ClienteController {
  public static async createCliente(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email } = req.body;

      const novoCliente = await ClienteService.createCliente({ nome, email }); // Use o serviço para encapsular a lógica
      res.status(201).json(novoCliente); // Retorna o cliente criado com status 201
    } catch (error) {
      res.status(500).json({ message: (error as Error).message }); // Captura erros e retorna com status 500
    }
  }

  public static async getClientes(req: Request, res: Response): Promise<void> {
    try {
      const clientes = await ClienteService.getClientes(); // Use o serviço para obter todos os clientes
      res.status(200).json(clientes); // Retorna os clientes com status 200
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async getClienteById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const cliente = await ClienteService.getClienteById(Number(id)); // Busca o cliente por ID
      if (!cliente) {
        res.status(404).json({ message: 'Cliente não encontrado' }); // Retorna 404 se não encontrado
        return;
      }

      res.status(200).json(cliente); // Retorna o cliente encontrado
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async updateCliente(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome, email } = req.body;

      const clienteAtualizado = await ClienteService.updateCliente(Number(id), { nome, email });
      res.status(200).json({ message: 'Cliente atualizado com sucesso', cliente: clienteAtualizado });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  public static async deleteCliente(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await ClienteService.deleteCliente(Number(id)); // Deleta o cliente pelo ID
      res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default ClienteController;
