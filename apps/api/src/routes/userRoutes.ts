import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getProfile, updateProfile } from '../controllers/userController';
import { createUpload } from '../config/s3';

const router = Router()

router.get('/:id', getProfile);
router.put('/', authMiddleware, createUpload('avatars').single('image'), updateProfile);


export default router