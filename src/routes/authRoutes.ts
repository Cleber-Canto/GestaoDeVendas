import { Router } from 'express';
import { login, register, getLoggedUser } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', authMiddleware, getLoggedUser); // Adicionando a rota para obter o usuário logado

export default authRouter;
