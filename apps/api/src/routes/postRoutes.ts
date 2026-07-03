import { Router } from 'express'
import { createPost, deletePost, editPost, getFeed, getPost } from '../controllers/postController'
import { authMiddleware } from '../middleware/authMiddleware';
import { createUpload } from '../config/s3';

const router = Router()

router.get('/',authMiddleware, getFeed);
router.get('/:id', getPost);
router.post('/', authMiddleware, createUpload("posts").single('image'), createPost);
router.put('/:id',authMiddleware, editPost);
router.delete('/:id',authMiddleware, deletePost);



export default router