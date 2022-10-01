import axios from "axios";
import FormData from "form-data";

export const getAirport = async (code: string) => {
    let iataData = new FormData();
    iataData.append("iata", code);
    const timezoneDiff = await axios
        .post("https://openflights.org/php/apsearch.php", iataData)
        .then((res) => {
            if (res) {
                return res.data;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    return timezoneDiff;
};
