export const getClassForSeverity = (severity: string): string => {
    switch (severity) {
        case 'Sangat Ringan':
            return 'bg-sangatringan';
        case 'Ringan':
            return 'bg-ringan';
        case 'Sedang':
            return 'bg-sedang';
        case 'Berat':
            return 'bg-berat';
        case 'Sangat Berat':
            return 'bg-sangatberat';
        default:
            return '';
    }
};

export const getIconForSeverity = (severity: string): string => {
    switch (severity) {
        case 'Sangat Ringan':
            return 'marker-darkgreen.png';
        case 'Ringan':
            return 'marker-lightgreen.png';
        case 'Sedang':
            return 'marker-yellow.png';
        case 'Berat':
            return 'marker-lightred.png';
        case 'Sangat Berat':
            return 'marker-darkred.png';
        default:
            return '';
    }
}

export const getResultIconForSeverity = (severity: string): string => {
    switch (severity) {
        case 'Sangat Ringan':
            return 'result_sangat_ringan.webp';
        case 'Ringan':
            return 'result_ringan.png';
        case 'Sedang':
            return 'result_sedang.png';
        case 'Berat':
            return 'result_berat.png';
        case 'Sangat Berat':
            return 'result_sangat_berat.png';
        default:
            return '';
    }
}

export const getSeverityForScore = (score: number): string => {
    switch (true) {
        case score >= 0 && score <= 20:
            return "Sangat Ringan";
        case score > 20 && score <= 40:
            return "Ringan";
        case score > 40 && score <= 60:
            return "Sedang";
        case score > 60 && score <= 80:
            return "Berat";
        case score > 80 && score <= 100:
            return "Sangat Berat";
        default:
            return "Invalid score";
    }
};

export const convertDateTimeToUnix = (datetime: string): number => {
    const unixTimestamp = new Date(datetime).getTime();
    return unixTimestamp;
};

export enum JenisTanah {
    TANAH_GAMBUT = "Tanah Gambut",
    TANAH_BERGAMBUT = "Tanah Bergambut",
    TANAH_MINERAL = "Tanah Mineral",
    TANAH_RAWA = "Tanah Rawa",
};

export enum TipeLokasi {
    PROVINSI = "provinsi",
    KABUPATEN = "kabupaten",
    KECAMATAN = "kecamatan",
    DESA = "desa",
};

export enum KategoriIndikator {
    INDIKATOR_1 = "Kematian pohon",
    INDIKATOR_2A = "Kerusakan batang bagian terbakar",
    INDIKATOR_2B = "Kerusakan batang jenis kerusakan",
    INDIKATOR_3 = "Kerusakan tajuk",
    INDIKATOR_4 = "Kerusakan cabang",
    INDIKATOR_5 = "Kerusakan dedaunan",
    INDIKATOR_6 = "Kerusakan akar",
    INDIKATOR_7 = "Tingkat keparahan vegetasi terbakar",
    INDIKATOR_8_MINERAL = "Tingkat keparahan kondisi tanah mineral",
    INDIKATOR_8_GAMBUT = "Tingkat keparahan kondisi tanah gambut",
};

export enum CustomStates {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
};