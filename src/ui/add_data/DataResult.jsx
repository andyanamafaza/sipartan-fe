import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getClassForSeverity, getResultIconForSeverity, getSeverityForScore } from '../../utils/utils';
import { getAuthHeaders } from '../../data/local/authentication';
import { BASE_URL } from '../../utils/apiUtils';

export const DataResult = (props) => {

    const headers = {
        ...getAuthHeaders(),
        'ngrok-skip-browser-warning': '69420'
    };

    const { data, isLoading, isError } = useQuery(["resultData"], async () => {
        const url = `${BASE_URL}/single-result/${props.dataLahanId}/${props.observationId}`;
        // const url = `https://poised-bot-403511.et.r.appspot.com/single-result/f9168600-7895-4811-b54e-93c4e740efa7/f3228491-3bb1-423d-b66a-90fd8d52dc2a`;
        const response = await axios.get(url, {
            headers: headers
        });
        return response.data;
    });

    const resultData = data?.result
    console.log(resultData);

    if (isLoading) {
        return <div className='form-row'>Sedang memuat hasil...</div>
    }

    if (isError) {
        return <div className='form-row'>Terjadi kesalahan</div>
    }

    return (
        <>
            <h1 style={{ alignSelf: 'center' }}>Laporan Penilaian Berhasil Dibuat</h1>
            <div className="result-card">
                <div style={{ border: '1.5px solid black', width: '38rem', borderRadius: '10px' }} className='form-row'>
                    <table style={{ alignSelf: 'flex-start', padding: '1rem', width: '18rem' }} className="result-table">
                        <tr>
                            <th colSpan="2">Lokasi</th>
                        </tr>
                        <tr>
                            <td>Provinsi</td>
                            <td>: {resultData.provinsi}</td>
                        </tr>
                        <tr>
                            <td>Kabupaten</td>
                            <td>: {resultData.kabupaten}</td>
                        </tr>
                        <tr>
                            <td>Kecamatan</td>
                            <td>: {resultData.kecamatan}</td>
                        </tr>
                        <tr>
                            <td>Desa</td>
                            <td>: {resultData.desa}</td>
                        </tr>
                    </table>
                    <table style={{ alignSelf: 'flex-start', padding: '1rem', width: '18rem' }} className="result-table">
                        <tr>
                            <th colSpan="2">Keadaan Cuaca</th>
                        </tr>
                        <tr>
                            <td>Curah Hujan</td>
                            <td>: {resultData.cuaca_hujan} mm</td>
                        </tr>
                        <tr>
                            <td>Temperatur</td>
                            <td>: {resultData.temperatur} °C</td>
                        </tr>
                        <tr>
                            <td>Kelembapan Udara</td>
                            <td>: {resultData.kelembaban_udara} RH</td>
                        </tr>
                    </table>
                </div>
                <table style={{ alignSelf: 'center', paddingRight: '7rem', paddingLeft: '7rem', paddingTop: '1rem', paddingBottom: '1rem', width: '38rem', border: '1.5px solid black', borderRadius: '10px' }} className="result-table">
                    <tr>
                        <th colSpan="2">Data Area</th>
                    </tr>
                    <tr>
                        <td>Jenis Tanah</td>
                        <td>: {resultData.jenis_tanah}</td>
                    </tr>
                    <tr>
                        <td>Jenis Karhutla</td>
                        <td>: {resultData.jenis_karhutla}</td>
                    </tr>
                    <tr>
                        <td>Tutupan Lahan</td>
                        <td>: {resultData.tutupan_lahan}</td>
                    </tr>
                    <tr>
                        <td>Penggunaan Lahan</td>
                        <td>: {resultData.penggunaan_lahan}</td>
                    </tr>
                    <tr>
                        <td>Estimasi Luasan Karhutla</td>
                        <td>: {resultData.luasan_karhutla} ha</td>
                    </tr>
                </table>
                <table style={{ alignSelf: 'center', paddingRight: '11rem', paddingLeft: '11.5rem', paddingTop: '1rem', paddingBottom: '1rem', width: '38rem', border: '1.5px solid black', borderRadius: '10px' }} className="result-table">
                    <tr>
                        <th colSpan="2">Data Penilaian</th>
                    </tr>
                    <tr>
                        <td>Tanggal Kejadian</td>
                        <td>: {resultData.tanggalKejadian.split('T')[0]}</td>
                    </tr>
                    <tr>
                        <td>Tanggal Penilaian</td>
                        <td>: {resultData.tanggalPenilaian.split('T')[0]}</td>
                    </tr>
                </table>
            </div>
            {resultData.single_plot.length > 1 && (
                <div className='result-row'>
                    {resultData.single_plot.map((plot, index) => (
                        <div key={index} className={`result-card half-card-width ${getClassForSeverity(getSeverityForScore(plot.skor_plot))}`}>
                            <h2>Plot {index + 1} ({plot.luas_plot} m<sup>2</sup>)</h2>
                            <img className='result-img' src={`/img/${getResultIconForSeverity(getSeverityForScore(plot.skor_plot))}`} alt="result_img" />
                            <h2>{getSeverityForScore(plot.skor_plot)} - {plot.skor_plot}</h2>
                        </div>
                    ))}
                </div>
            )}
            <div style={{ padding: '2rem' }} className={`result-card ${getClassForSeverity(resultData.hasil_penilaian)}`}>
                <h2>Tingkat keparahan rata - rata:</h2>
                <img src={`/img/${getResultIconForSeverity(resultData.hasil_penilaian)}`} alt="result_img" />
                <h2>{resultData.hasil_penilaian} - {resultData.skor}</h2>
            </div>
            <div className="result-add-another-button-container">
                <button onClick={() => { window.location.reload(); }}>Tambah data lain</button>
            </div>
        </>
    );
}