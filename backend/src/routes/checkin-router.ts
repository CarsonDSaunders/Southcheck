import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import checkin, { ICheckin } from "@controllers/checkin";
import { ParamMissingError } from "@shared/errors";

// **** Variables **** //

// Misc
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: "/all",
    add: "/add",
    update: "/update",
    delete: "/delete/:id"
} as const;

// **** Functions **** //

/**
 * Retrieve checkin
 */
// router.get(p.get, async (_: Request, res: Response) => {
//     return res.status(OK);
// });

/**
 * Add one checkin
 */
router.post(p.add, (req: Request, res: Response) => {
    const checkinInfo = req.body;
    checkin.addCheckin(checkinInfo);
    return res.status(CREATED).send();
});

// /**
//  * Force update on checkin
//  */
// router.put(p.update, async (req: Request, res: Response) => {
//     const { checkin } = req.body;
//     // Check param
//     if (!checkin) {
//         throw new ParamMissingError();
//     }
//     // Fetch data
//     await checkin.updateOne(checkin);
//     return res.status(OK).end();
// });

// /**
//  * Clear checkin
//  */
// router.delete(p.delete, async (req: Request, res: Response) => {
//     const { id } = req.params;
//     // Check param
//     if (!id) {
//         throw new ParamMissingError();
//     }
//     // Fetch data
//     // await checkin.delete(Number(id));
//     return res.status(OK).end();
// });

// **** Export default **** //

export default router;
