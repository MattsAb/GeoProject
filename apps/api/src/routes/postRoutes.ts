import { Router } from 'express'
import { createPost, deletePost, editPost, getFeed, getPost } from '../controllers/postController'
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router()

router.get('/', getFeed);
router.get('/:id', getPost);
router.post('/', createPost);
router.put('/:id', editPost);
router.delete('/:id',deletePost);



export default router