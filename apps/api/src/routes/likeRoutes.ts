import { Router } from 'express';
import { getLikedPosts, likePost, unlikePost } from '../controllers/likeController';

const router = Router({ mergeParams: true })


router.post('/', likePost);
router.delete('/', unlikePost);
router.get('/', getLikedPosts);


export default router