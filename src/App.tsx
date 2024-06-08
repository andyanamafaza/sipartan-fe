import { MapPage } from "./ui/map/MapPage.jsx";
import "./styles/styles.css";
import "./styles/breakpoints.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBarNew } from "./ui/components/NavBarNew.jsx";
import { getAuthHeaders, getIsAuthenticated } from "./data/local/authentication.ts";
import { PrivateRoutes } from "./routes/PrivateRoutes.tsx";
import { PublicRoutes } from "./routes/PublicRoutes.tsx";
import React, { createContext } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/apiUtils.ts";
import { useQuery } from "@tanstack/react-query";
import { LoadingComponent } from "./ui/components/LoadingComponent.jsx";
import { ToastComponent } from "./ui/components/ToastComponent.tsx";

export const UserDataContext = createContext<UserDataContextType>({} as UserDataContextType);

export default function App() {

    const isAuthenticated = getIsAuthenticated();
    const headers = {
        ...getAuthHeaders(),
        'ngrok-skip-browser-warning': '69420'
    };

    const getUserData = async (): Promise<UserDataResponse> => axios.get(`${BASE_URL}/user`, {
        headers: headers
    }).then(response => response.data);
    const { data, isFetching, isError } = useQuery(
        ["userData"],
        getUserData,
        { enabled: isAuthenticated() }
    );

    if (isFetching) {
        return (
            <LoadingComponent />
        );
    };

    if (isError) {
        window.location.reload();
    };

    if (isAuthenticated() && data) {
        return (
            <UserDataContext.Provider value={{ userData: data.foundUser[0] }}>
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
        );
    } else {
        return (
            <div className="App">
                <BrowserRouter>
                    <NavBarNew />
                    <ToastComponent />
                    <Routes>
                        <Route path="/" element={<MapPage />} />
                        <Route path="/*" element={<PublicRoutes />} />
                        {/* <Route path="/manajemen-pengguna" element={<h1>Tambahkan Pengguna Baru</h1>} /> */}
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }

}