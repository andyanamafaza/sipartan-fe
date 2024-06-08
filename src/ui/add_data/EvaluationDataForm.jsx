import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
import { getAuthHeaders } from "../../data/local/authentication";
import { BASE_URL } from "../../utils/apiUtils";
import { KategoriIndikator } from "../../utils/utils";
import { ErrorComponent } from "../components/ErrorComponent";
import { LoadingComponent } from "../components/LoadingComponent";
import { Card } from "react-bootstrap";

export const EvaluationDataForm = (props) => {

    const headers = {
        ...getAuthHeaders(),
        'ngrok-skip-browser-warning': '69420'
    };

    const { data: penilaianData, isLoading: isLoadingPenilaian, isError: isErrorPenilaian } =
        useQuery(["no-key"], async () => {
            const response = await axios.get(`${BASE_URL}/observasi/penilaian`, {
                headers: headers
            });
            console.log(response.data);
            return response.data;
        });

    const postDataGeneral = async (generalData, observationData) => {
        try {
            const response = await axios.post(`${BASE_URL}/lahan-karhutla`, generalData, {
                headers: headers
            });
            console.log('Response from the server:', response.data);
            const dataLahanId = response.data.dataKarhutla.data_lahan_id;
            props.setDataLahanId(dataLahanId);
            observationData.data.data_lahan_id = dataLahanId;
            postData(observationData);
        } catch (error) {
            console.error('Error posting data:', error);
        };
    };

    const postData = async (observationData) => {
        try {
            const response = await axios.post(`${BASE_URL}/observasi`, observationData, {
                headers: headers
            });
            console.log('Response from the server:', response.data);
            props.setObservationId(response.data.result.observation_id);
            props.setResultScore(response.data.result.skor_akhir);
            // props.setIsEvaluationDataSubmitted(true);
            props.handleShowModal();

            const plotIdList = response.data.result.plotIds;
            // postDokumentasi(plotIdList);
        } catch (error) {
            console.error('Error posting data:', error);
        };
    };

    const postDokumentasi = async (plotIdList) => {
        try {
            dokumentasiState.forEach(plot => {
                const plotIdIndex = plot.nomorPlot - 1;
                const newPlotId = plotIdList[plotIdIndex];
                plot.dokumentasi.forEach(dokumentasiParameter => {
                    dokumentasiParameter.plot_id = newPlotId;
                });
            });
            // console.log(dokumentasiState);            
            // const response = await axios.post(`${BASE_URL}/observasi/dokumentasi`, dokumentasiState, {
            //     headers: headers
            // });
            // console.log('Response from the server:', response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        };
    };

    const [isPlotFormDisplayed, setIsPlotFormDisplayed] = useState(true);
    const [plotCount, setPlotCount] = useState(0);
    const [dataState, setDataState] = useState({
        data_lahan_id: "",
        tanggal_kejadian: "",
        tanggal_penilaian: "",
        dataPlot: [],
    });

    // Set data_lahan_id, tanggal_kejadian, and tanggal_penilaian
    // const updateDataAttribute = (name, value) => {
    //     setDataState(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    // Add data to dataPlot
    const addDataPlot = (luasanPlot, penilaianIdList) => {
        setDataState(prevState => {
            const newDataPlot = {
                luasan_plot: luasanPlot,
                penilaian_id: penilaianIdList,
            };
            return {
                ...prevState,
                dataPlot: [...prevState.dataPlot, newDataPlot],
            };
        });
    };

    // const [dokumentasiState, setDokumentasiState] = useState([
    //     // each object here represents a plot
    //     {
    //         nomorPlot: 1,
    //         dokumentasi: [
    //             // each object here represents a single documentation
    //             {
    //                 plot_id: "tes",
    //                 type: "Kematian pohon",
    //                 files: [],
    //             },
    //         ],
    //     }
    // ]);

    const [dokumentasiState, setDokumentasiState] = useState([]);
    const addDokumentasi = (dokumentasiList) => {
        setDokumentasiState(prevState => {
            const newDokumentasiPlot = {
                nomorPlot: prevState.length + 1,
                dokumentasi: dokumentasiList,
            };
            return [...prevState, newDokumentasiPlot]
        });
    };

    const schema = yup.object().shape({
        luasan_plot: yup.number().required("Luasan Plot harus diisi").moreThan(0, "Luas Invalid!"),
        indikator_1: yup.string().required("Mohon pilih salah satu"),
        indikator_2a: yup.string().required("Mohon pilih salah satu"),
        indikator_2b: yup.string().required("Mohon pilih salah satu"),
        indikator_3: yup.string().required("Mohon pilih salah satu"),
        indikator_4: yup.string().required("Mohon pilih salah satu"),
        indikator_5: yup.string().required("Mohon pilih salah satu"),
        indikator_6: yup.string().required("Mohon pilih salah satu"),
        indikator_7: yup.string().required("Mohon pilih salah satu"),
        indikator_8: yup.string().required("Mohon pilih salah satu"),
    });

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        resolver: yupResolver(schema),
    });

    // Below states each hold an item/object from penilaianData.result
    const [indikator1, setIndikator1] = useState(null);
    const [indikator2a, setIndikator2a] = useState(null);
    const [indikator2b, setIndikator2b] = useState(null);
    const [indikator3, setIndikator3] = useState(null);
    const [indikator4, setIndikator4] = useState(null);
    const [indikator5, setIndikator5] = useState(null);
    const [indikator6, setIndikator6] = useState(null);
    const [indikator7, setIndikator7] = useState(null);
    const [indikator8, setIndikator8] = useState(null);

    // Below states each hold an object that contains documentation data
    const [dokumentasi1, setDokumentasi1] = useState(null);
    const [dokumentasi2a, setDokumentasi2a] = useState(null);
    const [dokumentasi2b, setDokumentasi2b] = useState(null);
    const [dokumentasi3, setDokumentasi3] = useState(null);
    const [dokumentasi4, setDokumentasi4] = useState(null);
    const [dokumentasi5, setDokumentasi5] = useState(null);
    const [dokumentasi6, setDokumentasi6] = useState(null);
    const [dokumentasi7, setDokumentasi7] = useState(null);
    const [dokumentasi8, setDokumentasi8] = useState(null);

    useEffect(() => {
        console.log(dokumentasiState);
    }, [dokumentasiState]);

    const onSubmit = (data) => {
        const penilaianIdList = [
            data.indikator_1,
            data.indikator_2a,
            data.indikator_2b,
            data.indikator_3,
            data.indikator_4,
            data.indikator_5,
            data.indikator_6,
            data.indikator_7,
            data.indikator_8,
        ];

        const dokumentasiList = [
            dokumentasi1,
            dokumentasi2a,
            dokumentasi2b,
            dokumentasi3,
            dokumentasi4,
            dokumentasi5,
            dokumentasi6,
            dokumentasi7,
            dokumentasi8,
        ];

        addDataPlot(data.luasan_plot, penilaianIdList);
        addDokumentasi(dokumentasiList);

        setIsPlotFormDisplayed(false);
        setPlotCount((prev) => prev + 1);

        reset({
            indikator_1: "", indikator_2a: "", indikator_2b: "", indikator_3: "", indikator_4: "",
            indikator_5: "", indikator_6: "", indikator_7: "", indikator_8: ""
        });
        setIndikator1(null);
        setIndikator2a(null);
        setIndikator2b(null);
        setIndikator3(null);
        setIndikator4(null);
        setIndikator5(null);
        setIndikator6(null);
        setIndikator7(null);
        setIndikator8(null);

        setDokumentasi1(null);
        setDokumentasi2a(null);
        setDokumentasi2b(null);
        setDokumentasi3(null);
        setDokumentasi4(null);
        setDokumentasi5(null);
        setDokumentasi6(null);
        setDokumentasi7(null);
        setDokumentasi8(null);
    };

    const handleSelectChange = (event, tipe) => {
        const selectedItem = penilaianData.result.find(
            (item) => item.penilaian_id === event.target.value
        );
        const setIndikator = indikatorSetters[tipe];

        if (setIndikator) {
            setIndikator(selectedItem);
        };
    };
    const indikatorSetters = {
        [KategoriIndikator.INDIKATOR_1]: setIndikator1,
        [KategoriIndikator.INDIKATOR_2A]: setIndikator2a,
        [KategoriIndikator.INDIKATOR_2B]: setIndikator2b,
        [KategoriIndikator.INDIKATOR_3]: setIndikator3,
        [KategoriIndikator.INDIKATOR_4]: setIndikator4,
        [KategoriIndikator.INDIKATOR_5]: setIndikator5,
        [KategoriIndikator.INDIKATOR_6]: setIndikator6,
        [KategoriIndikator.INDIKATOR_7]: setIndikator7,
        [KategoriIndikator.INDIKATOR_8_MINERAL]: setIndikator8,
        [KategoriIndikator.INDIKATOR_8_GAMBUT]: setIndikator8,
    };

    const handleDokumentasiChange = (event, tipe) => {
        const setDokumentasi = dokumentasiSetters[tipe];

        if (setDokumentasi) {
            setDokumentasi({
                plot_id: "tes",
                type: tipe,
                files: event.target.files,
            });
        };
    };
    const dokumentasiSetters = {
        [KategoriIndikator.INDIKATOR_1]: setDokumentasi1,
        [KategoriIndikator.INDIKATOR_2A]: setDokumentasi2a,
        [KategoriIndikator.INDIKATOR_2B]: setDokumentasi2b,
        [KategoriIndikator.INDIKATOR_3]: setDokumentasi3,
        [KategoriIndikator.INDIKATOR_4]: setDokumentasi4,
        [KategoriIndikator.INDIKATOR_5]: setDokumentasi5,
        [KategoriIndikator.INDIKATOR_6]: setDokumentasi6,
        [KategoriIndikator.INDIKATOR_7]: setDokumentasi7,
        [KategoriIndikator.INDIKATOR_8_MINERAL]: setDokumentasi8,
        [KategoriIndikator.INDIKATOR_8_GAMBUT]: setDokumentasi8,
    };

    const handleFinalSubmit = () => {
        let formattedData = {
            "data": dataState
        };

        const updatedTanggalKejadian = props.datetimeData.tanggal_kejadian;
        const updatedTanggalPenilaian = props.datetimeData.tanggal_penilaian;
        formattedData.data = {
            ...formattedData.data,
            tanggal_kejadian: updatedTanggalKejadian,
            tanggal_penilaian: updatedTanggalPenilaian,
        };

        console.log("General Data to be send ", props.generalData);
        console.log("Evaluation Data to be send: ", formattedData);
        postDataGeneral(props.generalData, formattedData);
    };

    if (isLoadingPenilaian) {
        return <LoadingComponent />
    };
    if (isErrorPenilaian) {
        return <ErrorComponent />
    };
    return penilaianData.result && (
        <>
            <form className="d-flex flex-column justify-content-start px-5 mx-5 mt-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="row text-center text-md-start align-items-center mb-5">
                    <div className="col-md-auto me-0 me-md-auto">
                        <div className={`h2 mb-2 mb-md-0 ${(plotCount > 0) ? `text-success` : `text-danger`}`}><strong>Jumlah Plot: {plotCount}</strong></div>
                    </div>
                    {/* <div className="col-md-auto px-md-0 me-md-3">
                        {!isPlotFormDisplayed && (
                            <button className="btn btn-primary mb-2 mb-md-0 custom-btn-shadow" type="button" onClick={() => { setIsPlotFormDisplayed(true) }}>Tambah Plot Baru</button>
                        )}
                    </div>
                    <div className="col-md-auto px-md-0">
                        {plotCount > 0 && (
                            <button className="btn btn-success custom-btn-shadow" type="button" onClick={() => { handleFinalSubmit() }}>Submit Penilaian</button>
                        )}
                    </div> */}
                </div>
                <div className="d-flex align-self-stretch justify-content-center justify-content-md-start mb-5">
                    <button className="btn btn-primary custom-btn-shadow me-auto" type="button" onClick={() => { props.setActiveStep(1) }}>Sebelumnya</button>
                    {!isPlotFormDisplayed && (
                        <button className="btn btn-primary custom-btn-shadow me-3" type="button" onClick={() => { setIsPlotFormDisplayed(true) }}>Tambah Plot Baru</button>
                    )}
                    {plotCount > 0 && (
                        <button className="btn btn-success custom-btn-shadow" type="button" onClick={() => { handleFinalSubmit() }}>Submit Penilaian</button>
                    )}
                </div>
                {isPlotFormDisplayed && (
                    <Card className="shadow-lg w-100 p-sm-5 mb-5">
                        <div className="h2 align-self-start mb-4">Data Plot</div>
                        <div className="row align-self-start mb-4">
                            <div className="col-sm-12 text-start">
                                <label htmlFor="luasan_plot">Luasan Plot (m<sup>2</sup>)</label>
                                <input className="form-control border-2" id="luasan_plot" type="text" placeholder="" {...register("luasan_plot")} />
                            </div>
                        </div>

                        <div className="h2 text-center text-md-start mt-4 mb-4">A. Indikator Kerusakan Individu Pohon</div>

                        <div className="h4 text-center text-md-start mb-2">1) Indikator Kematian Pohon {indikator1 && `(Skor: ${indikator1.bobot})`}</div>
                        <select className="form-select border-2 mb-2" id="kematian_pohon" {...register("indikator_1")} onChange={(event) => { handleSelectChange(event, KategoriIndikator.INDIKATOR_1) }}>
                            <option value="" selected disabled>-- Pilih Kondisi Kerusakan --</option>
                            {penilaianData.result
                                .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_1)
                                .map((item) => (
                                    <option key={item.penilaian_id} value={item.penilaian_id}>
                                        {item.variable}
                                    </option>
                                ))}
                        </select>
                        <div className="row mb-3 align-items-center">
                            <div class="input-group mb-3">
                                <label className="input-group-text">Dokumentasi (max. 3 foto)</label>
                                <input className="form-control" type="file" accept="image/*" multiple onChange={(e) => handleDokumentasiChange(e, KategoriIndikator.INDIKATOR_1)} />
                            </div>
                        </div>

                        <div className="h4 text-center text-md-start mb-2">2) Indikator Kerusakan Batang {indikator2a && indikator2b && `(Skor: ${indikator2a.bobot + indikator2b.bobot})`}</div>
                        <label className="mb-1" htmlFor="bagian_terbakar"><strong>Bagian Terbakar {indikator2a && `(Skor: ${indikator2a.bobot})`}</strong></label>
                        <select className="form-select border-2 mb-2" id="bagian_terbakar" {...register("indikator_2a")} onChange={(event) => { handleSelectChange(event, KategoriIndikator.INDIKATOR_2A) }}>
                            <option value="" selected disabled>-- Pilih Kondisi Kerusakan --</option>
                            {penilaianData.result
                                .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_2A)
                                .map((item) => (
                                    <option key={item.penilaian_id} value={item.penilaian_id}>
                                        {item.variable}
                                    </option>
                                ))}
                        </select>
                        <div className="row mb-3 align-items-center">
                            <div class="input-group mb-3">
                                <label className="input-group-text">Dokumentasi (max. 3 foto)</label>
                                <input className="form-control" type="file" accept="image/*" multiple onChange={(e) => handleDokumentasiChange(e, KategoriIndikator.INDIKATOR_2A)} />
                            </div>
                        </div>
                        <label className="mb-1" htmlFor="jenis_kerusakan"><strong>Jenis Kerusakan {indikator2b && `(Skor: ${indikator2b.bobot})`}</strong></label>
                        <select className="form-select border-2 mb-2" id="jenis_kerusakan" {...register("indikator_2b")} onChange={(event) => { handleSelectChange(event, KategoriIndikator.INDIKATOR_2B) }}>
                            <option value="" selected disabled>-- Pilih Kondisi Kerusakan --</option>
                            {penilaianData.result
                                .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_2B)
                                .map((item) => (
                                    <option key={item.penilaian_id} value={item.penilaian_id}>
                                        {item.variable}
                                    </option>
                                ))}
                        </select>
                        <div className="row mb-3 align-items-center">
                            <div class="input-group mb-3">
                                <label className="input-group-text">Dokumentasi (max. 3 foto)</label>
                                <input className="form-control" type="file" accept="image/*" multiple onChange={(e) => handleDokumentasiChange(e, KategoriIndikator.INDIKATOR_2B)} />
                            </div>
                        </div>

                        <div className="h4 text-center text-md-start mb-2">3) Indikator Kerusakan Tajuk {indikator3 && `(Skor: ${indikator3.bobot})`}</div>
                        <select className="form-select border-2 mb-2" id="kerusakan_tajuk" {...register("indikator_3")} onChange={(event) => { handleSelectChange(event, KategoriIndikator.INDIKATOR_3) }}>
                            <option value="" selected disabled>-- Pilih Kondisi Kerusakan --</option>
                            {penilaianData.result
                                .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_3)
                                .map((item) => (
                                    <option key={item.penilaian_id} value={item.penilaian_id}>
                                        {item.variable}
                                    </option>
                                ))}
                        </select>
                        <div className="row mb-3 align-items-center">
                            <div class="input-group mb-3">
                                <label className="input-group-text">Dokumentasi (max. 3 foto)</label>
                                <input className="form-control" type="file" accept="image/*" multiple onChange={(e) => handleDokumentasiChange(e, KategoriIndikator.INDIKATOR_3)} />
                            </div>
                        </div>

                        <div className="h4 text-center text-md-start mb-2">4) Indikator Kerusakan Cabang {indikator4 && `(Skor: ${indikator4.bobot})`}</div>
                        <select className="form-select border-2 mb-2" id="kerusakan_cabang" {...register("indikator_4")} onChange={(event) => { handleSelectChange(event, KategoriIndikator.INDIKATOR_4) }}>
                            <option value="" selected disabled>-- Pilih Kondisi Kerusakan --</option>
                            {penilaianData.result
                                .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_4)
                                .map((item) => (
                                    <option key={item.penilaian_id} value={item.penilaian_id}>
                                        {item.variable}
                                    </option>
                                ))}
                        </select>
                        <div className="row mb-3 align-items-center">
                            <div class="input-group mb-3">
                                <label className="input-group-text">Dokumentasi (max. 3 foto)</label>
                                <input className="form-control" type="file" accept="image/*" multiple onChange={(e) => handleDokumentasiChange(e, KategoriIndikator.INDIKATOR_4)} />
                            </div>
                        </div>

                        <div className="h4 text-center text-md-start mb-2">5) Indikator Kerusakan Daun {indikator5 && `(Skor: ${indikator5.bobot})`}</div>
                        <select className="form-select border-2 mb-2" id="kerusakan_daun" {...register("indikator_5")} onChange={(event) => { handleSelectChange(event, KategoriIndikator.INDIKATOR_5) }}>
                            <option value="" selected disabled>-- Pilih Kondisi Kerusakan --</option>
                            {penilaianData.result
                                .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_5)
                                .map((item) => (
                                    <option key={item.penilaian_id} value={item.penilaian_id}>
                                        {item.variable}
                                    </option>
                                ))}
                        </select>
                        <div className="row mb-3 align-items-center">
                            <div class="input-group mb-3">
                                <label className="input-group-text">Dokumentasi (max. 3 foto)</label>
                                <input className="form-control" type="file" accept="image/*" multiple onChange={(e) => handleDokumentasiChange(e, KategoriIndikator.INDIKATOR_5)} />
                            </div>
                        </div>

                        <div className="h4 text-center text-md-start mb-2">6) Indikator Kerusakan Akar {indikator6 && `(Skor: ${indikator6.bobot})`}</div>
                        <select className="form-select border-2 mb-2" id="kerusakan_akar" {...register("indikator_6")} onChange={(event) => { handleSelectChange(event, KategoriIndikator.INDIKATOR_6) }}>
                            <option value="" selected disabled>-- Pilih Kondisi Kerusakan --</option>
                            {penilaianData.result
                                .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_6)
                                .map((item) => (
                                    <option key={item.penilaian_id} value={item.penilaian_id}>
                                        {item.variable}
                                    </option>
                                ))}
                        </select>
                        <div className="row mb-3 align-items-center">
                            <div class="input-group mb-3">
                                <label className="input-group-text">Dokumentasi (max. 3 foto)</label>
                                <input className="form-control" type="file" accept="image/*" multiple onChange={(e) => handleDokumentasiChange(e, KategoriIndikator.INDIKATOR_6)} />
                            </div>
                        </div>

                        <div className="h2 text-center text-md-start mt-4 mb-4">B. Indikator Keparahan Vegetasi Terbakar {indikator7 && `(Skor: ${indikator7.bobot})`}</div>
                        <select className="form-select border-2 mb-2" id="keparahan_vegetasi" {...register("indikator_7")} onChange={(event) => { handleSelectChange(event, KategoriIndikator.INDIKATOR_7) }}>
                            <option value="" selected disabled>-- Pilih Kondisi Kerusakan --</option>
                            {penilaianData.result
                                .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_7)
                                .map((item) => (
                                    <option key={item.penilaian_id} value={item.penilaian_id}>
                                        {item.variable}
                                    </option>
                                ))}
                        </select>
                        {indikator7 && (
                            <div className="h6 text-start mb-2" style={{ whiteSpace: "pre-line" }}>
                                <strong>Keterangan:</strong>{"\n"}{indikator7.deskripsi}
                            </div>
                        )}
                        <div className="row mb-3 align-items-center">
                            <div class="input-group mb-3">
                                <label className="input-group-text">Dokumentasi (max. 3 foto)</label>
                                <input className="form-control" type="file" accept="image/*" multiple onChange={(e) => handleDokumentasiChange(e, KategoriIndikator.INDIKATOR_7)} />
                            </div>
                        </div>

                        {
                            props.jenisTanah.toLowerCase() != "tanah gambut"
                            && props.jenisTanah.toLowerCase() != "tanah bergambut"
                            && (
                                <>
                                    <div className="h2 text-center text-md-start mt-4 mb-4">C. Indikator Keparahan Kondisi Tanah Mineral {indikator8 && `(Skor: ${indikator8.bobot})`}</div>
                                    <select className="form-select border-2 mb-2" id="keparahan_tanah_mineral" {...register("indikator_8")} onChange={(event) => { handleSelectChange(event, KategoriIndikator.INDIKATOR_8_MINERAL) }}>
                                        <option value="" selected disabled>-- Pilih Kondisi Kerusakan --</option>
                                        {penilaianData.result
                                            .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_8_MINERAL)
                                            .map((item) => (
                                                <option key={item.penilaian_id} value={item.penilaian_id}>
                                                    {item.variable}
                                                </option>
                                            ))}
                                    </select>
                                    {indikator8 && (
                                        <div className="h6 text-start mb-2" style={{ whiteSpace: "pre-line" }}>
                                            <strong>Keterangan:</strong>{"\n"}{indikator8.deskripsi}
                                        </div>
                                    )}
                                    <div className="row mb-3 align-items-center">
                                        <div class="input-group mb-3">
                                            <label className="input-group-text">Dokumentasi (max. 3 foto)</label>
                                            <input className="form-control" type="file" accept="image/*" multiple onChange={(e) => handleDokumentasiChange(e, KategoriIndikator.INDIKATOR_8_MINERAL)} />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        {
                            (props.jenisTanah.toLowerCase() == "tanah gambut"
                                || props.jenisTanah.toLowerCase() == "tanah bergambut")
                            && (
                                <>
                                    <div className="h3 text-center text-md-start mb-4">C. Indikator Keparahan Kondisi Tanah Gambut {indikator8 && `(Skor: ${indikator8.bobot})`}</div>
                                    <select className="form-select border-2 mb-2" id="keparahan_tanah_gambut" {...register("indikator_8")} onChange={(event) => { handleSelectChange(event, KategoriIndikator.INDIKATOR_8_GAMBUT) }}>
                                        <option value="" selected disabled>-- Pilih Kondisi Kerusakan --</option>
                                        {penilaianData.result
                                            .filter((item) => item.kategori === KategoriIndikator.INDIKATOR_8_GAMBUT)
                                            .map((item) => (
                                                <option key={item.penilaian_id} value={item.penilaian_id}>
                                                    {item.variable}
                                                </option>
                                            ))}
                                    </select>
                                    {indikator8 && (
                                        <div className="h6 text-start mb-2" style={{ whiteSpace: "pre-line" }}>
                                            <strong>Keterangan:</strong>{"\n"}{indikator8.deskripsi}
                                        </div>
                                    )}
                                    <div className="row mb-4 align-items-center">
                                        <div class="input-group mb-3">
                                            <label className="input-group-text">Dokumentasi (max. 3 foto)</label>
                                            <input className="form-control" type="file" accept="image/*" multiple onChange={(e) => handleDokumentasiChange(e, KategoriIndikator.INDIKATOR_8_GAMBUT)} />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <div className="row align-self-end mt-2">
                            <button className="btn btn-primary custom-btn-shadow" type="submit">Simpan Penilaian Plot</button>
                        </div>
                    </Card>
                )}
            </form>
        </>
    );
};