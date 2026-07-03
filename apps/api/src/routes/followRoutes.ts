import { Router } from 'express';
import { followUser, getUserFollows, unfollowUser } from '../controllers/followController';
import { validate } from '../middleware/validationMiddleware';
import { followParamsSchema } from '../schemas/follow.schema';


const router = Router({ mergeParams: true })


router.post('/', validate(followParamsSchema), followUser);
router.delete('/', validate(followParamsSchema), unfollowUser);
router.get('/', getUserFollows);


export default router