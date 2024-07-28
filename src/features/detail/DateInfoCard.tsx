import React from "react";
import { Card } from "react-bootstrap";

interface DateInfoCardProps {
    resultData: ResultData;
}

export const DateInfoCard = (props: DateInfoCardProps) => {
    return (
        <Card className="mt-3 custom-shadow">
            <Card.Body>
                <div className="h5 mb-3"><strong>Waktu</strong></div>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td className='bi-fire text-center'></td>
                            <td>Tanggal Kejadian</td>
                            <td>: {props.resultData.tanggalKejadian.split('T')[0]}</td>
                        </tr>
                        <tr>
                            <td className='bi-clipboard2-data-fill text-center'></td>
                            <td>Tanggal Penilaian</td>
                            <td>: {props.resultData.tanggalPenilaian.split('T')[0]}</td>
                        </tr>
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );
};