import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/apiUtils";
import { Carousel } from "react-bootstrap";

interface PlotParameterInfoCardProps {
    nomorParameter: string;
    penilaianParameter: PenilaianIdsSinglePlot;
}

export const PlotParameterInfoCard = (props: PlotParameterInfoCardProps) => {
    const { penilaianParameter: penilaian, nomorParameter } = props;
    let imageHeight = "";

    if (nomorParameter.endsWith("-7") || nomorParameter.endsWith("-8")) {
        imageHeight = "350px";
    } else {
        imageHeight = "200px";
    };

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const fetchImageWithHeaders = async (url: string) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': '69420'
            }
        });
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    };

    useEffect(() => {
        const fetchImages = async () => {
            const urls = await Promise.all(
                penilaian.penilaianImgNames.map(async (url) => {
                    const imageUrl = await fetchImageWithHeaders(`${BASE_URL}/observasi/dokumentasi/${url}`);
                    return imageUrl;
                })
            );
            setImageUrls(urls);
        };

        if (penilaian.penilaianImgNames[0]) {
            fetchImages();
        };
    }, [penilaian.penilaianImgNames.join(',')]);

    return penilaian && (
        <>
            <div className={`border-0 border-md py-3 px-0 p-md-4`}>
                <div className='row'>
                    <div className='col-12'>
                        <p className="h6 mb-3"><strong>{penilaian.penilaianKategori}</strong></p>
                        {
                            (penilaian.penilaianDeskripsi) ?
                                <>
                                    <p className="h6 mb-3"><strong>{penilaian.penilaianName}</strong> - {penilaian.penilaianDeskripsi} </p>
                                    {/* <p className="h6 mb-3 ms-3" style={{ whiteSpace: "pre-line" }}><strong>Keterangan:</strong>{"\n"}{props.keterangan}</p> */}
                                </> :
                                <>
                                    <p className="h6 mb-3 ms-3">{penilaian.penilaianName}</p>
                                </>
                        }
                        <p className="h6 mb-2"><strong>Dokumentasi:</strong></p>

                        <Carousel interval={null}>
                            {imageUrls.map((url, index) => (
                                <Carousel.Item key={`${nomorParameter}-${index}`} className="bg-secondary">
                                    <img
                                        className="object-fit-none rounded"
                                        src={url}
                                        alt={`${url}`}
                                        style={{ width: "100%", height: imageHeight }}
                                        onClick={(e) => {
                                            const imgElement = document.getElementById("fullScreenImg") as HTMLImageElement;
                                            if (imgElement) {
                                                imgElement.src = url;
                                            }
                                        }}
                                        data-bs-toggle="modal"
                                        data-bs-target={"#fullScreenImgModal"}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    );
};