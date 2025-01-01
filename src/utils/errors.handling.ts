import { Request, Response, NextFunction } from 'express';

// Classe para tratamento centralizado de erros
class ErrorHandling {
  static middleware(middleware: any) {
      throw new Error('Method not implemented.');
  }
  // Método para lidar com o erro de rota não encontrada (404)
  static notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({ message: 'Not Found' });
  }

  // Middleware para capturar e formatar erros gerais
  static errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  }

  // Middleware genérico para capturar qualquer erro não tratado
  static genericErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(err.stack); // Log do erro no servidor
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Ajusta o status
    res.status(statusCode).json({
      error: 'Something went wrong!',
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  }
}

export default ErrorHandling;
