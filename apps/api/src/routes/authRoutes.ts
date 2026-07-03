import { Router } from 'express';
import { confirmSignUp, getMe, login, signUp } from '../controllers/authController';
import { validate } from '../middleware/validationMiddleware';
import { confirmSignUpSchema, loginSchema, signupSchema } from '../schemas/auth.schema';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router()

router.post('/signup', validate(signupSchema), signUp);
router.post('/confirm', validate(confirmSignUpSchema), confirmSignUp);
router.post('/login', validate(loginSchema), login);
router.get('/me', authMiddleware, getMe);

export default router