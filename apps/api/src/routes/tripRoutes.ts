import { Router } from 'express'
import { authMiddleware, lightAuthMiddleware } from '../middleware/authMiddleware';
import { createTrip, deleteTrip, editTrip, getTrip, getUserTrips } from '../controllers/tripController';
import { validate } from '../middleware/validationMiddleware';
import { createTripSchema, tripParamsSchema } from '../schemas/trip.schema';
import { createUpload } from '../config/s3';

const router = Router()

router.get(
    '/:tripId',
    lightAuthMiddleware,
    validate(tripParamsSchema),
    getTrip
);

router.post(
    '/',
    authMiddleware,
    createUpload("trips").single('image'),
    validate(createTripSchema),
    createTrip,
);

router.get(
    "/user/:id",
    authMiddleware,
    getUserTrips
)

router.put(
    '/:tripId',
    authMiddleware,
    createUpload("trips").single('image'),
    validate(createTripSchema),
    editTrip,
);

router.delete(
    '/:tripId',
    authMiddleware,
    validate(tripParamsSchema),
    deleteTrip,
);

export default router