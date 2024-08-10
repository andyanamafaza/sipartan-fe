import React from "react";

interface MapSettingsProps {
    isLegendShown: boolean;
    setIsLegendShown: (isShown: boolean) => void;
    selectedSeverities: string[];
    setSelectedSeverities: (newSelectedSeverities: string[]) => void;
    startFireDate: string;
    setStartFireDate: (date: string) => void;
    endFireDate: string;
    setEndFireDate: (date: string) => void;
    startEvaluationDate: string;
    setStartEvaluationDate: (date: string) => void;
    endEvaluationDate: string;
    setEndEvaluationDate: (date: string) => void;
};

export const MapSettings = (props: MapSettingsProps) => {

    const handleShowLegendChange = (e: any) => {
        const { checked } = e.target;
        if (checked) {
            props.setIsLegendShown(true);
        } else {
            props.setIsLegendShown(false);
        };
    };

    const handleSeverityFilterChange = (e: any) => {
        const { id, checked } = e.target;
        if (checked) {
            props.setSelectedSeverities([...props.selectedSeverities, id]);
        } else {
            props.setSelectedSeverities(props.selectedSeverities.filter(severity => severity !== id));
        };
    };

    const handleStartFireDateChange = (e: any) => {
        props.setStartFireDate(e.target.value);
    };
    const handleEndFireDateChange = (e: any) => {
        props.setEndFireDate(e.target.value);
    };

    const handleStartEvaluationDateChange = (e: any) => {
        props.setStartEvaluationDate(e.target.value);
    };
    const handleEndEvaluationDateChange = (e: any) => {
        props.setEndEvaluationDate(e.target.value);
    };

    const applyDefaultFilters = () => {
        props.setSelectedSeverities(["Sangat Ringan", "Ringan", "Sedang", "Berat", "Sangat Berat"]);
        props.setStartFireDate("");
        props.setEndFireDate("");
        props.setStartEvaluationDate("");
        props.setEndEvaluationDate("");
    };

    return (
        <>
            <div className='form-check mb-4'>
                <input
                    className='form-check-input border-dark'
                    type="checkbox"
                    id="showLegend"
                    checked={props.isLegendShown}
                    onChange={handleShowLegendChange} />
                <label className='form-check-label' htmlFor="showLegend">
                    Tampilkan legenda
                </label>
            </div>

            <div className="h5"><strong>Filter berdasarkan tingkat keparahan</strong></div>
            <div className='row mb-4'>
                <div className="col-6">
                    <div className='form-check'>
                        <input
                            className='form-check-input border-dark'
                            type="checkbox"
                            id="Sangat Ringan"
                            checked={props.selectedSeverities.includes("Sangat Ringan")}
                            onChange={handleSeverityFilterChange}
                        />
                        <label className='form-check-label' htmlFor="Sangat Ringan">
                            Sangat Ringan
                        </label>
                    </div>
                    <div className='form-check'>
                        <input
                            className='form-check-input border-dark'
                            type="checkbox"
                            id="Ringan"
                            checked={props.selectedSeverities.includes("Ringan")}
                            onChange={handleSeverityFilterChange}
                        />
                        <label className='form-check-label' htmlFor="Ringan">
                            Ringan
                        </label>
                    </div>
                    <div className='form-check'>
                        <input
                            className='form-check-input border-dark'
                            type="checkbox"
                            id="Sedang"
                            checked={props.selectedSeverities.includes("Sedang")}
                            onChange={handleSeverityFilterChange}
                        />
                        <label className='form-check-label' htmlFor="Sedang">
                            Sedang
                        </label>
                    </div>
                </div>
                <div className="col-6">
                    <div className='form-check'>
                        <input
                            className='form-check-input border-dark'
                            type="checkbox"
                            id="Berat"
                            checked={props.selectedSeverities.includes("Berat")}
                            onChange={handleSeverityFilterChange}
                        />
                        <label className='form-check-label' htmlFor="Berat">
                            Berat
                        </label>
                    </div>
                    <div className='form-check'>
                        <input
                            className='form-check-input border-dark'
                            type="checkbox"
                            id="Sangat Berat"
                            checked={props.selectedSeverities.includes("Sangat Berat")}
                            onChange={handleSeverityFilterChange}
                        />
                        <label className='form-check-label' htmlFor="Sangat Berat">
                            Sangat Berat
                        </label>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <div className="h5"><strong>Filter berdasarkan tanggal kejadian</strong></div>
                <div className="d-flex justify-content-center align-items-center">
                    <input
                        className="form-control border-2"
                        id="startFireDate"
                        type="date"
                        value={props.startFireDate}
                        onChange={handleStartFireDateChange} />
                    <div className="h6 mx-2">-</div>
                    <input
                        className="form-control border-2"
                        id="endFireDate"
                        type="date"
                        value={props.endFireDate}
                        onChange={handleEndFireDateChange} />
                </div>
            </div>
            <div className="mb-4">
                <div className="h5"><strong>Filter berdasarkan tanggal penilaian</strong></div>
                <div className="d-flex justify-content-center align-items-center">
                    <input
                        className="form-control border-2"
                        id="startEvaluationDate"
                        type="date"
                        value={props.startEvaluationDate}
                        onChange={handleStartEvaluationDateChange} />
                    <div className="h6 mx-2">-</div>
                    <input
                        className="form-control border-2"
                        id="endEvaluationDate"
                        type="date"
                        value={props.endEvaluationDate}
                        onChange={handleEndEvaluationDateChange} />
                </div>
            </div>
            {/* <div className="mb-4">
                <div className="h5"><strong>Filter berdasarkan lokasi</strong></div>
            </div> */}
            <div className='d-flex justify-content-stretch'>
                <button
                    className='btn btn-primary custom-btn-shadow'
                    type="button"
                    style={{ flex: "auto" }}
                    onClick={applyDefaultFilters}>
                    <strong>Reset Filter</strong>
                </button>
            </div>
        </>
    );
}
