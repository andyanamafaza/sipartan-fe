import { getClassForSeverity } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticatedWrap } from '../../hooks/wrapper/authentication';

export const PopUpContent = (props) => {

    const isAuthenticated = useIsAuthenticatedWrap();
    const navigate = useNavigate();

    const navigateToDetailPage = () => {
        navigate(`/detail/${props.marker.dataLahanId}/${props.marker.observationId}`);
    };

    return props.marker && (
        <div className='text-center' style={{ width: "25rem" }}>
            <div className="h5"><strong>Laporan Pasca Karhutla</strong></div>
            <div className="h6 mb-3">Lat: {parseFloat(props.marker.geocode[0]).toFixed(6)} | Lng: {parseFloat(props.marker.geocode[1]).toFixed(6)}</div>
            <div className='mx-auto'>
                <table className="table table-borderless table-sm mb-2">
                    <colgroup>
                        <col style={{ width: "44%" }} />
                        <col style={{ width: "1%" }} />
                        <col style={{ width: "55%" }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td className='align-middle'>Tanggal Kejadian</td>
                            <td className='align-middle'>:</td>
                            <td className='text-start align-middle'>{props.marker.fireDate}</td>

                        </tr>
                        <tr>
                            <td className='align-middle'>Tanggal Penilaian</td>
                            <td className='align-middle'>:</td>
                            <td className='text-start align-middle'>{props.marker.evaluationDate}</td>
                        </tr>
                        <tr>
                            <td className='align-middle'>Tingkat Keparahan</td>
                            <td className='align-middle'>:</td>
                            <td className='text-start align-middle'>
                                {props.marker.severity}
                                <span className={getClassForSeverity(props.marker.severity)} style={{ padding: "0.25rem" }}>
                                    {
                                        Number.isInteger(props.marker.severityScore)
                                            ? props.marker.severityScore
                                            : parseFloat(props.marker.severityScore).toFixed(2)
                                    }
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className=''>Wilayah</td>
                            <td className=''>:</td>
                            <td className=' text-start'>{props.marker.desa}, {props.marker.kecamatan}, {props.marker.kabupaten}, Provinsi {props.marker.provinsi}</td>
                            {/* <td className=' text-start'>{props.marker.kabupaten}</td> */}
                        </tr>
                    </tbody>
                </table>
            </div>
            {
                isAuthenticated() && (
                    <div className=''>
                        <div className='text-center'>
                            <button
                                type="button"
                                className="btn btn-link me-2"
                                style={{ fontSize: "0.8rem", textDecoration: "none" }}
                                onClick={() => {
                                    navigateToDetailPage();
                                }}
                            >Lihat Detail</button>
                            {/* <button
                                type="button"
                                className="btn btn-danger w-25"
                                onClick={refetchDelete}
                            >
                                Hapus Data
                            </button> */}
                        </div>
                    </div>
                )
            }
        </div>
    );
};