import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { LoadingComponent } from "../ui/components/LoadingComponent";
import React from "react";


const ProfilePage = lazy(() => import('../ui/profile/ProfilePage'));
const AddDataPage = lazy(() => import('../ui/add_data/AddDataPage'));
const DetailPage = lazy(() => import('../ui/detail/DetailPage'));

export const PrivateRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/profile" element={<Suspense fallback={<LoadingComponent />}><ProfilePage /></Suspense>} />
                <Route path="/tambah-data" element={<Suspense fallback={<LoadingComponent />}><AddDataPage /></Suspense>} />
                <Route path="/detail/:lahanId/:obsId" element={<Suspense fallback={<LoadingComponent />}><DetailPage /></Suspense>} />
                <Route path="*" element={<Navigate to='/' replace />} />
            </Routes>
        </>
    );
};