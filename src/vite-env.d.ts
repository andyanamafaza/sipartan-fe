/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENWEATHER_APIKEY: string;
    readonly VITE_BINDERBYTE_APIKEY: string;
    readonly VITE_GEOCODING_APIKEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}