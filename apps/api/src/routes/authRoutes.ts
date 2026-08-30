import { Router } from 'express';
import { confirmSignUp, deleteAccount, getMe, login, resendCode, signUp } from '../controllers/authController';
import { validate } from '../middleware/validationMiddleware';
import { confirmSignUpSchema, loginSchema, resendCodeSchema, signupSchema } from '../schemas/auth.schema';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router()

router.post(
    '/signup',
    validate(signupSchema),
    signUp
);

router.post(
    '/confirm',
    validate(confirmSignUpSchema),
    confirmSignUp
);

router.post(
    '/login',
    validate(loginSchema),
    login
);

router.get(
    '/me',
    authMiddleware,
    getMe
);

router.post(
    '/resend',
    validate(resendCodeSchema),
    resendCode
);

router.delete(
    '/',
    authMiddleware,
    deleteAccount
);

export default router