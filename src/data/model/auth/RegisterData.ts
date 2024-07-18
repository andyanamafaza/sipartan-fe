interface RegisterData {
    nama: string;
    instansi: string;
    email: string;
    username: string;
    password: string;
};

interface RegisterDataResponse {
    msg: string;
    userCreated: UserCreated;
};

interface UserCreated {
    user_id: string;
    nama: string;
    instansi: string;
    email: string;
    username: string;
    password: string;
    updatedAt: string;
    createdAt: string;
};