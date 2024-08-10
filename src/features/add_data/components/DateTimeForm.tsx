import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import { convertDateTimeToUnix } from "../../../utils/utils";
import React from "react";
import { Card } from "react-bootstrap";

interface DateTimeFormProps {
    datetimeData: EvaluationDataDate;
    setDatetimeData: (data: EvaluationDataDate) => void;
    setActiveStep: (step: number) => void;
};

export const DateTimeForm = (props: DateTimeFormProps) => {

    const schema = yup.object().shape({
        tanggal_kejadian: yup.string().required("Tanggal Kejadian harus diisi"),
        tanggal_penilaian: yup.string().required("Tanggal Penilaian harus diisi"),
    });

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: yupResolver(schema),
    });

    const tanggalKejadian = watch("tanggal_kejadian");
    const tanggalPenilaian = watch("tanggal_penilaian");
    const [isErrorDate, setIsErrorDate] = useState<boolean>(false);
    useEffect(() => {
        if (convertDateTimeToUnix(tanggalKejadian) >=
            convertDateTimeToUnix(tanggalPenilaian)) {
            setIsErrorDate(true);
        } else {
            setIsErrorDate(false);
        };
    }, [tanggalKejadian, tanggalPenilaian]);

    const onSubmit = (data: EvaluationDataDate) => {
        if (!isErrorDate) {
            props.setDatetimeData(data);
            props.setActiveStep(2);
        };
    };

    return (
        <>
            <form className="d-flex flex-column justify-content-start px-sm-5 mx-3 mx-sm-5 mt-4" onSubmit={handleSubmit(onSubmit)}>
                <Card className="shadow-lg w-100 p-4 p-sm-5 mb-5">
                    <div className="h2 mb-4 text-center text-md-start">Waktu Observasi</div>
                    <div className="row mb-5 text-center text-lg-start align-items-lg-start text-start">
                        <div className="col-lg-6 mb-3 mb-lg-0">
                            <label htmlFor="tanggal_kejadian">Tanggal Kejadian Karhutla</label>
                            <input
                                className="form-control border-2"
                                id="tanggal_kejadian"
                                type="datetime-local"
                                placeholder=""
                                defaultValue={props.datetimeData.tanggal_kejadian ? props.datetimeData.tanggal_kejadian : ''}
                                {...register("tanggal_kejadian")} />
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="tanggal_penilaian">Tanggal Penilaian Area</label>
                            <input
                                className="form-control border-2 mb-1"
                                id="tanggal_penilaian"
                                type="datetime-local"
                                placeholder=""
                                defaultValue={props.datetimeData.tanggal_penilaian ? props.datetimeData.tanggal_penilaian : ''}
                                {...register("tanggal_penilaian")} />
                            {isErrorDate && (<div className="h6 text-danger">Penilaian hanya bisa dilakukan setelah karhutla terjadi</div>)}
                        </div>
                    </div>
                </Card>
                <div className="d-flex justify-content-center justify-content-md-end mb-5">
                    {!isErrorDate && (
                        <button className="btn btn-primary custom-btn-shadow" type="submit">Selanjutnya</button>
                    )}
                </div>
            </form>
        </>
    );
};