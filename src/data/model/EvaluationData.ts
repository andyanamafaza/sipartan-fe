type EvaluationData = {
    tanggal_kejadian: string;
    tanggal_penilaian: string;
    luasan_plot: number;
    indikator_1: string;
    indikator_2a: string;
    indikator_2b: string;
    indikator_3: string;
    indikator_4: string;
    indikator_5: string;
    indikator_6: string;
    indikator_7: string;
    indikator_8: string;
};

type EvaluationDataDate = Pick<EvaluationData,
    'tanggal_kejadian' | 'tanggal_penilaian'>;

type EvaluationDataPlot = Pick<EvaluationData,
    'luasan_plot' | 'indikator_1' | 'indikator_2a' |
    'indikator_2b' | 'indikator_3' | 'indikator_4' |
    'indikator_5' | 'indikator_6' | 'indikator_7' |
    'indikator_8'>;

type EvaluationDataIndicators = Pick<EvaluationData,
    'indikator_1' | 'indikator_2a' | 'indikator_2b' |
    'indikator_3' | 'indikator_4' | 'indikator_5' |
    'indikator_6' | 'indikator_7' | 'indikator_8'>;
