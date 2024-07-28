import { MapPage } from "./ui/map/MapPage.jsx";
import "./styles/styles.css";
import "./styles/breakpoints.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBarNew } from "./ui/components/NavBarNew.jsx";
import { useAuthHeaderWrap, useIsAuthenticatedWrap, useSignOutWrap } from '../src/hooks/wrapper/authentication.ts';
import { PrivateRoutes } from "./routes/PrivateRoutes.tsx";
import { PublicRoutes } from "./routes/PublicRoutes.tsx";
import React, { createContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LoadingComponent } from "./ui/components/LoadingComponent.tsx";
import { ToastComponent } from "./ui/components/ToastComponent.tsx";
import { getUserData } from "./data/api/Auth.ts";
export const UserDataContext = createContext<UserDataContextType>({} as UserDataContextType);

export default function App() {
    const headers = {
        ...useAuthHeaderWrap(),
        'ngrok-skip-browser-warning': '69420'
    };
    const signOut = useSignOutWrap();
    const isCookieExist = useIsAuthenticatedWrap();
    const { isFetching } = useQuery(
        ["userData"],
        async () => {
            try {
                const userDataResponse = await getUserData(headers);
                setUserData(userDataResponse.foundUser[0]);
            } catch (e) {
                signOut();
                window.location.reload();
            };
        },
        { enabled: isCookieExist() }
    );

    const [userData, setUserData] = useState<UserData>({
        user_id: "",
        nama: "",
        instansi: "",
        email: "",
        username: "",
    });

    if (isFetching) {
        return <LoadingComponent />
    };

    return userData.user_id ? (
        <>
            <UserDataContext.Provider value={{ userData: userData }}>
                <div className="App">
                    <BrowserRouter>
                        <NavBarNew />
                        <ToastComponent />
                        <Routes>
                            <Route path="/" element={<MapPage />} />
                            <Route path="/*" element={<PrivateRoutes />} />
                            {/* <Route path="/manajemen-pengguna" element={<h1>Tambahkan Pengguna Baru</h1>} /> */}
                        </Routes>
                    </BrowserRouter>
                </div>
            </UserDataContext.Provider>
        </>
    ) : (
        <>
            <div className="App">
                <BrowserRouter>
                    <NavBarNew />
                    <ToastComponent />
                    <Routes>
                        <Route path="/" element={<MapPage />} />
                        <Route path="/*" element={<PublicRoutes />} />
                    </Routes>
                </BrowserRouter>
            </div></>
    );
}