import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../../data/api/Auth';

const LoginPage = () => {

    const signIn = useSignIn<string>();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitButtonShown, setIsSubmitButtonShown] = useState(true);

    const postLogin = async (loginData: LoginData) => {
        setIsSubmitButtonShown(false);
        try {
            const response = await login(loginData);
            console.log('Response from the server:', response);
            signIn({
                auth: {
                    token: response.token,
                    type: "Bearer",
                },
                userState: loginData.email,
            });
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error('Error posting data:', error);
            setLoginError(true);
            setIsSubmitButtonShown(true);
        };
    };

    const schema = yup.object().shape({
        email: yup.string().email("Email tidak valid").required("Email harus diisi"),
        password: yup
            .string()
            .required("Password harus diisi"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: LoginData) => {
        postLogin(data);
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
                <div className="container w-75 w-sm-50 w-md-50 w-lg-50 w-lg-50 w-xl-50 py-5 border bg-light rounded w-50 d-flex flex-column align-items-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-center mb-3">
                            <img src="/img/logo_sipartan.png" alt="logo" style={{ maxWidth: "7rem" }} />
                        </div>
                        <div className="h3 mb-4 text-center">Selamat Datang!</div>
                        <div className='mb-3 d-flex flex-column align-items-start'>
                            <div className="input-group">
                                <span className="input-group-text input-addon-start" id="email-addon">
                                    <i className="bi-envelope-fill"></i>
                                </span>
                                <input type="email" className="form-control" placeholder="Email" {...register("email")} aria-label="Email" aria-describedby="email-addon" />
                            </div>
                            {errors.email && <div className="text-danger" style={{ maxWidth: "310px" }}>{errors.email.message}</div>}
                        </div>
                        <div className='mb-4 d-flex flex-column align-items-start'>
                            <div className="input-group">
                                <span className="input-group-text input-addon-start" id="password-addon">
                                    <i className="bi-lock-fill"></i>
                                </span>
                                <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" {...register("password")} aria-label="Password" aria-describedby="password-addon" />
                                <button className="btn btn-outline-secondary" type="button" id="show-password-addon" onClick={() => { setShowPassword((prev) => !prev) }}>
                                    <i className={showPassword ? "bi-eye-fill text-primary" : "bi-eye-slash-fill"}></i>
                                </button>
                            </div>
                            {errors.password && <div className="text-danger" style={{ maxWidth: "310px" }}>{errors.password.message}</div>}
                        </div>
                        {
                            loginError &&
                            <div className="alert alert-danger py-1 text-center" role="alert">
                                Email atau password tidak terdaftar
                            </div>
                        }
                        <div className='text-center'>
                            <button disabled={!isSubmitButtonShown} type="submit" className="btn btn-primary custom-btn-shadow mb-3 w-75">Masuk</button>
                        </div>
                        <div className="text-center">
                            <p>Belum punya akun? <Link to="/register">Daftar</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;