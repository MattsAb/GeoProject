import { Router } from 'express';
import { confirmSignUp, login, signUp } from '../controllers/authController';
import { validate } from '../middleware/validationMiddleware';
import { confirmSignUpSchema, loginSchema, signupSchema } from '../schemas/auth.schema';

const router = Router()

router.post('/signup', validate(signupSchema), signUp);
router.post('/confirm', validate(confirmSignUpSchema), confirmSignUp);
router.post('/login', validate(loginSchema), login);

export default router