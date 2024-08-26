import axios from "axios";
import { wilayahBinderByteApiKey, wilayahBinderByteUrl } from "../../utils/apiUtils";

export const getKabupaten = async (provinsiId: string): Promise<any> => {
    const response = await axios.get(`${wilayahBinderByteUrl}/kabupaten?api_key=${wilayahBinderByteApiKey}&id_provinsi=${provinsiId}`);
    return response.data;
};

export const getKecamatan = async (kabupatenId: string): Promise<any> => {
    const response = await axios.get(`${wilayahBinderByteUrl}/kecamatan?api_key=${wilayahBinderByteApiKey}&id_kabupaten=${kabupatenId}`);
    return response.data;
};

export const getDesa = async (kecamatanId: string): Promise<any> => {
    const response = await axios.get(`${wilayahBinderByteUrl}/kelurahan?api_key=${wilayahBinderByteApiKey}&id_kecamatan=${kecamatanId}`);
    return response.data;
};