import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerAccount } from '../../data/api/Auth';

const RegisterPage = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitButtonShown, setIsSubmitButtonShown] = useState(true);

    const postRegister = async (registerData: RegisterData) => {
        setIsSubmitButtonShown(false);
        try {
            const response = await registerAccount(registerData);
            console.log('Response from the server:', response);
            navigate("/login");
        } catch (error) {
            console.error("Error posting data: ", error);
            setIsSubmitButtonShown(true);
        };
    };

    const schema = yup.object().shape({
        nama: yup.string().required("Nama harus diisi"),
        instansi: yup.string().required("Instansi harus diisi"),
        email: yup.string().email("Email tidak valid").required("Email harus diisi"),
        username: yup.string().required("Username harus diisi"),
        password: yup
            .string()
            .min(8, "Password terlalu lemah (min. 8 karakter)")
            .max(50, "Password terlalu panjang (max. 50 karakter)")
            .matches(/[a-z]/, "Password harus memiliki setidaknya satu huruf kecil")
            .matches(/[A-Z]/, "Password harus memiliki setidaknya satu huruf besar")
            .matches(/[0-9]/, "Password harus memiliki setidaknya satu angka")
            .matches(/[^a-zA-Z0-9]/, "Password harus memiliki setidaknya satu simbol")
            .required("Password harus diisi"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), undefined], "Password tidak cocok")
            .required("Masukkan password kembali"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: RegisterData) => {
        let formattedData = {
            "nama": data.nama,
            "instansi": data.instansi,
            "email": data.email,
            "username": data.username,
            "password": data.password,
        };
        postRegister(formattedData);
    };

    return (
        <>
            <style>
                {`
                body{
                    background: url('/img/background_buku_2.png') no-repeat center center fixed;
                    -webkit-background-size: cover;
                    -moz-background-size: cover;
                    -o-background-size: cover;
                    background-size: cover;
                }
                `}
            </style>
            <div className="py-5 100vh">
                <div className="container w-75 w-sm-50 w-md-50 w-lg-50 w-lg-50 w-xl-50 py-5 border bg-light rounded d-flex flex-column align-items-center">
                    <div className="text-center mb-3">
                        <img src="/img/logo_sipartan.png" alt="logo" style={{ maxWidth: "7rem" }} />
                    </div>
                    <div className="h3 mb-4 text-center">Daftar Akun Baru</div>
                    <form className='row gy-3 px-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-lg-6">
                            <div className='d-flex flex-column align-items-start'>
                                <div className="input-group">
                                    <span className="input-group-text input-addon-start" id="nama-addon">
                                        <i className="bi-person-badge-fill"></i>
                                    </span>
                                    <input type="text" className="form-control" placeholder="Nama Lengkap" {...register("nama")} aria-label="Nama" aria-describedby="nama-addon" />
                                </div>
                                {errors.nama && <div className="text-danger">{errors.nama.message}</div>}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='d-flex flex-column align-items-start'>
                                <div className="input-group">
                                    <span className="input-group-text input-addon-start" id="instansi-addon">
                                        <i className="bi-building-fill"></i>
                                    </span>
                                    <input type="text" className="form-control" placeholder="Instansi" {...register("instansi")} aria-label="Instansi" aria-describedby="instansi-addon" />
                                </div>
                                {errors.instansi && <div className="text-danger">{errors.instansi.message}</div>}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='d-flex flex-column align-items-start'>
                                <div className="input-group">
                                    <span className="input-group-text input-addon-start" id="email-addon">
                                        <i className="bi-envelope-fill"></i>
                                    </span>
                                    <input type="email" className="form-control" placeholder="Email" {...register("email")} aria-label="Email" aria-describedby="email-addon" />
                                </div>
                                {errors.email && <div className="text-danger">{errors.email.message}</div>}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='d-flex flex-column align-items-start'>
                                <div className="input-group">
                                    <span className="input-group-text input-addon-start" id="username-addon">
                                        <i className="bi-person-fill"></i>
                                    </span>
                                    <input type="text" className="form-control" placeholder="Username" {...register("username")} aria-label="Username" aria-describedby="username-addon" />
                                </div>
                                {errors.username && <div className="text-danger">{errors.username.message}</div>}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='d-flex flex-column align-items-start'>
                                <div className="input-group">
                                    <span className="input-group-text input-addon-start" id="password-addon">
                                        <i className="bi-lock-fill"></i>
                                    </span>
                                    <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" {...register("password")} aria-label="Password" aria-describedby="password-addon" />
                                    <button className="btn btn-outline-secondary" type="button" id="show-password-addon" onClick={() => { setShowPassword((prev) => !prev) }}>
                                        <i className={showPassword ? "bi-eye-fill text-primary" : "bi-eye-slash-fill"}></i>
                                    </button>
                                </div>
                                {errors.password && <div className="text-danger">{errors.password.message}</div>}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className='mb-4 d-flex flex-column align-items-start'>
                                <div className="input-group">
                                    <span className="input-group-text input-addon-start" id="confirm-password-addon">
                                        <i className="bi-lock-fill"></i>
                                    </span>
                                    <input type={showConfirmPassword ? "text" : "password"} className="form-control" placeholder="Konfirmasi Password" {...register("confirmPassword")} aria-label="ConfirmPassword" aria-describedby="confirm-password-addon" />
                                    <button className="btn btn-outline-secondary" type="button" id="show-confirm-password-addon" onClick={() => { setShowConfirmPassword((prev) => !prev) }}>
                                        <i className={showConfirmPassword ? "bi-eye-fill text-primary" : "bi-eye-slash-fill"}></i>
                                    </button>
                                </div>
                                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword.message}</div>}
                            </div>
                        </div>
                        <div className='text-center'>
                            <button disabled={!isSubmitButtonShown} type="submit" className="btn btn-primary custom-btn-shadow w-75">Daftar</button>
                        </div>
                        <div className="text-center">
                            <p>Sudah punya akun? <Link to="/login">Masuk</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;