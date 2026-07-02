import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { followUser, getUserFollows, unfollowUser } from '../controllers/followController';


const router = Router({ mergeParams: true })


router.post('/', followUser);
router.delete('/', unfollowUser);
router.get('/', getUserFollows);


export default router