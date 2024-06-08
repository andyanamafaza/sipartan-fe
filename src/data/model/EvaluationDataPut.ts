// Used for edit/put feature in Detail Page
interface EvaluationDataPut {
    data_indikator: DataIndikator[],
};

interface DataIndikator {
    penilaianObservation_id: string,
    penilaian_id: string,
};