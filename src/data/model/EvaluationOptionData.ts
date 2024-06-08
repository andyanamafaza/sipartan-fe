// Model for evaluation option data (opsi - opsi penilaian)
// It's basically the data from the get-penilaian endpoint

interface EvaluationOptionData {
    msg: string;
    result: EvaluationOptionResult[];
};

interface EvaluationOptionResult {
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