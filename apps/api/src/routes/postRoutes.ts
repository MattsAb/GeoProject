import { Router } from 'express'
import { createPost, deletePost, editPost, getFeed, getPost } from '../controllers/postController'
import { authMiddleware } from '../middleware/authMiddleware';
import { createUpload } from '../config/s3';

const router = Router()

router.get('/', getFeed);
router.get('/:id', getPost);
router.post('/', createUpload("posts").single('image'), createPost);
router.put('/:id', editPost);
router.delete('/:id',deletePost);



export default router