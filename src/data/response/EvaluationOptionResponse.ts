interface EvaluationOptionDataResponse {
    msg: string;
    result: EvaluationOptionData[];
};

interface EvaluationOptionData {
    bobot: number;
    createdAt: number;
    deskripsi: string | null;
    kategori: string;
    nilai: number;
    penilaian_id: string;
    type: string;
    updatedAt: string;
    variable: string;
};