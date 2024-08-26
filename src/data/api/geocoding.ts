import axios from "axios";
import { geoCodingApiKey, geoCodingUrl } from "../../utils/apiUtils";

export const getCoordinates = async (provinsiValue: string, kabupatenValue: string, kecamatanValue: string, desaValue: string): Promise<any> => {
    const url = `${geoCodingUrl}q=${provinsiValue}+${kabupatenValue}+${kecamatanValue}+${desaValue}&api_key=${geoCodingApiKey}`.replace(/\s/g, '+');
    const response = await axios.get(url);
    return response.data;
};