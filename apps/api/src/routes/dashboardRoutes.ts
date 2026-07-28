import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getFeed } from "../controllers/dashboardController";

const router = Router()

router.get(
    '/',
    authMiddleware,
    getFeed
);

export default router