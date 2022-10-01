import { Router } from "express";
import checkinRouter from "./checkin-router";

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use("/checkins", checkinRouter);

// *** Export default **** //

export default baseRouter;
