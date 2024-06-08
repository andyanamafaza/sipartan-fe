import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import { PopUpContent } from './PopUpContent';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { getIconForSeverity } from '../../utils/utils'
import { MapLegend } from './MapLegend';
import { LoadingComponent } from '../components/LoadingComponent';
import { ErrorComponent } from '../components/ErrorComponent';
import { BASE_URL } from '../../utils/apiUtils';

export const MapPage = () => {

    const mapCenter = [-2.600029, 118.015776];

    const { data: mapData, isFetching, isError } = useQuery(["mapMarker"], async () => {
        const res = await axios.get(`${BASE_URL}/lahan-karhutla`, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return res.data;
    });

    const markerData = mapData?.result.map((item) => ({
        geocode: [parseFloat(item.latitude), parseFloat(item.longitude)],
        severity: item.hasil_penilaian,
        severityScore: item.skor,
        fireDate: item.tanggalKejadian.split('T')[0],
        evaluationDate: item.tanggalPenilaian.split('T')[0],
        jenisKarhutla: item.jenis_karhutla,
        luasanKarhutla: item.luasan_karhutla,
        tutupanLahan: item.tutupan_lahan,
        provinsi: item.provinsi,
        kabupaten: item.kabupaten,
        kecamatan: item.kecamatan,
        desa: item.desa,
        dataLahanId: item.data_lahan_id,
        observationId: item.observation_id,
    })) || [];

    const customIcon = (severity) => new Icon({
        iconUrl: `../img/${getIconForSeverity(severity)}`,
        iconSize: [22, 35],
    });

    if (isFetching) {
        return (
            <LoadingComponent />
        );
    };

    if (isError) {
        return (
            <ErrorComponent />
        );
    };

    return (
        <div className='container-fluid p-0'>
            <MapLegend />
            <MapContainer center={mapCenter} zoom={5}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markerData.map((marker) => (
                    <Marker position={marker.geocode} icon={customIcon(marker.severity)}>
                        <Popup className='custom-popup'>
                            <PopUpContent marker={marker} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}