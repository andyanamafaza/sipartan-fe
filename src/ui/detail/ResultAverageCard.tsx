import { getClassForSeverity, getSeverityForScore, getResultIconForSeverity } from "../../utils/utils";
import React from "react";

interface ResultAverageCardProps {
    resultData: ResultData;
}

export const ResultAverageCard = (props: ResultAverageCardProps) => {
    return (
        <div className="card custom-shadow mt-3">
            <div className="card-body p-4">
                <div className='row g-4'>
                    <div className='col-auto d-flex align-items-center'>
                        <div className={`card ${getClassForSeverity(getSeverityForScore(props.resultData.skor))} d-inline-block`}>
                            <div className="d-flex justify-content-center align-items-center">
                                <img
                                    src={`/img/${getResultIconForSeverity(getSeverityForScore(props.resultData.skor))}`}
                                    alt="result_img"
                                    className="img-fluid"
                                    style={{ maxHeight: '50px' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-auto'>
                        <div>
                            <p className="h6 mb-4"><strong>Hasil Penilaian Rata - Rata</strong></p>
                            <p className="h6">Skor : {
                                Number.isInteger(props.resultData.skor)
                                    ? props.resultData.skor
                                    : props.resultData.skor.toFixed(3)}
                            </p>
                            <p className="h6">Tingkat Keparahan : {props.resultData.hasil_penilaian}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};