import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAuthHeader } from '../../hooks/wrapper/authentication';
import { ResultAverageCard } from './components/ResultAverageCard';
import { ResultPlotCard } from './components/ResultPlotCard';
import { CreatorInfoCard } from './components/CreatorInfoCard';
import { LocationInfoCard } from './components/LocationInfoCard';
import { WeatherInfoCard } from './components/WeatherInfoCard';
import { AreaInforCard } from './components/AreaInfoCard';
import { useNavigate, useParams } from 'react-router-dom';
import { DateInfoCard } from './components/DateInfoCard';
import { LoadingComponent } from '../common/LoadingComponent';
import { useEffect, useState, createContext } from 'react';
import "./styles/detailPageStyles.css";
import { showToast } from '../common/ToastComponent';
import { deleteKarhutla, downloadPDFKarhutla, editKarhutla, getSingleResult } from '../../data/api/lahan';

// Cast temporary value so its not null (ref: https://stackoverflow.com/questions/63080452/react-createcontextnull-not-allowed-with-typescript)
export const DetailPageContext = createContext<DetailPageContextType>({} as DetailPageContextType);

const DetailPage = () => {

    const { lahanId, obsId } = useParams<{ lahanId: string, obsId: string }>();
    const navigate = useNavigate();

    // State to store dataLaporan locally
    // UI will display the data inside this state, not the one in useQuery
    // not the one retrieved from the single result API initially (data)
    const [dataLaporan, setDataLaporan] = useState<ResultData>(defaultData);

    const { data, isFetching, isError, isSuccess, refetch: refetchResult } = useQuery(["resultData"], async () => {
        const headers = {
            ...getAuthHeader(),
            'ngrok-skip-browser-warning': '69420'
        };
        const singleResult = await getSingleResult(headers, lahanId!, obsId!);
        return singleResult;
    });

    const deleteData = async () => {
        const headers = {
            ...getAuthHeader(),
            'ngrok-skip-browser-warning': '69420'
        };
        const isDeleted = await deleteKarhutla(headers, lahanId!);
        if (isDeleted) {
            navigate('/');
            showToast('Laporan berhasil dihapus!',
                {
                    type: "success",
                    position: "bottom-right",
                }
            );
        } else {
            navigate('/');
            window.location.reload();
        };
    };

    const downloadPdf = async () => {
        try {
            const headers = {
                ...getAuthHeader(),
                'ngrok-skip-browser-warning': '69420'
            };
            const pdfData = await downloadPDFKarhutla(headers, lahanId!, obsId!);
            const url = URL.createObjectURL(pdfData);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'laporanKarhutla.pdf';
            a.style.display = 'none';
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (error) {
            navigate("/");
            window.location.reload();
        };
    };

    const putData = async (newData: any): Promise<boolean> => {
        try {
            const headers = {
                ...getAuthHeader(),
                'ngrok-skip-browser-warning': '69420'
            };
            await editKarhutla(headers, newData, lahanId!, obsId!);
            refetchResult();
            showToast('Berhasil mengubah data',
                {
                    type: "success",
                    position: "bottom-right",
                }
            );
            return true;
        } catch (error) {
            return false;
        };
    };

    useEffect((): void => {
        if (isFetching) {
            setDataLaporan(defaultData);
        };
        if (isSuccess) {
            setDataLaporan(data.result);
        };
    }, [isFetching]);

    if (isFetching || dataLaporan.skor === 0) {
        return (
            <LoadingComponent />
        );
    };

    if (isError) {
        navigate('/');
    };

    return dataLaporan.skor !== 0 && (
        <DetailPageContext.Provider value={{ putData }}>
            <style>
                {`body{background-color: white;}`}
            </style>

            <div className="modal" id="fullScreenImgModal">
                <div className="modal-dialog modal-xl modal-dialog-centered justify-content-center">
                    <div className="modal-content" style={{ backgroundColor: "transparent", border: "none", width: "fit-content" }}>
                        <div className="modal-body text-center">
                            <img id="fullScreenImg" alt="logo" style={{ maxWidth: "70vw", maxHeight: "85vh" }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="deleteModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Hapus Laporan</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            Apakah anda yakin ingin menghapus laporan ini?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger custom-btn-shadow" data-bs-dismiss="modal" onClick={() => {
                                deleteData();
                            }}>Ya</button>
                            <button type="button" className="btn btn-outline-secondary custom-btn-shadow" data-bs-dismiss="modal">Tidak</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-4 100vh'>
                <div className='container-fluid'>
                    <button
                        className="btn btn-link"
                        style={{ textDecoration: 'none', padding: 'unset' }}
                        onClick={() => { navigate("/") }}>
                        <div
                            className="h6">
                            &lt; Kembali ke peta
                        </div>
                    </button>
                    <div className="row mb-3">
                        <div className="col-9">
                            <div className="h2"><strong>Laporan Pasca Karhutla</strong></div>
                            <div className="h6">created {dataLaporan.tanggal_upload}</div>
                        </div>
                        <div className="col-3 text-end dropdown">
                            {/* <button type="button" className="btn btn-primary me-2 custom-btn-shadow" onClick={() => {
                                console.log(dataLaporan);
                            }}>
                                Edit Penilaian
                            </button> */}
                            <button type="button" className="btn btn-danger me-2 custom-btn-shadow" data-bs-toggle="modal" data-bs-target="#deleteModal">
                                Hapus
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary custom-btn-shadow"
                                data-bs-toggle="dropdown">
                                <span
                                    className="bi-three-dots">
                                </span>
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#" onClick={downloadPdf}>Download Laporan PDF</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className='d-flex flex-wrap'>
                        <div className='d-flex flex-column flex-basis-left'>
                            <CreatorInfoCard resultData={dataLaporan} />
                            <DateInfoCard resultData={dataLaporan} />
                            <LocationInfoCard resultData={dataLaporan} />
                            <WeatherInfoCard resultData={dataLaporan} />
                            <AreaInforCard resultData={dataLaporan} />
                        </div>
                        <div className='d-flex flex-column flex-basis-right'>
                            <div className="row">
                                <div className="col-12">
                                    <ResultAverageCard resultData={dataLaporan} />
                                </div>
                                {
                                    dataLaporan.single_plot?.map((plot, index) => (
                                        <div className="col-12" key={index}>
                                            <ResultPlotCard nomorPlot={index + 1} plotData={plot} jenisTanah={dataLaporan.jenis_tanah} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DetailPageContext.Provider>
    );
};

export default DetailPage;

const defaultData: ResultData = {
    luasan_karhutla: 0,
    tinggi_muka_air_gambut: null,
    temperatur: 0,
    cuaca_hujan: 0,
    kelembaban_udara: 0,
    tutupan_lahan: '',
    jenis_karhutla: '',
    penggunaan_lahan: '',
    jenis_tanah: '',
    jenis_vegetasi: '',
    nama_user: '',
    instansi_user: '',
    tanggal_upload: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    desa: '',
    latitude: '',
    longitude: '',
    tanggalKejadian: '',
    tanggalPenilaian: '',
    single_plot: [],
    skor: 0,
    hasil_penilaian: '',
};