import axios from "axios";
import { ICheckin } from "./checkin";
import { getAirport } from "./openflights";
import { zonedTimeToUtc } from "date-fns-tz";

export interface IFlight {
    firstName: string;
    lastName: string;
    depDate: string;
    depTime: string;
    depCode: string;
    depConfirm: string;
    utcDate?: Date;
}

const getApiKey = async (): Promise<string> => {
    const key = await axios
        .get("https://mobile.southwest.com/js/config.js")
        .then((res) => {
            const data = String(res.data);
            const apiKey = /(?<=API_KEY:").*?(?=")/g.exec(data);
            if (apiKey) {
                return apiKey[0];
            }
        })
        .catch((err) => {
            console.log(err);
        });
    if (typeof key === "string") {
        return key;
    }
    return "";
};

export const getFlights = async (checkin: ICheckin): Promise<IFlight[]> => {
    const { confirmation, firstName, lastName } = checkin;
    const apiKey: string = await getApiKey();

    const host = "https://mobile.southwest.com/api";
    const path =
        "mobile-air-booking/v1/mobile-air-booking/page/view-reservation";

    const flights: any = await axios
        .get(
            `${host}/${path}/${confirmation}?first-name=${firstName}&last-name=${lastName}`,
            { headers: { "X-Channel-ID": "MWEB", "X-API-Key": apiKey } }
        )
        .then((res) => {
            const bounds: IFlight[] = [];
            if (res && res.data) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                res.data.viewReservationViewPage.bounds.forEach(
                    (flight: any) => {
                        bounds.push({
                            firstName: firstName,
                            lastName: lastName,
                            depDate: flight.departureDate,
                            depTime: flight.departureTime,
                            depCode: flight.departureAirport.code,
                            depConfirm: confirmation
                        });
                    }
                );
                return bounds;
            }
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
    return flights;
};

export const getStandardizedCheckins = async (flights: IFlight[]) => {
    const newFlights = [];
    for (const fl of flights) {
        let newFl: IFlight = { ...fl };
        newFl.depTime += ":00";

        const timezoneDiff = await getAirport(fl.depCode);

        newFl.utcDate = zonedTimeToUtc(
            `${fl.depDate}T${fl.depTime}`,
            timezoneDiff.airports[0].tz_id
        );
        newFlights.push(newFl);
    }
    return newFlights;
};

export const scheduleCheckin = async (flights: IFlight[], agenda: any) => {
    for (const fl of flights) {
        agenda.schedule(fl.utcDate, "checkin for flight", {
            confirmation: fl.depConfirm
        });
    }
    return;
};

export const checkinFlight = async (checkin: ICheckin): Promise<IFlight[]> => {
    const { confirmation, firstName, lastName } = checkin;
    const apiKey: string = await getApiKey();

    const host = "https://mobile.southwest.com/api";
    const path =
        "mobile-air-operations/v1/mobile-air-operations/page/check-in/";

    const flights: any = await axios
        .get(
            `${host}/${path}/${confirmation}?first-name=${firstName}&last-name=${lastName}`,
            { headers: { "X-Channel-ID": "MWEB", "X-API-Key": apiKey } }
        )
        .then((res) => {
            const bounds: IFlight[] = [];
            if (res && res.data) {
            }
            return res;
        })
        .catch((err) => {
            console.log(err);
        });
    return flights;
};

//Current progress 9/7: need to figure out url and repsonse for actual checkin
