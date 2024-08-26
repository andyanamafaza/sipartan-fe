import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import { PopUpContent } from './components/PopUpContent';
import { useQuery } from '@tanstack/react-query';
import { getIconForSeverity, normalizeLongitude } from '../../utils/utils'
import { MapLegend } from './components/MapLegend';
import { LoadingComponent } from '../common/LoadingComponent';
import { ErrorComponent } from '../common/ErrorComponent';
import { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import './styles/mapPageStyles.css';
import { MapSettings } from './components/MapSettings';
import { getResult } from '../../data/api/lahan';

const mapCenter = [-2.600029, 118.015776];

export const MapPage = () => {

    const isAuthenticated = useIsAuthenticated();
    const [popupInfo, setPopupInfo] = useState(null);
    const [isSettingsShown, setIsSettingsShown] = useState(false);
    const [isLegendShown, setIsLegendShown] = useState(true);

    // Settings states
    const [selectedSeverities, setSelectedSeverities] = useState([
        "Sangat Ringan", "Ringan", "Sedang", "Berat", "Sangat Berat",
    ]);
    const [startFireDate, setStartFireDate] = useState("");
    const [endFireDate, setEndFireDate] = useState("");
    const [startEvaluationDate, setStartEvaluationDate] = useState("");
    const [endEvaluationDate, setEndEvaluationDate] = useState("");

    const handleCloseSettings = () => setIsSettingsShown(false);
    const handleShowSettings = () => setIsSettingsShown(true);

    const { data: mapData, isFetching, isError } = useQuery(["mapMarker"], getResult);

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

    const filteredMarkers = markerData.filter(marker => {
        const isSeveritySelected = selectedSeverities.includes(marker.severity);
        const isWithinFireDateRange = (
            (!startFireDate || new Date(marker.fireDate) >= new Date(startFireDate)) &&
            (!endFireDate || new Date(marker.fireDate) <= new Date(endFireDate))
        );
        const isWithinEvaluationDateRange = (
            (!startEvaluationDate || new Date(marker.evaluationDate) >= new Date(startEvaluationDate)) &&
            (!endEvaluationDate || new Date(marker.evaluationDate) <= new Date(endEvaluationDate))
        );
        return isSeveritySelected && isWithinFireDateRange && isWithinEvaluationDateRange;
    });
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
            {!isSettingsShown && (
                <Button variant='outline-secondary' className='settings-button' onClick={handleShowSettings}>
                    <span className='bi-sliders'></span>
                </Button>
            )}
            <Offcanvas show={isSettingsShown} onHide={handleCloseSettings} scroll={true} backdrop={false} placement='end' className="custom-offcanvas">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><strong>Pengaturan & Filter</strong></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <MapSettings
                        isLegendShown={isLegendShown}
                        setIsLegendShown={setIsLegendShown}
                        selectedSeverities={selectedSeverities}
                        setSelectedSeverities={setSelectedSeverities}
                        startFireDate={startFireDate}
                        setStartFireDate={setStartFireDate}
                        endFireDate={endFireDate}
                        setEndFireDate={setEndFireDate}
                        startEvaluationDate={startEvaluationDate}
                        setStartEvaluationDate={setStartEvaluationDate}
                        endEvaluationDate={endEvaluationDate}
                        setEndEvaluationDate={setEndEvaluationDate}
                    />
                </Offcanvas.Body>
            </Offcanvas>

            {isLegendShown && (
                <MapLegend />
            )}
            
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
                {filteredMarkers.map((marker) => (
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