import { Router } from 'express'
import { validate } from '../middleware/validationMiddleware';
import { searchSchema } from '../schemas/search.schema';
import { search } from '../controllers/searchController';

const router = Router()


router.get('/', validate(searchSchema), search);

export default router;