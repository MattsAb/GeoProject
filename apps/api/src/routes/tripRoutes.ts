import { Router } from 'express'
import { authMiddleware, lightAuthMiddleware } from '../middleware/authMiddleware';
import { createTrip, deleteTrip, editTrip, getTrip } from '../controllers/tripController';
import { validate } from '../middleware/validationMiddleware';
import { createTripSchema, tripParamsSchema } from '../schemas/trip.schema';

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
    validate(createTripSchema),
    createTrip,
);

router.put(
    '/:tripId',
    authMiddleware,
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