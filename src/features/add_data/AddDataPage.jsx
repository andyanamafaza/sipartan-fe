import { GeneralDataForm } from "./components/GeneralDataForm";
import { DateTimeForm } from "./components/DateTimeForm";
import { EvaluationDataForm } from "./components/EvaluationDataForm";
import { useMemo, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { getClassForSeverity, getResultIconForSeverity, getSeverityForScore } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { Stepper } from "react-form-stepper";
import { StepperStyle } from "./styles/StepperStyle";

const AddDataPage = () => {

    const navigate = useNavigate();

    const [generalData, setGeneralData] = useState({});
    const [jenisTanah, setJenisTanah] = useState("");
    const [datetimeData, setDatetimeData] = useState({});

    const [dataLahanId, setDataLahanId] = useState("");
    const [observationId, setObservationId] = useState("");

    const [activeStep, setActiveStep] = useState(0);
    const [resultScore, setResultScore] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setShowModal(false);
    };
    const handleShow = () => {
        setShowModal(true);
    };

    console.log(dataLahanId);
    console.log(observationId);

    return (
        <>
            <style>
                {`body{background-color: #e5e5e5;}`}
            </style>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="md"
                centered
            >
                <Modal.Body>
                    <div className="d-flex justify-content-center text-center mb-4">
                        <div className="h2"><strong>Laporan berhasil dibuat</strong></div>
                    </div>
                    <div className="d-flex justify-content-center text-center mb-4">
                        <div className={`${getClassForSeverity(getSeverityForScore(resultScore))} p-4`}>
                            <div className="h4 mb-4"><strong>Tingkat keparahan rata - rata</strong></div>
                            <img className="mb-4" src={`/img/${getResultIconForSeverity(getSeverityForScore(resultScore))}`} alt="result_img" style={{ maxHeight: '200px' }} />
                            <div className="h4">
                                <strong>
                                    {Number.isInteger(resultScore)
                                        ? resultScore
                                        : resultScore.toFixed(3)} - {getSeverityForScore(resultScore)}
                                </strong>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        {/* <button className="btn btn-primary custom-btn-shadow me-4" onClick={() => {  }}>Tambah data lain</button> */}
                        <button className="btn btn-primary custom-btn-shadow" onClick={() => { navigate(`/detail/${dataLahanId}/${observationId}`) }}>Lihat Detail</button>
                    </div>
                </Modal.Body>
            </Modal>
            <div className="py-5 100vh">
                <div className="container w-100 d-flex flex-column align-items-center">
                    <Card className="shadow-lg w-100 border-0">
                        <Card.Header className="bg-primary">
                            {/* {!isGeneralDataSubmitted &&
                                <div className="h2 m-0 text-center text-light"><strong>Tambah Area Karhutla Baru</strong></div>
                            }
                            {isGeneralDataSubmitted && !isEvaluationDataSubmitted &&
                                <div className="h2 m-0 text-center text-light"><strong>Tambah Penilaian Karhutla</strong></div>
                            } */}
                            <div className="h2 m-0 text-center text-light"><strong>Tambah Laporan Penilaian Karhutla Baru</strong></div>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <Stepper
                                className="my-4"
                                steps={[{ label: 'Data Umum' }, { label: 'Tanggal & Waktu' }, { label: 'Data Penilaian' }]}
                                activeStep={activeStep}
                                styleConfig={StepperStyle}
                            />
                            {/* <img className="m-5" src="/img/logo_sipartan.png" alt="logo" style={{ maxWidth: "12rem" }} /> */}
                            {activeStep == 0 ? (
                                <GeneralDataForm
                                    jenisTanah={jenisTanah}
                                    setJenisTanah={setJenisTanah}
                                    setActiveStep={setActiveStep}
                                    setGeneralData={setGeneralData} />
                            ) : (
                                <>
                                    <div className={`${activeStep == 1 ? 'd-block' : 'd-none'}`}>
                                        <DateTimeForm
                                            datetimeData={datetimeData}
                                            setDatetimeData={setDatetimeData}
                                            setActiveStep={setActiveStep} />
                                    </div>
                                    <div className={`${activeStep == 2 ? 'd-block' : 'd-none'}`}>
                                        <EvaluationDataForm
                                            generalData={generalData}
                                            datetimeData={datetimeData}
                                            jenisTanah={jenisTanah}
                                            setDataLahanId={setDataLahanId}
                                            setObservationId={setObservationId}
                                            setActiveStep={setActiveStep}
                                            handleShowModal={handleShow}
                                            setResultScore={setResultScore} />
                                    </div>
                                </>
                            )
                            }
                            {/* {isGeneralDataSubmitted && isEvaluationDataSubmitted && (
                                <DataResult
                                    dataLahanId={dataLahanId}
                                    observationId={observationId} />
                            )} */}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default AddDataPage;