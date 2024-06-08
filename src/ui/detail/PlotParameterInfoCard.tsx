import React from "react";
import { useState } from "react";

interface PlotParameterInfoCardProps {
    nomorParameter: string;
    penilaianParameter: PenilaianIdsSinglePlot;
}

export const PlotParameterInfoCard = (props: PlotParameterInfoCardProps) => {

    const penilaian = props.penilaianParameter;
    let imageHeight = "";

    if (props.nomorParameter.endsWith("-7") || props.nomorParameter.endsWith("-8")) {
        imageHeight = "350px";
    } else {
        imageHeight = "200px";
    }

    return penilaian && (
        <>
            <div className={`card`}>
                <div className={`card-body border p-4`}>
                    <div className='row g-0'>
                        <div className='col-12'>
                            <p className="h6 mb-3"><strong>{penilaian.penilaianKategori}</strong></p>
                            {
                                (penilaian.penilaianDeskripsi) ?
                                    <>
                                        <p className="h6 mb-3 ms-3"><strong>{penilaian.penilaianName}</strong> - {penilaian.penilaianDeskripsi} </p>
                                        {/* <p className="h6 mb-3 ms-3" style={{ whiteSpace: "pre-line" }}><strong>Keterangan:</strong>{"\n"}{props.keterangan}</p> */}
                                    </> :
                                    <>
                                        <p className="h6 mb-3 ms-3">{penilaian.penilaianName}</p>
                                    </>
                            }
                            <p className="h6 mb-2"><strong>Dokumentasi:</strong></p>

                            <div id={`carousel${props.nomorParameter}`} className="carousel slide" data-bs-interval="false">

                                <div className="carousel-indicators">
                                    <button
                                        type="button"
                                        data-bs-target={`#carousel${props.nomorParameter}`}
                                        data-bs-slide-to="0"
                                        className="active">
                                    </button>
                                    <button
                                        type="button"
                                        data-bs-target={`#carousel${props.nomorParameter}`}
                                        data-bs-slide-to="1">
                                    </button>
                                    <button
                                        type="button"
                                        data-bs-target={`#carousel${props.nomorParameter}`}
                                        data-bs-slide-to="2">
                                    </button>
                                </div>

                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            className="object-fit-none rounded"
                                            src={imageLinks[0]} alt="gambar1"
                                            style={{ width: "100%", height: imageHeight }}
                                            onClick={(e) => {
                                                const imgElement = document.getElementById("fullScreenImg") as HTMLImageElement;
                                                if (imgElement) {
                                                    imgElement.src = (e.target as HTMLImageElement).src;
                                                }
                                            }}
                                            data-bs-toggle="modal"
                                            data-bs-target={"#fullScreenImgModal"} />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            className="object-fit-none rounded"
                                            src={imageLinks[1]} alt="gambar2"
                                            style={{ width: "100%", height: imageHeight }}
                                            onClick={(e) => {
                                                const imgElement = document.getElementById("fullScreenImg") as HTMLImageElement;
                                                if (imgElement) {
                                                    imgElement.src = (e.target as HTMLImageElement).src;
                                                }
                                            }}
                                            data-bs-toggle="modal"
                                            data-bs-target={"#fullScreenImgModal"} />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            className="object-fit-none rounded"
                                            src={imageLinks[2]} alt="gambar3"
                                            style={{ width: "100%", height: imageHeight }}
                                            onClick={(e) => {
                                                const imgElement = document.getElementById("fullScreenImg") as HTMLImageElement;
                                                if (imgElement) {
                                                    imgElement.src = (e.target as HTMLImageElement).src;
                                                }
                                            }}
                                            data-bs-toggle="modal"
                                            data-bs-target={"#fullScreenImgModal"} />
                                    </div>
                                </div>

                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target={`#carousel${props.nomorParameter}`}
                                    data-bs-slide="prev">
                                    <span
                                        className="carousel-control-prev-icon">
                                    </span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target={`#carousel${props.nomorParameter}`}
                                    data-bs-slide="next">
                                    <span
                                        className="carousel-control-next-icon">
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const imageLinks = [
    "https://images.squarespace-cdn.com/content/v1/5d9ab2b99acc124924b55452/0d4ca5e0-4e00-4916-a9cd-ba9adb676c87/Dead+tree.jpeg",
    "https://forest-master.com/wp-content/uploads/2023/04/tree-2739804_1920-1-1024x576.jpg",
    "https://cdn4.vectorstock.com/i/1000x1000/02/93/silhouette-dead-tree-without-leaves-on-white-vector-23790293.jpg"
];