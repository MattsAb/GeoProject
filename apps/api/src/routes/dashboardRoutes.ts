import { Router } from "express";
import { lightAuthMiddleware } from "../middleware/authMiddleware";
import { getFeedPosts, getFeedTrips } from "../controllers/dashboardController";

const router = Router()

router.get(
    '/feedtrips',
    lightAuthMiddleware,
    getFeedTrips
);

router.get(
    '/feedposts',
    lightAuthMiddleware,
    getFeedPosts
);

export default router