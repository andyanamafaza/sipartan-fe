import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { optionProvince } from "../../../constants/optionProvince";
import { optionJenisTanah } from "../../../constants/general_data_options/optionJenisTanah";
import { optionJenisVegetasi } from "../../../constants/general_data_options/optionJenisVegetasi";
import { optionTutupanLahan } from "../../../constants/general_data_options/optionTutupanLahan";
import { optionPenggunaanLahan } from "../../../constants/general_data_options/optionPenggunaanLahan";
import { optionJenisKarhutla } from "../../../constants/general_data_options/optionJenisKarhutla";
import { Modal } from "react-bootstrap";
import { CustomStates } from "../../../utils/utils";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { getCoordinates } from "../../../data/api/geocoding";
import { getWeather } from "../../../data/api/openweather";
import { getDesa, getKabupaten, getKecamatan } from "../../../data/api/wilayahBinderByte";

export const GeneralDataForm = (props) => {

    const location = useLocation();
    const [passedLat, passedLng] = [location.state?.latitude, location.state?.longitude];
    useEffect(() => {
        if (passedLat && passedLng) {
            // const element = document.getElementById('longitude');
            // element?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
            // element?.scrollIntoView(false);
            setValue("latitude", passedLat);
            setValue("longitude", passedLng);
        }
    }, []);

    const schema = yup.object().shape({
        // namaLokasi: yup.string().required("Nama Lokasi harus diisi"),
        kelembapanUdara: yup.number().required("Kelembapan Udara harus diisi").min(0, "Kelembapan Udara Invalid!"),
        temperatur: yup.number().required("Temperatur harus diisi"),
        cuacaHujan: yup.number().required("Cuaca Hujan harus diisi").min(0, "Cuaca Hujan Invalid!"),
        provinsi: yup.string().required("Provinsi harus diisi"),
        kabupaten: yup.string().required("Kabupaten harus diisi"),
        kecamatan: yup.string().required("Kecamatan harus diisi"),
        desa: yup.string().required("Desa harus diisi"),
        latitude: yup.string().required("Latitude harus diisi"),
        longitude: yup.string().required("Longitude harus diisi"),
        jenisKarhutla: yup.string().required("Jenis Karhutla harus diisi"),
        luasKarhutla: yup.number().required("Luas Karhutla harus diisi").moreThan(0, "Luas Invalid!"),
        // jenisTanah: yup.string().required("Jenis Tanah harus diisi"),
        jenisVegetasi: yup.string().required("Jenis Vegetasi harus diisi"),
        tutupanLahan: yup.string().required("Tutupan Lahan harus diisi"),
        penggunaanLahan: yup.string().required("Penggunaan Lahan harus diisi"),
        // tinggiMukaAirGambut: yup.number().moreThan(0, "Tinggi Invalid!")
    });

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
    });

    const [currentLatLngStatus, setCurrentLatLngStatus] = useState("");
    const getCurrentLatLng = () => {
        setCurrentLatLngStatus(CustomStates.LOADING);
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setValue("latitude", latitude);
            setValue("longitude", longitude);
            setCurrentLatLngStatus(CustomStates.SUCCESS);
        }, error => {
            setCurrentLatLngStatus(CustomStates.ERROR);
        });
    };

    const latitudeValue = watch("latitude");
    const longitudeValue = watch("longitude");
    const provinsiValue = watch("provinsi");
    const kabupatenValue = watch("kabupaten");
    const kecamatanValue = watch("kecamatan");
    const desaValue = watch("desa");

    const [tinggiMukaAirGambut, setTinggiMukaAirGambut] = useState();
    const [provinsiId, setProvinsiId] = useState("");
    const [kabupatenId, setKabupatenId] = useState("");
    const [kecamatanId, setKecamatanId] = useState("");

    const { isFetching: isFetchingCoordinates, refetch: refetchCoordinates } =
        useQuery(["coordinatesKey"], async () => {
            if (provinsiValue && kabupatenValue && kecamatanValue && desaValue) {
                const formattedKabupaten = kabupatenValue.replace(/KAB\. |KOTA |KAB/g, '');
                const geocoding = await getCoordinates(provinsiValue, formattedKabupaten, kecamatanValue, desaValue);
                if (geocoding.length > 0) {
                    setValue("latitude", geocoding[0].lat);
                    setValue("longitude", geocoding[0].lon);
                } else {
                    handleShowInfoModal("Koordinat lokasi tidak ditemukan");
                };
            } else {
                handleShowInfoModal("Mohon isi Provinsi, Kabupaten, Kecamatan, dan Desa terlebih dahulu");
            };
            return ("Query finished");
        }, {
            enabled: false
        });

    const { isFetching: isFetchingWeather, refetch: refetchWeather } =
        useQuery(["no-key"], async () => {
            try {
                const weather = await getWeather(latitudeValue, longitudeValue);
                const cuacaHujan = weather.rain?.['1h'] ?? weather.rain?.['3h'] ?? 0;
                setValue('cuacaHujan', cuacaHujan);
                setValue('kelembapanUdara', weather.main.humidity);
                setValue('temperatur', weather.main.temp);
            } catch (e) {
                console.error(e);
            }
        }, { enabled: false });

    const { data: kabupatenData, isSuccess: isSuccessKabupaten, isFetching: isFetchingKabupaten, isError: isErrorKabupaten } =
        useQuery([provinsiId], async () => { return await getKabupaten(provinsiId) });
    const { data: kecamatanData, isSuccess: isSuccessKecamatan, isFetching: isFetchingKecamatan, isError: isErrorKecamatan } =
        useQuery([kabupatenId, provinsiId], async () => { return await getKecamatan(kabupatenId) });
    const { data: desaData, isSuccess: isSuccessDesa, isFetching: isFetchingDesa, isError: isErrorDesa } =
        useQuery([kecamatanId, kabupatenId, provinsiId], async () => { return await getDesa(kecamatanId) });

    const handleLocationChange = (event, tipe) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        if (tipe == "provinsi") {
            setProvinsiId(selectedOption.id);
        } else if (tipe == "kabupaten") {
            setKabupatenId(selectedOption.id);
        } else if (tipe == "kecamatan") {
            setKecamatanId(selectedOption.id);
        };
    };

    const onSubmit = (data) => {
        let formattedData = {};
        if (props.jenisTanah != "") {
            formattedData = {
                "provinsi": data.provinsi,
                "kabupaten": data.kabupaten,
                "kecamatan": data.kecamatan,
                "desa": data.desa,
                "tutupan_lahan": data.tutupanLahan,
                "jenis_vegetasi": data.jenisVegetasi,
                "luasan_karhutla": data.luasKarhutla,
                "jenis_tanah": props.jenisTanah,
                "tinggi_muka_air_gambut": null,
                "jenis_karhutla": data.jenisKarhutla,
                "penggunaan_lahan": data.penggunaanLahan,
                "latitude": data.latitude,
                "longitude": data.longitude,
                "temperatur": data.temperatur,
                "cuaca_hujan": data.cuacaHujan,
                "kelembaban_udara": data.kelembapanUdara,
            };

            if (props.jenisTanah.toLowerCase() == "tanah gambut" || props.jenisTanah.toLowerCase() == "tanah bergambut") {
                if (tinggiMukaAirGambut && tinggiMukaAirGambut > 0) {
                    formattedData.tinggi_muka_air_gambut = parseFloat(tinggiMukaAirGambut);
                    props.setActiveStep(1);
                    props.setGeneralData(formattedData);
                }
            } else {
                props.setActiveStep(1);
                props.setGeneralData(formattedData);
            };
        };
    };

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const handleCloseInfoModal = () => {
        setShowModal(false);
        setModalMessage("");
    };
    const handleShowInfoModal = (message) => {
        setModalMessage(message);
        setShowModal(true);
    };

    return (
        <>
            <Modal
                show={showModal}
                onHide={handleCloseInfoModal}
                size="md"
            >
                <Modal.Header>
                    <Modal.Title>Informasi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="h5">{modalMessage}</div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary custom-btn-shadow" onClick={handleCloseInfoModal}>Tutup</button>
                </Modal.Footer>
            </Modal>
            <form className="d-flex flex-column justify-content-start align-items-center text-center mt-4 mx-3 mx-sm-5 px-sm-5" onSubmit={handleSubmit(onSubmit)}>
                <Card className="shadow-lg w-100 p-4 p-sm-5 mb-5">
                    <div className="h4 mb-5"><strong>Lokasi dan Keadaan Cuaca</strong></div>
                    <div className="row mb-3 gy-3">
                        <div className="col-sm-6">
                            <label htmlFor="provinsi"><strong>Provinsi</strong></label>
                            <select className="form-select border-2" id="provinsi" {...register("provinsi")} onChange={(event) => { handleLocationChange(event, "provinsi") }}>
                                <option value="" selected disabled>-- Pilih --</option>
                                <option value="" style={{ display: "none" }}>-------------------------------------------------------------</option>
                                {optionProvince.map(option => (
                                    <option key={option.id} value={option.name} id={option.id}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="kabupaten"><strong>Kabupaten</strong></label>
                            <select className="form-select border-2" id="kabupaten" {...register("kabupaten")} onChange={(event) => { handleLocationChange(event, "kabupaten") }}>
                                <option value="" selected disabled>-- Pilih --</option>
                                <option value="" style={{ display: "none" }}>-------------------------------------------------------------</option>
                                {(isSuccessKabupaten && !isFetchingKabupaten && !isErrorKabupaten) && (
                                    <>
                                        {kabupatenData?.value.map(option => (
                                            <option key={option.id} value={option.name} id={option.id}>{option.name}</option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="kecamatan"><strong>Kecamatan</strong></label>
                            <select className="form-select border-2" id="kecamatan" {...register("kecamatan")} onChange={(event) => { handleLocationChange(event, "kecamatan") }}>
                                <option value="" selected disabled>-- Pilih --</option>
                                <option value="" style={{ display: "none" }}>-------------------------------------------------------------</option>
                                {(isSuccessKecamatan && !isFetchingKecamatan && !isErrorKecamatan) && (
                                    <>
                                        {kecamatanData?.value.map(option => (
                                            <option key={option.id} value={option.name} id={option.id}>{option.name}</option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label htmlFor="desa"><strong>Desa</strong></label>
                            <select className="form-select border-2" id="desa" {...register("desa")}>
                                <option value="" selected disabled>-- Pilih --</option>
                                <option value="" style={{ display: "none" }}>-------------------------------------------------------------</option>
                                {(isSuccessDesa && !isFetchingDesa && !isErrorDesa) && (
                                    <>
                                        {desaData?.value.map(option => (
                                            <option key={option.id} value={option.name}>{option.name}</option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="row mb-4 align-items-xl-end align-self-xl-stretch">
                        <div className="col-xl-3 mb-3 mb-xl-0"></div>
                        <div className="col-xl-3 mb-3 mb-xl-0">
                            <label htmlFor="latitude"><strong>Latitude</strong></label>
                            <input className="form-control border-2" id="latitude" type="text" placeholder="" {...register("latitude")} />
                        </div>
                        <div className="col-xl-3 mb-3 mb-xl-0">
                            <label htmlFor="longitude"><strong>Longitude</strong></label>
                            <input className="form-control border-2" id="longitude" type="text" placeholder="" {...register("longitude")} />
                        </div>
                    </div>
                    <div className="d-md-flex justify-content-md-center mb-4 align-items-md-end align-self-md-stretch">
                        {
                            (isFetchingCoordinates || currentLatLngStatus == CustomStates.LOADING) ?
                                (
                                    <div className="spinner-border text-primary"></div>
                                ) :
                                (
                                    <>
                                        <button className="btn btn-primary custom-btn-shadow mb-3 mb-md-0 me-md-3" type="button" onClick={getCurrentLatLng} >
                                            <span className="bi-geo-alt-fill me-2"></span>
                                            <span className="">Gunakan koordinat saat ini</span>
                                        </button>
                                        <button className="btn btn-primary custom-btn-shadow" type="button" onClick={refetchCoordinates} >
                                            <span className="bi-geo-alt-fill me-2"></span>
                                            <span className="">Cari Koordinat berdasarkan lokasi</span>
                                        </button>
                                    </>
                                )
                        }
                    </div>
                    <div className="row mb-4 align-items-xl-end align-self-xl-stretch">
                        <div className="col-xl-2 mb-3 mb-xl-0"></div>
                        <div className="col-xl-2 mb-3 mb-xl-0">
                            <label htmlFor="temperatur"><strong>Temperatur (°C)</strong></label>
                            <input className="form-control border-2" id="temperatur" type="text" placeholder="" {...register("temperatur")} />
                        </div>
                        <div className="col-xl-3 mb-3 mb-xl-0">
                            <label htmlFor="kelembapan_udara"><strong>Kelembapan Udara (RH)</strong></label>
                            <input className="form-control border-2" id="kelembapan_udara" type="text" placeholder="" {...register("kelembapanUdara")} />
                        </div>
                        <div className="col-xl-2 mb-3 mb-xl-0">
                            <label htmlFor="cuaca_hujan"><strong>Curah Hujan (mm)</strong></label>
                            <input className="form-control border-2" id="cuaca_hujan" type="text" placeholder="" {...register("cuacaHujan")} />
                        </div>
                    </div>
                    <div className="d-md-flex justify-content-md-center mb-3 align-items-md-end align-self-md-stretch">
                        {
                            isFetchingWeather ? (
                                <div className="spinner-border text-primary"></div>

                            ) : (
                                <>
                                    <button className="btn btn-primary custom-btn-shadow mb-3 mb-md-0" type="button" onClick={() => {
                                        if (latitudeValue && longitudeValue) {
                                            refetchWeather();
                                        } else {
                                            handleShowInfoModal("Untuk mengambil data cuaca, mohon masukkan latitude dan longitude yang valid.");
                                        };
                                    }} >
                                        <span className="bi-cloud-drizzle-fill me-2"></span>
                                        <span className="">Ambil Cuaca Otomatis</span>
                                    </button>
                                </>
                            )
                        }
                    </div>
                </Card>

                <Card className="shadow-lg w-100 p-4 p-sm-5 mb-5">
                    <div className="h4 mb-4"><strong>Informasi Area</strong></div>
                    <div className="row gy-3 align-items-end">
                        <div className="col-12">
                            <label htmlFor="jenis_tanah"><strong>Jenis Tanah</strong></label>
                            <select className="form-select border-2" id="jenis_tanah" value={props.jenisTanah} onChange={(event) => { props.setJenisTanah(event.target.value) }}>
                                <option value="" selected disabled>-- Pilih Jenis Tanah --</option>
                                <option value="" style={{ display: "none" }}>--------------------------------------------------------------------------------------------------------------------------------------</option>
                                {optionJenisTanah.map(option => (
                                    <option key={option.id} value={option.value}>{option.value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="jenis_vegetasi"><strong>Jenis Vegetasi</strong></label>
                            <select className="form-select border-2" id="jenis_vegetasi" {...register("jenisVegetasi")}>
                                <option value="" selected disabled>-- Pilih Jenis Vegetasi --</option>
                                <option value="" style={{ display: "none" }}>-------------------------------------------------------------</option>
                                {optionJenisVegetasi.map(option => (
                                    <option key={option.id} value={option.value}>{option.value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="jenis_karhutla"><strong>Jenis Karhutla</strong></label>
                            <select className="form-select border-2" id="jenis_karhutla" {...register("jenisKarhutla")}>
                                <option value="" selected disabled>-- Pilih Jenis Karhutla --</option>
                                <option value="" style={{ display: "none" }}>-------------------------------------------------------------</option>
                                {optionJenisKarhutla.map(option => (
                                    (option.id === "1" && (props.jenisTanah === "Tanah Gambut" || props.jenisTanah === "Tanah Bergambut"))
                                        ? <option key={option.id} value={option.value}>{option.value}</option>
                                        : (option.id !== "1" && <option key={option.id} value={option.value}>{option.value}</option>)
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="tutupan_lahan"><strong>Tutupan Lahan</strong></label>
                            <select className="form-select border-2" id="tutupan_lahan" {...register("tutupanLahan")}>
                                <option value="" selected disabled>-- Pilih Tutupan Lahan --</option>
                                <option value="" style={{ display: "none" }}>-------------------------------------------------------------</option>
                                {optionTutupanLahan.map(option => (
                                    <option key={option.id} value={option.value}>{option.value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="penggunaan_lahan"><strong>Penggunaan Lahan</strong></label>
                            <select className="form-select border-2" id="penggunaan_lahan" {...register("penggunaanLahan")}>
                                <option value="" selected disabled>-- Pilih Penggunaan Lahan --</option>
                                <option value="" style={{ display: "none" }}>-------------------------------------------------------------</option>
                                {optionPenggunaanLahan.map(option => (
                                    <option key={option.id} value={option.value}>{option.value}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="luas_karhutla"><strong>Estimasi Luas Karhutla (ha)</strong></label>
                            <input className="form-control border-2" id="luas_karhutla" type="text" placeholder="" {...register("luasKarhutla")} />
                        </div>
                        <div className="col-md-6">
                            {
                                (props.jenisTanah.toLowerCase() == "tanah gambut"
                                    || props.jenisTanah.toLowerCase() == "tanah bergambut")
                                && (
                                    <div>
                                        <label htmlFor="tinggi_muka_air_gambut"><strong>Tinggi Muka Air Gambut (cm)</strong></label>
                                        <input className="form-control border-2" id="tinggi_muka_air_gambut" type="text" placeholder="" value={tinggiMukaAirGambut} onChange={(event) => { setTinggiMukaAirGambut(event.target.value) }} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Card>
                <div className="d-flex align-self-stretch justify-content-center justify-content-md-end mb-5">
                    <button className="btn btn-primary custom-btn-shadow" type="submit">Selanjutnya</button>
                </div>
            </form>
        </>
    );
}