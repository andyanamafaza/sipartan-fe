// Move to backend or add mini backend (express) to handle the request later for security

export const OLD_BASE_URL: string = "https://sipartan.et.r.appspot.com";
export const BASE_URL: string = "https://e215-103-10-104-2.ngrok-free.app";
// export const NEW_BASE_URL: string = "http://86.38.217.222:9001";
export const NEW_BASE_URL: string = "https://e215-103-10-104-2.ngrok-free.app";

// https://openweathermap.org/current
export const openWeatherMapApiKey: string = import.meta.env.VITE_OPENWEATHER_APIKEY;
export const openWeatherMapUrl: string = "https://api.openweathermap.org/data/2.5";

// https://docs.binderbyte.com/api/wilayah
export const wilayahBinderByteApiKey: string = import.meta.env.VITE_BINDERBYTE_APIKEY;
export const wilayahBinderByteUrl: string = "https://api.binderbyte.com/wilayah";

// https://geocode.maps.co/
export const geoCodingApiKey: string = import.meta.env.VITE_GEOCODING_APIKEY;
export const geoCodingUrl: string = "https://geocode.maps.co/search?";