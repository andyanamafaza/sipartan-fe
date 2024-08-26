import axios from "axios";
import { BASE_URL } from "../../utils/apiUtils";
import { showToast } from "../../features/common/ToastComponent";

export const login = async (loginData: LoginData): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(`${BASE_URL}/user/login`, loginData);
    return response.data;
};

export const createUser = async (registerData: RegisterData): Promise<RegisterDataResponse> => {
    return showToast.promise(
        axios.post<RegisterDataResponse>(`${BASE_URL}/user`, registerData),
        {
            pending: 'Sedang mendaftarkan akun',
            success: 'Registrasi berhasil!',
            error: 'Terjadi kesalahan',
        }, { position: 'bottom-right' }
    ).then(response => response.data);
};

export const getUser = async (headers: any): Promise<UserDataResponse> => {
    const response = await axios.get(`${BASE_URL}/user`, {
        headers: headers
    });
    return response.data;
};