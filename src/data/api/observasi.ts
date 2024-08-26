import axios from "axios";
import { BASE_URL } from "../../utils/apiUtils";

export const getPenilaian = async (headers: any): Promise<EvaluationOptionDataResponse> => {
    const response = await axios.get(`${BASE_URL}/observasi/penilaian`, {
        headers: headers
    });
    return response.data;
};

export const createKarhutla = async (headers: any, observationData: any): Promise<any> => {
    const response = await axios.post(`${BASE_URL}/observasi`, observationData, {
        headers: headers
    });
    return response.data;
};

export const createDokumentasi = async (headers: any, formData: FormData): Promise<void> => {
    await axios.post(`${BASE_URL}/observasi/dokumentasi`, formData, {
        headers: {
            ...headers,
            "Content-Type": 'multipart/form-data'
        }
    });
};