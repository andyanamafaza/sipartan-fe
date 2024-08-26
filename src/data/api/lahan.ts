import axios from "axios";
import { BASE_URL } from "../../utils/apiUtils";

export const getResult = async (): Promise<ResultResponse> => {
    const response = await axios.get<ResultResponse>(`${BASE_URL}/lahan-karhutla`, {
        headers: {
            "ngrok-skip-browser-warning": "69420",
        }
    });
    return response.data;
};

export const getSingleResult = async (headers: any, lahanId: string, obsId: string): Promise<SingleResultResponse> => {
    const response = await axios.get<any>(`${BASE_URL}/lahan-karhutla/${lahanId}/${obsId}`, {
        headers: headers
    });
    return response.data;
};

export const deleteKarhutla = async (headers: any, lahanId: string): Promise<boolean> => {
    try {
        await axios.delete(
            `${BASE_URL}/lahan-karhutla/${lahanId}`, {
            headers: headers
        });
        return true;
    } catch (e) {
        return false;
    };
};

export const editKarhutla = async (headers: any, newData: any, lahanId: string, obsId: string): Promise<void> => {
    await axios.put(`${BASE_URL}/lahan-karhutla/${lahanId}/${obsId}`, newData, {
        headers: headers
    });
};

export const downloadPDFKarhutla = async (headers: any, lahanId: string, obsId: string): Promise<any> => {
    const response = await axios.get(
        `${BASE_URL}/lahan-karhutla/downloadPDF/${lahanId}/${obsId}`, {
        headers: headers,
        responseType: 'blob'
    });
    return response.data;
};

export const createLahanKarhutla = async (headers: any, generalData: any): Promise<any> => {
    const response = await axios.post(`${BASE_URL}/lahan-karhutla`, generalData, {
        headers: headers
    });
    return response.data;
};