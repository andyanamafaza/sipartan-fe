interface UserDataResponse {
    msg: string;
    foundUser: UserData[];
};

interface UserData {
    user_id: string;
    nama: string;
    instansi: string;
    email: string;
    username: string;
};