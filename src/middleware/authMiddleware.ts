import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    req.user = { id: decoded.id }; // Assumindo que você adiciona essa propriedade ao tipo Request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

