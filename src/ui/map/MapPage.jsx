import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import { PopUpContent } from './PopUpContent';
import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { getIconForSeverity, normalizeLongitude } from '../../utils/utils'
import { MapLegend } from './MapLegend';
import { LoadingComponent } from '../components/LoadingComponent';
import { ErrorComponent } from '../components/ErrorComponent';
import { BASE_URL } from '../../utils/apiUtils';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import './mapPageStyles.css';

const mapCenter = [-2.600029, 118.015776];

export const MapPage = () => {

    const isAuthenticated = useIsAuthenticated();
    const [popupInfo, setPopupInfo] = useState(null);

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
                <MapEvents setPopupInfo={setPopupInfo} />
                {isAuthenticated() && popupInfo && (
                    <Popup position={popupInfo.position}>
                        <div className='text-center'>
                            <div className="h6 mb-3">
                                <strong>Lat: {parseFloat(popupInfo.latitude).toFixed(6)} |
                                    Lng: {parseFloat(popupInfo.longitude).toFixed(6)}</strong>
                            </div>
                            <Link
                                to="tambah-data"
                                state={{ latitude: popupInfo.latitude, longitude: popupInfo.longitude }}
                            >
                                <Button className='custom-btn-shadow'>
                                    Buat penilaian baru
                                </Button>
                            </Link>
                        </div>
                    </Popup>
                )}
                {markerData.map((marker) => (
                    <Marker key={marker.dataLahanId} position={marker.geocode} icon={customIcon(marker.severity)}>
                        <Popup className='custom-popup-report'>
                            <PopUpContent marker={marker} />
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

const MapEvents = ({ setPopupInfo }) => {
    useMapEvent({
        click(e) {
            setPopupInfo({
                position: e.latlng,
                latitude: e.latlng.lat,
                longitude: normalizeLongitude(e.latlng.lng),
            });
        },
    });
    return null;
};