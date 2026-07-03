import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { confirmSignUp, login, signUp } from '../controllers/authController';

const router = Router()

router.post('/signup', signUp);
router.post('/confirm', confirmSignUp);
router.post('/login', login);

export default router