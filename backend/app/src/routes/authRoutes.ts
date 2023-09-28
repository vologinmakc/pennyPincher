
import { Router } from 'express';
import loginController from '../controllers/auth/loginController';

const router = Router();

router.post('/', loginController.authenticate);

export default router;
