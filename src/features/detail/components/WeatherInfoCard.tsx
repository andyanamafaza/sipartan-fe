import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { Button, Card, Col, Modal, Row, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { DetailPageContext } from '../DetailPage';


interface WeatherInfoCardProps {
    resultData: ResultData;
}

export const WeatherInfoCard = (props: WeatherInfoCardProps) => {

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
        temperatur: yup.number().required("Temperatur harus diisi!"),
        cuaca_hujan: yup.number().required("Curah hujan harus diisi!"),
        kelembaban_udara: yup.number().required("Kelembapan udara harus diisi!"),
    });

    const { register, handleSubmit, resetField } = useForm<GeneralDataWeatherInfo>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: GeneralDataWeatherInfo) => {
        const formattedData = {
            data: data,
        };
        console.log(formattedData);
        const editSuccess = await putData(formattedData);
        if (editSuccess) {
            handleClose();
        } else {
            alert("Gagal mengubah data cuaca!");
        };
    };

    const resetAllFields = () => {
        resetField("temperatur");
        resetField("cuaca_hujan");
        resetField("kelembaban_udara");
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
                    <Modal.Title>Ubah Cuaca</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="editWeatherForm" onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col>
                                <Card className="p-3">
                                    <div className="h6"><strong>Cuaca Baru</strong></div>
                                    <Table borderless>
                                        <tbody>
                                            <tr>
                                                <td className="align-middle">Temperatur</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <input className="form-control h-100" type="text" {...register('temperatur')}></input>
                                                </td>
                                                <td className="align-middle">°C</td>

                                            </tr>
                                            <tr>
                                                <td className="align-middle">Kelembapan Udara</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <input className="form-control h-100" type="text" {...register('kelembaban_udara')}></input>
                                                </td>
                                                <td className="align-middle">RH</td>
                                            </tr>
                                            <tr>
                                                <td className="align-middle">Curah Hujan</td>
                                                <td className="align-middle">:</td>
                                                <td className="align-middle">
                                                    <input className="form-control h-100" type="text" {...register('cuaca_hujan')}></input>
                                                </td>
                                                <td className="align-middle">mm</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card>
                            </Col>
                            <Col>
                                <div className="card p-3">
                                    <div className="h6"><strong>Cuaca Lama</strong></div>
                                    <EditWeatherTableOld resultData={props.resultData} />
                                </div>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="secondary" className="me-2 custom-btn-shadow" onClick={handleClose}>
                                Batal
                            </Button>
                            <Button variant="primary" className='custom-btn-shadow' type="submit">
                                Simpan
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Card className='mt-3 custom-shadow'>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-end mb-2">
                        <div className="h5"><strong>Keadaan Cuaca</strong></div>
                        <Button
                            variant="outline-secondary"
                            className='custom-btn-shadow'
                            onClick={handleShow}>
                            <span
                                className="bi-pencil-fill">
                            </span>
                        </Button>
                    </div>
                    <WeatherTable resultData={props.resultData} />
                </Card.Body>
            </Card>
        </>

    );
};

const WeatherTable = (props: WeatherInfoCardProps) => {
    return (
        <Table borderless>
            <colgroup>
                <col style={{ width: "50%" }} />
                <col style={{ width: "1%" }} />
                <col style={{ width: "49%" }} />
            </colgroup>
            <tbody>
                <tr>
                    <td>Temperatur</td>
                    <td>:</td>
                    <td>{props.resultData.temperatur} °C</td>
                </tr>
                <tr>
                    <td>Kelembapan Udara</td>
                    <td>:</td>
                    <td>{props.resultData.kelembaban_udara} RH</td>
                </tr>
                <tr>
                    <td>Curah Hujan</td>
                    <td>:</td>
                    <td>{props.resultData.cuaca_hujan} mm</td>
                </tr>
            </tbody>
        </Table>
    );
};

const EditWeatherTableOld = (props: WeatherInfoCardProps) => {
    return (
        <Table borderless>
            <tbody>
                <tr>
                    <td className="align-middle">Temperatur</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        <input
                            type="text"
                            value={`${props.resultData.temperatur} °C`}
                            readOnly
                            className="form-control h-100"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Kelembapan Udara</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        <input
                            type="text"
                            value={`${props.resultData.kelembaban_udara} RH`}
                            readOnly
                            className="form-control h-100"
                        />
                    </td>
                </tr>
                <tr>
                    <td className="align-middle">Curah Hujan</td>
                    <td className="align-middle">:</td>
                    <td className="align-middle">
                        <input
                            type="text"
                            value={`${props.resultData.cuaca_hujan} mm`}
                            readOnly
                            className="form-control h-100"
                        />
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};