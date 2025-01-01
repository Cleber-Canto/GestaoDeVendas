import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import produtoRoutes from './routes/produtoRoutes';
import clienteRoutes from './routes/clienteRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
//import { authMiddleware } from './middleware/authMiddleware';
import ErrorHandling from './utils/errors.handling'; // Corrigido para o caminho correto

dotenv.config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Rotas Públicas
app.use('/auth', authRoutes);

// Middleware de Autenticação (deve ser após as rotas públicas)
// app.use(authMiddleware);

// Rotas Privadas
app.use('/api/produtos', produtoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/users', userRoutes);

// Middleware de tratamento de erro - **deve ser o último middleware**
app.use(ErrorHandling.middleware);

export default app;
