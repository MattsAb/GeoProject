import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getProfile, updateProfile } from '../controllers/userController';
import { createUpload } from '../config/s3';
import { validate } from '../middleware/validationMiddleware';
import { profileParamsSchema } from '../schemas/user.schema';

const router = Router()

router.get('/:id',
    validate(profileParamsSchema),
    getProfile
);

router.put('/', 
    authMiddleware, 
    createUpload('avatars').single('image'),
    updateProfile
);

export default router