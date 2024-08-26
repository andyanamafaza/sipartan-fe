interface ResultResponse {
    msg: string;
    result: IndividualResult[];
};

interface IndividualResult {
    data_lahan_id: string;
    observation_id: string;
    tutupan_lahan: string;
    luasan_karhutla: number;
    jenis_karhutla: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    desa: string;
    latitude: string;
    longitude: string;
    temperatur: number;
    cuaca_hujan: number;
    kelembaban_udara: number;
    tanggalDibuat: string;
    tanggalKejadian: string;
    tanggalPenilaian: string;
    skor: number;
    hasil_penilaian: string;
};