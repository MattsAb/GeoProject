import { Router } from 'express'
import { lightAuthMiddleware } from '../middleware/authMiddleware';
import { getPlace } from '../controllers/placeController';

const router = Router()

router.get(
    '/:placeId',
    lightAuthMiddleware,
    getPlace
);

export default router