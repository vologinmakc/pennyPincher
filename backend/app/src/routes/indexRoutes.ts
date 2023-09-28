import express from 'express';
import IndexController from '../controllers/indexController';

const router = express.Router();

router.get('/', IndexController.index);

export default router;
