import { Router } from 'express';
import {
  getOneUsuario,
  listUsuarios,
  createUsuario,
  deleteUsuario,
  editUsuario,
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const userRouter = Router();

userRouter.post('/', authMiddleware, createUsuario);
userRouter.get('/', authMiddleware, listUsuarios);
userRouter.get('/:id', authMiddleware, getOneUsuario);
userRouter.put('/:id', authMiddleware, editUsuario);
userRouter.delete('/:id', authMiddleware, deleteUsuario);

export default userRouter;
