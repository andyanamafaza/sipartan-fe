import React, { useContext, useEffect, useState } from "react";
import { optionProvince } from "../../../constants/optionProvince";
import { Modal, Row, Col, Card, Table, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { TipeLokasi } from "../../../utils/utils";
import { DetailPageContext } from "../DetailPage";
import { getDesa, getKabupaten, getKecamatan } from "../../../data/api/wilayahBinderByte";

interface LocationInfoCardProps {
    resultData: ResultData;
}

export const LocationInfoCard = (props: LocationInfoCardProps) => {

    const { putData } = useContext(DetailPageContext);

    const [showModal, setShowModal] = useState<boolean>(false);
    const handleClose = () => {
        setShowModal(false);
    };
    const handleShow = () => {
        resetAllFields();
        setShowModal(true);
    };

    const [provinsiId, setProvinsiId] = useState<string>("");
    const [kabupatenId, setKabupatenId] = useState<string>("");
    const [kecamatanId, setKecamatanId] = useState<string>("");

    const { data: kabupatenData, isSuccess: isSuccessKabupaten, isFetching: isFetchingKabupaten, isError: isErrorKabupaten } =
        useQuery([provinsiId], async () => { return await getKabupaten(provinsiId) }, { enabled: showModal, refetchOnWindowFocus: false });
    const { data: kecamatanData, isSuccess: isSuccessKecamatan, isFetching: isFetchingKecamatan, isError: isErrorKecamatan } =
        useQuery([kabupatenId, provinsiId], async () => { return await getKecamatan(kabupatenId) }, { enabled: showModal, refetchOnWindowFocus: false });
    const { data: desaData, isSuccess: isSuccessDesa, isFetching: isFetchingDesa, isError: isErrorDesa } =
        useQuery([kecamatanId, kabupatenId, provinsiId], async () => { return await getDesa(kecamatanId) }, { enabled: showModal, refetchOnWindowFocus: false });

    const schema = yup.object().shape({
        provinsi: yup.string().required("Provinsi harus diisi!"),
        kabupaten: yup.string().required("Kabupaten harus diisi!"),
        kecamatan: yup.string().required("Kecamatan harus diisi!"),
        desa: yup.string().required("Desa harus diisi!"),
        latitude: yup.string().required("Latitude harus diisi!"),
        longitude: yup.string().required("Longitude harus diisi!"),
    });

    const { register, handleSubmit, resetField } = useForm<GeneralDataLocationInfo>({
        resolver: yupResolver(schema),
    });

    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>, tipe: string) => {
        event.target.options[event.target.selectedIndex]
        const selectedOption = event.target.options[event.target.selectedIndex];
        if (tipe == TipeLokasi.PROVINSI) {
            setProvinsiId(selectedOption.id);
        } else if (tipe == TipeLokasi.KABUPATEN) {
            setKabupatenId(selectedOption.id);
        } else if (tipe == TipeLokasi.KECAMATAN) {
            setKecamatanId(selectedOption.id);
        };
    };

    const onSubmit = async (data: GeneralDataLocationInfo) => {
        const formattedData = {
            data: data,
        };
        console.log(formattedData);
        const editSuccess = await putData(formattedData);
        if (editSuccess) {
            handleClose();
        } else {
            alert("Gagal mengubah data lokasi!");
        };
    };

    const resetAllFields = () => {
        resetField("provinsi");
        resetField("kabupaten");
        resetField("kecamatan");
        resetField("desa");
        resetField("latitude");
        resetField("longitude");
        setProvinsiId("");
        setKabupatenId("");
        setKecamatanId("");
    };

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header>
                    <Modal.Title>Ubah Lokasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="editLocationForm" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col>
                                <Card className="p-3">
                                    <div className="h6"><strong>Lokasi Baru</strong></div>
                                    <Table borderless>
                                        <tbody>
                                            <tr>
                                                <td className="align-middle">Provinsi</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select className="form-select h-100" {...register('provinsi')} onChange={(event) => { handleLocationChange(event, TipeLokasi.PROVINSI) }}>
                                                        <option value="" selected disabled>-- Pilih --</option>
                                                        <option value="" style={{ display: "none" }}>-- Pilih --</option>
                                                        {optionProvince.map(option => (
                                                            <option key={option.id} value={option.name} id={option.id}>{option.name}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Kabupaten</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select className="form-select h-100" {...register('kabupaten')} onChange={(event) => { handleLocationChange(event, TipeLokasi.KABUPATEN) }}>
                                                        <option value="" selected disabled>-- Pilih --</option>
                                                        <option value="" style={{ display: "none" }}>-- Pilih --</option>
                                                        {(isSuccessKabupaten && !isFetchingKabupaten && !isErrorKabupaten) && (
                                                            <>
                                                                {kabupatenData?.value.map((option: LocationOption) => (
                                                                    <option key={option.id} value={option.name} id={option.id}>{option.name}</option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Kecamatan</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select className="form-select h-100" {...register('kecamatan')} onChange={(event) => { handleLocationChange(event, TipeLokasi.KECAMATAN) }}>
                                                        <option value="" selected disabled>-- Pilih --</option>
                                                        <option value="" style={{ display: "none" }}>-- Pilih --</option>
                                                        {(isSuccessKecamatan && !isFetchingKecamatan && !isErrorKecamatan) && (
                                                            <>
                                                                {kecamatanData?.value.map((option: LocationOption) => (
                                                                    <option key={option.id} value={option.name} id={option.id}>{option.name}</option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Desa</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <select className="form-select h-100" {...register('desa')}>
                                                        <option value="" selected disabled>-- Pilih --</option>
                                                        <option value="" style={{ display: "none" }}>-- Pilih --</option>
                                                        {(isSuccessDesa && !isFetchingDesa && !isErrorDesa) && (
                                                            <>
                                                                {desaData?.value.map((option: LocationOption) => (
                                                                    <option key={option.id} value={option.name}>{option.name}</option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Latitude</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <input className="form-control h-100" type="text" {...register('latitude')}></input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Longitude</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <input className="form-control h-100" type="text" {...register('longitude')}></input>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card>
                            </Col>
                            <Col>
                                <div className="card p-3">
                                    <div className="h6"><strong>Lokasi Lama</strong></div>
                                    <LocationTable resultData={props.resultData} />
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
                        <div className="h5"><strong>Lokasi</strong></div>
                        <Button
                            variant="outline-secondary"
                            className="custom-btn-shadow"
                            onClick={handleShow}>
                            <span
                                className="bi-pencil-fill">
                            </span>
                        </Button>
                    </div>
                    <LocationTable resultData={props.resultData} />
                </Card.Body>
            </Card>
        </>
    );
};

const LocationTable = (props: LocationInfoCardProps) => {
    return (
        <Table borderless>
            <tbody>
                <tr>
                    <td className="align-middle">Provinsi</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.provinsi}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Kabupaten</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.kabupaten}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Kecamatan</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.kecamatan}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Desa</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {props.resultData.desa}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Latitude</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {parseFloat(props.resultData.latitude).toFixed(6)}
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Longitude</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        {parseFloat(props.resultData.longitude).toFixed(6)}
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}