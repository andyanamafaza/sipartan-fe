import axios from "axios";
import { BASE_URL } from "../../utils/apiUtils";
import { showToast } from "../../ui/components/ToastComponent";

export const login = async (loginData: LoginData): Promise<LoginDataResponse> => {
    const response = await axios.post<LoginDataResponse>(`${BASE_URL}/user/login`, loginData);
    console.log(response);
    return response.data;
};

export const registerAccount = async (registerData: RegisterData): Promise<RegisterDataResponse> => {
    return showToast.promise(
        axios.post<RegisterDataResponse>(`${BASE_URL}/user`, registerData),
        {
            pending: 'Sedang mendaftarkan akun',
            success: 'Registrasi berhasil!',
            error: 'Terjadi kesalahan',
        }, { position: 'bottom-right' }
    ).then(response => response.data);
};

export const getUserData = async (headers: any): Promise<UserDataResponse> => {
    const response = await axios.get(`${BASE_URL}/user`, {
        headers: headers
    });
    return response.data;
};