type GeneralData = {
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

type GeneralDataWeatherInfo = Pick<GeneralData,
    'temperatur' | 'cuaca_hujan' | 'kelembaban_udara'>;

type GeneralDataLocationInfo = Pick<GeneralData,
    'provinsi' | 'kabupaten' | 'kecamatan' | 'desa' |
    'latitude' | 'longitude'>;

type GeneralDataAreaInfo = Pick<GeneralData,
    'tutupan_lahan' | 'jenis_vegetasi' | 'luasan_karhutla' |
    'jenis_tanah' | 'tinggi_muka_air_gambut' | 'jenis_karhutla' |
    'penggunaan_lahan'>;
