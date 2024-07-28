import React from "react";

interface CreatorInfoCardProps {
    resultData: ResultData;
}

export const CreatorInfoCard = (props: CreatorInfoCardProps) => {
    return (
        <div className="card custom-shadow mt-3">
            <div className="card-body p-4">
                <div className="h5 mb-3"><strong>Pembuat Laporan</strong></div>
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td className='col-1 bi-person-fill text-center'></td>
                            <td className='col-4'>Nama</td>
                            <td className='col-7'>: {props.resultData.nama_user}</td>
                        </tr>
                        <tr>
                            <td className='bi-building-fill text-center'></td>
                            <td>Institusi / Tim</td>
                            <td>: {props.resultData.instansi_user}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}