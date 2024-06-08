interface GeneralData {
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    desa: string;
    tutupan_lahan: string;
    jenis_vegetasi: string;
    luasan_karhutla: number;
    jenis_tanah: string;
    tinggi_muka_air_gambut: number | null;
    jenis_karhutla: string;
    penggunaan_lahan: string;
    latitude: string;
    longitude: string;
    temperatur: number;
    cuaca_hujan: number;
    kelembaban_udara: number;
};

interface GeneralDataWeatherInfo {
    temperatur: number;
    cuaca_hujan: number;
    kelembaban_udara: number;
};

interface GeneralDataLocationInfo {
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    desa: string;
    latitude: string;
    longitude: string;
};

interface GeneralDataAreaInfo {
    tutupan_lahan: string;
    jenis_vegetasi: string;
    luasan_karhutla: number;
    jenis_tanah: string;
    tinggi_muka_air_gambut: number | null;
    jenis_karhutla: string;
    penggunaan_lahan: string;
};