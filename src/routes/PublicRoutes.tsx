import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingComponent } from "../features/components/LoadingComponent";
import React from "react";

const LoginPage = lazy(() => import('../features/login/LoginPage'));
const RegisterPage = lazy(() => import('../features/register/RegisterPage'));

export const PublicRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Suspense fallback={<LoadingComponent />}><LoginPage /></Suspense>} />
                <Route path="/register" element={<Suspense fallback={<LoadingComponent />}><RegisterPage /></Suspense>} />
                <Route path="*" element={<Navigate to='/' replace />} />
            </Routes>
        </>
    );
}