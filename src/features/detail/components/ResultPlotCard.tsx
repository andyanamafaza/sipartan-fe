import React, { useContext, useState } from "react";
import { JenisTanah, KategoriIndikator, getClassForSeverity, getResultIconForSeverity, getSeverityForScore } from "../../../utils/utils";
import { PlotParameterInfoCard } from "./PlotParameterInfoCard";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getAuthHeader } from "../../../hooks/wrapper/authentication";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { DetailPageContext } from "../DetailPage";
import { showToast } from "../../common/ToastComponent";
import { getPenilaian } from "../../../data/api/observasi";

interface ResultPlotCardProps {
    plotData: SinglePlot;
    nomorPlot: number;
    jenisTanah: string;
};

export const ResultPlotCard = (props: ResultPlotCardProps) => {

    const plotData = props.plotData;
    const { putData } = useContext(DetailPageContext);

    const { data: opsiPenilaianData } =
        useQuery(["penilaian-key"], () => {
            const headers = {
                ...getAuthHeader(),
                'ngrok-skip-browser-warning': '69420'
            };
            return getPenilaian(headers);
        });

    const [showModal, setShowModal] = useState<boolean>(false);
    const handleClose = () => {
        setShowModal(false);
    };
    const handleShow = () => {
        reset();
        setShowModal(true);
    };

    const schema = yup.object().shape({
        indikator_1: yup.string().required("Mohon pilih salah satu"),
        indikator_2a: yup.string().required("Mohon pilih salah satu"),
        indikator_2b: yup.string().required("Mohon pilih salah satu"),
        indikator_3: yup.string().required("Mohon pilih salah satu"),
        indikator_4: yup.string().required("Mohon pilih salah satu"),
        indikator_5: yup.string().required("Mohon pilih salah satu"),
        indikator_6: yup.string().required("Mohon pilih salah satu"),
        indikator_7: yup.string().required("Mohon pilih salah satu"),
        indikator_8: yup.string().required("Mohon pilih salah satu"),
    });

    const { register, handleSubmit, reset } = useForm<EvaluationDataIndicators>({
        resolver: yupResolver(schema),
    });
    const onSubmit = async (data: EvaluationDataIndicators) => {
        let penilaianObservasiIds_indikator8 = "";
        if (props.jenisTanah == JenisTanah.TANAH_BERGAMBUT || props.jenisTanah == JenisTanah.TANAH_GAMBUT) {
            penilaianObservasiIds_indikator8 = plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_8_GAMBUT)?.penilaianObservasiIds || "";
        } else {
            penilaianObservasiIds_indikator8 = plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_8_MINERAL)?.penilaianObservasiIds || "";
        };

        const formattedData1: EvaluationDataPut = {
            data_indikator: [
                { penilaianObservation_id: plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_1)?.penilaianObservasiIds || "", penilaian_id: data.indikator_1 },
                { penilaianObservation_id: plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_2A)?.penilaianObservasiIds || "", penilaian_id: data.indikator_2a },
                { penilaianObservation_id: plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_2B)?.penilaianObservasiIds || "", penilaian_id: data.indikator_2b },
                { penilaianObservation_id: plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_3)?.penilaianObservasiIds || "", penilaian_id: data.indikator_3 },
                { penilaianObservation_id: plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_4)?.penilaianObservasiIds || "", penilaian_id: data.indikator_4 },
                { penilaianObservation_id: plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_5)?.penilaianObservasiIds || "", penilaian_id: data.indikator_5 },
                { penilaianObservation_id: plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_6)?.penilaianObservasiIds || "", penilaian_id: data.indikator_6 },
                { penilaianObservation_id: plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_7)?.penilaianObservasiIds || "", penilaian_id: data.indikator_7 },
                { penilaianObservation_id: penilaianObservasiIds_indikator8, penilaian_id: data.indikator_8 },
            ]
        };

        // console.log(formattedData1);

        const allPenilaianObservationIdsFilled = !formattedData1.data_indikator.some(item => item.penilaianObservation_id === "");
        if (allPenilaianObservationIdsFilled) {
            const formattedData2 = {
                data: formattedData1,
            };
            const editSuccess = await putData(formattedData2);
            if (editSuccess) {
                handleClose();
            } else {
                showToast('Gagal mengubah penilaian plot!',
                    {
                        type: "error",
                        position: "bottom-right",
                    }
                );
            };
        } else {
            showToast("Gagal mengubah penilaian plot! field kosong",
                {
                    type: "error",
                    position: "bottom-right",
                }
            );
        };
    };

    return plotData && (
        <>
            {opsiPenilaianData && (
                <Modal
                    show={showModal}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header>
                        <Modal.Title>Ubah Penilaian Plot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="editPlotEvaluationDataForm" onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col>
                                    <Table borderless>
                                        <tbody>
                                            {/* API doesn't support editing this field yet (6 May 2024)
                                            <tr>
                                                <td className="align-middle">Luasan Plot (m<sup>2</sup>)</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <input className="form-control h-100" type="text" {...register('luasan_plot')}></input>
                                                </td>
                                            </tr> 
                                            */}
                                            <tr>
                                                <td className="align-middle">Kerusakan Pohon</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select
                                                        className="form-select h-100"
                                                        defaultValue={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_1)?.penilaianIds}
                                                        {...register("indikator_1")}
                                                    >
                                                        {opsiPenilaianData.result
                                                            .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_1)
                                                            .map((item) => (
                                                                <option key={item.penilaian_id} value={item.penilaian_id}>
                                                                    {item.variable}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Kerusakan Batang Bagian Terbakar</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select
                                                        className="form-select h-100"
                                                        defaultValue={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_2A)?.penilaianIds}
                                                        {...register("indikator_2a")}
                                                    >
                                                        {opsiPenilaianData.result
                                                            .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_2A)
                                                            .map((item) => (
                                                                <option key={item.penilaian_id} value={item.penilaian_id}>
                                                                    {item.variable}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Kerusakan Batang Jenis Kerusakan</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select
                                                        className="form-select h-100"
                                                        defaultValue={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_2B)?.penilaianIds}
                                                        {...register("indikator_2b")}
                                                    >
                                                        {opsiPenilaianData.result
                                                            .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_2B)
                                                            .map((item) => (
                                                                <option key={item.penilaian_id} value={item.penilaian_id}>
                                                                    {item.variable}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Kerusakan Tajuk</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select
                                                        className="form-select h-100"
                                                        defaultValue={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_3)?.penilaianIds}
                                                        {...register("indikator_3")}
                                                    >
                                                        {opsiPenilaianData.result
                                                            .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_3)
                                                            .map((item) => (
                                                                <option key={item.penilaian_id} value={item.penilaian_id}>
                                                                    {item.variable}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Kerusakan Cabang</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select
                                                        className="form-select h-100"
                                                        defaultValue={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_4)?.penilaianIds}
                                                        {...register("indikator_4")}
                                                    >
                                                        {opsiPenilaianData.result
                                                            .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_4)
                                                            .map((item) => (
                                                                <option key={item.penilaian_id} value={item.penilaian_id}>
                                                                    {item.variable}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Kerusakan Dedaunan</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select
                                                        className="form-select h-100"
                                                        defaultValue={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_5)?.penilaianIds}
                                                        {...register("indikator_5")}
                                                    >
                                                        {opsiPenilaianData.result
                                                            .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_5)
                                                            .map((item) => (
                                                                <option key={item.penilaian_id} value={item.penilaian_id}>
                                                                    {item.variable}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Kerusakan Akar</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select
                                                        className="form-select h-100"
                                                        defaultValue={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_6)?.penilaianIds}
                                                        {...register("indikator_6")}
                                                    >
                                                        {opsiPenilaianData.result
                                                            .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_6)
                                                            .map((item) => (
                                                                <option key={item.penilaian_id} value={item.penilaian_id}>
                                                                    {item.variable}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Keparahan Vegetasi Terbakar</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select
                                                        className="form-select h-100"
                                                        defaultValue={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_7)?.penilaianIds}
                                                        {...register("indikator_7")}
                                                    >
                                                        {opsiPenilaianData.result
                                                            .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_7)
                                                            .map((item) => (
                                                                <option key={item.penilaian_id} value={item.penilaian_id}>
                                                                    {item.variable}
                                                                </option>
                                                            ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Keparahan {props.jenisTanah}</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    {
                                                        (props.jenisTanah == JenisTanah.TANAH_BERGAMBUT || props.jenisTanah == JenisTanah.TANAH_GAMBUT)
                                                            ? <select
                                                                className="form-select h-100"
                                                                defaultValue={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_8_GAMBUT)?.penilaianIds}
                                                                {...register("indikator_8")}
                                                            >
                                                                {opsiPenilaianData.result
                                                                    .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_8_GAMBUT)
                                                                    .map((item) => (
                                                                        <option key={item.penilaian_id} value={item.penilaian_id}>
                                                                            {item.variable}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                            : <select
                                                                className="form-select h-100"
                                                                defaultValue={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_8_MINERAL)?.penilaianIds}
                                                                {...register("indikator_8")}
                                                            >
                                                                {opsiPenilaianData.result
                                                                    .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_8_MINERAL)
                                                                    .map((item) => (
                                                                        <option key={item.penilaian_id} value={item.penilaian_id}>
                                                                            {item.variable}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end mt-4">
                                <Button variant="secondary" className="me-2 custom-btn-shadow" onClick={handleClose}>
                                    Batal
                                </Button>
                                <Button variant="primary" className="custom-btn-shadow" type="submit">
                                    Simpan
                                </Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
            <div className="card custom-shadow mt-3">
                <div className="card-body p-4">
                    <div className='d-flex g-4 mb-4'>
                        <div className='d-flex flex-column align-items-center me-3'>
                            {/* <div className={`card ${getClassForSeverity(getSeverityForScore(50))} d-inline-blocks`}>
                            50
                        </div> */}
                            <div className={`card ${getClassForSeverity(getSeverityForScore(plotData.skor_plot))} d-inline-block`}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <img
                                        src={`/img/${getResultIconForSeverity(getSeverityForScore(plotData.skor_plot))}`}
                                        alt="result_img"
                                        className="img-fluid"
                                        style={{ maxHeight: '50px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-column me-auto'>
                            <p className="h6 mb-3"><strong>Plot {props.nomorPlot} - {plotData.luas_plot} m<sup>2</sup></strong></p>
                            <p className="h6 mb-3">Skor : {plotData.skor_plot}</p>
                            <p className="h6">Tingkat Keparahan: {plotData.hasil_plot}</p>
                        </div>
                        <div className='d-flex flex-column'>
                            <Button
                                variant="outline-secondary"
                                className="custom-btn-shadow"
                                onClick={handleShow}>
                                <span
                                    className="bi-pencil-fill">
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div className="accordion" id="myAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#plot${props.nomorPlot}-collapseOne`}>A. Indikator Kerusakan Individu Pohon</button>
                            </h2>
                            <div id={`plot${props.nomorPlot}-collapseOne`} className="accordion-collapse collapse">
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-md-6 col-12">
                                            <PlotParameterInfoCard
                                                key={plotData.penilaianIdsSinglePlot
                                                    .find(item => item.penilaianKategori === KategoriIndikator.INDIKATOR_1)?.penilaianImgNames.join(',') || 'emptyIndicatorData'}
                                                nomorParameter={`plot${props.nomorPlot}-1`}
                                                penilaianParameter={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_1) || emptyIndicatorData}
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <PlotParameterInfoCard
                                                key={plotData.penilaianIdsSinglePlot
                                                    .find(item => item.penilaianKategori === KategoriIndikator.INDIKATOR_2A)?.penilaianImgNames.join(',') || 'emptyIndicatorData'}
                                                nomorParameter={`plot${props.nomorPlot}-2a`}
                                                penilaianParameter={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_2A) || emptyIndicatorData}
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <PlotParameterInfoCard
                                                key={plotData.penilaianIdsSinglePlot
                                                    .find(item => item.penilaianKategori === KategoriIndikator.INDIKATOR_2B)?.penilaianImgNames.join(',') || 'emptyIndicatorData'}
                                                nomorParameter={`plot${props.nomorPlot}-2b`}
                                                penilaianParameter={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_2B) || emptyIndicatorData}
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <PlotParameterInfoCard
                                                key={plotData.penilaianIdsSinglePlot
                                                    .find(item => item.penilaianKategori === KategoriIndikator.INDIKATOR_3)?.penilaianImgNames.join(',') || 'emptyIndicatorData'}
                                                nomorParameter={`plot${props.nomorPlot}-3`}
                                                penilaianParameter={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_3) || emptyIndicatorData}
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <PlotParameterInfoCard
                                                key={plotData.penilaianIdsSinglePlot
                                                    .find(item => item.penilaianKategori === KategoriIndikator.INDIKATOR_4)?.penilaianImgNames.join(',') || 'emptyIndicatorData'}
                                                nomorParameter={`plot${props.nomorPlot}-4`}
                                                penilaianParameter={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_4) || emptyIndicatorData}
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <PlotParameterInfoCard
                                                key={plotData.penilaianIdsSinglePlot
                                                    .find(item => item.penilaianKategori === KategoriIndikator.INDIKATOR_5)?.penilaianImgNames.join(',') || 'emptyIndicatorData'}
                                                nomorParameter={`plot${props.nomorPlot}-5`}
                                                penilaianParameter={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_5) || emptyIndicatorData}
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <PlotParameterInfoCard
                                                key={plotData.penilaianIdsSinglePlot
                                                    .find(item => item.penilaianKategori === KategoriIndikator.INDIKATOR_6)?.penilaianImgNames.join(',') || 'emptyIndicatorData'}
                                                nomorParameter={`plot${props.nomorPlot}-6`}
                                                penilaianParameter={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_6) || emptyIndicatorData}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#plot${props.nomorPlot}-collapseTwo`}>B. Indikator Keparahan Vegetasi Terbakar</button>
                            </h2>
                            <div id={`plot${props.nomorPlot}-collapseTwo`} className="accordion-collapse collapse">
                                <div className="card-body">
                                    <div className="row p-3 g-3">
                                        <div className="col-12">
                                            <PlotParameterInfoCard
                                                key={plotData.penilaianIdsSinglePlot
                                                    .find(item => item.penilaianKategori === KategoriIndikator.INDIKATOR_7)?.penilaianImgNames.join(',') || 'emptyIndicatorData'}
                                                nomorParameter={`plot${props.nomorPlot}-7`}
                                                penilaianParameter={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_7) || emptyIndicatorData}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingThree">
                                <button type="button" className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#plot${props.nomorPlot}-collapseThree`}>C. Indikator Keparahan Tanah</button>
                            </h2>
                            <div id={`plot${props.nomorPlot}-collapseThree`} className="accordion-collapse collapse">
                                <div className="card-body">
                                    <div className="row p-3 g-3">
                                        <div className="col-12">
                                            {(props.jenisTanah == JenisTanah.TANAH_BERGAMBUT || props.jenisTanah == JenisTanah.TANAH_GAMBUT)
                                                ? <PlotParameterInfoCard
                                                    key={plotData.penilaianIdsSinglePlot
                                                        .find(item => item.penilaianKategori === KategoriIndikator.INDIKATOR_8_GAMBUT)?.penilaianImgNames.join(',') || 'emptyIndicatorData'}
                                                    nomorParameter={`plot${props.nomorPlot}-8`}
                                                    penilaianParameter={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_8_GAMBUT) || emptyIndicatorData} />
                                                : <PlotParameterInfoCard
                                                    key={plotData.penilaianIdsSinglePlot
                                                        .find(item => item.penilaianKategori === KategoriIndikator.INDIKATOR_8_MINERAL)?.penilaianImgNames.join(',') || 'emptyIndicatorData'}
                                                    nomorParameter={`plot${props.nomorPlot}-8`}
                                                    penilaianParameter={plotData.penilaianIdsSinglePlot.find(item => item.penilaianKategori == KategoriIndikator.INDIKATOR_8_MINERAL) || emptyIndicatorData} />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

// Fallback for when there's no indicator data
// Ideally it shouldn't happen unless there's something wrong with the back-end
const emptyIndicatorData: PenilaianIdsSinglePlot = {
    penilaianDeskripsi: '',
    penilaianObservasiIds: '',
    penilaianIds: '',
    penilaianName: '',
    penilaianKategori: '',
    penilaianImgNames: ["", "", ""],
};