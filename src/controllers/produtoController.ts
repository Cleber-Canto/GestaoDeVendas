import { Request, Response, NextFunction } from 'express';
import {
  criarProdutoService,
  listarProdutosService,
  buscarProdutoPorIdService,
  atualizarProdutoService,
  deletarProdutoService
} from '../services/produtoService';

export async function criarProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { nome, preco, estoque } = req.body;
    const novoProduto = await criarProdutoService(nome, preco, estoque);
    res.status(201).json(novoProduto);
  } catch (err) {
    next(err);
  }
}

export async function listarProdutos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const produtos = await listarProdutosService();
    res.status(200).json(produtos);
  } catch (err) {
    next(err);
  }
}

export async function buscarProdutoPorId(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const produto = await buscarProdutoPorIdService(Number(id));
    if (!produto) {
      res.status(404).json({ message: 'Produto não encontrado' });
    } else {
      res.status(200).json(produto);
    }
  } catch (err) {
    next(err);
  }
}

export async function atualizarProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { nome, preco, estoque } = req.body;
    const produtoAtualizado = await atualizarProdutoService(Number(id), nome, preco, estoque);
    res.status(200).json({ message: 'Produto atualizado com sucesso', produto: produtoAtualizado });
  } catch (err) {
    next(err);
  }
}

export async function deletarProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    await deletarProdutoService(Number(id));
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    next(err);
  }
}
