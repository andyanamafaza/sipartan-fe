interface SingleResultResponse {
    msg: string;
    result: ResultData;
};

interface ResultData {
    luasan_karhutla: number;
    tinggi_muka_air_gambut: null | number;
    temperatur: number;
    cuaca_hujan: number;
    kelembaban_udara: number;
    tutupan_lahan: string;
    jenis_karhutla: string;
    penggunaan_lahan: string;
    jenis_tanah: string;
    jenis_vegetasi: string;
    nama_user: string;
    instansi_user: string;
    tanggal_upload: string;
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
    desa: string;
    latitude: string;
    longitude: string;
    tanggalKejadian: string;
    tanggalPenilaian: string;
    single_plot: SinglePlot[];
    skor: number;
    hasil_penilaian: string;
};

interface SinglePlot {
    luas_plot: number;
    skor_plot: number;
    hasil_plot: string;
    penilaianIdsSinglePlot: PenilaianIdsSinglePlot[];
};

interface PenilaianIdsSinglePlot {
    penilaianDeskripsi: string;
    penilaianObservasiIds: string;
    penilaianIds: string;
    penilaianName: string;
    penilaianKategori: string;
    penilaianImgNames: string[];
};