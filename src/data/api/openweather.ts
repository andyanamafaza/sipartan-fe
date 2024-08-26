import axios from "axios";
import { openWeatherMapApiKey, openWeatherMapUrl } from "../../utils/apiUtils";

export const getWeather = async (latitudeValue: string, longitudeValue: string) => {
    const response = await axios.get(`${openWeatherMapUrl}/weather?lat=${latitudeValue}&lon=${longitudeValue}&units=metric&appid=${openWeatherMapApiKey}`)
    return response.data;
};