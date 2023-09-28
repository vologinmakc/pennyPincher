import { Router } from 'express';
import indexRoutes from './routes/indexRoutes';
import authRoutes from "./routes/authRoutes";
import authenticateJWT from "./middleware/auth/jwtMiddleware";

const routes = Router();

// index route
routes.use('/login', authRoutes);
routes.use('/', authenticateJWT, indexRoutes);


export default routes;
