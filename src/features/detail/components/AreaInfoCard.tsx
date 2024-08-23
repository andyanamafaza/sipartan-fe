import React, { useContext, useState } from "react";
import * as yup from 'yup';
import { Button, Card, Col, Modal, Row, Table } from "react-bootstrap";
import { optionJenisVegetasi } from "../../../constants/general_data_options/optionJenisVegetasi";
import { optionJenisKarhutla } from "../../../constants/general_data_options/optionJenisKarhutla";
import { optionTutupanLahan } from "../../../constants/general_data_options/optionTutupanLahan";
import { optionPenggunaanLahan } from "../../../constants/general_data_options/optionPenggunaanLahan";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { JenisTanah } from '../../../utils/utils';
import { DetailPageContext } from "../DetailPage";

interface AreaInfoCardProps {
    resultData: ResultData;
};

export const AreaInforCard = (props: AreaInfoCardProps) => {

    const { putData } = useContext(DetailPageContext);

    const [showModal, setShowModal] = useState<boolean>(false);
    const handleClose = () => {
        setShowModal(false);
    };
    const handleShow = () => {
        resetAllFields();
        setShowModal(true);
    };

    const schema = yup.object().shape({
        tutupan_lahan: yup.string().required("Tutupan Lahan harus diisi"),
        jenis_vegetasi: yup.string().required("Jenis Vegetasi harus diisi"),
        luasan_karhutla: yup.number().required("Luas Karhutla harus diisi").moreThan(0, "Luas Invalid!"),
        // jenis_tanah: yup.string().required("Jenis Tanah harus diisi"),
        ...(props.resultData.jenis_tanah === JenisTanah.TANAH_GAMBUT || props.resultData.jenis_tanah === JenisTanah.TANAH_BERGAMBUT ? {
            tinggi_muka_air_gambut: yup.number().required("Tinggi muka air gambut harus diisi").moreThan(0, "Tinggi Invalid!"),
        } : {}),
        jenis_karhutla: yup.string().required("Jenis Karhutla harus diisi"),
        penggunaan_lahan: yup.string().required("Penggunaan Lahan harus diisi"),
    });

    const { register, handleSubmit, resetField } = useForm({
        resolver: yupResolver(schema),
    });

    // Shouldn't be any (bad practice), should use interface from model
    // For now, any is used to avoid errors with yup optional validation
    const onSubmit = async (data: any) => {
        if (props.resultData.jenis_tanah !== JenisTanah.TANAH_GAMBUT
            && props.resultData.jenis_tanah !== JenisTanah.TANAH_BERGAMBUT) {
            data.tinggi_muka_air_gambut = null;
        };
        console.log(data);
        const formattedData = {
            data: data,
        };
        const editSuccess = await putData(formattedData);
        if (editSuccess) {
            handleClose();
        } else {
            alert("Gagal mengubah informasi area!");
        };
    };

    const resetAllFields = () => {
        // resetField("jenis_tanah");
        resetField("jenis_vegetasi");
        resetField("jenis_karhutla");
        resetField("tutupan_lahan");
        resetField("penggunaan_lahan");
        resetField("luasan_karhutla");
        resetField("tinggi_muka_air_gambut");
    };

    return props.resultData && (
        <>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>Ubah Informasi Area Karhutla</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="editGeneralDataForm" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col>
                                <Card className="p-3">
                                    <div className="h6"><strong>Informasi Area Baru</strong></div>
                                    <Table borderless>
                                        <tbody>
                                            <tr>
                                                <td className="align-middle">Jenis Tanah</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select className="form-select h-100">
                                                        <option value="" selected disabled>{props.resultData.jenis_tanah}</option>
                                                        {/* {optionJenisTanah.map(option => (
                                                            <option key={option.id} value={option.value} id={option.id}>{option.value}</option>
                                                        ))} */}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Jenis Vegetasi</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select className="form-select h-100" {...register('jenis_vegetasi')}>
                                                        <option value="" selected disabled>-- Pilih --</option>
                                                        {optionJenisVegetasi.map(option => (
                                                            <option key={option.id} value={option.value} id={option.id}>{option.value}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Jenis Karhutla</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select className="form-select h-100" {...register('jenis_karhutla')}>
                                                        <option value="" selected disabled>-- Pilih --</option>
                                                        {optionJenisKarhutla.map(option => (
                                                            (option.id === "1" &&
                                                                (props.resultData.jenis_tanah === JenisTanah.TANAH_GAMBUT
                                                                    || props.resultData.jenis_tanah === JenisTanah.TANAH_BERGAMBUT))
                                                                ? <option key={option.id} value={option.value}>{option.value}</option>
                                                                : (option.id !== "1" && <option key={option.id} value={option.value}>{option.value}</option>)
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Tutupan Lahan</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select className="form-select h-100" {...register('tutupan_lahan')}>
                                                        <option value="" selected disabled>-- Pilih --</option>
                                                        {optionTutupanLahan.map(option => (
                                                            <option key={option.id} value={option.value} id={option.id}>{option.value}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Penggunaan Lahan</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select className="form-select h-100" {...register('penggunaan_lahan')}>
                                                        <option value="" selected disabled>-- Pilih --</option>
                                                        {optionPenggunaanLahan.map(option => (
                                                            <option key={option.id} value={option.value} id={option.id}>{option.value}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Estimasi Luas Karhutla (ha)</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <input className="form-control h-100" type="text" {...register('luasan_karhutla')}></input>
                                                </td>
                                            </tr>
                                            {props.resultData.tinggi_muka_air_gambut && <tr>
                                                <td className="align-middle">Tinggi Muka Air Gambut (cm)</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <input className="form-control h-100" type="text" {...register('tinggi_muka_air_gambut')}></input>
                                                </td>
                                            </tr>}
                                        </tbody>
                                    </Table>
                                </Card>

                            </Col>
                            <Col>
                                <div className="card p-3">
                                    <div className="h6"><strong>Informasi Area Lama</strong></div>
                                    <AreaInfoTable resultData={props.resultData} />
                                </div>
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
            <Card className="mt-3 custom-shadow">
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-end mb-2">
                        <div className="h5"><strong>Informasi Area Karhutla</strong></div>
                        <Button
                            variant="outline-secondary"
                            className="custom-btn-shadow"
                            onClick={handleShow}>
                            <span
                                className="bi-pencil-fill">
                            </span>
                        </Button>
                    </div>
                    <AreaInfoTable resultData={props.resultData} />
                </Card.Body>
            </Card>
        </>
    );
};

const AreaInfoTable = (props: AreaInfoCardProps) => {
    return (
        <Table borderless>
            <tbody>
                <tr>
                    <td className="align-middle">Jenis Tanah</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.jenis_tanah}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Jenis Vegetasi</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.jenis_vegetasi}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Jenis Karhutla</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.jenis_karhutla}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Tutupan Lahan</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.tutupan_lahan}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Penggunaan Lahan</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.penggunaan_lahan}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Estimasi Luas Karhutla</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.luasan_karhutla} ha
                    </td>
                </tr>
                {props.resultData.tinggi_muka_air_gambut && <tr>
                    <td className="align-middle">Tinggi Muka Air Gambut</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.tinggi_muka_air_gambut} cm
                    </td>
                </tr>}
            </tbody>
        </Table>
    );
};