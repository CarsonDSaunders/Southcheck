import { UserNotFoundError } from "@shared/errors";

import {
    getFlights,
    getStandardizedCheckins,
    IFlight,
    scheduleCheckin
} from "./sw";
import agenda from "./agenda";

export interface ICheckin {
    confirmation: string;
    firstName: string;
    lastName: string;
}
// **** Functions **** //

/**
 * Get all checkins
 */
// function getAll(): Promise<ICheckin[]> {
//     return userRepo.getAll();
// }

/**
 * Add new checkin
 */
async function addCheckin(checkin: ICheckin) {
    const reservations: IFlight[] = await getFlights(checkin);
    const standardizedCheckins = await getStandardizedCheckins(reservations);
    const scheduledCheckins = await scheduleCheckin(
        standardizedCheckins,
        agenda
    );

    console.log(standardizedCheckins);
    return;
}

/**
 * Update one user
 */
// async function updateOne(user: ICheckin): Promise<void> {
//     const persists = await userRepo.persists(user.id);
//     if (!persists) {
//         throw new UserNotFoundError();
//     }
//     return userRepo.update(user);
// }

/**
 * Delete a user by their id
 */
// async function _delete(id: number): Promise<void> {
//     const persists = await userRepo.persists(id);
//     if (!persists) {
//         throw new UserNotFoundError();
//     }
//     return userRepo.delete(id);
// }

// **** Export default **** //

export default {
    addCheckin
} as const;
